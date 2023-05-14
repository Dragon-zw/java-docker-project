package cn.wolfcode.service.impl;

import cn.wolfcode.config.SmsProperties;
import cn.wolfcode.key.KeyPrefix;
import cn.wolfcode.redis.key.UserRedisPrefix;
import cn.wolfcode.service.IRedisService;
import cn.wolfcode.service.ISmsService;
import cn.wolfcode.utils.AssertUtils;
import cn.wolfcode.utils.VerifyCodeUtils;
import com.alibaba.fastjson.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RefreshScope
@Service
public class SmsServiceImpl implements ISmsService {

    private static final Logger log = LoggerFactory.getLogger("SmsService");

    @Autowired
    private IRedisService<KeyPrefix, Object> redisService;
    @Autowired
    private SmsProperties smsProperties;
    @Autowired
    private RestTemplate restTemplate;

    @Override
    public void send(String phone, String type) {
        // 1. 生成验证码
        String code = VerifyCodeUtils.genCode(6);

        // 6d29002a45469b69ab830b8d1eb7fa74
        // 发送 http 请求
        // https://way.jd.com/chuangxin/dxjk?mobile=13568813957&content=【创信】你的验证码是：5873，3分钟内有效！&appkey=您申请的APPKEY
        // mobile=13568813957&content=【创信】你的验证码是：5873，3分钟内有效！&appkey=您申请的APPKEY

        Map<String, String> typeMsg = smsProperties.getTypeMsg();
        AssertUtils.notNull(typeMsg, "短信配置错误");

        String content = typeMsg.get(type);
        AssertUtils.notEmpty(content, "发送短信类型错误");

        content = smsProperties.getSign() + String.format(content, code);
        System.out.println(content);

        String url = String.format(smsProperties.getUrl(), phone, content);
        log.info("[短信服务] 准备发送短信 url: {}", url);

        JSONObject response = restTemplate.getForObject(url, JSONObject.class);
        log.info("[短信服务] 发送短信，收到响应结果：{}", response);
        String resCode = response.getString("code");
        // 短信发送失败
        AssertUtils.isTrue("10000".equals(resCode), "短信发送失败");

        JSONObject result = response.getJSONObject("result");
        AssertUtils.isTrue("Success".equals(result.getString("ReturnStatus")), "短信发送失败");

        // 2. 将验证码存入 redis, 设置过期时间为 30 分钟
        // key = sms:REGISTER:send:13012341234
        // 前缀: UserRedisPrefix.SMS_REGISTER 包含了 sms:REGISTER + 过期时间, 过期单位
        redisService.set(UserRedisPrefix.SMS_REGISTER, code, "send", phone);

        // 3. 获取验证码内容, 拼接验证码
        /*Map<String, String> typeMsg = smsProperties.getTypeMsg();
        AssertUtils.notNull(typeMsg, "短信配置错误");

        String content = typeMsg.get(type);
        AssertUtils.notEmpty(content, "发送短信类型错误");
        content = String.format(content, code); // 将 content 字符串中第一个 %s 替换为 code 的值

        // 4. 调用第三方平台发送验证码
        System.out.println(content);*/

    }

    public static void main(String[] args) {
        String str = "测试代码: %s";
        String code = "123456";

        String hashpw = BCrypt.hashpw("111111", BCrypt.gensalt());
        System.out.println(hashpw);
    }
}
