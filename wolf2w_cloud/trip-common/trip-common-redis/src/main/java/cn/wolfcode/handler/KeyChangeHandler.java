package cn.wolfcode.handler;

/**
 * Redis key 改变的处理器
 */
@FunctionalInterface
public interface KeyChangeHandler {

    /**
     * key 变动的处理方法
     *
     * @param key       变动的 key
     * @param arguments 操作的参数
     */
    void handle(String key, Object... arguments);
}
