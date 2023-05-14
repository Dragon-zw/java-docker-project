package cn.wolfcode.service.impl;

import cn.wolfcode.utils.TokenService;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public class UserTokenService extends TokenService {

    @Override
    protected String getToken(Object request) {
        if (request instanceof HttpServletRequest) {
            return ((HttpServletRequest) request).getHeader(super.header);
        }
        return null;
    }
}
