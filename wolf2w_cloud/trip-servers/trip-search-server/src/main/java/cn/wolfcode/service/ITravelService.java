package cn.wolfcode.service;

import cn.wolfcode.domain.TravelEs;

import java.util.List;

public interface ITravelService {

    void save(TravelEs entity);

    void saveAll(List<TravelEs> entities);

    void initData();
}
