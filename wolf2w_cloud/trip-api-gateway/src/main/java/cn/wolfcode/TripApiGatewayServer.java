package cn.wolfcode;

import cn.wolfcode.config.SwaggerConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;

@SpringBootApplication
@EnableDiscoveryClient
@ComponentScan(
        /* 配置排除过滤器, 如果满足过滤器的规则, 指定 Bean 对象就不会被扫描 */
        excludeFilters = {
                @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, value = SwaggerConfig.class)
        }
)
public class TripApiGatewayServer {
    public static void main(String[] args) {
        SpringApplication.run(TripApiGatewayServer.class, args);
    }
}
