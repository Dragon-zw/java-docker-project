package cn.wolfcode.user.controller;

import cn.wolfcode.controller.BaseController;
import cn.wolfcode.user.domain.User;
import cn.wolfcode.utils.AssertUtils;
import cn.wolfcode.vo.R;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;

/**
 * 表示当前类中有需要做参数校验的操作
 */
@Validated
@RestController
@RequestMapping("/users")
public class UserController extends BaseController {

    @GetMapping("/test")
    public ResponseEntity<R<String>> test(@NotEmpty(message = "用户姓名不能为空") String name) {

        try {
            AssertUtils.isTrue("wolf".equals(name), "参数类型有误!!!");


        } catch (RuntimeException e) {
            return failed(HttpStatus.BAD_GATEWAY.value(), e.getMessage());
        }

        // ok: 将响应的内容响应给前端, 并且状态码为 200
        return success("参数校验测试");
    }

    @GetMapping("/test1")
    public R<String> test1(@Valid User user) {

        return R.ok("参数测试1");
    }
}
