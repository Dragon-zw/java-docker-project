package cn.wolfcode.service;

import cn.wolfcode.domain.UserInfoEs;

import java.util.List;

public interface IUserInfoService {

    void save(UserInfoEs entity);

    void saveAll(List<UserInfoEs> entities);

    void initData();
}
