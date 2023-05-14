package cn.wolfcode.query;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StrategyQuery extends BaseQuery {

    private String orderBy;
    private Integer type = -1;
    private Long refid = -1L;
    private Long destId;
    private Long themeId;

    public Integer getType() {
        return type == null ? -1 : type;
    }

    public Long getRefid() {
        return refid == null ? -1L : refid;
    }
}
