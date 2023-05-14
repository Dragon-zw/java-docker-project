package cn.wolfcode.service;

import cn.wolfcode.domain.StrategyCatalog;
import cn.wolfcode.query.BaseQuery;
import cn.wolfcode.vo.CatalogGroupVO;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

public interface IStrategyCatalogService extends IService<StrategyCatalog> {

    Page<StrategyCatalog> queryPage(BaseQuery qo);

    List<CatalogGroupVO> groupList();

    List<StrategyCatalog> queryCatalogsByDestId(Long destId);
}
