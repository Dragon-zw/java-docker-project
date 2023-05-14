package cn.wolfcode.service.impl;

import cn.wolfcode.domain.TravelEs;
import cn.wolfcode.dto.TravelDTO;
import cn.wolfcode.feign.TravelServerFeignApi;
import cn.wolfcode.repository.TravelRepository;
import cn.wolfcode.service.ITravelService;
import cn.wolfcode.vo.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TravelServiceImpl implements ITravelService {

    @Autowired
    private TravelRepository repository;
    @Autowired
    private TravelServerFeignApi travelServerFeignApi;

    @Override
    public void save(TravelEs entity) {
        repository.save(entity);
    }

    @Override
    public void saveAll(List<TravelEs> entities) {
        repository.saveAll(entities);
    }

    @Override
    public void initData() {
        // 1. 远程调用目的地服务接口, 获取对应的数据
        int current = 1;
        List<TravelDTO> list = null;
        do {
            list = travelServerFeignApi.listTravelLimit(current, 100);

            // 保存这一次拿到的数据
            if (list != null && list.size() > 0) {
                // 3. 将获取到的数据转换为 ES 模型对象集合
                List<TravelEs> esList = list.stream().map(this::trasfer).collect(Collectors.toList());
                // 4. 批量保存数据
                this.saveAll(esList);

                // 当前页 +1
                current++;
            }
        } while (list != null && list.size() > 0);
        // 2. 判断是否有数据, 如果有则循环处理, 否则直接结束
    }

    private TravelEs trasfer(TravelDTO dto) {
        TravelEs es = new TravelEs();
        es.setId(dto.getId());
        es.setSummary(dto.getSummary());
        es.setTitle(dto.getTitle());
        return es;
    }
}
