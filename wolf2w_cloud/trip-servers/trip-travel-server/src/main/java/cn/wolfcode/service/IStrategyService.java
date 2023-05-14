package cn.wolfcode.service;

import cn.wolfcode.domain.Strategy;
import cn.wolfcode.domain.StrategyContent;
import cn.wolfcode.query.StrategyQuery;
import cn.wolfcode.vo.R;
import cn.wolfcode.vo.ArticleStatVo;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

public interface IStrategyService extends IService<Strategy> {

    Page<Strategy> queryPage(StrategyQuery qo);

    StrategyContent getContent(Long id);

    List<Strategy> viewnnumTop3(Long destId);

    ArticleStatVo viewnumIncr(Long sid);

    Boolean isFavor(Long strategyId, Long userId);

    R<ArticleStatVo> favornumIncr(Long strategyId, Long userId);

    R<ArticleStatVo> thumbnumIncr(Long strategyId, Long userId);

    List<Strategy> findByDestId(Long destId);
}
