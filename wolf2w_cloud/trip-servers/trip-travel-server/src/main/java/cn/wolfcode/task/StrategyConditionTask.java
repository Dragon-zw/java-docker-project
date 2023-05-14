package cn.wolfcode.task;

import cn.wolfcode.domain.Strategy;
import cn.wolfcode.domain.StrategyCondition;
import cn.wolfcode.service.IStrategyConditionService;
import cn.wolfcode.service.IStrategyService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * 定时统计攻略条件, 每半小时执行一次
 */
@Component
public class StrategyConditionTask {

    public static final Logger log = LoggerFactory.getLogger("StrategyConditionTask");

    @Autowired
    private IStrategyConditionService strategyConditionService;
    @Autowired
    private IStrategyService strategyService;

    @Scheduled(cron = "0 0/30 * * * ?") // 每半小时执行一次
    public void statAbroadStrategyRanking() {
        log.info("[攻略条件数据统计] ---------------开始统计国外数据-----------------------");
        // 1. 统计国外的数据
        List<Map<String, Object>> conditions = strategyService.listMaps(new QueryWrapper<Strategy>()
                .select("dest_id refid, dest_name name, count(*) count")
                .eq("isabroad", Strategy.ABROAD_YES)
                .groupBy("dest_id", "dest_name")
        );

        strategyConditionService.insertConditions(StrategyCondition.TYPE_ABROAD, conditions);
        log.info("[攻略条件数据统计] ---------------国外数据统计结束-----------------------");
    }

    @Scheduled(cron = "0 0/30 * * * ?") // 每半小时执行一次
    public void statStrategyRanking() {
        log.info("[攻略条件数据统计] ---------------开始统计国内数据-----------------------");
        // 1. 统计国外的数据
        List<Map<String, Object>> conditions = strategyService.listMaps(new QueryWrapper<Strategy>()
                .select("dest_id refid, dest_name name, count(*) count")
                .eq("isabroad", Strategy.ABROAD_NO)
                .groupBy("dest_id", "dest_name")
        );

        strategyConditionService.insertConditions(StrategyCondition.TYPE_CHINA, conditions);
        log.info("[攻略条件数据统计] ---------------国内数据统计结束-----------------------");
    }

    @Scheduled(cron = "0 0/30 * * * ?") // 每半小时执行一次
    public void statHotStrategyRanking() {
        log.info("[攻略条件数据统计] ---------------开始统计热门数据-----------------------");
        // 1. 统计国外的数据
        List<Map<String, Object>> conditions = strategyService.listMaps(new QueryWrapper<Strategy>()
                .select("theme_id refid, theme_name name, count(*) count")
                .groupBy("theme_id", "theme_name")
        );

        strategyConditionService.insertConditions(StrategyCondition.TYPE_THEME, conditions);
        log.info("[攻略条件数据统计] ---------------热门数据统计结束-----------------------");
    }
}
