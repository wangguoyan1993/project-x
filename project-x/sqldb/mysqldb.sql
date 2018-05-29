/*
SQLyog Ultimate v11.24 (32 bit)
MySQL - 5.7.20-log : Database - jack
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`jack` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `jack`;

/*Table structure for table `main` */

DROP TABLE IF EXISTS `main`;

CREATE TABLE `main` (
  `id` int(32) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `name` varchar(64) NOT NULL COMMENT '用户名称',
  `type` int(2) NOT NULL COMMENT '用户类型',
  `number` int(64) NOT NULL COMMENT '用户账号',
  `user_password` varchar(64) NOT NULL COMMENT '用户密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

/*Table structure for table `t_lab` */

DROP TABLE IF EXISTS `t_lab`;

CREATE TABLE `t_lab` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT '实验室id',
  `name` varchar(32) NOT NULL COMMENT '实验室名称',
  `code` varchar(16) NOT NULL COMMENT '实验室代码',
  `collage` varchar(64) NOT NULL COMMENT '所属学院',
  `place` varchar(64) NOT NULL COMMENT '地点',
  `time` varchar(128) DEFAULT NULL COMMENT '上课时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Table structure for table `t_lab_order` */

DROP TABLE IF EXISTS `t_lab_order`;

CREATE TABLE `t_lab_order` (
  `lab_id` int(8) DEFAULT NULL,
  `uid` int(8) DEFAULT NULL,
  `start_time` varchar(64) DEFAULT NULL,
  `end_time` varchar(64) DEFAULT NULL,
  `status_id` int(4) DEFAULT NULL,
  `reason` varchar(128) DEFAULT NULL,
  KEY `uid` (`uid`),
  KEY `lab_id` (`lab_id`),
  KEY `status` (`status_id`),
  CONSTRAINT `lab_id` FOREIGN KEY (`lab_id`) REFERENCES `t_lab` (`id`),
  CONSTRAINT `status` FOREIGN KEY (`status_id`) REFERENCES `t_lab_order_status` (`id`),
  CONSTRAINT `uid` FOREIGN KEY (`uid`) REFERENCES `main` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `t_lab_order_status` */

DROP TABLE IF EXISTS `t_lab_order_status`;

CREATE TABLE `t_lab_order_status` (
  `id` int(4) NOT NULL AUTO_INCREMENT COMMENT '预约状态id',
  `name` varchar(16) NOT NULL COMMENT '预约状态描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Table structure for table `t_lesson` */

DROP TABLE IF EXISTS `t_lesson`;

CREATE TABLE `t_lesson` (
  `id` int(16) NOT NULL AUTO_INCREMENT COMMENT '课程id',
  `code` varchar(32) NOT NULL COMMENT '课程代码',
  `name` varchar(64) NOT NULL COMMENT '名称',
  `college` varchar(64) DEFAULT NULL COMMENT '学院',
  `place` varchar(64) DEFAULT NULL COMMENT '地点',
  `time` varchar(32) DEFAULT NULL COMMENT '时间',
  `property` int(8) NOT NULL COMMENT '性质id',
  `teacher` int(16) NOT NULL COMMENT '用户id',
  `credit` int(8) DEFAULT NULL COMMENT '学分',
  PRIMARY KEY (`id`),
  KEY `teacher` (`teacher`),
  KEY `property` (`property`),
  CONSTRAINT `property` FOREIGN KEY (`property`) REFERENCES `t_lesson_class` (`id`),
  CONSTRAINT `teacher` FOREIGN KEY (`teacher`) REFERENCES `main` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Table structure for table `t_lesson_class` */

DROP TABLE IF EXISTS `t_lesson_class`;

CREATE TABLE `t_lesson_class` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT '课程类型id',
  `name` varchar(32) NOT NULL COMMENT '课程类型名称',
  `code` varchar(16) NOT NULL COMMENT '课程类型代码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
