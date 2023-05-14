package cn.wolfcode.service.impl;

import cn.wolfcode.domain.StrategyCondition;
import cn.wolfcode.mapper.StrategyConditionMapper;
import cn.wolfcode.service.IStrategyConditionService;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class StrategyConditionServiceImpl extends ServiceImpl<StrategyConditionMapper, StrategyCondition> implements IStrategyConditionService {

    @Override
    public void deleteByType(int type) {
        super.remove(new LambdaQueryWrapper<StrategyCondition>().eq(StrategyCondition::getType, type));
    }

    @Override
    public void insertConditions(int type, List<Map<String, Object>> conditions) {
        // 1. 删除原来的数据
        this.deleteByType(type);

        // 2. 将查询到的 map 转换为条件对象
        List<StrategyCondition> conditionsList = new ArrayList<>();
        Date date = new Date();

        for (Map<String, Object> map : conditions) {
            StrategyCondition condition = new StrategyCondition();
            condition.setStatisTime(date);
            condition.setType(type);
            condition.setCount(Integer.valueOf(map.get("count") + ""));
            condition.setName((String) map.get("name"));
            condition.setRefid((Long) map.get("refid"));

            conditionsList.add(condition);
        }

        // 3. 批量保存
        super.saveBatch(conditionsList);
    }

    @Override
    public List<StrategyCondition> queryByType(int type) {
        return list(new LambdaQueryWrapper<StrategyCondition>().eq(StrategyCondition::getType, type));
    }
}
