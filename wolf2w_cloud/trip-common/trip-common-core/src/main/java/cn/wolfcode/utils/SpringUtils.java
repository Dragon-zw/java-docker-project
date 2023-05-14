package cn.wolfcode.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

/**
 * 工具类交给 Spring 容器管理
 * 当 Spring 创建该工具对象时，如果发现该对象实现了 ApplicationContextAware 接口
 * 会在改对象被容器创建后，自动调用该对象的 setApplicationContext 方法
 */
@Slf4j
@Component
public class SpringUtils implements ApplicationContextAware {

    /**
     * Spring 的容器对象
     */
    private static ApplicationContext ctx;

    /**
     * 从 Spring 容器中获取指定名称以及类型的对象
     *
     * @param beanName 对象在 Spring 容器中的名字
     * @param clazz    对象的类型
     */
    public static <T> T getBean(String beanName, Class<T> clazz) {
        return ctx.getBean(beanName, clazz);
    }

    /**
     * 从 Spring 容器中获取指定名称以及类型的对象
     *
     * @param clazz    对象的类型
     */
    public static <T> T getBean(Class<T> clazz) {
        return ctx.getBean(clazz);
    }

    /**
     * 从 Spring 容器中获取指定名称以及类型的对象
     *
     * @param beanName 对象在 Spring 容器中的名字
     */
    public static <T> T getBean(String beanName) {
        return (T) ctx.getBean(beanName);
    }

    @Override
    public void setApplicationContext(ApplicationContext ctx) throws BeansException {
        log.info("[Spring 工具] Spring 容器启动完成，保存容器对象成功----------------------");
        SpringUtils.ctx = ctx; // 将 Spring 给我们的容器对象保存到当前类的静态成员中
    }
}
