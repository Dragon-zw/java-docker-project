package cn.wolfcode.exception;

import cn.wolfcode.vo.R;
import lombok.Getter;
import lombok.Setter;

/**
 * 服务端抛出的内部异常, 也是所有内部异常的基类
 */
@Getter
@Setter
public class Wolf2wException extends RuntimeException {

    private Integer code;

    public Wolf2wException(String message) {
        super(message);
        // 当创建该异常类型, 不指定 code 时, 那 code 为默认异常状态码
        this.code = R.DEFAULT_FAILED_CODE;
    }

    public Wolf2wException(Integer code, String message) {
        super(message);
        this.code = code;
    }
}
