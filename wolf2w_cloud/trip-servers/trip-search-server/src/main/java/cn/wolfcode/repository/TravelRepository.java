package cn.wolfcode.repository;

import cn.wolfcode.domain.TravelEs;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface TravelRepository extends ElasticsearchRepository<TravelEs, Long> {
}
