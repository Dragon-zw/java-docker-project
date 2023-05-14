package cn.wolfcode.service;

import cn.wolfcode.parser.ElasticsearchTypeParser;
import cn.wolfcode.query.BaseQuery;
import org.springframework.data.domain.Page;

public interface ISearchService {

    <T> Page<T> searchWithHighlight(Class<?> esclz, Class<T> dtoclz, BaseQuery qo, ElasticsearchTypeParser<T> parser, String... fields);
}
