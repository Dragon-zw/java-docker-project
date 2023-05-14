package cn.wolfcode.utils;

import cn.wolfcode.exception.ServiceException;
import org.springframework.util.StringUtils;

/**
 * 断言工具类
 */
public class AssertUtils {

    public static void isTrue(Boolean ret, String msg) {
        if (!ret) {
            throw new ServiceException(msg);
        }
    }

    public static void notNull(Object obj, String msg) {
        if (obj instanceof String) {
            // 如果 Obj 不为 null && obj 是字符串, 此时再判断 obj 是否为空字符串, 如果是空字符串也抛出异常
            notEmpty(obj.toString(), msg);
            return;
        }
        if (obj == null) {
            throw new ServiceException(msg);
        }
    }

    public static void notEmpty(String content, String msg) {
        if (StringUtils.isEmpty(content)) {
            throw new ServiceException(msg);
        }
    }

    public static void isNull(Object obj, String msg) {
        if (obj != null) {
            throw new ServiceException(msg);
        }
    }

    public static void isFalse(boolean ret, String msg) {
        if (ret) {
            throw new ServiceException(msg);
        }
    }
}
