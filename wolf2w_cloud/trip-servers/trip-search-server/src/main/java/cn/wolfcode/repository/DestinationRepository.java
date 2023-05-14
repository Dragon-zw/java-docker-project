package cn.wolfcode.repository;

import cn.wolfcode.domain.DestinationEs;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface DestinationRepository extends ElasticsearchRepository<DestinationEs, Long> {
}
