package cn.wolfcode.redis.key;

import cn.wolfcode.constants.SmsConstants;
import cn.wolfcode.key.BaseRedisPrefix;

import java.util.concurrent.TimeUnit;

public class UserRedisPrefix extends BaseRedisPrefix {

    // 用户注册发短信 redis key
    public static final UserRedisPrefix SMS_REGISTER = new UserRedisPrefix("sms:" + SmsConstants.SMS_TYPE_REGISTER, 30L, TimeUnit.MINUTES);

    // 用户登录信息 key
    public static final UserRedisPrefix USER_LOGIN_INFO = new UserRedisPrefix("users:login", 30L, TimeUnit.MINUTES);

    public UserRedisPrefix(String prefix) {
        this(prefix, -1L, TimeUnit.SECONDS);
    }

    public UserRedisPrefix(String prefix, long expireTime, TimeUnit unit) {
        super(prefix, expireTime, unit);
    }
}
