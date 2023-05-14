package cn.wolfcode.repository;

import cn.wolfcode.domain.StrategyEs;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface StrategyRepository extends ElasticsearchRepository<StrategyEs, Long> {
}
