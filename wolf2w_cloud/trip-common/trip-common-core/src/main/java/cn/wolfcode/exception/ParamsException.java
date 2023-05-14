package cn.wolfcode.exception;

import cn.wolfcode.constants.HttpStatus;

public class ParamsException extends Wolf2wException {

    public ParamsException(String message) {
        super(HttpStatus.BAD_REQUEST, message);
    }
}
