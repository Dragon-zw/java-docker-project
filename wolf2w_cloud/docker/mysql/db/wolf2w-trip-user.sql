/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50636
 Source Host           : localhost:3306
 Source Schema         : wolf2w-trip-user

 Target Server Type    : MySQL
 Target Server Version : 50636
 File Encoding         : 65001

 Date: 13/01/2023 09:58:19
*/

DROP DATABASE IF EXISTS `wolf2w-trip-user`;

CREATE DATABASE  `wolf2w-trip-user` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

USE `wolf2w-trip-user`;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `gender` int(255) NULL DEFAULT NULL,
  `level` int(255) NULL DEFAULT NULL,
  `city` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `head_img_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `info` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `state` int(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `phone`(`phone`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES (6, 'xiaoliu', '17000000000', NULL, '$2a$10$acbQGoStDtB3tG6r1WLib.3u2u/.Z1VMMHSJLbgBQU9dlxfvsrUeK', 0, 0, '成都', 'https://p3-q.mafengwo.net/s13/M00/AB/00/wKgEaVy2nheAN9y5AAorszCM1vQ56.jpeg?imageMogr2%2Fthumbnail%2F%21120x120r%2Fgravity%2FCenter%2Fcrop%2F%21120x120%2Fquality%2F90', NULL, 0);
INSERT INTO `userinfo` VALUES (7, 'xialiu', '18000000001', NULL, '$2a$10$acbQGoStDtB3tG6r1WLib.3u2u/.Z1VMMHSJLbgBQU9dlxfvsrUeK', 0, 0, '广州', 'https://p3-q.mafengwo.net/s13/M00/AB/00/wKgEaVy2nheAN9y5AAorszCM1vQ56.jpeg?imageMogr2%2Fthumbnail%2F%21120x120r%2Fgravity%2FCenter%2Fcrop%2F%21120x120%2Fquality%2F90', NULL, 0);
INSERT INTO `userinfo` VALUES (8, 'laoliu', '13053213215', NULL, '$2a$10$DBpodyJGgmzedeCSaN7GWeUtQNgMgi5ufoNQO9xaFNFbTRKEw2d/y', 0, 0, '成都', 'https://p3-q.mafengwo.net/s13/M00/AB/00/wKgEaVy2nheAN9y5AAorszCM1vQ56.jpeg?imageMogr2%2Fthumbnail%2F%21120x120r%2Fgravity%2FCenter%2Fcrop%2F%21120x120%2Fquality%2F90', NULL, 0);
INSERT INTO `userinfo` VALUES (9, 'zhangsan', '13254321325', NULL, '$2a$10$/iBLahqngUQNoxX5ejtxm.Pd7ZlynxZx4SBuF6EVRk7yVYCRR8MZ.', 0, 0, '广州', 'https://p3-q.mafengwo.net/s13/M00/AB/00/wKgEaVy2nheAN9y5AAorszCM1vQ56.jpeg?imageMogr2%2Fthumbnail%2F%21120x120r%2Fgravity%2FCenter%2Fcrop%2F%21120x120%2Fquality%2F90', NULL, 0);
INSERT INTO `userinfo` VALUES (10, 'lisi', '13521352185', NULL, '$2a$10$DeWDqx/xW/SgkCHH2jOMVeG8X853SwOEU4nS8/wLOZWEbzQGGU9SK', 0, 0, '成都', 'https://p3-q.mafengwo.net/s13/M00/AB/00/wKgEaVy2nheAN9y5AAorszCM1vQ56.jpeg?imageMogr2%2Fthumbnail%2F%21120x120r%2Fgravity%2FCenter%2Fcrop%2F%21120x120%2Fquality%2F90', NULL, 0);
INSERT INTO `userinfo` VALUES (11, 'wangwu', '15665456546', NULL, '$2a$10$xKIRyixobWsRAuaD5u9BX.tMeDZlZda9afImwuKwHEv3RwDsL58c.', 0, 0, '广州', 'https://p3-q.mafengwo.net/s13/M00/AB/00/wKgEaVy2nheAN9y5AAorszCM1vQ56.jpeg?imageMogr2%2Fthumbnail%2F%21120x120r%2Fgravity%2FCenter%2Fcrop%2F%21120x120%2Fquality%2F90', NULL, 0);

SET FOREIGN_KEY_CHECKS = 1;
