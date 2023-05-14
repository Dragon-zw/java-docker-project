package cn.wolfcode.service;

import cn.wolfcode.domain.Strategy;
import cn.wolfcode.domain.StrategyRank;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;
import java.util.function.Function;

public interface IStrategyRankService extends IService<StrategyRank> {

    void deleteByType(int typeAbroad);

    /**
     * 按照类型新增攻略排行统计数据
     */
    void insertRanks(int type, List<Strategy> strategies);

    void insertRanks(int type, List<Strategy> strategies, Function<Strategy, Long> statnumFun);

    /**
     * 基于类型查询排行榜
     */
    List<StrategyRank> queryByType(int type);
}
