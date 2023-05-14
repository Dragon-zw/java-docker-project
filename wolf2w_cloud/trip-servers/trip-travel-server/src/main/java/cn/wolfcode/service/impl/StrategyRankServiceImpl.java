package cn.wolfcode.service.impl;

import cn.wolfcode.domain.Strategy;
import cn.wolfcode.domain.StrategyRank;
import cn.wolfcode.mapper.StrategyRankMapper;
import cn.wolfcode.service.IStrategyRankService;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.function.Function;

@Service
public class StrategyRankServiceImpl extends ServiceImpl<StrategyRankMapper, StrategyRank> implements IStrategyRankService {

    @Override
    public void deleteByType(int type) {
        // DELETE FROM strategy_rank WHERE type = #{type}
        super.remove(new LambdaQueryWrapper<StrategyRank>().eq(StrategyRank::getType, type));
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void insertRanks(int type, List<Strategy> strategies) {
        // 2. 删除之前的数据
        this.deleteByType(type);

        // 3. 将数据保存到表中
        List<StrategyRank> ranks = new ArrayList<>();
        Date now = new Date();

        for (Strategy strategy : strategies) {
            StrategyRank rank = new StrategyRank();
            rank.setDestId(strategy.getDestId());
            rank.setDestName(strategy.getDestName());
            rank.setStrategyId(strategy.getId());
            rank.setStrategyTitle(strategy.getTitle());
            rank.setType(type);
            rank.setStatisTime(now);
            rank.setStatisnum((long) (strategy.getThumbsupnum() + strategy.getFavornum())); // 统一相同规则

            ranks.add(rank); // 加入到集合
        }

        super.saveBatch(ranks); // 批量保存
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void insertRanks(int type, List<Strategy> strategies, Function<Strategy, Long> statnumFun) {
        // 2. 删除之前的数据
        this.deleteByType(type);

        // 3. 将数据保存到表中
        List<StrategyRank> ranks = new ArrayList<>();
        Date now = new Date();

        for (Strategy strategy : strategies) {
            StrategyRank rank = new StrategyRank();
            rank.setDestId(strategy.getDestId());
            rank.setDestName(strategy.getDestName());
            rank.setStrategyId(strategy.getId());
            rank.setStrategyTitle(strategy.getTitle());
            rank.setType(type);
            rank.setStatisTime(now);
            rank.setStatisnum(statnumFun.apply(strategy)); // 将规则交给函数式接口实现

            ranks.add(rank); // 加入到集合
        }

        super.saveBatch(ranks); // 批量保存
    }

    @Override
    public List<StrategyRank> queryByType(int type) {
        return list(new LambdaQueryWrapper<StrategyRank>().eq(StrategyRank::getType, type));
    }
}
