package cn.wolfcode.controller;

import cn.wolfcode.domain.UserInfo;
import cn.wolfcode.dto.UserRegisterDTO;
import cn.wolfcode.service.IUserInfoService;
import cn.wolfcode.vo.R;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Map;

@Validated
@RestController
@RequestMapping("/users")
public class UserInfoController extends BaseController {

    @Autowired
    private IUserInfoService userInfoService;

    @GetMapping("/{id}")
    public R<UserInfo> getById(@PathVariable Long id) {
        return R.ok(userInfoService.getById(id));
    }

    @GetMapping("/list/{page}/{limit}")
    public List<UserInfo> listLimit(@PathVariable Integer page, @PathVariable Integer limit) {
        int start = (page - 1) * limit;
        return userInfoService.list(new LambdaQueryWrapper<UserInfo>().last("limit " + start + ", " + limit));
    }

    @GetMapping("/findByDest")
    public List<UserInfo> findByDest(String destName) {
        return userInfoService.findByDestName(destName);
    }

    @PostMapping("/login")
    public ResponseEntity<R<Map<String, Object>>> login(
            @NotEmpty(message = "用户名不能为空") String username,
            @NotEmpty(message = "密码不能为空") String password) {

        // service 登录操作
        Map<String, Object> result = userInfoService.login(username, password);

        return success(result);
    }

    @PostMapping("/phone/exists")
    public ResponseEntity<R<Boolean>> phoneExists(
            @NotNull(message = "手机号不能为空")
                    String phone) {

        UserInfo userInfo = userInfoService.getByPhone(phone);
        return success(userInfo != null);
    }

    @PostMapping("/register")
    public ResponseEntity<R<Object>> register(@Valid UserRegisterDTO registerDTO) {

        // 调用 service 进行注册
        userInfoService.register(registerDTO);
        return success();
    }
}
