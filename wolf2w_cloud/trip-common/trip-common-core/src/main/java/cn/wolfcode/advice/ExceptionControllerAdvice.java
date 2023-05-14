package cn.wolfcode.advice;

import cn.wolfcode.constants.HttpStatus;
import cn.wolfcode.exception.Wolf2wException;
import cn.wolfcode.vo.R;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.MethodParameter;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.HandlerMethod;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.Set;

/**
 * 异常处理器
 */
@Slf4j
public class ExceptionControllerAdvice {

    /**
     * 捕获 Controller 中抛出的所有异常, 由该方法进行返回结果
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<R<?>> commonExceptionHandler(RuntimeException ex, HandlerMethod hm) {
        log.error("[统一异常处理] 出现系统异常", ex);

        R<Object> err = R.err(HttpStatus.SERVER_ERROR, ex.getMessage());

        return returnHandler(err, hm);
    }

    private ResponseEntity<R<?>> returnHandler(R<Object> err, HandlerMethod hm) {
        // 得到当前方法的返回类型
        Class<?> returnType = hm.getMethod().getReturnType();
        if (returnType == R.class) {
            // 前端调用返回统一响应对象
            return ResponseEntity.ok(err);
        }

        // 对于 Feign 远程调用才会返回 null
        return ResponseEntity
                .status(org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR) // 设置 HTTP 响应状态码为 500
                .body(err); // 设置响应内容
    }

    @ExceptionHandler(Wolf2wException.class)
    public ResponseEntity<R<?>> commonExceptionHandler(Wolf2wException ex, HandlerMethod hm) {
        log.error("[统一异常处理] 服务内部异常", ex);


        return returnHandler(R.err(ex.getCode(), ex.getMessage()), hm);
    }

    @ExceptionHandler(BindException.class)
    public ResponseEntity<R<?>> validExceptionHandler(BindException ex, HandlerMethod hm) {
        log.debug("[统一异常处理] 捕获参数校验异常", ex);

        // 获取到所有错误中的第一个参数校验错误
        ObjectError error = ex.getAllErrors().get(0);
        R<Object> err = R.err(HttpStatus.BAD_REQUEST, error.getDefaultMessage());

        return returnHandler(err, hm);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<R<?>> validExceptionHandler(ConstraintViolationException ex, HandlerMethod hm) {
        log.debug("[统一异常处理] 捕获参数校验异常", ex);

        // 获取到所有错误中的第一个参数校验错误
        Set<ConstraintViolation<?>> violations = ex.getConstraintViolations();
        String msg = "参数错误";

        for (ConstraintViolation<?> violation : violations) {
            msg = violation.getMessage();
            break;
        }

        R<Object> err = R.err(HttpStatus.BAD_REQUEST, msg);

        return returnHandler(err, hm);
    }
}
