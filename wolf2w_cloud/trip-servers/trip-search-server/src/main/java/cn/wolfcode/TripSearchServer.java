package cn.wolfcode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class TripSearchServer {

    public static void main(String[] args) {
        SpringApplication.run(TripSearchServer.class, args);
    }
}
