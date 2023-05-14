package cn.wolfcode.service;

import cn.wolfcode.utils.TokenService;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Service;

@Service
public class GatewayTokenService extends TokenService {

    @Override
    protected String getToken(Object request) {
        // 判断请求类型必须 ServerHttpRequest 类型
        if (!(request instanceof ServerHttpRequest)) {
            return null;
        }

        // 从请求头中获取 token
        return ((ServerHttpRequest) request).getHeaders().getFirst(super.header);
    }
}
