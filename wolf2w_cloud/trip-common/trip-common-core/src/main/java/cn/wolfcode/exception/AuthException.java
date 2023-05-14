package cn.wolfcode.exception;

import cn.wolfcode.constants.HttpStatus;
import lombok.Getter;
import lombok.Setter;

/**
 * 业务异常
 */
@Getter
@Setter
public class AuthException extends Wolf2wException {

    public AuthException(String message) {
        super(HttpStatus.UNAUTHORIZED, message);
    }
}
