package cn.wolfcode.service;

import cn.wolfcode.domain.Region;
import cn.wolfcode.query.BaseQuery;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

public interface IRegionService extends IService<Region> {

    Page<Region> queryPage(BaseQuery qo);

    List<Region> queryHotList();
}
