package cn.wolfcode.service.impl;

import cn.wolfcode.ArticleStatKeyChangeHandler;
import cn.wolfcode.anno.KeyChange;
import cn.wolfcode.domain.*;
import cn.wolfcode.key.KeyPrefix;
import cn.wolfcode.mapper.StrategyContentMapper;
import cn.wolfcode.mapper.StrategyMapper;
import cn.wolfcode.query.StrategyQuery;
import cn.wolfcode.redis.key.ArticleRedisPrefix;
import cn.wolfcode.service.*;
import cn.wolfcode.utils.OSSUtils;
import cn.wolfcode.vo.ArticleStatVo;
import cn.wolfcode.vo.R;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.io.Serializable;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
public class StrategyServiceImpl extends ServiceImpl<StrategyMapper, Strategy> implements IStrategyService {

    @Autowired
    private IStrategyThemeService strategyThemeService;
    @Autowired
    private IStrategyCatalogService strategyCatalogService;
    @Autowired
    private IDestinationService destinationService;
    @Resource
    private StrategyContentMapper strategyContentMapper;
    @Autowired
    private IRedisService<KeyPrefix, Object> redisService;

    @Override
    public Page<Strategy> queryPage(StrategyQuery qo) {
        if (qo.getType() > 0 && qo.getRefid() > 0) {
            if (qo.getType() == StrategyCondition.TYPE_ABROAD || qo.getType() == StrategyCondition.TYPE_CHINA) {
                // 查询目的地
                qo.setDestId(qo.getRefid());
            } else {
                // 查询主题
                qo.setThemeId(qo.getRefid());
            }
        }

        // 条件构造器
        LambdaQueryWrapper<Strategy> wrapper = new LambdaQueryWrapper<Strategy>()
                // 目的地查询
                .eq(qo.getDestId() != null, Strategy::getDestId, qo.getDestId())
                // 主题查询
                .eq(qo.getThemeId() != null, Strategy::getThemeId, qo.getThemeId())
                // like(condition, column, value)
                // 当 condition 成立时，才会将这个条件拼接在 sql 语句上
                .like(StringUtils.hasLength(qo.getKeyword()), Strategy::getTitle, qo.getKeyword())
                // 手动拼接排序 sql
                .last("order by " + qo.getOrderBy() + " desc");

        // 分页方法
        return super.page(new Page<>(qo.getCurrentPage(), qo.getPageSize()), wrapper);
    }

    @Override
    public StrategyContent getContent(Long id) {
        return strategyContentMapper.selectById(id);
    }

    @Override
    public List<Strategy> viewnnumTop3(Long destId) {
        // 1. 基于 destId 查询
        // 2. 按照浏览数排序(降序)
        // 3. 取前三个

        return list(new LambdaQueryWrapper<Strategy>()
                .eq(Strategy::getDestId, destId)
                .orderByDesc(Strategy::getViewnum)
                .last("limit 3"));
    }

