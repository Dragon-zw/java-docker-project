package cn.wolfcode.exception;

import cn.wolfcode.constants.HttpStatus;
import lombok.Getter;
import lombok.Setter;

/**
 * 业务异常
 */
@Getter
@Setter
public class ServiceException extends Wolf2wException {

    public ServiceException(String message) {
        super(HttpStatus.BUSINESS_EXCEPTION, message);
    }

    public ServiceException(Integer code, String message) {
        super(code, message);
    }
}
