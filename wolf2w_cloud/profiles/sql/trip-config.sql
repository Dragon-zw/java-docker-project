/*
 Navicat Premium Data Transfer

 Source Server         : temp
 Source Server Type    : MySQL
 Source Server Version : 80031
 Source Host           : localhost:3307
 Source Schema         : trip-config

 Target Server Type    : MySQL
 Target Server Version : 80031
 File Encoding         : 65001

 Date: 12/12/2022 21:30:43
*/

DROP DATABASE IF EXISTS `trip-config`;

CREATE DATABASE  `trip-config` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

USE `trip-config`;

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for config_info
-- ----------------------------
DROP TABLE IF EXISTS `config_info`;
CREATE TABLE `config_info`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `data_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT 'data_id',
  `group_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL,
  `content` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT 'content',
  `md5` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT 'md5',
  `gmt_create` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `gmt_modified` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  `src_user` text CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL COMMENT 'source user',
  `src_ip` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT 'source ip',
  `app_name` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL,
  `tenant_id` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT '' COMMENT '租户字段',
  `c_desc` varchar(256) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL,
  `c_use` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL,
  `effect` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL,
  `type` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL,
  `c_schema` text CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL,
  `encrypted_data_key` text CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '秘钥',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_configinfo_datagrouptenant`(`data_id`, `group_id`, `tenant_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin COMMENT = 'config_info' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of config_info
