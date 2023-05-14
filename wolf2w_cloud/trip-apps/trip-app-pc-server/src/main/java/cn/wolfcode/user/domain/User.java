package cn.wolfcode.user.domain;

import cn.wolfcode.domain.BaseDomain;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;

public class User extends BaseDomain {

    @NotNull(message = "用户名不能为空")
    @Length(min = 4, max = 18, message = "用户名长度在4-18位之间")
    private String username;
    @NotNull(message = "密码不能为空")
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
