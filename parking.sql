/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 10.4.14-MariaDB : Database - parking
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`parking` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `parking`;

/*Table structure for table `boravak` */

DROP TABLE IF EXISTS `boravak`;

CREATE TABLE `boravak` (
  `vremeUlaska` datetime NOT NULL,
  `vremeIzlaska` datetime NOT NULL,
  `parkiralisteId` int(11) NOT NULL,
  `voziloId` int(11) NOT NULL,
  `placen` tinyint(4) NOT NULL,
  `racunId` int(11) DEFAULT NULL,
  PRIMARY KEY (`vremeUlaska`,`parkiralisteId`,`voziloId`),
  KEY `FK_161ff9a0518eb20612cb3e47387` (`racunId`),
  KEY `voziloId` (`voziloId`),
  KEY `parkiralisteId` (`parkiralisteId`),
  CONSTRAINT `FK_161ff9a0518eb20612cb3e47387` FOREIGN KEY (`racunId`) REFERENCES `racun` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `boravak_ibfk_1` FOREIGN KEY (`voziloId`) REFERENCES `vozilo` (`id`) ON DELETE CASCADE,
  CONSTRAINT `boravak_ibfk_2` FOREIGN KEY (`parkiralisteId`) REFERENCES `parkiraliste` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `boravak` */

insert  into `boravak`(`vremeUlaska`,`vremeIzlaska`,`parkiralisteId`,`voziloId`,`placen`,`racunId`) values 
('2021-11-23 21:12:47','2021-11-23 21:16:49',5,23,1,46),
('2021-11-23 21:13:02','2021-11-23 21:17:08',6,24,1,46),
('2021-11-23 21:17:06','2021-11-23 21:18:37',5,25,1,47),
('2021-11-23 21:24:26','2021-11-23 21:50:13',6,26,1,48),
('2021-11-23 21:24:57','2021-11-23 22:05:02',6,27,0,NULL),
('2021-11-23 21:50:33','0000-00-00 00:00:00',5,28,0,NULL);

/*Table structure for table `migrations` */

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

/*Data for the table `migrations` */

insert  into `migrations`(`id`,`timestamp`,`name`) values 
(1,1612873927741,'CreateUser1612873927741'),
(2,1612874191954,'ADDStatusToUser1612874191954'),
(3,1612874378539,'CreateVozilo1612874378539'),
(4,1612874623696,'CreateParkiralisteAndBoravak1612874623696'),
(5,1612874765453,'CreateRacun1612874765453'),
(6,1612874907388,'UpdateRacun1612874907388'),
(7,1612876217959,'RemoveParkiralisteFromRacun1612876217959'),
(8,1612876574109,'AddUserToRacun1612876574109'),
(9,1612877284155,'AddCenaSataToParkiraliste1612877284155'),
(10,1612877429211,'AddColumnPlacenToBoravak1612877429211'),
(11,1613058291566,'AddRacunToBoravak1613058291566');

/*Table structure for table `parkiraliste` */

DROP TABLE IF EXISTS `parkiraliste`;

CREATE TABLE `parkiraliste` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `naziv` varchar(255) NOT NULL,
  `adresa` varchar(255) NOT NULL,
  `kapacitet` int(11) NOT NULL,
  `cenaSata` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

/*Data for the table `parkiraliste` */

insert  into `parkiraliste`(`id`,`naziv`,`adresa`,`kapacitet`,`cenaSata`) values 
(5,'Parkiraliste 1','Beogradska 2',100,80),
(6,'Parkiraliste 2','Smederevska 15',77,66);

/*Table structure for table `racun` */

DROP TABLE IF EXISTS `racun`;

CREATE TABLE `racun` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `datumKreiranja` datetime NOT NULL,
  `iznos` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_6482c92379316c5ff01c2b974e2` (`userId`),
  CONSTRAINT `FK_6482c92379316c5ff01c2b974e2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4;

/*Data for the table `racun` */

insert  into `racun`(`id`,`datumKreiranja`,`iznos`,`userId`) values 
(46,'2021-11-23 21:17:26',99,1),
(47,'2021-11-23 21:18:48',20,1),
(48,'2021-11-23 22:01:08',284,1);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `categoryId` int(11) DEFAULT 1,
  `odobren` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_4dd13cf5536c5ec906dba37cbef` (`categoryId`),
  CONSTRAINT `FK_4dd13cf5536c5ec906dba37cbef` FOREIGN KEY (`categoryId`) REFERENCES `user_category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

/*Data for the table `user` */

insert  into `user`(`id`,`firstName`,`lastName`,`age`,`username`,`password`,`categoryId`,`odobren`) values 
(1,'Marko','Markovic',30,'marko','/1rBkZBCSx2I+UGe+UmuVtAZp0jJM1e9HDddYbjpYF4=',2,1),
(2,'pera','pera',12,'pera','/1rBkZBCSx2I+UGe+UmuVsti7F+TdSMdgtq6kndUITE=',1,1),
(3,'Sara','Saric',25,'sara','/1rBkZBCSx2I+UGe+UmuVuOj1dvxRM+TIi/xgWkU7MM=',1,0);

/*Table structure for table `user_category` */

DROP TABLE IF EXISTS `user_category`;

CREATE TABLE `user_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `user_category` */

insert  into `user_category`(`id`,`value`) values 
(1,'user'),
(2,'admin');

/*Table structure for table `vozilo` */

DROP TABLE IF EXISTS `vozilo`;

CREATE TABLE `vozilo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `registracija` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4;

/*Data for the table `vozilo` */

insert  into `vozilo`(`id`,`registracija`) values 
(23,'BG1234AA'),
(24,'SD1234BB'),
(25,'NS3344SS'),
(26,'NI7878EE'),
(27,'KG3333BB'),
(28,'PO777XX');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
