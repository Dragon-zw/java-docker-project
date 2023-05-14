package cn.wolfcode.task;

import cn.wolfcode.domain.Strategy;
import cn.wolfcode.domain.StrategyRank;
import cn.wolfcode.service.IStrategyRankService;
import cn.wolfcode.service.IStrategyService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * 定时统计攻略排行信息, 每小时执行一次
 */
@Component
public class StrategyRankTask {

    public static final Logger log = LoggerFactory.getLogger("StrategyRankTask");

    @Autowired
    private IStrategyRankService strategyRankService;
    @Autowired
    private IStrategyService strategyService;

    @Scheduled(cron = "0 0 0 * * ?") // 每小时执行一次
    public void statAbroadStrategyRanking() {
        log.info("[攻略排行数据统计] ---------------开始统计国外数据-----------------------");
        // 1. 统计国外的数据
        List<Strategy> strategies = strategyService.list(new QueryWrapper<Strategy>()
                .eq("isabroad", Strategy.ABROAD_YES)
                .orderByDesc("thumbsupnum+favornum") // 点赞数 + 收藏数
                .last("limit 10"));

        strategyRankService.insertRanks(StrategyRank.TYPE_ABROAD,
                strategies, s -> (long) (s.getThumbsupnum() + s.getFavornum()));
        log.info("[攻略排行数据统计] ---------------国外数据统计结束-----------------------");
    }

    @Scheduled(cron = "0 0 * * * ?") // 每小时执行一次
    public void statStrategyRanking() {
        log.info("[攻略排行数据统计] ---------------开始统计国内数据-----------------------");
        // 1. 统计国外的数据
        List<Strategy> strategies = strategyService.list(new QueryWrapper<Strategy>()
                .eq("isabroad", Strategy.ABROAD_NO)
                .orderByDesc("thumbsupnum+favornum") // 点赞数 + 收藏数
                .last("limit 10"));

        strategyRankService.insertRanks(StrategyRank.TYPE_CHINA,
                strategies, s -> (long) (s.getThumbsupnum() + s.getFavornum()));
        log.info("[攻略排行数据统计] ---------------国内数据统计结束-----------------------");
    }

    @Scheduled(cron = "0 0 * * * ?") // 每小时执行一次
    public void statHotStrategyRanking() {
        log.info("[攻略排行数据统计] ---------------开始统计热门数据-----------------------");
        // 1. 统计国外的数据
        List<Strategy> strategies = strategyService.list(new QueryWrapper<Strategy>()
                .orderByDesc("viewnum+replynum") // 浏览数 + 评论数
                .last("limit 10"));

        strategyRankService.insertRanks(StrategyRank.TYPE_HOT,
                strategies, s -> (long) (s.getViewnum() + s.getReplynum()));
        log.info("[攻略排行数据统计] ---------------热门数据统计结束-----------------------");
    }
}