-- ----------------------------
INSERT INTO `config_info` VALUES (1, 'trip-api-gateway-dev.yml', 'DEFAULT_GROUP', 'server:\n  port: 9000\nspring:\n  cloud:\n    gateway:\n      globalcors:\n        cors-configurations:\n          \'[/**]\':\n            allowCredentials: true\n            allowedHeaders: \'*\'\n            allowedMethods: \'*\'\n            allowedOrigins: \'*\'\n      default-filters: # 配置响应头过滤器, 避免重复响应头被浏览器限制\n        - DedupeResponseHeader=Vary Access-Control-Allow-Origin Access-Control-Allow-Credentials, RETAIN_FIRST\n      discovery:\n        locator:\n          enabled: true # 让 gateway 可以发现 nacos 中的微服务\n      routes: # 网关路由配置\n        - id: user_router # 路由 id, 只要在所有路由配置中唯一即可\n          uri: lb://trip-user-server # 匹配路由规则后的访问地址, lb 代表负载均衡\n          predicates:\n            - Path=/uaa/** # 匹配请求路径为 /uaa 开头的请求, 全部转发到 uri 上\n          filters:\n            - StripPrefix=1 # 跳过第一个前缀, /uaa/users/phone/exists => /users/phone/exists\n        - id: travel_router\n          uri: lb://trip-travel-server\n          predicates:\n            - Path=/article/**\n          filters:\n            - StripPrefix=1\n        - id: comment_router\n          uri: lb://trip-comment-server\n          predicates:\n            - Path=/cmt/**\n          filters:\n            - StripPrefix=1\n        - id: search_router\n          uri: lb://trip-search-server\n          predicates:\n            - Path=/search/**\n          filters:\n            - StripPrefix=1\n\n        - id: article-swagger2\n          predicates: Path=/swagger/article/**\n          uri: lb://trip-travel-server\n          filters:\n            # 截掉前2个请求路径 例如: 8111/api/test/admin/get --> 8111/admin/get\n            - StripPrefix=2\n\n        - id: member-swagger2\n          predicates: Path=/swagger/user/**\n          uri: lb://trip-user-server\n          filters:\n            - StripPrefix=2   \n\n        - id: comment-swagger2\n          predicates: Path=/swagger/comment/**\n          uri: lb://trip-comment-server\n          filters:\n            - StripPrefix=2        \n\n        - id: search-swagger2\n          predicates: Path=/swagger/search/**\n          uri: lb://trip-search-server\n          filters:\n            - StripPrefix=2\nauth:\n  enable: false', '1d3b63a6cf6563eed3923a242bb161fe', '2022-12-12 13:26:49', '2022-12-12 13:26:49', NULL, '0:0:0:0:0:0:0:1', '', 'aeb02305-184e-4278-bad4-06dde2a6e973', '', NULL, NULL, 'yaml', NULL, '');
INSERT INTO `config_info` VALUES (2, 'trip-app-pc-server-dev.yml', 'DEFAULT_GROUP', 'server:\n  port: 8100\n  \n# feign 的配置\nfeign:\n  # 启用 sentinel 熔断降级功能\n  sentinel:\n    enabled: true\n\ntrip-app-pc-server: # 调用的提供者的名称\n  ribbon:\n    NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule\n', 'eaee30a70b515a7bd5c4cb67dd39d5c8', '2022-12-12 13:26:49', '2022-12-12 13:26:49', NULL, '0:0:0:0:0:0:0:1', '', 'aeb02305-184e-4278-bad4-06dde2a6e973', NULL, NULL, NULL, 'yaml', NULL, '');
INSERT INTO `config_info` VALUES (3, 'trip-app-backend-server-dev.yml', 'DEFAULT_GROUP', 'server:\n  port: 8110\n  \n# feign 的配置\nfeign:\n  # 启用 sentinel 熔断降级功能\n  sentinel:\n    enabled: true\n\ntrip-app-backend-server: # 调用的提供者的名称\n  ribbon:\n    NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule\n', 'ec6da8b2b6dbf88e827230cfe5432299', '2022-12-12 13:26:49', '2022-12-12 13:26:49', NULL, '0:0:0:0:0:0:0:1', '', 'aeb02305-184e-4278-bad4-06dde2a6e973', NULL, NULL, NULL, 'yaml', NULL, '');
INSERT INTO `config_info` VALUES (4, 'trip-user-server-dev.yml', 'DEFAULT_GROUP', 'server:\n  port: 8200\nspring:\n  # 数据源配置\n  datasource:\n    druid:\n      driver-class-name: com.mysql.jdbc.Driver\n      url: jdbc:mysql://trip-mysql:3306/wolf2w-trip-user?serverTimezone=UTC&useUnicode=true&characterEncoding=utf-8&useSSL=true\n      username: root\n      password: admin\n\nsms:\n  typeMsg:\n    REGISTER: \'【狼行天下】欢迎注册狼行天下旅游平台, 以下是您的验证码: %s, 请在 30 分钟内完成注册.\'\n    CHANGEPASS: \'【狼行天下】请注意, 您正在修改密码, 请确认该操作是您本人进行的, 以下是您的验证码: %s, 30 分钟后验证码将失效.\'\n\n# feign 的配置\nfeign:\n  # 启用 sentinel 熔断降级功能\n  sentinel:\n    enabled: true\n\nmybatis-plus:\n  mapper-locations: classpath:cn/wolfcode/mapper/*Mapper.xml\n\nlogging:\n  level:\n    cn.wolfcode.mapper: debug', 'e9919137834236354d2174976ded987f', '2022-12-12 13:26:49', '2022-12-12 13:28:19', 'nacos', '0:0:0:0:0:0:0:1', '', 'aeb02305-184e-4278-bad4-06dde2a6e973', '', '', '', 'yaml', '', '');
INSERT INTO `config_info` VALUES (5, 'trip-travel-server-dev.yml', 'DEFAULT_GROUP', 'server:\n  port: 8210\nspring:\n  # 数据源配置\n  datasource:\n    druid:\n      driver-class-name: com.mysql.jdbc.Driver\n      url: jdbc:mysql://trip-mysql:3306/wolf2w-trip-travel?serverTimezone=UTC&useUnicode=true&characterEncoding=utf-8&useSSL=true\n      username: root\n      password: admin\n\noss:\n  endpoint: oss-cn-chengdu.aliyuncs.com\n  accessKeyId: LTAIE3kOr7tFi7pA\n  accessKeySecret: UMhJne1wUUotqNSpN3Grqep6MHBtFJ\n  bucketName: cd-wolf2w-cloud\n\n# feign 的配置\nfeign:\n  # 启用 sentinel 熔断降级功能\n  sentinel:\n    enabled: true\n\nmybatis-plus:\n  mapper-locations: classpath:cn/wolfcode/mapper/*Mapper.xml\n\nlogging:\n  level:\n    cn.wolfcode.mapper: debug', '4cfd99255e66b8f5a104991d57f84aa6', '2022-12-12 13:26:49', '2022-12-12 13:28:43', 'nacos', '0:0:0:0:0:0:0:1', '', 'aeb02305-184e-4278-bad4-06dde2a6e973', '', '', '', 'yaml', '', '');
INSERT INTO `config_info` VALUES (6, 'trip-comment-server-dev.yml', 'DEFAULT_GROUP', 'server:\n  port: 8220\nspring:\n  # 数据源配置\n  datasource:\n    druid:\n      driver-class-name: com.mysql.jdbc.Driver\n      url: jdbc:mysql:///wolf2w-trip-comment?serverTimezone=UTC&useUnicode=true&characterEncoding=utf-8&useSSL=true\n      username: root\n      password: 123456\n\n# feign 的配置\nfeign:\n  # 启用 sentinel 熔断降级功能\n  sentinel:\n    enabled: true\n\nmybatis-plus:\n  mapper-locations: classpath:cn/wolfcode/mapper/*Mapper.xml\n\nlogging:\n  level:\n    cn.wolfcode.mapper: debug', 'ed0841bab5aed3e06dff26284c60af2a', '2022-12-12 13:26:49', '2022-12-12 13:26:49', NULL, '0:0:0:0:0:0:0:1', '', 'aeb02305-184e-4278-bad4-06dde2a6e973', NULL, NULL, NULL, 'yaml', NULL, '');
INSERT INTO `config_info` VALUES (7, 'trip-search-server-dev.yml', 'DEFAULT_GROUP', 'server:\n  port: 8230\n\n# feign 的配置\nfeign:\n  # 启用 sentinel 熔断降级功能\n  sentinel:\n    enabled: true', 'b6bd7d5de5da41b85ea51504d090d02b', '2022-12-12 13:26:49', '2022-12-12 13:26:49', NULL, '0:0:0:0:0:0:0:1', '', 'aeb02305-184e-4278-bad4-06dde2a6e973', NULL, NULL, NULL, 'yaml', NULL, '');
INSERT INTO `config_info` VALUES (8, 'trip-common-redis-dev.yml', 'DEFAULT_GROUP', 'spring:\n  redis:\n    host: trip-redis\n    password: wolfcode\n', '98d7da8b42a0a0111cd0ff0fc8d37bed', '2022-12-12 13:26:49', '2022-12-12 13:29:08', 'nacos', '0:0:0:0:0:0:0:1', '', 'aeb02305-184e-4278-bad4-06dde2a6e973', '', '', '', 'yaml', '', '');
INSERT INTO `config_info` VALUES (9, 'trip-jwt-auth-dev.yml', 'DEFAULT_GROUP', 'jwt:\r\n  header: token\r\n  secret: aosdiufhaw2k3ojrnp2oa3ijpoiajsdoiufhfwwe\r\n  expireTime: 30', '8eaa5440c27d4815bee04adc1f611351', '2022-12-12 13:26:49', '2022-12-12 13:26:49', NULL, '0:0:0:0:0:0:0:1', '', 'aeb02305-184e-4278-bad4-06dde2a6e973', NULL, NULL, NULL, 'yaml', NULL, '');
INSERT INTO `config_info` VALUES (10, 'trip-common-mongodb-dev.yml', 'DEFAULT_GROUP', 'spring:\r\n  data:\r\n    mongodb:\r\n      uri: mongodb://localhost/wolf2w-trip-comment', 'cb3df6e963e807c6752cf9f520fc9389', '2022-12-12 13:26:49', '2022-12-12 13:26:49', NULL, '0:0:0:0:0:0:0:1', '', 'aeb02305-184e-4278-bad4-06dde2a6e973', NULL, NULL, NULL, 'yaml', NULL, '');
INSERT INTO `config_info` VALUES (11, 'trip-common-elasticsearch-dev.yml', 'DEFAULT_GROUP', 'spring:\r\n  elasticsearch:\r\n    rest:\r\n      uris: http://localhost:9200\r\n      # username:\r\n      # password: ', '04e7cf6f382babaeef8771bc8f78e2b5', '2022-12-12 13:26:49', '2022-12-12 13:26:49', NULL, '0:0:0:0:0:0:0:1', '', 'aeb02305-184e-4278-bad4-06dde2a6e973', NULL, NULL, NULL, 'yaml', NULL, '');

