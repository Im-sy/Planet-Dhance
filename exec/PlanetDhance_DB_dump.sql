-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: i7d201.p.ssafy.io    Database: planetdhance
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `artist`
--

DROP TABLE IF EXISTS `artist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artist` (
  `artist_id` bigint NOT NULL,
  `img_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_weight` bigint DEFAULT NULL,
  PRIMARY KEY (`artist_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artist`
--

LOCK TABLES `artist` WRITE;
/*!40000 ALTER TABLE `artist` DISABLE KEYS */;
INSERT INTO `artist` VALUES (29,'/resource/artist/img/nayeon.jpg','NAYEON',5),(33,'/resource/artist/img/bts.JPG','BTS',20),(37,'/resource/artist/img/chungha.jpg','CHUNG HA',0),(41,'/resource/artist/img/twice.jpg','TWICE',0),(45,'/resource/artist/img/snsd.jpg','Girls\' Generation',0),(49,'/resource/artist/img/ive.jpg','IVE',2),(53,'/resource/artist/img/iu.jpg','IU',4),(57,'/resource/artist/img/seventeen.jpeg','SEVENTEEN',0),(61,'/resource/artist/img/superjunior.jpg','SUPER JUNIOR',3),(65,'/resource/artist/img/gidle.jpg','(G)I-DLE',0);
/*!40000 ALTER TABLE `artist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clear`
--

DROP TABLE IF EXISTS `clear`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clear` (
  `clear_id` bigint NOT NULL,
  `music_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`clear_id`),
  KEY `FKmaini1glt5isfh8eujb3osqw` (`music_id`),
  KEY `FKpgen0rbjdsn9qaiddny0rvsvj` (`user_id`),
  CONSTRAINT `FKmaini1glt5isfh8eujb3osqw` FOREIGN KEY (`music_id`) REFERENCES `music` (`music_id`),
  CONSTRAINT `FKpgen0rbjdsn9qaiddny0rvsvj` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clear`
--

LOCK TABLES `clear` WRITE;
/*!40000 ALTER TABLE `clear` DISABLE KEYS */;
INSERT INTO `clear` VALUES (174,34,25),(175,30,25),(176,30,27),(281,66,25),(677,34,184),(690,42,184),(707,42,436),(758,30,430),(773,34,436),(794,62,436),(809,30,436),(822,30,651),(829,54,430),(872,62,430),(880,34,430),(891,58,430),(900,30,427),(907,30,445),(932,34,445),(959,38,430),(967,62,651),(977,30,974),(984,42,974),(992,34,974),(999,66,974),(1006,50,974),(1013,62,974),(1024,38,974),(1031,54,974),(1038,46,974),(1045,58,974);
/*!40000 ALTER TABLE `clear` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow` (
  `follow_id` bigint NOT NULL,
  `from_id` bigint DEFAULT NULL,
  `to_id` bigint DEFAULT NULL,
  PRIMARY KEY (`follow_id`),
  KEY `FK2rakgi62l6nr92ebugkknrvc8` (`from_id`),
  KEY `FKked4y51ngebkbltd0wbbtyfbm` (`to_id`),
  CONSTRAINT `FK2rakgi62l6nr92ebugkknrvc8` FOREIGN KEY (`from_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `FKked4y51ngebkbltd0wbbtyfbm` FOREIGN KEY (`to_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
INSERT INTO `follow` VALUES (177,25,27),(178,27,25),(432,427,25),(441,436,25),(496,430,184),(569,430,427),(674,430,25),(888,184,430),(889,184,25),(1020,974,436),(1021,974,430),(1022,974,445),(1023,974,184),(1071,436,430),(1072,436,445),(1073,436,184),(1074,436,974),(1084,25,184);
/*!40000 ALTER TABLE `follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (1085);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `like_id` bigint NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `video_id` bigint DEFAULT NULL,
  PRIMARY KEY (`like_id`),
  KEY `FKnvx9seeqqyy71bij291pwiwrg` (`user_id`),
  KEY `FKoncu0qreesko543aih9fxmg4k` (`video_id`),
  CONSTRAINT `FKnvx9seeqqyy71bij291pwiwrg` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FKoncu0qreesko543aih9fxmg4k` FOREIGN KEY (`video_id`) REFERENCES `video` (`video_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (99,25,94),(100,27,94),(106,25,101),(107,27,101),(113,25,108),(114,27,108),(120,25,115),(121,27,115),(128,27,122),(360,184,84),(393,184,89),(423,184,79),(434,427,115),(435,427,310),(439,184,159),(450,184,139),(452,184,122),(453,184,115),(486,27,169),(588,430,101),(628,427,614),(629,427,607),(636,427,630),(675,445,541),(860,651,852),(861,651,836),(887,184,852),(890,427,852),(898,430,303),(899,430,466),(1057,430,978),(1058,974,836),(1059,974,630),(1060,974,614),(1061,974,541),(1062,430,691),(1063,974,830),(1064,430,780),(1065,430,1014),(1066,974,488),(1067,974,920),(1068,974,892),(1069,974,881),(1070,974,788),(1075,436,873),(1076,436,1032),(1077,436,939),(1078,436,914),(1079,436,614),(1080,436,752),(1081,436,1007);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `music`
--

DROP TABLE IF EXISTS `music`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `music` (
  `music_id` bigint NOT NULL,
  `guide_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `img_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `model_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mv_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rel_date` datetime DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `artist_artist_id` bigint DEFAULT NULL,
  PRIMARY KEY (`music_id`),
  KEY `FKq6qkb3rw1y8uhiv3wknh0hekh` (`artist_artist_id`),
  CONSTRAINT `FKq6qkb3rw1y8uhiv3wknh0hekh` FOREIGN KEY (`artist_artist_id`) REFERENCES `artist` (`artist_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `music`
--

LOCK TABLES `music` WRITE;
/*!40000 ALTER TABLE `music` DISABLE KEYS */;
INSERT INTO `music` VALUES (30,'/resource/music/guide/pop_guide.mp4','/resource/music/img/pop_img.jpg','model url1','https://youtu.be/f6YDKF0LVWw','2022-06-24 00:00:00','POP!',29),(34,'/resource/music/guide/PtoD_guide.mp4','/resource/music/img/PtoD_img.jpg','model url1','https://youtu.be/CuklIb9d3fI','2021-07-09 00:00:00','Permission to Dance',33),(38,'/resource/music/guide/sparkling_guide.mp4','/resource/music/img/sparkling_img.jpg','model url1','https://youtu.be/lDV5cM9YE4g','2022-07-11 00:00:00','Sparkling',37),(42,'/resource/music/guide/TT_guide.mp4','/resource/music/img/TT_img.jpg','model url1','https://youtu.be/ePpPVE-GGJw','2016-10-24 00:00:00','TT',41),(46,'/resource/music/guide/Forever1_guide.mp4','/resource/music/img/Forever1_img.jpg','model url1','https://youtu.be/Qpf26PtBXgo','2022-08-05 00:00:00','FOREVER 1',45),(50,'/resource/music/guide/LoveDive_guide.mp4','/resource/music/img/lovedive_img.jpg','model url1','https://youtu.be/Y8JFxS1HlDo','2020-04-05 00:00:00','LOVE DIVE',49),(54,'/resource/music/guide/Patissiere_guide.mp4','/resource/music/img/Patissiere_img.png','model url1','https://youtu.be/bgQIzPnPI88','2010-11-13 00:00:00','my dream patissiere',53),(58,'/resource/music/guide/hot_guide.mp4','/resource/music/img/hot_img.jpg','model url1','https://youtu.be/gRnuFC4Ualw','2022-05-27 00:00:00','HOT',57),(62,'/resource/music/guide/SorrySorry_guide.mp4','/resource/music/img/SorrySorry_img.jpg','model url1','https://youtu.be/x6QA3m58DQw','2022-03-12 00:00:00','Sorry, Sorry',61),(66,'/resource/music/guide/Tomboy_guide.mp4','/resource/music/img/Tomboy_img.jpg','model url1','https://youtu.be/Jh4QFaPmdss','2022-03-14 00:00:00','TOMBOY',65);
/*!40000 ALTER TABLE `music` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nation`
--

DROP TABLE IF EXISTS `nation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nation` (
  `nation_id` bigint NOT NULL,
  `flag` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `img_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `x` double NOT NULL,
  `y` double NOT NULL,
  `z` double NOT NULL,
  PRIMARY KEY (`nation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nation`
--

LOCK TABLES `nation` WRITE;
/*!40000 ALTER TABLE `nation` DISABLE KEYS */;
INSERT INTO `nation` VALUES (1,'??','/resource/nation/img/korea.png','Korea',-3,-3,-2.5),(3,'??','/resource/nation/img/japan.png','Japan',-3,-3,-1.8),(5,'??','/resource/nation/img/vietnam.png','Vietnam',-1.8,-3.3,-2.7),(7,'??','/resource/nation/img/china.png','China',-1.7,-1.5,-4.2),(9,'??','/resource/nation/img/brazil.png','Brazil',1.8,-4.3,1.3),(11,'??','/resource/nation/img/egypt.png','Egypt',3.3,-3,-3),(13,'??','/resource/nation/img/usa.png','USA',-1.5,-3,3.5),(15,'??','/resource/nation/img/canada.png','Canada',-2.5,-1,4),(17,'??','/resource/nation/img/europe.png','Europe',5,0,0),(19,'??','/resource/nation/img/rsa.png','RSA',2,-4.5,-1),(21,'??','/resource/nation/img/australia.png','Australia',-0.3,-4.5,-0.7),(23,'?','/resource/nation/img/dhance.png','Dhance',-3,-3,-2.5);
/*!40000 ALTER TABLE `nation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ranking`
--

DROP TABLE IF EXISTS `ranking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ranking` (
  `ranking_id` bigint NOT NULL,
  `clear_cnt` int NOT NULL,
  `nation_id` bigint DEFAULT NULL,
  PRIMARY KEY (`ranking_id`),
  KEY `FK76xwoenv0mpj0rw09lrrnraed` (`nation_id`),
  CONSTRAINT `FK76xwoenv0mpj0rw09lrrnraed` FOREIGN KEY (`nation_id`) REFERENCES `nation` (`nation_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ranking`
--

LOCK TABLES `ranking` WRITE;
/*!40000 ALTER TABLE `ranking` DISABLE KEYS */;
INSERT INTO `ranking` VALUES (179,1,13),(180,2,1);
/*!40000 ALTER TABLE `ranking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `tag_id` bigint NOT NULL,
  `hit` int NOT NULL,
  `img_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (2,3,'/resource/nation/img/korea.png','Korea','NATION'),(4,0,'/resource/nation/img/japan.png','Japan','NATION'),(6,0,'/resource/nation/img/vietnam.png','Vietnam','NATION'),(8,0,'/resource/nation/img/china.png','China','NATION'),(10,0,'/resource/nation/img/brazil.png','Brazil','NATION'),(12,0,'/resource/nation/img/egypt.png','Egypt','NATION'),(14,0,'/resource/nation/img/usa.png','USA','NATION'),(16,0,'/resource/nation/img/canada.png','Canada','NATION'),(18,0,'/resource/nation/img/europe.png','Europe','NATION'),(20,0,'/resource/nation/img/rsa.png','RSA','NATION'),(22,0,'/resource/nation/img/australia.png','Australia','NATION'),(24,0,'/resource/nation/img/dhance.png','Dhance','NATION'),(26,140,'/resource/users/img/default/default_profile.png','user1','NICKNAME'),(28,25,'/resource/users/img/default/default_profile.png','user2','NICKNAME'),(31,26,'/resource/artist/img/nayeon.jpg','NAYEON','ARTIST'),(32,9,'/resource/music/img/pop_img.jpg','POP!','TITLE'),(35,36,'/resource/artist/img/bts.JPG','BTS','ARTIST'),(36,37,'/resource/music/img/PtoD_img.jpg','Permission to Dance','TITLE'),(39,6,'/resource/artist/img/chungha.jpg','CHUNG HA','ARTIST'),(40,6,'/resource/music/img/sparkling_img.jpg','Sparkling','TITLE'),(43,0,'/resource/artist/img/twice.jpg','TWICE','ARTIST'),(44,24,'/resource/music/img/TT_img.jpg','TT','TITLE'),(47,8,'/resource/artist/img/snsd.jpg','Girls\' Generation','ARTIST'),(48,3,'/resource/music/img/Forever1_img.jpg','FOREVER 1','TITLE'),(51,0,'/resource/artist/img/ive.jpg','IVE','ARTIST'),(52,4,'/resource/music/img/lovedive_img.jpg','LOVE DIVE','TITLE'),(55,5,'/resource/artist/img/iu.jpg','IU','ARTIST'),(56,5,'/resource/music/img/Patissiere_img.png','my dream patissiere','TITLE'),(59,1,'/resource/artist/img/seventeen.jpeg','SEVENTEEN','ARTIST'),(60,8,'/resource/music/img/hot_img.jpg','HOT','TITLE'),(63,13,'/resource/artist/img/superjunior.jpg','SUPER JUNIOR','ARTIST'),(64,6,'/resource/music/img/SorrySorry_img.jpg','Sorry, Sorry','TITLE'),(67,0,'/resource/artist/img/gidle.jpg','(G)I-DLE','ARTIST'),(68,8,'/resource/music/img/Tomboy_img.jpg','TOMBOY','TITLE'),(185,78,NULL,'jisy','NICKNAME'),(279,1,NULL,'planetDhance','CUSTOM'),(280,0,NULL,'ffyg','CUSTOM'),(324,0,NULL,'wow','CUSTOM'),(325,0,NULL,'good','CUSTOM'),(425,1,NULL,'ex1','NICKNAME'),(428,17,NULL,'isy','NICKNAME'),(431,76,NULL,'Hyo','NICKNAME'),(437,12,NULL,'1217jdk','NICKNAME'),(446,47,NULL,'epmeomeoem','NICKNAME'),(472,0,NULL,'ggggg','CUSTOM'),(487,0,NULL,'firstDhance','CUSTOM'),(505,0,NULL,'btsSecond','CUSTOM'),(513,0,NULL,'thridBTS','CUSTOM'),(521,0,NULL,'firstTT','CUSTOM'),(522,0,NULL,'myHeratTT','CUSTOM'),(531,0,NULL,'secondTT','CUSTOM'),(532,2,NULL,'numu eo ryo woo yo','CUSTOM'),(540,0,NULL,'ILoveTwice','CUSTOM'),(561,0,NULL,'ILoveBTS','CUSTOM'),(577,0,NULL,'numuhae!','CUSTOM'),(578,0,NULL,'numuhae','CUSTOM'),(579,0,NULL,'numuhae numuhae','CUSTOM'),(589,0,NULL,'TTTT','CUSTOM'),(596,0,NULL,'V','CUSTOM'),(597,0,NULL,'hiV','CUSTOM'),(598,0,NULL,'nanananananana','CUSTOM'),(612,0,NULL,'Yeah!','CUSTOM'),(613,0,NULL,'ILoveKR','CUSTOM'),(643,0,NULL,'shy','CUSTOM'),(652,0,NULL,'isy5111','NICKNAME'),(676,0,NULL,'dfdfd','CUSTOM'),(698,0,NULL,'nu mu had!','CUSTOM'),(727,0,NULL,'realTT','CUSTOM'),(744,0,NULL,'ILoveRM','CUSTOM'),(757,0,NULL,'lmao','CUSTOM'),(842,0,NULL,'HA','CUSTOM'),(843,0,NULL,'HAHA','CUSTOM'),(871,0,NULL,'elf','CUSTOM'),(951,0,NULL,'harnd','CUSTOM'),(975,45,NULL,'isyisy','NICKNAME'),(1054,0,NULL,'jhi','NICKNAME');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temp_file`
--

DROP TABLE IF EXISTS `temp_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temp_file` (
  `file_id` bigint NOT NULL,
  `file_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`file_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temp_file`
--

LOCK TABLES `temp_file` WRITE;
/*!40000 ALTER TABLE `temp_file` DISABLE KEYS */;
/*!40000 ALTER TABLE `temp_file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `dtype` varchar(31) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `img_url` longtext COLLATE utf8mb4_unicode_ci,
  `introduce` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nickname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reg_date` datetime DEFAULT NULL,
  `renew_date` datetime DEFAULT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pwd` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `o_auth2sub` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nation_id` bigint DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `FKdv8r34m6dy3iet0g3uh10socl` (`nation_id`),
  CONSTRAINT `FKdv8r34m6dy3iet0g3uh10socl` FOREIGN KEY (`nation_id`) REFERENCES `nation` (`nation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('Basic',25,'email1@xx.xx','/resource/users/img/default/default_profile.png','hello!','user1','2022-08-18 16:35:35','2022-08-18 23:11:43','USER','123',NULL,1),('Basic',27,'email2@xx.xx','/resource/users/img/default/default_profile.png','hello!','user2','2022-08-18 16:35:35','2022-08-18 16:35:47','USER','123',NULL,13),('Basic',184,'jisy2718@gmail.com','/resource/users/img/default/default_profile.png','','jisy','2022-08-18 16:54:02','2022-08-18 23:44:58','USER','123123',NULL,1),('Basic',424,'ex1@xx.xx','/resource/users/img/default/default_profile.png','','ex1','2022-08-18 18:02:20','1000-01-01 09:00:00','USER','123',NULL,1),('Basic',427,'isy@xx.xx','/resource/users/img/default/default_profile.png','','isy','2022-08-18 18:40:56','2022-08-19 00:10:04','USER','123',NULL,1),('Basic',430,'nktion@naver.com','/resource/users/img/default/default_profile.png','','Hyo','2022-08-18 18:41:48','2022-08-19 00:18:36','USER','123',NULL,1),('Basic',436,'1217jdk@naver.com','/resource/users/img/default/default_profile.png','','1217jdk','2022-08-18 18:42:50','2022-08-18 23:48:37','USER','123',NULL,1),('Basic',445,'mingyov@naver.com','/resource/users/img/default/default_profile.png','','epmeomeoem','2022-08-18 19:44:26','2022-08-19 00:17:34','USER','123',NULL,21),('Basic',651,'isy5111@naver.com','/resource/users/img/default/default_profile.png','','isy5111','2022-08-18 22:39:12','2022-08-19 00:29:15','USER','123',NULL,15),('Basic',974,'isy@ssafy.com','/resource/users/img/default/default_profile.png','','isyisy','2022-08-19 00:40:25','2022-08-19 01:08:45','USER','123',NULL,5),('Basic',1053,'zaq1290@naver.com','/resource/users/img/default/default_profile.png','','jhi','2022-08-19 02:16:19','1000-01-01 09:00:00','USER','asdf',NULL,3);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `validate`
--

DROP TABLE IF EXISTS `validate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `validate` (
  `validate_id` bigint NOT NULL,
  `token` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`validate_id`),
  KEY `FKe5a5wt5vissd3urrkb38nwq35` (`user_id`),
  CONSTRAINT `FKe5a5wt5vissd3urrkb38nwq35` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `validate`
--

LOCK TABLES `validate` WRITE;
/*!40000 ALTER TABLE `validate` DISABLE KEYS */;
INSERT INTO `validate` VALUES (504,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0MjciLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwiZGV0YWlscyI6eyJ1c2VySWQiOjQyNywibmlja25hbWUiOiJpc3kiLCJuYXRpb25OYW1lIjoiS29yZWEiLCJyb2xlcyI6WyJST0xFX1VTRVIiXX0sImlhdCI6MTY2MDgyNjU0NCwiZXhwIjoxNjYwOTEyOTQ0fQ.nezH19F639Ues-zE78uROcBdCgPjF6DrEqbWRhSEuaw',427),(570,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0MzYiLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwiZGV0YWlscyI6eyJ1c2VySWQiOjQzNiwibmlja25hbWUiOiIxMjE3amRrIiwibmF0aW9uTmFtZSI6IktvcmVhIiwicm9sZXMiOlsiUk9MRV9VU0VSIl19LCJpYXQiOjE2NjA4MjczMzMsImV4cCI6MTY2MDkxMzczM30.40xVjUbbHKvIPW4z21Z2SRNgfjH9vXtKx6SDPu3Um_U',436),(654,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0NDUiLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwiZGV0YWlscyI6eyJ1c2VySWQiOjQ0NSwibmlja25hbWUiOiJlcG1lb21lb2VtIiwibmF0aW9uTmFtZSI6IkF1c3RyYWxpYSIsInJvbGVzIjpbIlJPTEVfVVNFUiJdfSwiaWF0IjoxNjYwODMwNDQ3LCJleHAiOjE2NjA5MTY4NDd9.Fd4TrVffv8qgEO9zT7eOlIPfgoOhIhLw2w0oBbgDzqE',445),(991,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0MzAiLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwiZGV0YWlscyI6eyJ1c2VySWQiOjQzMCwibmlja25hbWUiOiJIeW8iLCJuYXRpb25OYW1lIjoiS29yZWEiLCJyb2xlcyI6WyJST0xFX1VTRVIiXX0sImlhdCI6MTY2MDgzNzQ2OCwiZXhwIjoxNjYwOTIzODY4fQ.De0c22hovGDIDj3L2Q2jsfX1lPcs9_aCm7TRGV4Wlco',430),(1052,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5NzQiLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwiZGV0YWlscyI6eyJ1c2VySWQiOjk3NCwibmlja25hbWUiOiJpc3lpc3kiLCJuYXRpb25OYW1lIjoiVmlldG5hbSIsInJvbGVzIjpbIlJPTEVfVVNFUiJdfSwiaWF0IjoxNjYwODQyNTU3LCJleHAiOjE2NjA5Mjg5NTd9.jaSES5owiR5ehjCQlcWnAtySR7c0nrH1DxIAf4ref6Q',974),(1082,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNSIsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJkZXRhaWxzIjp7InVzZXJJZCI6MjUsIm5pY2tuYW1lIjoidXNlcjEiLCJuYXRpb25OYW1lIjoiS29yZWEiLCJyb2xlcyI6WyJST0xFX1VTRVIiXX0sImlhdCI6MTY2MDg0NzQ3MywiZXhwIjoxNjYwOTMzODczfQ.kNMTFIX3AueaKZROt2ArWOSo3OR9Fo2S6trLzQJj2gg',25);
/*!40000 ALTER TABLE `validate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video`
--

DROP TABLE IF EXISTS `video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `video` (
  `video_id` bigint NOT NULL,
  `hit` bigint DEFAULT NULL,
  `img_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_weight` bigint DEFAULT NULL,
  `reg_date` datetime DEFAULT NULL,
  `scope` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `video_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `music_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`video_id`),
  KEY `FKd76m7v7ktymnn58wrledj5b3i` (`music_id`),
  KEY `FK2k5fkq9vwjoxc3ne82hh280t0` (`user_id`),
  CONSTRAINT `FK2k5fkq9vwjoxc3ne82hh280t0` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FKd76m7v7ktymnn58wrledj5b3i` FOREIGN KEY (`music_id`) REFERENCES `music` (`music_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video`
--

LOCK TABLES `video` WRITE;
/*!40000 ALTER TABLE `video` DISABLE KEYS */;
INSERT INTO `video` VALUES (69,0,'//resource/video/img/KakaoTalk_20220818_232718373_03.jpg',3,'2022-08-18 16:35:39','PUBLIC','/temp/c2d6f99a-8e0c-4413-a8ab-6e809b6b7d1b.webm',34,25),(74,1,'//resource/video/img/KakaoTalk_20220818_232718373_05.jpg',4,'2022-08-18 16:35:39','PUBLIC','/temp/c2d6f99a-8e0c-4413-a8ab-6e809b6b7d1b.webm',34,25),(79,3,'//resource/video/img/20220818_233521.jpg',90,'2022-08-18 16:35:40','PUBLIC','/temp/c2d6f99a-8e0c-4413-a8ab-6e809b6b7d1b.webm',34,25),(84,4,'//resource/video/img/KakaoTalk_20220818_220222201_02.jpg',31,'2022-08-18 16:35:40','PUBLIC','/temp/c2d6f99a-8e0c-4413-a8ab-6e809b6b7d1b.webm',34,25),(89,6,'//resource/video/img/KakaoTalk_20220818_232718373_09.jpg',123,'2022-08-18 16:35:41','PUBLIC','/temp/c2d6f99a-8e0c-4413-a8ab-6e809b6b7d1b.webm',34,25),(94,2,'//resource/video/img/KakaoTalk_20220818_232718373_02.jpg',128,'2022-08-18 16:35:41','PUBLIC','/temp/c2d6f99a-8e0c-4413-a8ab-6e809b6b7d1b.webm',30,25),(101,2,'//resource/video/img/KakaoTalk_20220818_211427995_22.jpg',23,'2022-08-18 16:35:42','PUBLIC','//resource/video/article/20220817_161009.mp4',30,25),(108,4,'//resource/video/img/KakaoTalk_20220818_220222201_01.jpg',16,'2022-08-18 16:35:42','PUBLIC','//resource/video/article/20220817_161033.mp4',30,25),(115,5,'//resource/video/img/KakaoTalk_20220818_211427995_17.jpg',53,'2022-08-18 16:35:43','PUBLIC','//resource/video/article/20220817_161120.mp4',30,25),(122,6,'//resource/video/img/KakaoTalk_20220818_232718373_06.jpg',108,'2022-08-18 16:35:43','PUBLIC','//resource/video/article/20220817_161234.mp4',30,25),(129,4,'//resource/video/img/KakaoTalk_20220818_211427995_08.jpg',4,'2022-08-18 16:35:44','PUBLIC','//resource/video/article/20220817_162529.mp4',30,27),(134,4,'//resource/video/img/20220818_233518.jpg',4,'2022-08-18 16:35:44','PUBLIC','//resource/video/article/20220817_162547.mp4',30,27),(139,5,'//resource/video/img/KakaoTalk_20220818_220222201.jpg',8,'2022-08-18 16:35:45','PUBLIC','//resource/video/article/20220817_163456.mp4',30,27),(144,6,'//resource/video/img/KakaoTalk_20220818_232718373_01.jpg',6,'2022-08-18 16:35:45','PUBLIC','//resource/video/article/20220817_163752.mp4',30,27),(149,7,'//resource/video/img/KakaoTalk_20220818_232718373_04.jpg',7,'2022-08-18 16:35:45','PUBLIC','//resource/video/article/20220817_161009.mp4',30,27),(154,1,'//resource/video/img/20220818_233513.jpg',7,'2022-08-18 16:35:46','PUBLIC','//resource/video/article/20220817_161033.mp4',30,27),(159,2,'//resource/video/img/20220818_233524.jpg',11,'2022-08-18 16:35:46','PUBLIC','//resource/video/article/20220817_161120.mp4',30,27),(164,3,'//resource/video/img/KakaoTalk_20220818_232718373.jpg',12,'2022-08-18 16:35:47','PUBLIC','//resource/video/article/20220817_161234.mp4',30,27),(169,5,'//resource/video/img/20220818_233504.jpg',44,'2022-08-18 16:35:47','PUBLIC','//resource/video/article/20220817_162529.mp4',30,27),(282,1,'//resource/video/img/KakaoTalk_20220818_232718373_08.jpg',1,'2022-08-18 17:10:04','PUBLIC','//resource/video/article/20220817_162547.mp4',66,25),(289,0,'//resource/video/img/KakaoTalk_20220819_010211483.jpg',0,'2022-08-18 17:10:06','PUBLIC','//resource/video/article/20220817_163456.mp4',66,25),(296,0,'//resource/video/img/KakaoTalk_20220819_010210583.jpg',0,'2022-08-18 17:10:07','PUBLIC','//resource/video/article/20220817_163752.mp4',66,25),(303,0,'//resource/video/img/KakaoTalk_20220819_010211087.jpg',3,'2022-08-18 17:10:09','PUBLIC','//resource/video/article/811732f7-96ec-439b-bf71-c6b80daab501.webm',66,25),(310,0,'//resource/video/img/2ee8c25a-5e11-4d3a-8a5b-5df9509d8122.png',3,'2022-08-18 17:10:13','PUBLIC','//resource/video/article/ec06a990-0387-4710-ab05-73b86f397d3f.webm',66,974),(326,0,'//resource/video/img/758896fe-495e-45de-be0c-eb0416fc1109.png',0,'2022-08-18 17:10:43','PUBLIC','//resource/video/article/a3ef57d6-1723-4812-a342-f2ca235b7073.webm',66,25),(333,1,'//resource/video/img/240a0d6f-96e5-4b46-8a46-cd955706f605.png',1,'2022-08-18 17:10:51','PUBLIC','//resource/video/article/3ce3835a-9172-4d32-8843-d664ef39300f.webm',66,25),(339,0,'//resource/video/img/09afc9aa-9963-4cd1-9f5c-58672648506c.png',0,'2022-08-18 17:11:46','PUBLIC','//resource/video/article/61d28357-84c7-4310-98d9-35ec12a09c31.webm',66,25),(345,0,'//resource/video/img/367260d2-e5f3-44ba-940d-726b657c6f2b.png',0,'2022-08-18 17:11:48','PUBLIC','//resource/video/article/ed80f8de-0d8e-4490-bbcb-18cb7912dfbc.webm',66,25),(454,0,'//resource/video/img/689097f1-d99f-41d8-80e3-b2bfd4330730.png',0,'2022-08-18 21:21:53','PUBLIC','//resource/video/article/e765e1b1-d0f1-4bf9-9f1b-2e68434e394a.webm',34,184),(460,0,'//resource/video/img/fed6c7f7-e071-4e83-9124-6ba95fafda50.png',0,'2022-08-18 21:22:05','PUBLIC','//resource/video/article/8d0f8e68-31d9-4288-9e03-64d17ae6bd25.webm',34,184),(466,0,'//resource/video/img/2ec646a2-72f5-4d34-8b77-fcaa1c129c2a.png',3,'2022-08-18 21:22:10','PUBLIC','//resource/video/article/2ef60c8e-63f9-4f82-9ec1-a0595a43aae2.webm',34,184),(473,0,'//resource/video/img/63ec2342-38b3-4701-9385-6ea501c0dcec.png',0,'2022-08-18 21:22:43','PUBLIC','//resource/video/article/b8cfdaf4-ac91-49b0-95f9-8b0466264704.webm',34,184),(479,0,'//resource/video/img/9c53540e-82ca-46b7-9b46-a1134e472e36.png',0,'2022-08-18 21:23:24','PUBLIC','//resource/video/article/505ef3f0-1cc8-4d4e-a672-db63291276f5.webm',66,25),(488,2,'//resource/video/img/3892fc7f-682e-4b71-9f78-2e563ad138de.png',5,'2022-08-18 21:32:20','PUBLIC','//resource/video/article/3814c7f1-7f5d-485e-985f-d6e2326bb885.webm',34,184),(498,0,'//resource/video/img/e227e12a-7e02-4686-9631-1edef3bef66f.png',0,'2022-08-18 21:41:20','PUBLIC','//resource/video/article/c7d4f75c-9506-4bdf-a768-f6c1dbfe31db.webm',38,184),(506,0,'//resource/video/img/791f48e4-67e1-4a2e-8dde-145e23c8563b.png',0,'2022-08-18 21:43:51','PUBLIC','//resource/video/article/bdfce125-e95a-4cb2-92c1-99f8bd292ce9.webm',34,184),(514,1,'//resource/video/img/6b8608f5-fac7-47b1-b6e3-ff84265cd2fe.png',1,'2022-08-18 21:45:52','PUBLIC','//resource/video/article/2243ded2-c8e4-4ffc-bf7d-4415057a8aa5.webm',34,184),(523,0,'//resource/video/img/0ee8d27a-2063-4102-ac08-83537044134a.png',0,'2022-08-18 21:47:29','PUBLIC','//resource/video/article/b9f848c0-e883-47cd-8c74-4f514e11930b.webm',42,184),(533,0,'//resource/video/img/3eed99d7-5fde-4097-b2a2-306be337c517.png',0,'2022-08-18 21:50:41','PUBLIC','//resource/video/article/72b7a6c8-55cc-45d4-87c1-2c94d0880b2b.webm',42,184),(541,1,'//resource/video/img/79369df5-7975-4c3c-8ebf-7cebb73caa35.png',7,'2022-08-18 21:51:28','PUBLIC','//resource/video/article/e83874d5-17ea-4633-82d3-cc2e59f4d1cb.webm',42,184),(554,0,'//resource/video/img/dfbb7309-3d59-4f1b-b23f-5946aff24bcb.png',0,'2022-08-18 21:52:31','PUBLIC','//resource/video/article/b9d18925-8923-4e28-9a7a-4e0e18f89cc8.webm',42,184),(562,0,'//resource/video/img/d958652a-cfb7-48ef-a9f0-188176fb534d.png',0,'2022-08-18 21:53:58','PUBLIC','//resource/video/article/cad4f9fb-317e-4f3c-b9fa-f62b8d67fa98.webm',34,184),(571,0,'//resource/video/img/27d63597-9faa-432a-8a53-7f87a114a142.png',0,'2022-08-18 21:56:19','PUBLIC','//resource/video/article/1a6fe058-2d10-4629-abef-fdf9422c00f5.webm',34,436),(580,1,'//resource/video/img/61a1dfaf-5abe-4e43-a0a6-dd1567e6c395.png',1,'2022-08-18 21:56:43','PUBLIC','//resource/video/article/4a68b12b-5b30-4a80-946e-f1663f459661.webm',42,184),(590,0,'//resource/video/img/62b8d9cb-40fb-4c0c-8d4d-92b33831be4c.png',0,'2022-08-18 21:57:11','PUBLIC','//resource/video/article/ab33dda8-57f4-4c95-9d4f-7ac5b6c020f8.webm',42,184),(599,0,'//resource/video/img/21e36d66-9868-4107-9a7b-e8cb997ce807.png',0,'2022-08-18 21:59:10','PUBLIC','//resource/video/article/455f70e0-66cf-456b-9a53-bbe601110dbf.webm',34,184),(607,1,'//resource/video/img/aa4b0e39-95d2-4d83-a1ae-e291aaf35122.png',1,'2022-08-18 21:59:55','PUBLIC','//resource/video/article/dd1721ec-0456-442e-a1a4-60e7455f8c8c.webm',34,436),(614,1,'//resource/video/img/6128cbfc-e29a-4399-b9cf-d90b609619d1.png',10,'2022-08-18 22:02:57','PUBLIC','//resource/video/article/df655767-7ede-4052-86f4-537ef66b5644.webm',34,184),(630,2,'//resource/video/img/53ec69d2-cb01-4021-b6d0-cc7261bffc24.png',8,'2022-08-18 22:27:41','PUBLIC','//resource/video/article/02c6e9f5-31a9-4438-8ddf-f472a0033666.webm',42,436),(637,0,'//resource/video/img/caa82198-fc13-4fbc-b60a-f96b3aaf71e3.png',0,'2022-08-18 22:32:31','PUBLIC','//resource/video/article/933d4c12-dc38-467e-9141-768062804ac2.webm',62,436),(668,0,'//resource/video/img/ae1c8bed-bab9-4281-b351-9987f1a4a4f7.png',0,'2022-08-18 22:58:15','PUBLIC','//resource/video/article/115a4487-c869-4d7d-9eab-f7635c1091a3.webm',62,436),(678,0,'//resource/video/img/20220818_233504.jpg',0,'2022-08-18 23:10:12','PUBLIC','//resource/video/article/214f6957-4dc2-4bfc-85dc-e2682a15dfb5.webm',34,184),(691,1,'//resource/video/img/e753267d-0c31-45c8-8bd5-a6c0a196531e.png',4,'2022-08-18 23:21:16','PUBLIC','//resource/video/article/9039bdb5-a303-4086-adc1-05fb522e0333.webm',42,184),(699,0,'//resource/video/img/3b45fa95-3fe2-428e-999a-24572425817b.png',0,'2022-08-18 23:24:15','PUBLIC','//resource/video/article/d526b689-4d8d-45c7-89ab-168f0333159b.webm',42,184),(708,0,'//resource/video/img/dbc1defe-cc6a-41d0-8287-a3b210a13d24.png',0,'2022-08-18 23:27:58','PUBLIC','//resource/video/article/72d6feae-f524-4373-9f68-21aeacce1329.webm',42,436),(714,1,'//resource/video/img/f200b723-cb45-47dc-a8ab-fc9818a05456.png',1,'2022-08-18 23:28:32','PUBLIC','//resource/video/article/8eefbad8-fe50-4ec6-8e57-52ef03f54a65.webm',34,184),(720,0,'//resource/video/img/606553d3-f867-44b9-a98a-fb87624c8b0b.png',0,'2022-08-18 23:28:53','PUBLIC','//resource/video/article/4bf6cf19-38a8-4e7e-8747-fbe8305a943f.webm',34,184),(728,0,'//resource/video/img/06d4b07d-c7e4-4bf1-ba24-212506c86d63.png',0,'2022-08-18 23:30:44','PUBLIC','//resource/video/article/6a859c28-999f-4bdf-8e0b-6e11b5b132b3.webm',42,184),(736,0,'//resource/video/img/c6993426-4932-44d8-9b3a-24a3d5cef86f.png',0,'2022-08-18 23:31:34','PUBLIC','//resource/video/article/fd74273f-6209-4c69-a10a-c3738466460b.webm',42,184),(745,0,'//resource/video/img/cac90198-992e-4004-a7df-3abf9194f87e.png',0,'2022-08-18 23:34:10','PUBLIC','//resource/video/article/788f03e2-849c-411d-934d-2d544ffa28d0.webm',34,184),(752,0,'//resource/video/img/76d5fa77-3159-4b08-a3dd-a5d8f9aebebd.png',3,'2022-08-18 23:34:35','PUBLIC','//resource/video/article/03bfb926-464c-449a-ad26-28fe0902b765.webm',34,184),(759,0,'//resource/video/img/d5b5eb8c-a27d-4275-81c0-9dcfb81a1d15.png',0,'2022-08-18 23:35:38','PUBLIC','//resource/video/article/dda6ea9e-de57-4401-b414-7ecc91e124fb.webm',30,430),(766,0,'//resource/video/img/53daf72f-0c90-4d3d-a9a9-f9ecd12a3590.png',0,'2022-08-18 23:36:15','PUBLIC','//resource/video/article/59c74fce-55fd-4487-9771-8df924266452.webm',34,184),(774,0,'//resource/video/img/416c97ba-d58d-47e8-834b-2978c347524e.png',0,'2022-08-18 23:37:41','PUBLIC','//resource/video/article/4bc38284-a2ea-4387-91dc-5110dc83c987.webm',34,436),(780,1,'//resource/video/img/2b3883fb-7312-49ba-81fa-38766f511250.png',4,'2022-08-18 23:38:03','PUBLIC','//resource/video/article/f8fd7099-2987-45ab-8e12-c304e48356cf.webm',42,184),(788,1,'//resource/video/img/ce46c10b-24d5-456d-b74c-3a1f1c20974d.png',4,'2022-08-18 23:39:43','PUBLIC','//resource/video/article/8438e7d6-9cd0-425b-84ed-bfdc234ba087.webm',34,436),(795,0,'//resource/video/img/9195ecec-cc3c-45fe-9674-1b3caed023f4.png',0,'2022-08-18 23:41:45','PUBLIC','//resource/video/article/cc4d1af0-5745-4418-826f-8cd666c8fbe8.webm',62,436),(802,0,'//resource/video/img/8befd339-4ea0-4582-b043-40658f7a93c7.png',0,'2022-08-18 23:44:58','PUBLIC','//resource/video/article/ed04bd20-fae2-4e06-8e5b-fb918c5e582e.webm',34,184),(810,0,'//resource/video/img/70411dd8-da0f-4550-93a6-8a9f57e1dc45.png',0,'2022-08-18 23:45:18','PUBLIC','//resource/video/article/1468ec7d-1400-48ae-8632-d184ab2eb625.webm',30,436),(816,0,'//resource/video/img/fd78c652-c9bd-46e9-aefb-0e9e6e725aed.png',0,'2022-08-18 23:46:23','PUBLIC','//resource/video/article/4f4ff667-0cd2-4eff-8b47-3875fb788a17.webm',30,436),(823,0,'//resource/video/img/20220818_233518.jpg',0,'2022-08-18 23:47:00','PUBLIC','//resource/video/article/e8096a48-634d-44dc-8001-01c402d3b94d.webm',30,651),(830,0,'//resource/video/img/3c7a36a8-873b-4f63-809d-b4a60d10f20f.png',6,'2022-08-18 23:48:36','PUBLIC','//resource/video/article/bff19d30-360f-4934-83a2-f80666b5a746.webm',54,430),(836,2,'//resource/video/img/e2f1b2a3-7fb0-40da-bc3b-85067741fbe5.png',8,'2022-08-18 23:48:37','PUBLIC','//resource/video/article/0296e03a-5455-409e-9042-aaf7f6fbdd87.webm',30,436),(844,0,'//resource/video/img/f1425f65-92e8-4959-b06b-cb2add05cdd1.png',0,'2022-08-18 23:49:28','PUBLIC','//resource/video/article/39f08d3e-d587-4536-8229-321ea1cd44af.webm',54,430),(852,1,'//resource/video/img/c3fd3e3a-9f1b-45d6-b0ff-158aceb36f98.png',10,'2022-08-18 23:49:30','PUBLIC','//resource/video/article/aa2b7659-09ad-4fa4-923f-c55933271294.webm',54,430),(864,0,'//resource/video/img/20220818_233504.jpg',0,'2022-08-18 23:56:11','PUBLIC','//resource/video/article/adcfcd9a-5b35-4a82-802a-03db3a1e41b2.webm',30,651),(873,0,'//resource/video/img/1afe98bf-cda8-4e32-9a19-82f62575e442.png',3,'2022-08-18 23:57:31','PUBLIC','//resource/video/article/cb49d558-d0c5-4111-8d55-4762a7ecd83f.webm',62,430),(881,1,'//resource/video/img/8f47a619-b24e-46b9-9a01-70d18cb31153.png',4,'2022-08-18 23:58:59','PUBLIC','//resource/video/article/92f9e3cf-aaba-4c7e-9b16-f5099b0a8212.webm',34,430),(892,1,'//resource/video/img/f181b016-57a3-43c6-90a8-ffb506217d4d.png',4,'2022-08-19 00:08:15','PUBLIC','//resource/video/article/2c1a2158-9326-4ec2-99e1-3b9d9d155ba9.webm',58,430),(901,0,'//resource/video/img/f55693d1-c68c-4d81-b26e-fc391b4dc821.png',0,'2022-08-19 00:10:04','PUBLIC','//resource/video/article/728194fd-be19-4cfc-8b58-c3507bab8f66.webm',30,427),(908,1,'//resource/video/img/3d039051-ee55-417a-9e00-d7e04c803cda.png',1,'2022-08-19 00:12:34','PUBLIC','//resource/video/article/09ea0d7e-b3e0-4646-9df6-bbb0ac72ee14.webm',30,445),(914,2,'//resource/video/img/7027e132-ae0e-415b-af09-655ee482938e.png',5,'2022-08-19 00:12:40','PUBLIC','//resource/video/article/9e613d0c-36c3-4274-bd47-17838275db57.webm',30,445),(920,2,'//resource/video/img/27d96201-3f66-4cde-8f84-7f508163e040.png',5,'2022-08-19 00:12:50','PUBLIC','//resource/video/article/676ac428-d83a-495d-a784-0cfcefb301f8.webm',30,445),(933,0,'//resource/video/img/d0d9130f-0b6e-41df-85ad-0ede8a9388df.png',0,'2022-08-19 00:17:17','PUBLIC','//resource/video/article/7d1f4dcd-d62c-43a6-b662-886c5bb18ff8.webm',34,445),(939,0,'//resource/video/img/a8401313-ccd3-4e4e-9602-239850d99469.png',3,'2022-08-19 00:17:18','PUBLIC','//resource/video/article/0c7e12fa-2fe5-4f59-ba4e-84f7767c8962.webm',34,445),(945,0,'//resource/video/img/8875f30b-4ec5-4094-ab22-61ea9a5c5539.png',0,'2022-08-19 00:17:32','PUBLIC','//resource/video/article/8a118736-618b-4c15-a749-6a79c5a38886.webm',34,445),(952,0,'//resource/video/img/f66caa40-70cb-472f-bf64-7e0fe950bae2.png',0,'2022-08-19 00:17:34','PUBLIC','//resource/video/article/961de5b7-5763-4fcd-9c74-772d407e27db.webm',34,445),(960,0,'//resource/video/img/d69e006a-af6a-472e-8eee-127eff6085e1.png',0,'2022-08-19 00:18:36','PUBLIC','//resource/video/article/385b34b9-9f3f-4829-b3fe-7a50549d7915.webm',38,430),(968,1,'//resource/video/img/d8c849a3-5480-4dc3-a499-0fee213930ee.png',1,'2022-08-19 00:29:15','PUBLIC','//resource/video/article/97001cf8-3eb9-4867-a60b-f4f1b531bf80.webm',62,651),(978,2,'//resource/video/img/3fa87eea-a03c-4bfb-bb7d-fc6bc0d2e3c3.png',5,'2022-08-19 00:41:47','PUBLIC','//resource/video/article/7e571a59-e165-46a0-aac8-e810e35d4de2.webm',30,974),(985,3,'//resource/video/img/0b26eedc-e518-4518-aac8-ceb2ad29df72.png',3,'2022-08-19 00:43:33','PUBLIC','//resource/video/article/220a1cea-7f63-457a-be02-54a8919ea18a.webm',42,974),(993,1,'//resource/video/img/445c6607-c48e-49c2-8bbf-31f16429d024.png',1,'2022-08-19 00:44:38','PUBLIC','//resource/video/article/4976900e-9a30-425c-a01c-af8512490d83.webm',34,974),(1000,1,'//resource/video/img/f96a7f03-af76-4a9b-88cf-7f0642708110.png',1,'2022-08-19 00:45:59','PUBLIC','//resource/video/article/ec06a990-0387-4710-ab05-73b86f397d3f.webm',66,974),(1007,1,'//resource/video/img/2ee8c25a-5e11-4d3a-8a5b-5df9509d8122.png',4,'2022-08-19 00:48:47','PUBLIC','//resource/video/article/4da36322-e8a4-4aa6-a7c3-f3f987c4fb74.webm',50,974),(1014,1,'//resource/video/img/d43a99a2-009d-448f-a891-431d8a8b8191.png',4,'2022-08-19 00:51:11','PUBLIC','//resource/video/article/53dbcc3f-7030-483c-a1e1-1248817338e8.webm',62,974),(1025,1,'//resource/video/img/8cf4fe23-ec9c-46d0-8340-d301baafe9c6.png',1,'2022-08-19 01:01:27','PUBLIC','//resource/video/article/ddb407e3-18d5-43d4-ad35-a5481d8602ec.webm',38,974),(1032,1,'//resource/video/img/c68f40e8-27df-4bfe-aeb1-c5787b378bdb.png',4,'2022-08-19 01:04:11','PUBLIC','//resource/video/article/5481548c-3a0a-4f38-ba8c-42cedf1c6ea0.webm',54,974),(1039,3,'//resource/video/img/6763f6ed-aa01-477c-b640-536b3335bf7a.png',3,'2022-08-19 01:06:46','PUBLIC','//resource/video/article/adee73e7-6eee-42a5-bc05-24c2dd4b272d.webm',46,974),(1046,2,'//resource/video/img/756193f5-3933-4723-8bc4-a8443d3fe9da.png',2,'2022-08-19 01:08:45','PUBLIC','//resource/video/article/bb74f1b1-4f50-4996-bff8-fc58c1f37721.webm',58,974);
/*!40000 ALTER TABLE `video` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video_tag`
--

DROP TABLE IF EXISTS `video_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `video_tag` (
  `video_tag_id` bigint NOT NULL,
  `tag_id` bigint DEFAULT NULL,
  `video_id` bigint DEFAULT NULL,
  PRIMARY KEY (`video_tag_id`),
  KEY `FKoimfmujed58aojuxdekx4csml` (`tag_id`),
  KEY `FK7a7a4rx1y3tr2ycwuqcrf580b` (`video_id`),
  CONSTRAINT `FK7a7a4rx1y3tr2ycwuqcrf580b` FOREIGN KEY (`video_id`) REFERENCES `video` (`video_id`),
  CONSTRAINT `FKoimfmujed58aojuxdekx4csml` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video_tag`
--

LOCK TABLES `video_tag` WRITE;
/*!40000 ALTER TABLE `video_tag` DISABLE KEYS */;
INSERT INTO `video_tag` VALUES (70,26,69),(71,2,69),(72,35,69),(73,36,69),(75,26,74),(76,2,74),(77,35,74),(78,36,74),(80,26,79),(81,2,79),(82,35,79),(83,36,79),(85,26,84),(86,2,84),(87,35,84),(88,36,84),(90,26,89),(91,2,89),(92,35,89),(93,36,89),(95,26,94),(96,2,94),(97,31,94),(98,32,94),(102,26,101),(103,2,101),(104,31,101),(105,32,101),(109,26,108),(110,2,108),(111,31,108),(112,32,108),(116,26,115),(117,2,115),(118,31,115),(119,32,115),(123,26,122),(124,2,122),(125,31,122),(126,32,122),(130,28,129),(131,14,129),(132,31,129),(133,32,129),(135,28,134),(136,14,134),(137,31,134),(138,32,134),(140,28,139),(141,14,139),(142,31,139),(143,32,139),(145,28,144),(146,14,144),(147,31,144),(148,32,144),(150,28,149),(151,14,149),(152,31,149),(153,32,149),(155,28,154),(156,14,154),(157,31,154),(158,32,154),(160,28,159),(161,14,159),(162,31,159),(163,32,159),(165,28,164),(166,14,164),(167,31,164),(168,32,164),(170,28,169),(171,14,169),(172,31,169),(173,32,169),(283,26,282),(284,2,282),(285,68,282),(286,67,282),(287,279,282),(288,280,282),(290,26,289),(291,2,289),(292,68,289),(293,67,289),(294,279,289),(295,280,289),(297,26,296),(298,2,296),(299,68,296),(300,67,296),(301,279,296),(302,280,296),(304,26,303),(305,2,303),(306,68,303),(307,67,303),(308,279,303),(309,280,303),(311,26,310),(312,2,310),(313,68,310),(314,67,310),(315,279,310),(316,280,310),(327,26,326),(328,2,326),(329,68,326),(330,67,326),(331,324,326),(332,325,326),(334,26,333),(335,2,333),(336,68,333),(337,67,333),(338,279,333),(340,26,339),(341,2,339),(342,68,339),(343,67,339),(344,279,339),(346,26,345),(347,2,345),(348,68,345),(349,67,345),(350,279,345),(455,26,454),(456,2,454),(457,68,454),(458,67,454),(459,279,454),(461,26,460),(462,2,460),(463,68,460),(464,67,460),(465,279,460),(467,26,466),(468,2,466),(469,68,466),(470,67,466),(471,279,466),(474,26,473),(475,2,473),(476,68,473),(477,67,473),(478,472,473),(480,26,479),(481,2,479),(482,68,479),(483,67,479),(484,279,479),(489,26,488),(490,2,488),(491,68,488),(492,67,488),(493,279,488),(494,487,488),(499,26,498),(500,2,498),(501,68,498),(502,67,498),(503,279,498),(507,26,506),(508,2,506),(509,68,506),(510,67,506),(511,279,506),(512,505,506),(515,26,514),(516,2,514),(517,68,514),(518,67,514),(519,279,514),(520,513,514),(524,26,523),(525,2,523),(526,68,523),(527,67,523),(528,279,523),(529,521,523),(530,522,523),(534,26,533),(535,2,533),(536,68,533),(537,67,533),(538,531,533),(539,532,533),(542,26,541),(543,2,541),(544,68,541),(545,67,541),(546,532,541),(547,540,541),(555,26,554),(556,2,554),(557,68,554),(558,67,554),(559,540,554),(560,325,554),(563,26,562),(564,2,562),(565,68,562),(566,67,562),(567,279,562),(568,561,562),(572,26,571),(573,2,571),(574,68,571),(575,67,571),(576,279,571),(581,26,580),(582,2,580),(583,68,580),(584,67,580),(585,577,580),(586,578,580),(587,579,580),(591,26,590),(592,2,590),(593,68,590),(594,67,590),(595,589,590),(600,26,599),(601,2,599),(602,68,599),(603,67,599),(604,596,599),(605,597,599),(606,598,599),(608,26,607),(609,2,607),(610,68,607),(611,67,607),(615,26,614),(616,2,614),(617,68,614),(618,67,614),(619,612,614),(620,561,614),(621,613,614),(631,26,630),(632,2,630),(633,68,630),(634,67,630),(635,279,630),(638,26,637),(639,2,637),(640,68,637),(641,67,637),(642,279,637),(669,26,668),(670,2,668),(671,68,668),(672,67,668),(679,185,678),(680,2,678),(681,36,678),(682,35,678),(683,279,678),(684,676,678),(692,185,691),(693,2,691),(694,44,691),(695,43,691),(696,279,691),(697,540,691),(700,185,699),(701,2,699),(702,44,699),(703,43,699),(704,540,699),(705,589,699),(706,698,699),(709,437,708),(710,2,708),(711,44,708),(712,43,708),(713,279,708),(715,185,714),(716,2,714),(717,36,714),(718,35,714),(719,279,714),(721,185,720),(722,2,720),(723,36,720),(724,35,720),(725,279,720),(726,598,720),(729,185,728),(730,2,728),(731,44,728),(732,43,728),(733,279,728),(734,727,728),(735,540,728),(737,185,736),(738,2,736),(739,44,736),(740,43,736),(741,279,736),(742,727,736),(743,540,736),(746,185,745),(747,2,745),(748,36,745),(749,35,745),(750,279,745),(751,744,745),(753,185,752),(754,2,752),(755,36,752),(756,35,752),(760,431,759),(761,2,759),(762,32,759),(763,31,759),(764,279,759),(765,757,759),(767,185,766),(768,2,766),(769,36,766),(770,35,766),(771,279,766),(775,437,774),(776,2,774),(777,36,774),(778,35,774),(779,279,774),(781,185,780),(782,2,780),(783,44,780),(784,43,780),(785,279,780),(786,589,780),(787,324,780),(789,437,788),(790,2,788),(791,36,788),(792,35,788),(793,279,788),(796,437,795),(797,2,795),(798,64,795),(799,63,795),(800,279,795),(803,185,802),(804,2,802),(805,36,802),(806,35,802),(807,279,802),(808,561,802),(811,437,810),(812,2,810),(813,32,810),(814,31,810),(815,279,810),(817,437,816),(818,2,816),(819,32,816),(820,31,816),(821,279,816),(824,652,823),(825,16,823),(826,32,823),(827,31,823),(828,279,823),(831,431,830),(832,2,830),(833,56,830),(834,55,830),(835,279,830),(837,437,836),(838,2,836),(839,32,836),(840,31,836),(841,279,836),(845,431,844),(846,2,844),(847,56,844),(848,55,844),(849,279,844),(850,842,844),(851,843,844),(853,431,852),(854,2,852),(855,56,852),(856,55,852),(857,279,852),(858,842,852),(859,843,852),(865,652,864),(866,16,864),(867,32,864),(868,31,864),(869,279,864),(874,431,873),(875,2,873),(876,64,873),(877,63,873),(878,279,873),(879,871,873),(882,431,881),(883,2,881),(884,36,881),(885,35,881),(886,279,881),(893,431,892),(894,2,892),(895,60,892),(896,59,892),(897,279,892),(902,428,901),(903,2,901),(904,32,901),(905,31,901),(906,279,901),(909,446,908),(910,22,908),(911,32,908),(912,31,908),(913,279,908),(915,446,914),(916,22,914),(917,32,914),(918,31,914),(919,279,914),(921,446,920),(922,22,920),(923,32,920),(924,31,920),(925,279,920),(934,446,933),(935,22,933),(936,36,933),(937,35,933),(938,279,933),(940,446,939),(941,22,939),(942,36,939),(943,35,939),(944,279,939),(946,446,945),(947,22,945),(948,36,945),(949,35,945),(950,279,945),(953,446,952),(954,22,952),(955,36,952),(956,35,952),(957,279,952),(958,951,952),(961,431,960),(962,2,960),(963,40,960),(964,39,960),(965,279,960),(969,652,968),(970,16,968),(971,64,968),(972,63,968),(973,279,968),(979,975,978),(980,6,978),(981,32,978),(982,31,978),(983,279,978),(986,975,985),(987,6,985),(988,44,985),(989,43,985),(990,279,985),(994,975,993),(995,6,993),(996,36,993),(997,35,993),(998,279,993),(1001,975,1000),(1002,6,1000),(1003,68,1000),(1004,67,1000),(1005,279,1000),(1008,975,1007),(1009,6,1007),(1010,52,1007),(1011,51,1007),(1012,279,1007),(1015,975,1014),(1016,6,1014),(1017,64,1014),(1018,63,1014),(1019,279,1014),(1026,975,1025),(1027,6,1025),(1028,40,1025),(1029,39,1025),(1030,279,1025),(1033,975,1032),(1034,6,1032),(1035,56,1032),(1036,55,1032),(1037,279,1032),(1040,975,1039),(1041,6,1039),(1042,48,1039),(1043,47,1039),(1044,279,1039),(1047,975,1046),(1048,6,1046),(1049,60,1046),(1050,59,1046),(1051,279,1046);
/*!40000 ALTER TABLE `video_tag` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-19  3:38:19
