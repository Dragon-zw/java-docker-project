package cn.wolfcode.vo;

import cn.wolfcode.dto.DestinationDTO;
import cn.wolfcode.dto.StrategyDTO;
import cn.wolfcode.dto.TravelDTO;
import cn.wolfcode.dto.UserInfoDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class SearchResult {

    private Long total = 0L;
    private List<DestinationDTO> dests = new ArrayList<>();
    private List<StrategyDTO> strategies = new ArrayList<>();
    private List<TravelDTO> travels = new ArrayList<>();
    private List<UserInfoDTO> users = new ArrayList<>();
}
