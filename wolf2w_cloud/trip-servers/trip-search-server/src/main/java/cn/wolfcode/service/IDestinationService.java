package cn.wolfcode.service;

import cn.wolfcode.domain.DestinationEs;

import java.util.List;

public interface IDestinationService {

    void save(DestinationEs entity);

    void saveAll(List<DestinationEs> entities);

    void initData();
}
