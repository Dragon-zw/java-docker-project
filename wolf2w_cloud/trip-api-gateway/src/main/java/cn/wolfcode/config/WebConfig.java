package cn.wolfcode.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.util.pattern.PathPatternParser;

@Configuration
@EnableConfigurationProperties(AuthProperties.class)
public class WebConfig {

    // Zull => Spring MVC
    // Gateway => WebFlux
    // 跨域访问
    @Bean
    public CorsWebFilter corsConfigurer() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedMethod("*"); // 允许所有请求方法, 如 POST | GET
        config.addAllowedHeader("*"); // 允许携带所有请求头
        config.addAllowedOrigin("*"); // 允许任意来源, 如果需要指定只允许哪个就写上哪个服务器的域名|ip
        config.setAllowCredentials(true); // 允许携带 cookie

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource(new PathPatternParser());
        source.registerCorsConfiguration("/**", config); // 匹配哪些路径应用该规则

        return new CorsWebFilter(source); // 创建跨域过滤器
    }
}
