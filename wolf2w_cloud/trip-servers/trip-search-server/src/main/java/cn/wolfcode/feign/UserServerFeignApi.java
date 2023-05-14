package cn.wolfcode.feign;

import cn.wolfcode.dto.UserInfoDTO;
import cn.wolfcode.vo.R;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient("trip-user-server")
public interface UserServerFeignApi {

    @GetMapping("/users/findByDest")
    List<UserInfoDTO> findByDestName(@RequestParam String destName);

    @GetMapping("/users/list/{page}/{limit}")
    List<UserInfoDTO> listUserLimit(@PathVariable int page, @PathVariable int limit);

    @GetMapping("/users/{id}")
    R<UserInfoDTO> findById(@PathVariable String id);
}
