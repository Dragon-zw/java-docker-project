package cn.wolfcode.vo;

import cn.wolfcode.domain.StrategyCatalog;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CatalogGroupVO {

    private String destName;
    private List<StrategyCatalog> catalogList;
}
