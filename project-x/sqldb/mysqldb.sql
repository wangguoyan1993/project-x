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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `t_lesson` */

insert  into `t_lesson`(`id`,`code`,`name`,`college`,`place`,`time`,`property`,`teacher`,`credit`) values (1,'B1400107','物理实验A1','物理科学与技术学院','崇理楼410','周三下午7-8节',1,6,3);

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
