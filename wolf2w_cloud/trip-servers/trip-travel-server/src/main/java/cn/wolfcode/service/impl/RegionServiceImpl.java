package cn.wolfcode.service.impl;

import cn.wolfcode.domain.Region;
import cn.wolfcode.mapper.RegionMapper;
import cn.wolfcode.query.BaseQuery;
import cn.wolfcode.service.IRegionService;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class RegionServiceImpl extends ServiceImpl<RegionMapper, Region> implements IRegionService {

    @Override
    public Page<Region> queryPage(BaseQuery qo) {
        // 条件构造器
        LambdaQueryWrapper<Region> wrapper = new LambdaQueryWrapper<Region>()
                // like(condition, column, value)
                // 当 condition 成立时，才会将这个条件拼接在 sql 语句上
                .like(StringUtils.hasLength(qo.getKeyword()), Region::getName, qo.getKeyword());

        // 分页方法
        return super.page(new Page<>(qo.getCurrentPage(), qo.getPageSize()), wrapper);
    }

    @Override
    public List<Region> queryHotList() {
        // 需求：查询所有热门区域，并且按照 seq 进行升序排序
        return super.list(new LambdaQueryWrapper<Region>()
                .eq(Region::getIshot, Region.STATE_HOT) // 必须是热门区域才展示
                .orderByAsc(Region::getSeq) // 按照 seq 升序排列
        );
    }
}