    @KeyChange(key = "'strategies:stat:'+#sid", handler = ArticleStatKeyChangeHandler.class)
    @Override
    public ArticleStatVo viewnumIncr(Long sid) {
        // 1. 先执行阅读数 +1 操作(如果之前这个 key 不存在, 则直接设置为 1, 如果存在则对原来的值进行 + 1)
        redisService.hincr(ArticleRedisPrefix.STRATEGIES_STAT_PREFIX, ArticleStatVo.VIEW_NUM, 1L, sid + "");
        // 2. 将 hash 对象查询出来
        Map<Object, Object> hash = redisService.hgetAll(ArticleRedisPrefix.STRATEGIES_STAT_PREFIX, sid + "");
        // 3. 将其转换为 vo 对象
        ArticleStatVo vo = new ArticleStatVo();
        vo.setArticleId(sid);
        try {
            // 用 Apache Commons 组件的拷贝, 目标在前, 源在后
            // Spring 的 BeanUtils 只支持对象类型的拷贝, 不支持 map 的拷贝
            BeanUtils.copyProperties(vo, hash);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return vo;
    }

    @Override
    public Boolean isFavor(Long strategyId, Long userId) {
        return redisService.isMember(ArticleRedisPrefix.STRATEGIES_FAVOR_SET, userId, strategyId + "");
    }

    @Override
    public R<ArticleStatVo> favornumIncr(Long strategyId, Long userId) {
        R<ArticleStatVo> ret = R.ok();

        // 1. 判断当前用户是否已经收藏文章
        Boolean favor = this.isFavor(strategyId, userId);
        if (favor) {
            // 2. 已经收藏:
            // 2.1 将用户从原先的 set 集合中删除
            redisService.sdel(ArticleRedisPrefix.STRATEGIES_FAVOR_SET, userId, strategyId + "");
            // 2.2 收藏数 -1
            redisService.hincr(ArticleRedisPrefix.STRATEGIES_STAT_PREFIX,
                    ArticleStatVo.FAVOR_NUM, -1L, strategyId + "");
            // 2.3 如果已经收藏, 返回 result 为 false, 表示取消收藏
            ret.put("result", false);
        } else {
            // 3. 没收藏:
            // 3.1 将用户加入 set 集合
            redisService.sadd(ArticleRedisPrefix.STRATEGIES_FAVOR_SET, userId, strategyId + "");
            // 3.2 收藏数 +1
            redisService.hincr(ArticleRedisPrefix.STRATEGIES_STAT_PREFIX,
                    ArticleStatVo.FAVOR_NUM, 1L, strategyId + "");
            // 3.3 如果没有收藏, 返回 result 为 true, 表示收藏
            ret.put("result", true);
        }
        // 4. 无论是否收藏, 都返回最新的统计数据
        Map<Object, Object> map = redisService.hgetAll(ArticleRedisPrefix.STRATEGIES_STAT_PREFIX, strategyId + "");
        ret.put("data", map);
        // 5. 返回结果
        return ret;
    }

    @Override
    public R<ArticleStatVo> thumbnumIncr(Long strategyId, Long userId) {
        // 0. 构建结果对象, 直接设置 result 默认为 false
        R<ArticleStatVo> result = R.ok();
        result.put("result", false);
        // 1. 判断用户是否已经置顶
        Boolean thumb = redisService.isMember(ArticleRedisPrefix.STRATEGIES_THUMB_SET, userId, strategyId + "");
        // 2. 如果没有置顶
        if (!thumb) {
            // 2.1 设置过期时间(时间为今天的最后一秒)
            Boolean exists = redisService.exists(ArticleRedisPrefix.STRATEGIES_THUMB_SET, strategyId + "");
            // 2.2 将用户加入置顶的 set 集合
            redisService.sadd(ArticleRedisPrefix.STRATEGIES_THUMB_SET, userId, strategyId + "");
            if (!exists) {
                // 当 key 不存在时才设置过期时间
                LocalDateTime startTime = LocalDateTime.now();
                LocalDateTime endTime = LocalDateTime.of(startTime.getYear(), startTime.getMonth(), startTime.getDayOfMonth(),
                        23, 59, 59);
                Duration between = Duration.between(startTime, endTime);
                redisService.expire(ArticleRedisPrefix.STRATEGIES_THUMB_SET, between.getSeconds(), TimeUnit.SECONDS, strategyId + "");
            }
            // 2.3 置顶数 +1
            redisService.hincr(ArticleRedisPrefix.STRATEGIES_STAT_PREFIX,
                    ArticleStatVo.THUMBS_NUM, 1L, strategyId + "");
            // 2.4 设置 result 为 true
            result.put("result", true);
        }
        // 3. 如果置顶了, 就不管
        // 4. 查询所有统计数据, 并封装对象返回
        Map<Object, Object> map = redisService.hgetAll(ArticleRedisPrefix.STRATEGIES_STAT_PREFIX, strategyId + "");
        result.put("data", map);
        return result;
    }

    @Override
    public List<Strategy> findByDestId(Long destId) {
        LambdaQueryWrapper<Strategy> wrapper = new LambdaQueryWrapper<Strategy>()
                .eq(Strategy::getDestId, destId)
                .eq(Strategy::getState, Strategy.STATE_PUBLISH)
                .orderByDesc(Strategy::getViewnum);

        return list(wrapper);
    }

    @Override
    public Strategy getById(Serializable id) {
        Strategy strategy = super.getById(id);
        // 基于攻略 id 查询攻略内容
        StrategyContent content = strategyContentMapper.selectById(id);
        strategy.setContent(content);
        return strategy;
    }

    @Override
    public boolean save(Strategy entity) {
        // 封面图片上传
        if (OSSUtils.isBase64Img(entity.getCoverUrl())) {
            String url = OSSUtils.uploadBase64ImgToOSS("images", entity.getCoverUrl());
            entity.setCoverUrl(url);
        }

        // 主题 =》 保存主题名称
        StrategyTheme theme = strategyThemeService.getById(entity.getThemeId());
        if (theme != null) {
            entity.setThemeName(theme.getName());
        }

        // 分类 =》 保存分类名称
        StrategyCatalog catalog = strategyCatalogService.getById(entity.getCatalogId());
        if (catalog != null) {
            entity.setCatalogName(catalog.getName());

            // 目的地 =》 保存目的地的id与名称
            entity.setDestId(catalog.getDestId());
            entity.setDestName(catalog.getDestName());

            // 是否国外 =》 基于目的地的地点来判断是否是国外
            List<Destination> toasts = destinationService.queryToasts(entity.getDestId());
            if (toasts != null && toasts.size() > 0) {
                Destination dest = toasts.get(0); // 最外层的国家对象
                if (dest.getId() != 1) { // 如果国家的 id != 1 表示就是国外
                    entity.setIsabroad(Strategy.ABROAD_YES);
                }
            }
        }

        // 创建时间
        entity.setCreateTime(new Date());
        super.save(entity); // 保存

        // 内容 =》 额外保存到内容表
        StrategyContent content = entity.getContent();
        content.setId(entity.getId()); // 将 id 设置为主对象的 id
        strategyContentMapper.insert(entity.getContent());

        return true;
    }
}
