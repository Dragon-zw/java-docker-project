package cn.wolfcode.service.impl;

import cn.wolfcode.domain.DestinationEs;
import cn.wolfcode.dto.DestinationDTO;
import cn.wolfcode.feign.TravelServerFeignApi;
import cn.wolfcode.repository.DestinationRepository;
import cn.wolfcode.service.IDestinationService;
import cn.wolfcode.vo.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DestinationServiceImpl implements IDestinationService {

    @Autowired
    private DestinationRepository repository;
    @Autowired
    private TravelServerFeignApi travelServerFeignApi;

    @Override
    public void save(DestinationEs entity) {
        repository.save(entity);
    }

    @Override
    public void saveAll(List<DestinationEs> entities) {
        repository.saveAll(entities);
    }

    @Override
    public void initData() {
        // 1. 远程调用目的地服务接口, 获取对应的数据
        int current = 1;
        List<DestinationDTO> list = null;
        do {
            list = travelServerFeignApi.listDestLimit(current, 100);

            // 保存这一次拿到的数据
            if (list != null && list.size() > 0) {
                // 3. 将获取到的数据转换为 ES 模型对象集合
                List<DestinationEs> esList = list.stream().map(this::trasfer).collect(Collectors.toList());
                // 4. 批量保存数据
                this.saveAll(esList);

                // 当前页 +1
                current++;
            }
        } while (list != null && list.size() > 0);
        // 2. 判断是否有数据, 如果有则循环处理, 否则直接结束
    }

    private DestinationEs trasfer(DestinationDTO dto) {
        DestinationEs es = new DestinationEs();
        es.setId(dto.getId());
        es.setName(dto.getName());
        es.setInfo(dto.getInfo());
        return es;
    }
}
