package cn.wolfcode.repository;

import cn.wolfcode.domain.StrategyComment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StrategyCommentRepository extends MongoRepository<StrategyComment, String> {
}
