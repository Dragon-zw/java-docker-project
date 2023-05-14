package cn.wolfcode.service.impl;

import cn.wolfcode.domain.StrategyEs;
import cn.wolfcode.domain.StrategyEs;
import cn.wolfcode.domain.StrategyEs;
import cn.wolfcode.dto.StrategyDTO;
import cn.wolfcode.dto.StrategyDTO;
import cn.wolfcode.feign.TravelServerFeignApi;
import cn.wolfcode.repository.StrategyRepository;
import cn.wolfcode.service.IStrategyService;
import cn.wolfcode.vo.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StrategyServiceImpl implements IStrategyService {

    @Autowired
    private StrategyRepository repository;
    @Autowired
    private TravelServerFeignApi travelServerFeignApi;

    @Override
    public void save(StrategyEs entity) {
        repository.save(entity);
    }

    @Override
    public void saveAll(List<StrategyEs> entities) {
        repository.saveAll(entities);
    }

    @Override
    public void initData() {
        // 1. 远程调用目的地服务接口, 获取对应的数据
        int current = 1;
        List<StrategyDTO> list = null;
        do {
            list = travelServerFeignApi.listStrategyLimit(current, 100);

            // 保存这一次拿到的数据
            if (list != null && list.size() > 0) {
                // 3. 将获取到的数据转换为 ES 模型对象集合
                List<StrategyEs> esList = list.stream().map(this::trasfer).collect(Collectors.toList());
                // 4. 批量保存数据
                this.saveAll(esList);

                // 当前页 +1
                current++;
            }
        } while (list != null && list.size() > 0);
        // 2. 判断是否有数据, 如果有则循环处理, 否则直接结束
    }

    private StrategyEs trasfer(StrategyDTO dto) {
        StrategyEs es = new StrategyEs();
        es.setId(dto.getId());
        es.setSummary(dto.getSummary());
        es.setTitle(dto.getTitle());
        es.setSubTitle(dto.getSubTitle());
        return es;
    }
}