-- ----------------------------
-- Table structure for config_info_aggr
-- ----------------------------
DROP TABLE IF EXISTS `config_info_aggr`;
CREATE TABLE `config_info_aggr`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `data_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT 'data_id',
  `group_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT 'group_id',
  `datum_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT 'datum_id',
  `content` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '内容',
  `gmt_modified` datetime(0) NOT NULL COMMENT '修改时间',
  `app_name` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL,
  `tenant_id` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT '' COMMENT '租户字段',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_configinfoaggr_datagrouptenantdatum`(`data_id`, `group_id`, `tenant_id`, `datum_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin COMMENT = '增加租户字段' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for config_info_beta
-- ----------------------------
DROP TABLE IF EXISTS `config_info_beta`;
CREATE TABLE `config_info_beta`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `data_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT 'data_id',
  `group_id` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT 'group_id',
  `app_name` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT 'app_name',
  `content` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT 'content',
  `beta_ips` varchar(1024) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT 'betaIps',
  `md5` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT 'md5',
  `gmt_create` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `gmt_modified` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  `src_user` text CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL COMMENT 'source user',
  `src_ip` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT 'source ip',
  `tenant_id` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT '' COMMENT '租户字段',
  `encrypted_data_key` text CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '秘钥',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_configinfobeta_datagrouptenant`(`data_id`, `group_id`, `tenant_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin COMMENT = 'config_info_beta' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for config_info_tag
-- ----------------------------
DROP TABLE IF EXISTS `config_info_tag`;
CREATE TABLE `config_info_tag`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `data_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT 'data_id',
  `group_id` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT 'group_id',
  `tenant_id` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT '' COMMENT 'tenant_id',
  `tag_id` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT 'tag_id',
  `app_name` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT 'app_name',
  `content` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT 'content',
  `md5` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT 'md5',
  `gmt_create` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `gmt_modified` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  `src_user` text CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL COMMENT 'source user',
  `src_ip` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT 'source ip',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_configinfotag_datagrouptenanttag`(`data_id`, `group_id`, `tenant_id`, `tag_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin COMMENT = 'config_info_tag' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for config_tags_relation
-- ----------------------------
DROP TABLE IF EXISTS `config_tags_relation`;
CREATE TABLE `config_tags_relation`  (
  `id` bigint(0) NOT NULL COMMENT 'id',
  `tag_name` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT 'tag_name',
  `tag_type` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT 'tag_type',
  `data_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT 'data_id',
  `group_id` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT 'group_id',
  `tenant_id` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT '' COMMENT 'tenant_id',
  `nid` bigint(0) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`nid`) USING BTREE,
  UNIQUE INDEX `uk_configtagrelation_configidtag`(`id`, `tag_name`, `tag_type`) USING BTREE,
  INDEX `idx_tenant_id`(`tenant_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin COMMENT = 'config_tag_relation' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for group_capacity
-- ----------------------------
DROP TABLE IF EXISTS `group_capacity`;
CREATE TABLE `group_capacity`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `group_id` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL DEFAULT '' COMMENT 'Group ID，空字符表示整个集群',
  `quota` int(0) UNSIGNED NOT NULL DEFAULT 0 COMMENT '配额，0表示使用默认值',
  `usage` int(0) UNSIGNED NOT NULL DEFAULT 0 COMMENT '使用量',
  `max_size` int(0) UNSIGNED NOT NULL DEFAULT 0 COMMENT '单个配置大小上限，单位为字节，0表示使用默认值',
  `max_aggr_count` int(0) UNSIGNED NOT NULL DEFAULT 0 COMMENT '聚合子配置最大个数，，0表示使用默认值',
  `max_aggr_size` int(0) UNSIGNED NOT NULL DEFAULT 0 COMMENT '单个聚合数据的子配置大小上限，单位为字节，0表示使用默认值',
  `max_history_count` int(0) UNSIGNED NOT NULL DEFAULT 0 COMMENT '最大变更历史数量',
  `gmt_create` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `gmt_modified` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_group_id`(`group_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin COMMENT = '集群、各Group容量信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for his_config_info
-- ----------------------------
DROP TABLE IF EXISTS `his_config_info`;
CREATE TABLE `his_config_info`  (
  `id` bigint(0) UNSIGNED NOT NULL,
  `nid` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `data_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `group_id` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `app_name` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT 'app_name',
  `content` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `md5` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL,
  `gmt_create` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `gmt_modified` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `src_user` text CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL,
  `src_ip` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL,
  `op_type` char(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL,
  `tenant_id` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT '' COMMENT '租户字段',
  `encrypted_data_key` text CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '秘钥',
  PRIMARY KEY (`nid`) USING BTREE,
  INDEX `idx_gmt_create`(`gmt_create`) USING BTREE,
  INDEX `idx_gmt_modified`(`gmt_modified`) USING BTREE,
  INDEX `idx_did`(`data_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin COMMENT = '多租户改造' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of his_config_info
-- ----------------------------
INSERT INTO `his_config_info` VALUES (0, 1, 'trip-api-gateway-dev.yml', 'DEFAULT_GROUP', '', 'server:\n  port: 9000\nspring:\n  cloud:\n    gateway:\n      globalcors:\n        cors-configurations:\n          \'[/**]\':\n            allowCredentials: true\n            allowedHeaders: \'*\'\n            allowedMethods: \'*\'\n            allowedOrigins: \'*\'\n      default-filters: # 配置响应头过滤器, 避免重复响应头被浏览器限制\n        - DedupeResponseHeader=Vary Access-Control-Allow-Origin Access-Control-Allow-Credentials, RETAIN_FIRST\n      discovery:\n        locator:\n          enabled: true # 让 gateway 可以发现 nacos 中的微服务\n      routes: # 网关路由配置\n        - id: user_router # 路由 id, 只要在所有路由配置中唯一即可\n          uri: lb://trip-user-server # 匹配路由规则后的访问地址, lb 代表负载均衡\n          predicates:\n            - Path=/uaa/** # 匹配请求路径为 /uaa 开头的请求, 全部转发到 uri 上\n          filters:\n            - StripPrefix=1 # 跳过第一个前缀, /uaa/users/phone/exists => /users/phone/exists\n        - id: travel_router\n          uri: lb://trip-travel-server\n          predicates:\n            - Path=/article/**\n          filters:\n            - StripPrefix=1\n        - id: comment_router\n          uri: lb://trip-comment-server\n          predicates:\n            - Path=/cmt/**\n          filters:\n            - StripPrefix=1\n        - id: search_router\n          uri: lb://trip-search-server\n          predicates:\n            - Path=/search/**\n          filters:\n            - StripPrefix=1\n\n        - id: article-swagger2\n          predicates: Path=/swagger/article/**\n          uri: lb://trip-travel-server\n          filters:\n            # 截掉前2个请求路径 例如: 8111/api/test/admin/get --> 8111/admin/get\n            - StripPrefix=2\n\n        - id: member-swagger2\n          predicates: Path=/swagger/user/**\n          uri: lb://trip-user-server\n          filters:\n            - StripPrefix=2   \n\n        - id: comment-swagger2\n          predicates: Path=/swagger/comment/**\n          uri: lb://trip-comment-server\n          filters:\n            - StripPrefix=2        \n\n        - id: search-swagger2\n          predicates: Path=/swagger/search/**\n          uri: lb://trip-search-server\n          filters:\n            - StripPrefix=2\nauth:\n  enable: false', '1d3b63a6cf6563eed3923a242bb161fe', '2022-12-12 13:26:49', '2022-12-12 13:26:49', NULL, '0:0:0:0:0:0:0:1', 'I', 'aeb02305-184e-4278-bad4-06dde2a6e973', '');
INSERT INTO `his_config_info` VALUES (0, 2, 'trip-app-pc-server-dev.yml', 'DEFAULT_GROUP', '', 'server:\n  port: 8100\n  \n# feign 的配置\nfeign:\n  # 启用 sentinel 熔断降级功能\n  sentinel:\n    enabled: true\n\ntrip-app-pc-server: # 调用的提供者的名称\n  ribbon:\n    NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule\n', 'eaee30a70b515a7bd5c4cb67dd39d5c8', '2022-12-12 13:26:49', '2022-12-12 13:26:49', NULL, '0:0:0:0:0:0:0:1', 'I', 'aeb02305-184e-4278-bad4-06dde2a6e973', '');
INSERT INTO `his_config_info` VALUES (0, 3, 'trip-app-backend-server-dev.yml', 'DEFAULT_GROUP', '', 'server:\n  port: 8110\n  \n# feign 的配置\nfeign:\n  # 启用 sentinel 熔断降级功能\n  sentinel:\n    enabled: true\n\ntrip-app-backend-server: # 调用的提供者的名称\n  ribbon:\n    NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule\n', 'ec6da8b2b6dbf88e827230cfe5432299', '2022-12-12 13:26:49', '2022-12-12 13:26:49', NULL, '0:0:0:0:0:0:0:1', 'I', 'aeb02305-184e-4278-bad4-06dde2a6e973', '');
INSERT INTO `his_config_info` VALUES (0, 4, 'trip-user-server-dev.yml', 'DEFAULT_GROUP', '', 'server:\n  port: 8200\nspring:\n  # 数据源配置\n  datasource:\n    druid:\n      driver-class-name: com.mysql.jdbc.Driver\n      url: jdbc:mysql:///wolf2w-trip-user?serverTimezone=UTC&useUnicode=true&characterEncoding=utf-8&useSSL=true\n      username: root\n      password: 123456\n\nsms:\n  typeMsg:\n    REGISTER: \'【狼行天下】欢迎注册狼行天下旅游平台, 以下是您的验证码: %s, 请在 30 分钟内完成注册.\'\n    CHANGEPASS: \'【狼行天下】请注意, 您正在修改密码, 请确认该操作是您本人进行的, 以下是您的验证码: %s, 30 分钟后验证码将失效.\'\n\n# feign 的配置\nfeign:\n  # 启用 sentinel 熔断降级功能\n  sentinel:\n    enabled: true\n\nmybatis-plus:\n  mapper-locations: classpath:cn/wolfcode/mapper/*Mapper.xml\n\nlogging:\n  level:\n    cn.wolfcode.mapper: debug', 'a9cf7ffbe3c159fd743f4030881f08e2', '2022-12-12 13:26:49', '2022-12-12 13:26:49', NULL, '0:0:0:0:0:0:0:1', 'I', 'aeb02305-184e-4278-bad4-06dde2a6e973', '');
INSERT INTO `his_config_info` VALUES (0, 5, 'trip-travel-server-dev.yml', 'DEFAULT_GROUP', '', 'server:\n  port: 8210\nspring:\n  # 数据源配置\n  datasource:\n    druid:\n      driver-class-name: com.mysql.jdbc.Driver\n      url: jdbc:mysql:///wolf2w-trip-travel?serverTimezone=UTC&useUnicode=true&characterEncoding=utf-8&useSSL=true\n      username: root\n      password: 123456\n\noss:\n  endpoint: oss-cn-chengdu.aliyuncs.com\n  accessKeyId: LTAIE3kOr7tFi7pA\n  accessKeySecret: UMhJne1wUUotqNSpN3Grqep6MHBtFJ\n  bucketName: cd-wolf2w-cloud\n\n# feign 的配置\nfeign:\n  # 启用 sentinel 熔断降级功能\n  sentinel:\n    enabled: true\n\nmybatis-plus:\n  mapper-locations: classpath:cn/wolfcode/mapper/*Mapper.xml\n\nlogging:\n  level:\n    cn.wolfcode.mapper: debug', '6cecf7bc70d4083d9f64b4ce21547efc', '2022-12-12 13:26:49', '2022-12-12 13:26:49', NULL, '0:0:0:0:0:0:0:1', 'I', 'aeb02305-184e-4278-bad4-06dde2a6e973', '');
INSERT INTO `his_config_info` VALUES (0, 6, 'trip-comment-server-dev.yml', 'DEFAULT_GROUP', '', 'server:\n  port: 8220\nspring:\n  # 数据源配置\n  datasource:\n    druid:\n      driver-class-name: com.mysql.jdbc.Driver\n      url: jdbc:mysql:///wolf2w-trip-comment?serverTimezone=UTC&useUnicode=true&characterEncoding=utf-8&useSSL=true\n      username: root\n      password: 123456\n\n# feign 的配置\nfeign:\n  # 启用 sentinel 熔断降级功能\n  sentinel:\n    enabled: true\n\nmybatis-plus:\n  mapper-locations: classpath:cn/wolfcode/mapper/*Mapper.xml\n\nlogging:\n  level:\n    cn.wolfcode.mapper: debug', 'ed0841bab5aed3e06dff26284c60af2a', '2022-12-12 13:26:49', '2022-12-12 13:26:49', NULL, '0:0:0:0:0:0:0:1', 'I', 'aeb02305-184e-4278-bad4-06dde2a6e973', '');
INSERT INTO `his_config_info` VALUES (0, 7, 'trip-search-server-dev.yml', 'DEFAULT_GROUP', '', 'server:\n  port: 8230\n\n# feign 的配置\nfeign:\n  # 启用 sentinel 熔断降级功能\n  sentinel:\n    enabled: true', 'b6bd7d5de5da41b85ea51504d090d02b', '2022-12-12 13:26:49', '2022-12-12 13:26:49', NULL, '0:0:0:0:0:0:0:1', 'I', 'aeb02305-184e-4278-bad4-06dde2a6e973', '');
INSERT INTO `his_config_info` VALUES (0, 8, 'trip-common-redis-dev.yml', 'DEFAULT_GROUP', '', 'spring:\r\n  redis:\r\n    password: wolfcode\r\n', 'c4d590ab88c289e489cf6c2f519e2993', '2022-12-12 13:26:49', '2022-12-12 13:26:49', NULL, '0:0:0:0:0:0:0:1', 'I', 'aeb02305-184e-4278-bad4-06dde2a6e973', '');
INSERT INTO `his_config_info` VALUES (0, 9, 'trip-jwt-auth-dev.yml', 'DEFAULT_GROUP', '', 'jwt:\r\n  header: token\r\n  secret: aosdiufhaw2k3ojrnp2oa3ijpoiajsdoiufhfwwe\r\n  expireTime: 30', '8eaa5440c27d4815bee04adc1f611351', '2022-12-12 13:26:49', '2022-12-12 13:26:49', NULL, '0:0:0:0:0:0:0:1', 'I', 'aeb02305-184e-4278-bad4-06dde2a6e973', '');
INSERT INTO `his_config_info` VALUES (0, 10, 'trip-common-mongodb-dev.yml', 'DEFAULT_GROUP', '', 'spring:\r\n  data:\r\n    mongodb:\r\n      uri: mongodb://localhost/wolf2w-trip-comment', 'cb3df6e963e807c6752cf9f520fc9389', '2022-12-12 13:26:49', '2022-12-12 13:26:49', NULL, '0:0:0:0:0:0:0:1', 'I', 'aeb02305-184e-4278-bad4-06dde2a6e973', '');
INSERT INTO `his_config_info` VALUES (0, 11, 'trip-common-elasticsearch-dev.yml', 'DEFAULT_GROUP', '', 'spring:\r\n  elasticsearch:\r\n    rest:\r\n      uris: http://localhost:9200\r\n      # username:\r\n      # password: ', '04e7cf6f382babaeef8771bc8f78e2b5', '2022-12-12 13:26:49', '2022-12-12 13:26:49', NULL, '0:0:0:0:0:0:0:1', 'I', 'aeb02305-184e-4278-bad4-06dde2a6e973', '');
INSERT INTO `his_config_info` VALUES (4, 12, 'trip-user-server-dev.yml', 'DEFAULT_GROUP', '', 'server:\n  port: 8200\nspring:\n  # 数据源配置\n  datasource:\n    druid:\n      driver-class-name: com.mysql.jdbc.Driver\n      url: jdbc:mysql:///wolf2w-trip-user?serverTimezone=UTC&useUnicode=true&characterEncoding=utf-8&useSSL=true\n      username: root\n      password: 123456\n\nsms:\n  typeMsg:\n    REGISTER: \'【狼行天下】欢迎注册狼行天下旅游平台, 以下是您的验证码: %s, 请在 30 分钟内完成注册.\'\n    CHANGEPASS: \'【狼行天下】请注意, 您正在修改密码, 请确认该操作是您本人进行的, 以下是您的验证码: %s, 30 分钟后验证码将失效.\'\n\n# feign 的配置\nfeign:\n  # 启用 sentinel 熔断降级功能\n  sentinel:\n    enabled: true\n\nmybatis-plus:\n  mapper-locations: classpath:cn/wolfcode/mapper/*Mapper.xml\n\nlogging:\n  level:\n    cn.wolfcode.mapper: debug', 'a9cf7ffbe3c159fd743f4030881f08e2', '2022-12-12 13:28:18', '2022-12-12 13:28:19', 'nacos', '0:0:0:0:0:0:0:1', 'U', 'aeb02305-184e-4278-bad4-06dde2a6e973', '');
INSERT INTO `his_config_info` VALUES (5, 13, 'trip-travel-server-dev.yml', 'DEFAULT_GROUP', '', 'server:\n  port: 8210\nspring:\n  # 数据源配置\n  datasource:\n    druid:\n      driver-class-name: com.mysql.jdbc.Driver\n      url: jdbc:mysql:///wolf2w-trip-travel?serverTimezone=UTC&useUnicode=true&characterEncoding=utf-8&useSSL=true\n      username: root\n      password: 123456\n\noss:\n  endpoint: oss-cn-chengdu.aliyuncs.com\n  accessKeyId: LTAIE3kOr7tFi7pA\n  accessKeySecret: UMhJne1wUUotqNSpN3Grqep6MHBtFJ\n  bucketName: cd-wolf2w-cloud\n\n# feign 的配置\nfeign:\n  # 启用 sentinel 熔断降级功能\n  sentinel:\n    enabled: true\n\nmybatis-plus:\n  mapper-locations: classpath:cn/wolfcode/mapper/*Mapper.xml\n\nlogging:\n  level:\n    cn.wolfcode.mapper: debug', '6cecf7bc70d4083d9f64b4ce21547efc', '2022-12-12 13:28:43', '2022-12-12 13:28:43', 'nacos', '0:0:0:0:0:0:0:1', 'U', 'aeb02305-184e-4278-bad4-06dde2a6e973', '');
INSERT INTO `his_config_info` VALUES (8, 14, 'trip-common-redis-dev.yml', 'DEFAULT_GROUP', '', 'spring:\r\n  redis:\r\n    password: wolfcode\r\n', 'c4d590ab88c289e489cf6c2f519e2993', '2022-12-12 13:29:07', '2022-12-12 13:29:08', 'nacos', '0:0:0:0:0:0:0:1', 'U', 'aeb02305-184e-4278-bad4-06dde2a6e973', '');

-- ----------------------------
-- Table structure for permissions
-- ----------------------------
DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions`  (
  `role` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `resource` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `action` varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  UNIQUE INDEX `uk_role_permission`(`role`, `resource`, `action`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `role` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  UNIQUE INDEX `idx_user_role`(`username`, `role`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES ('nacos', 'ROLE_ADMIN');

-- ----------------------------
-- Table structure for tenant_capacity
-- ----------------------------
DROP TABLE IF EXISTS `tenant_capacity`;
CREATE TABLE `tenant_capacity`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `tenant_id` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL DEFAULT '' COMMENT 'Tenant ID',
  `quota` int(0) UNSIGNED NOT NULL DEFAULT 0 COMMENT '配额，0表示使用默认值',
  `usage` int(0) UNSIGNED NOT NULL DEFAULT 0 COMMENT '使用量',
  `max_size` int(0) UNSIGNED NOT NULL DEFAULT 0 COMMENT '单个配置大小上限，单位为字节，0表示使用默认值',
  `max_aggr_count` int(0) UNSIGNED NOT NULL DEFAULT 0 COMMENT '聚合子配置最大个数',
  `max_aggr_size` int(0) UNSIGNED NOT NULL DEFAULT 0 COMMENT '单个聚合数据的子配置大小上限，单位为字节，0表示使用默认值',
  `max_history_count` int(0) UNSIGNED NOT NULL DEFAULT 0 COMMENT '最大变更历史数量',
  `gmt_create` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `gmt_modified` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_tenant_id`(`tenant_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin COMMENT = '租户容量信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for tenant_info
-- ----------------------------
DROP TABLE IF EXISTS `tenant_info`;
CREATE TABLE `tenant_info`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `kp` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT 'kp',
  `tenant_id` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT '' COMMENT 'tenant_id',
  `tenant_name` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT '' COMMENT 'tenant_name',
  `tenant_desc` varchar(256) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT 'tenant_desc',
  `create_source` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL COMMENT 'create_source',
  `gmt_create` bigint(0) NOT NULL COMMENT '创建时间',
  `gmt_modified` bigint(0) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_tenant_info_kptenantid`(`kp`, `tenant_id`) USING BTREE,
  INDEX `idx_tenant_id`(`tenant_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin COMMENT = 'tenant_info' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tenant_info
-- ----------------------------
INSERT INTO `tenant_info` VALUES (1, '1', 'aeb02305-184e-4278-bad4-06dde2a6e973', 'wolf2w', '狼行天下', 'nacos', 1670851586494, 1670851586494);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  PRIMARY KEY (`username`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('nacos', '$2a$10$EuWPZHzz32dJN7jexM34MOeYirDdFAZm2kuWj7VEOJhhZkDrxfvUu', 1);

SET FOREIGN_KEY_CHECKS = 1;
