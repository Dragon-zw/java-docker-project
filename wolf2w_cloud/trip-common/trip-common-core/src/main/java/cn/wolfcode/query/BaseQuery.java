package cn.wolfcode.query;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BaseQuery {

    private Integer currentPage = 1;
    private Integer pageSize = 10;

    private String keyword;

    public Integer getStart() {
        return (currentPage - 1) * pageSize;
    }
}
