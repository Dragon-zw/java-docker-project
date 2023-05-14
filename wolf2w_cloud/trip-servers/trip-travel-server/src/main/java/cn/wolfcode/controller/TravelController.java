package cn.wolfcode.controller;

import cn.wolfcode.domain.Travel;
import cn.wolfcode.query.TravelQuery;
import cn.wolfcode.service.ITravelService;
import cn.wolfcode.vo.R;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@Api(value = "这是旅游日记相关的 API 接口", tags = "旅游日记管理接口")
@RestController
@RequestMapping("/travels")
public class TravelController {

    @Autowired
    private ITravelService travelService;

    @ApiOperation(value = "游记分页查询")
    @GetMapping("/query")
    public R<?> query(TravelQuery qo) {
        Page<Travel> page = travelService.queryPage(qo);
        return R.ok(page);
    }

    @GetMapping("/list")
    public R<?> list() {
        return R.ok(travelService.list());
    }

    @ApiIgnore
    @GetMapping("/list/{page}/{limit}")
    public List<Travel> listLimit(@PathVariable Integer page, @PathVariable Integer limit) {
        int start = (page - 1) * limit;
        return travelService.list(new LambdaQueryWrapper<Travel>().last("limit " + start + ", " + limit));
    }

    @ApiIgnore
    @GetMapping("/findByDestId")
    public List<Travel> findByDestId(Long destId) {
        return travelService.findByDestId(destId);
    }

    @GetMapping("/detail")
    public R<?> detail(Long id) {
        return R.ok(travelService.getById(id));
    }

    @GetMapping("/content")
    public R<?> content(Long id) {
        return R.ok(travelService.getContent(id));
    }

    @GetMapping("/viewnnumTop3")
    public R<?> viewnnumTop3() {
        return R.ok(travelService.viewnnumTop3());
    }

    @ApiResponses({
            @ApiResponse(code = 200, message = "请求成功", response = Travel.class),
            @ApiResponse(code = 401, message = "用户未认证"),
            @ApiResponse(code = 403, message = "没有权限访问"),
            @ApiResponse(code = 400, message = "参数错误")
    })
    @ApiOperation("游记审核接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "游记 id"),
            @ApiImplicitParam(name = "state", value = "审核状态:0=草稿, 1=待发布, 2=审核通过, 3=拒绝")
    })
    @PostMapping("/audit")
    public R<?> audit(Long id, Integer state) {
        travelService.audit(id, state);
        return R.ok();
    }

    @PostMapping("/save")
    public R<?> save(Travel travel) {
        travelService.save(travel);
        return R.ok();
    }

    @PostMapping("/update")
    public R<?> update(Travel travel) {
        travelService.updateById(travel);
        return R.ok();
    }

    @PostMapping("/delete/{id}")
    public R<?> delete(@PathVariable Long id) {
        if (id != null) {
            travelService.removeById(id);
        }
        return R.ok();
    }

}
