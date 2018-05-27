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
  `password` varchar(64) NOT NULL COMMENT '用户密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

/*Data for the table `main` */

insert  into `main`(`id`,`name`,`type`,`number`,`password`) values (1,'张三',1,12405008,'123'),(2,'李四',1,16405008,'qwe123'),(3,'王五',2,11407001,'111222333'),(4,'汪国岩',3,19930525,'19930525'),(5,'王彦春',2,123111,'123'),(6,'李云',2,123123,'111'),(7,'王建',2,111222,'1231'),(8,'吴松',2,1233112,'11122');

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

/*Data for the table `t_lab` */

insert  into `t_lab`(`id`,`name`,`code`,`collage`,`place`,`time`) values (1,'	惠斯通电桥实验室','	B1400401','	物理科学与技术学院','	崇理楼401','周二，1-3节；周三，5-7节'),(2,'材料化学实验室','	B1400322','环境工程与化学学院','	化明楼322','周三，1-3节；周五，1-3节'),(3,'微生物实验室','	B1400208','生命科学与技术学院','生命学院208','周三，1-3节；周五，1-3节');

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

/*Data for the table `t_lab_order` */

/*Table structure for table `t_lab_order_status` */

DROP TABLE IF EXISTS `t_lab_order_status`;

CREATE TABLE `t_lab_order_status` (
  `id` int(4) NOT NULL AUTO_INCREMENT COMMENT '预约状态id',
  `name` varchar(16) NOT NULL COMMENT '预约状态描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `t_lab_order_status` */

insert  into `t_lab_order_status`(`id`,`name`) values (1,'申请'),(2,'成功'),(3,'失败');

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

/*Data for the table `t_lesson` */

insert  into `t_lesson`(`id`,`code`,`name`,`college`,`place`,`time`,`property`,`teacher`,`credit`) values (1,'B1400107','物理实验A1','物理科学与技术学院','崇理楼410','周三下午7-8节',1,6,3),(2,'B1400203','化学实验A1','环境工程与化学学院','环化楼320','周一7-8节；周四3-4节',2,7,3),(3,'B1400019','普通生物学实验A','生命科学与技术','生命学院204','周二5-6节',1,8,3);

/*Table structure for table `t_lesson_class` */

DROP TABLE IF EXISTS `t_lesson_class`;

CREATE TABLE `t_lesson_class` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT '课程类型id',
  `name` varchar(32) NOT NULL COMMENT '课程类型名称',
  `code` varchar(16) NOT NULL COMMENT '课程类型代码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `t_lesson_class` */

insert  into `t_lesson_class`(`id`,`name`,`code`) values (1,'必修课','1001'),(2,'专业选修课','1002'),(3,'公共选修课','1003');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
