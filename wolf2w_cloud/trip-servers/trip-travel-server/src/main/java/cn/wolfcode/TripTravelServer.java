package cn.wolfcode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.scheduling.annotation.EnableScheduling;

/* 启用 Spring Task */
@EnableScheduling
/* 启用 feign 客户端 */
@EnableFeignClients
@SpringBootApplication
public class TripTravelServer {

    public static void main(String[] args) {
        SpringApplication.run(TripTravelServer.class, args);
    }
}
