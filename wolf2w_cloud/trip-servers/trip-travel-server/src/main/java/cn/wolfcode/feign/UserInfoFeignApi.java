package cn.wolfcode.feign;

import cn.wolfcode.domain.UserInfo;
import cn.wolfcode.vo.R;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@FeignClient("trip-user-server")
@RequestMapping("/users")
public interface UserInfoFeignApi {

    @GetMapping("/{id}")
    R<UserInfo> getById(@PathVariable Long id);
}
