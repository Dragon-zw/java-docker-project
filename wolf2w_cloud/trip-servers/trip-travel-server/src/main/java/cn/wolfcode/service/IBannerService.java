package cn.wolfcode.service;

import cn.wolfcode.domain.Banner;
import cn.wolfcode.query.BaseQuery;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

public interface IBannerService extends IService<Banner> {

    Page<Banner> queryPage(BaseQuery qo);

    List<Banner> listByType(int type, int num);
}
