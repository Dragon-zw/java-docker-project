package cn.wolfcode.repository;

import cn.wolfcode.domain.UserInfoEs;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface UserInfoRepository extends ElasticsearchRepository<UserInfoEs, Long> {
}
