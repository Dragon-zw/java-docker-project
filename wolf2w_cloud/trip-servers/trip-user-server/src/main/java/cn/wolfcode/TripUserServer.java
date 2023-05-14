package cn.wolfcode;

import cn.wolfcode.config.SmsProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(SmsProperties.class) // 启用属性自动映射
public class TripUserServer {

    public static void main(String[] args) {
        SpringApplication.run(TripUserServer.class, args);
    }
}
