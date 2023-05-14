package cn.wolfcode.redis.key;

import cn.wolfcode.key.BaseRedisPrefix;

public class SearchRedisPrefix extends BaseRedisPrefix {

    /**
     * ES 数据初始化前缀
     */
    public static final SearchRedisPrefix ES_INDEX_DATA_INIT_STR = new SearchRedisPrefix("es:index:data:init:string");

    protected SearchRedisPrefix(String prefix) {
        super(prefix);
    }
}
