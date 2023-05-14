package cn.wolfcode.service;

import cn.wolfcode.domain.StrategyComment;
import cn.wolfcode.domain.UserInfo;
import cn.wolfcode.query.StrategyCommentQuery;
import org.springframework.data.domain.Page;

public interface IStrategyCommentService {

    Page<StrategyComment> page(StrategyCommentQuery query);

    void save(StrategyComment strategyComment, UserInfo userInfo);

    void updateById(StrategyComment strategyComment);

    void deleteById(String id);

    void thumb(String commentId, Long userId);
}
