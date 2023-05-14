package cn.wolfcode.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**
 * 用户服务通用配置
 */
@Configuration
public class UserConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
