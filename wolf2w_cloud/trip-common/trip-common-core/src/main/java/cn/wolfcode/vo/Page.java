package cn.wolfcode.vo;

import lombok.Getter;
import lombok.Setter;

import java.util.Collections;
import java.util.List;

/**
 * 通用分页对象
 *
 * @param <T> 查询数据的类型
 */
@Getter
@Setter
public class Page<T> {

    /* 总数量 */
    private long total;
    /* 结果集 */
    private List<T> records;

    public Page(long total, List<T> records) {
        this.total = total;
        this.records = records;
    }

    public static <T> Page<T> empty() {
        return new Page<>(0, Collections.emptyList());
    }
}
