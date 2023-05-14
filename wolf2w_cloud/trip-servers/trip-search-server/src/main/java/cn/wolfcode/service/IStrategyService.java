package cn.wolfcode.service;

import cn.wolfcode.domain.StrategyEs;

import java.util.List;

public interface IStrategyService {

    void save(StrategyEs entity);

    void saveAll(List<StrategyEs> entities);

    void initData();
}
