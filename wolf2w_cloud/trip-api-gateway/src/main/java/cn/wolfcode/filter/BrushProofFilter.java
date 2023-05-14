package cn.wolfcode.filter;

import cn.wolfcode.key.BaseRedisPrefix;
import cn.wolfcode.key.KeyPrefix;
import cn.wolfcode.service.IRedisService;
import cn.wolfcode.vo.R;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;

@Component
public class BrushProofFilter implements GlobalFilter {

    @Autowired
    private IRedisService<KeyPrefix, Object> redisService;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String url = exchange.getRequest().getURI().getPath();
        String ip = exchange.getRequest().getRemoteAddress().getAddress().toString();

        BaseRedisPrefix prefix = BaseRedisPrefix.BRUSH_PROOF;
        redisService.setnx(prefix, 10, url, ip);
        Long decrement = redisService.incr(prefix, -1, url, ip);

        if (decrement < 0) {
            try {
                HttpHeaders httpHeaders = exchange.getResponse().getHeaders();
                //返回数据格式
                httpHeaders.setContentType(MediaType.APPLICATION_JSON);

                String ret = new ObjectMapper().writeValueAsString(R.err(500, "请勿频繁访问"));
                byte[] bytes = ret.getBytes(StandardCharsets.UTF_8);

                DataBuffer buffer = exchange.getResponse().bufferFactory().wrap(bytes);
                return exchange.getResponse().writeWith(Mono.just(buffer));
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }
        return chain.filter(exchange);
    }
}
