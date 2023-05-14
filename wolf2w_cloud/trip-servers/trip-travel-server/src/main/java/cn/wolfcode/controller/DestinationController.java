package cn.wolfcode.controller;

import cn.wolfcode.domain.Destination;
import cn.wolfcode.domain.StrategyCatalog;
import cn.wolfcode.query.DestinationQuery;
import cn.wolfcode.service.IDestinationService;
import cn.wolfcode.service.IStrategyCatalogService;
import cn.wolfcode.vo.R;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/destinations")
public class DestinationController {

    @Autowired
    private IDestinationService destinationService;
    @Autowired
    private IStrategyCatalogService strategyCatalogService;

    @GetMapping
    public R<?> list() {
        return R.ok(destinationService.list());
    }

    @GetMapping("/query")
    public R<?> query(DestinationQuery qo) {
        Page<Destination> page = destinationService.queryPage(qo);
        return R.ok(page);
    }

    @GetMapping("/list/{page}/{limit}")
    public List<Destination> listLimit(@PathVariable Integer page, @PathVariable Integer limit) {
        int start = (page - 1) * limit;
        return destinationService.list(new LambdaQueryWrapper<Destination>().last("limit " + start + ", " + limit));
    }

    @GetMapping("/getByName")
    public Destination getByName(String name) {
        return destinationService.findByName(name);
    }

    @GetMapping("/detail")
    public R<Destination> getById(Long id) {
        return R.ok(destinationService.getById(id));
    }

    @GetMapping("/toasts")
    public R<?> queryToasts(Long destId) {
        List<Destination> list = destinationService.queryToasts(destId);
        return R.ok(list);
    }

    @GetMapping("/catalogs")
    public R<?> catalogs(Long destId) {
        List<StrategyCatalog> list = strategyCatalogService.queryCatalogsByDestId(destId);
        return R.ok(list);
    }
}
