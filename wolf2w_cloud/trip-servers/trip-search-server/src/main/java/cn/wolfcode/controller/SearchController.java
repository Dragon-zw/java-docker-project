package cn.wolfcode.controller;

import cn.wolfcode.domain.DestinationEs;
import cn.wolfcode.domain.StrategyEs;
import cn.wolfcode.domain.TravelEs;
import cn.wolfcode.domain.UserInfoEs;
import cn.wolfcode.dto.DestinationDTO;
import cn.wolfcode.dto.StrategyDTO;
import cn.wolfcode.dto.TravelDTO;
import cn.wolfcode.dto.UserInfoDTO;
import cn.wolfcode.feign.TravelServerFeignApi;
import cn.wolfcode.feign.UserServerFeignApi;
import cn.wolfcode.qo.SearchQuery;
import cn.wolfcode.service.ISearchService;
import cn.wolfcode.vo.R;
import cn.wolfcode.vo.SearchResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;

@RestController
@RequestMapping("/q")
public class SearchController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(SearchController.class);

    @Autowired
    private TravelServerFeignApi travelServerFeignApi;
    @Autowired
    private ISearchService searchService;
    @Autowired
    private UserServerFeignApi userServerFeignApi;

    @GetMapping
    public R<?> search(SearchQuery qo) throws UnsupportedEncodingException {
        // URL 解码
        if (StringUtils.hasLength(qo.getKeyword())) {
            qo.setKeyword(URLDecoder.decode(qo.getKeyword(), "UTF-8"));
        }
        // 类型分发操作
        switch (qo.getType()) {
            case SearchQuery.SEARCH_TYPE_DEST:
                return this.searchForDest(qo);
            case SearchQuery.SEARCH_TYPE_STRATEGY:
                return this.searchForStrategy(qo);
            case SearchQuery.SEARCH_TYPE_TRAVEL:
                return this.searchForTravel(qo);
            case SearchQuery.SEARCH_TYPE_USER:
                return this.searchForUser(qo);
            default:
                return this.searchForAll(qo);
        }
    }

    private R<?> searchForDest(SearchQuery qo) {
        log.info("[搜索服务] 目的地信息搜索: {}", qo);

        // 1. 基于目的地名称查询目的地, 判断是否有目的地
        DestinationDTO dest = travelServerFeignApi.getDestByName(qo.getKeyword());

        // 从响应结果中获取数据
        if (dest == null) {
            // 2. 如果没有, 直接返回空的 result 对象和 qo 对象即可
            return R.ok(R.map().put("result", new SearchResult()).put("qo", qo));
        }

        SearchResult result = new SearchResult();

        // 3. 如果有, 基于目的地 id/名字 分别查询攻略/游记/用户 => Feign 远程调用
        // 查询攻略
        List<StrategyDTO> strategies = travelServerFeignApi.findStrategyByDestId(dest.getId());
        result.setTotal((long) strategies.size());
        if (strategies.size() > 5) {
            strategies = strategies.subList(0, 5);
        }

        // 查询游记
        List<TravelDTO> travelDTOS = travelServerFeignApi.findTravelByDestId(dest.getId());
        result.setTotal(result.getTotal() + travelDTOS.size());
        if (travelDTOS.size() > 5) {
            travelDTOS = travelDTOS.subList(0, 5);
        }

        // 查询用户
        List<UserInfoDTO> userInfoDTOS = userServerFeignApi.findByDestName(dest.getName());
        result.setTotal(result.getTotal() + userInfoDTOS.size());
        if (userInfoDTOS.size() > 5) {
            userInfoDTOS = userInfoDTOS.subList(0, 5);
        }

        // 封装结果
        result.setStrategies(strategies);
        result.setTravels(travelDTOS);
        result.setUsers(userInfoDTOS);

        // {"code": 200, "msg": "xxx", "data": {"dest": null, "result": null, "qo": null}}
        return R.ok(R.map()
                .put("dest", dest)
                .put("result", result)
                .put("qo", qo)
        );
    }

    private R<?> searchForStrategy(SearchQuery qo) {
        log.info("[搜索服务] 攻略信息搜索: {}", qo);

        // 1. 高亮搜索 => 通用的方法
        Page<StrategyDTO> page = getStrategyDTOS(qo);

        // 2. 封装页面需要的数据
        return R.ok(
                R.map().put("page", page).put("qo", qo)
        );
    }

    private Page<StrategyDTO> getStrategyDTOS(SearchQuery qo) {
        return searchService.searchWithHighlight(StrategyEs.class, StrategyDTO.class, qo,
                (clz, id) -> travelServerFeignApi.findStrategyById(id).data(clz), "title", "subTitle", "summary");
    }

    private R<?> searchForTravel(SearchQuery qo) {
        log.info("[搜索服务] 游记信息搜索: {}", qo);
        // 1. 高亮搜索 => 通用的方法
        Page<TravelDTO> page = getTravelDTOS(qo);

        // 2. 封装页面需要的数据
        return R.ok(
                R.map().put("page", page).put("qo", qo)
        );
    }

    private Page<TravelDTO> getTravelDTOS(SearchQuery qo) {
        return searchService.searchWithHighlight(TravelEs.class, TravelDTO.class, qo,
                (clz, id) -> travelServerFeignApi.findTravelById(id).data(clz), "title", "summary");
    }

    private R<?> searchForUser(SearchQuery qo) {
        log.info("[搜索服务] 用户信息搜索: {}", qo);
        // 1. 高亮搜索 => 通用的方法
        Page<UserInfoDTO> page = getUserInfoDTOS(qo);

        // 2. 封装页面需要的数据
        return R.ok(
                R.map().put("page", page).put("qo", qo)
        );
    }

    private Page<UserInfoDTO> getUserInfoDTOS(SearchQuery qo) {
        return searchService.searchWithHighlight(UserInfoEs.class, UserInfoDTO.class, qo,
                (clz, id) -> userServerFeignApi.findById(id).data(clz), "info", "city");
    }

    private R<?> searchForAll(SearchQuery qo) {
        log.info("[搜索服务] 全文搜索: {}", qo);

        // 1. 通过高亮搜索得到各大模块的数据
        // 目的地
        Page<DestinationDTO> destinationDTOPage = searchService.searchWithHighlight(DestinationEs.class, DestinationDTO.class, qo,
                (clz, id) -> travelServerFeignApi.findDestById(id).data(clz), "info", "name");
        // 攻略
        Page<StrategyDTO> strategyDTOPage = getStrategyDTOS(qo);
        // 游记
        Page<TravelDTO> travelDTOPage = getTravelDTOS(qo);
        // 用户
        Page<UserInfoDTO> userInfoDTOPage = getUserInfoDTOS(qo);

        // 2. 封装数据到 SearchResult 中
        SearchResult result = new SearchResult();
        result.setDests(destinationDTOPage.getContent());
        result.setStrategies(strategyDTOPage.getContent());
        result.setUsers(userInfoDTOPage.getContent());
        result.setTravels(travelDTOPage.getContent());

        // 设置总数
        result.setTotal(destinationDTOPage.getTotalElements() + strategyDTOPage.getTotalElements()
                + travelDTOPage.getTotalElements() + userInfoDTOPage.getTotalElements());

        // 3. 封装响应结果
        return R.ok(
                R.map().put("result", result).put("qo", qo)
        );
    }
}
