package cn.wolfcode.service;

import cn.wolfcode.domain.StrategyCondition;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;
import java.util.Map;

public interface IStrategyConditionService extends IService<StrategyCondition> {

    void deleteByType(int type);

    /**
     * 按照类型新增攻略排行统计数据
     */
    void insertConditions(int type, List<Map<String, Object>> conditions);

    /**
     * 基于类型查询排行榜
     */
    List<StrategyCondition> queryByType(int type);
}
