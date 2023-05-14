package cn.wolfcode.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@MapperScan("cn.wolfcode.mapper")
@Configuration
public class MyBatisPlusConfig {
}
