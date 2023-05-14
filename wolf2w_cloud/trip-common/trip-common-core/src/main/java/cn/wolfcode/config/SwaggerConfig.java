package cn.wolfcode.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.ParameterBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Parameter;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket productApi() {
        // 添加 head 参数 start
        ParameterBuilder tokenPar = new ParameterBuilder();
        List<Parameter> pars = new ArrayList<Parameter>();
        tokenPar.name("token").description("认证令牌").modelRef(new ModelRef("string"))
                .parameterType("header").required(false).build();
        pars.add(tokenPar.build());

        /* Swagger 文档配置对象 */
        return new Docket(DocumentationType.SWAGGER_2) // 版本
                .select()
                // 扫描的包路径
                .apis(RequestHandlerSelectors.basePackage("cn.wolfcode"))
                // 定义要生成文档的 Api 的 url 路径规则
                .paths(PathSelectors.any())
                .build()
                .globalOperationParameters(pars)
                // 设置swagger-ui.html页面上的一些元素信息。
                .apiInfo(metaData());
    }

    // 自定义 swagger 数据源
    private ApiInfo metaData() {
        return new ApiInfoBuilder()
                // 标题
                .title("狼行天下旅游平台接口文档")
                // 描述
                .description("SpringBoot 集成 Swagger2")
                // 文档版本
                .version("1.0.0")
                .license("Apache License Version 2.0")
                .licenseUrl("https://www.apache.org/licenses/LICENSE-2.0")
                .build();
    }
}
