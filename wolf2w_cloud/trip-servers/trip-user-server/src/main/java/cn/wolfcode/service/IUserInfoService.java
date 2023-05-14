package cn.wolfcode.service;

import cn.wolfcode.domain.UserInfo;
import cn.wolfcode.dto.UserRegisterDTO;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;
import java.util.Map;

public interface IUserInfoService extends IService<UserInfo> {

    /**
     * 基于手机号查询用户对象
     *
     * @param phone 手机号
     * @return 用户对象
     */
    UserInfo getByPhone(String phone);

    /**
     * 用户注册功能
     *
     * @param registerDTO 前端传递的注册参数
     */
    void register(UserRegisterDTO registerDTO);

    /**
     * 登录接口
     *
     * @param username 用户名
     * @param password 密码
     * @return 登录成功的 token 与用户信息
     */
    Map<String, Object> login(String username, String password);

    List<UserInfo> findByDestName(String destName);
}
