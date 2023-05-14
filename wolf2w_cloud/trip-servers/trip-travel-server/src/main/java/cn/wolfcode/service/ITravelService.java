package cn.wolfcode.service;

import cn.wolfcode.domain.Travel;
import cn.wolfcode.domain.TravelContent;
import cn.wolfcode.query.TravelQuery;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

public interface ITravelService extends IService<Travel> {

    Page<Travel> queryPage(TravelQuery qo);

    TravelContent getContent(Long id);

    /**
     * 审核游记
     */
    void audit(Long id, Integer state);

    List<Travel> viewnnumTop3();

    List<Travel> findByDestId(Long destId);
}
