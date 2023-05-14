package cn.wolfcode.service.impl;

import cn.wolfcode.domain.UserInfoEs;
import cn.wolfcode.domain.UserInfoEs;
import cn.wolfcode.dto.UserInfoDTO;
import cn.wolfcode.dto.UserInfoDTO;
import cn.wolfcode.feign.UserServerFeignApi;
import cn.wolfcode.repository.UserInfoRepository;
import cn.wolfcode.service.IUserInfoService;
import cn.wolfcode.vo.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserInfoServiceImpl implements IUserInfoService {

    @Autowired
    private UserInfoRepository repository;
    @Autowired
    private UserServerFeignApi userServerFeignApi;

    @Override
    public void save(UserInfoEs entity) {
        repository.save(entity);
    }

    @Override
    public void saveAll(List<UserInfoEs> entities) {
        repository.saveAll(entities);
    }

    @Override
    public void initData() {
        // 1. 远程调用目的地服务接口, 获取对应的数据
        int current = 1;
        List<UserInfoDTO> list = null;
        do {
            list = userServerFeignApi.listUserLimit(current, 100);

            // 保存这一次拿到的数据
            if (list != null && list.size() > 0) {
                // 3. 将获取到的数据转换为 ES 模型对象集合
                List<UserInfoEs> esList = list.stream().map(this::trasfer).collect(Collectors.toList());
                // 4. 批量保存数据
                this.saveAll(esList);

                // 当前页 +1
                current++;
            }
        } while (list != null && list.size() > 0);
        // 2. 判断是否有数据, 如果有则循环处理, 否则直接结束
    }

    private UserInfoEs trasfer(UserInfoDTO dto) {
        UserInfoEs es = new UserInfoEs();
        es.setId(dto.getId());
        es.setInfo(dto.getInfo());
        es.setCity(dto.getCity());
        return es;
    }
}
