package cn.wolfcode.service;

import cn.wolfcode.domain.StrategyTheme;
import cn.wolfcode.query.BaseQuery;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

public interface IStrategyThemeService extends IService<StrategyTheme> {

    Page<StrategyTheme> queryPage(BaseQuery qo);
}
