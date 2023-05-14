package cn.wolfcode.controller;

import cn.wolfcode.key.KeyPrefix;
import cn.wolfcode.redis.key.SearchRedisPrefix;
import cn.wolfcode.service.*;
import cn.wolfcode.vo.R;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/es/index/init")
public class EsIndexInitController {

    public static final Logger log = LoggerFactory.getLogger(EsIndexInitController.class);

    @Autowired
    private IRedisService<KeyPrefix, Object> redisService;
    @Autowired
    private IDestinationService destinationService;
    @Autowired
    private IStrategyService strategyService;
    @Autowired
    private ITravelService travelService;
    @Autowired
    private IUserInfoService userInfoService;

    @GetMapping
    public R<?> init() {
        String msg = "已经初始化过, 请不要重复初始化";
        // 1. 检查是否已经初始化过
        Boolean ret = redisService.setnx(SearchRedisPrefix.ES_INDEX_DATA_INIT_STR, 1);
        log.info("[ES 数据初始化] 准备开始进行 ES 数据初始化, 判断之前是否已经初始化:{}.........", ret);
        if (ret) {
            msg = "初始化成功";
            try {
                log.info("[ES 数据初始化] ES 数据初始化开始.........");
                // 2. 初始化目的地数据
                destinationService.initData();
                // 3. 初始化攻略数据
                strategyService.initData();
                // 4. 初始化游记数据
                travelService.initData();
                // 5. 初始化用户数据
                userInfoService.initData();
                log.info("[ES 数据初始化] ES 数据初始化结束.........");
            } catch (Exception e) {
                log.error("[ES 数据初始化] ES 数据初始化出现异常", e);
                // 6. 如果初始化失败, 将已经初始化的标记清空
                redisService.del(SearchRedisPrefix.ES_INDEX_DATA_INIT_STR);
            }
        }
        return R.ok(msg);
    }
}
