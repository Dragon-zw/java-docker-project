package cn.wolfcode.feign;

import cn.wolfcode.dto.DestinationDTO;
import cn.wolfcode.dto.StrategyDTO;
import cn.wolfcode.dto.TravelDTO;
import cn.wolfcode.vo.R;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient("trip-travel-server")
public interface TravelServerFeignApi {

    @GetMapping("/destinations/getByName")
    DestinationDTO getDestByName(@RequestParam String name);

    @GetMapping("/destinations/list/{page}/{limit}")
    List<DestinationDTO> listDestLimit(@PathVariable int page, @PathVariable int limit);

    @GetMapping("/destinations/detail")
    R<DestinationDTO> findDestById(@RequestParam String id);

    @GetMapping("/strategies/findByDestId")
    List<StrategyDTO> findStrategyByDestId(@RequestParam Long destId);

    @GetMapping("/strategies/list/{page}/{limit}")
    List<StrategyDTO> listStrategyLimit(@PathVariable int page, @PathVariable int limit);

    @GetMapping("/strategies/detail")
    R<StrategyDTO> findStrategyById(@RequestParam String id);

    @GetMapping("/travels/findByDestId")
    List<TravelDTO> findTravelByDestId(@RequestParam Long destId);

    @GetMapping("/travels/list/{page}/{limit}")
    List<TravelDTO> listTravelLimit(@PathVariable int page, @PathVariable int limit);

    @GetMapping("/travels/detail")
    R<TravelDTO> findTravelById(@RequestParam String id);
}
