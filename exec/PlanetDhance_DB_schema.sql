-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema planetdhance_test
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema planetdhance_test
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `planetdhance_test` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `planetdhance_test` ;

-- -----------------------------------------------------
-- Table `planetdhance_test`.`music`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planetdhance_test`.`music` (
  `music_id` INT UNSIGNED NOT NULL,
  `artist` VARCHAR(255) NULL DEFAULT NULL,
  `guide_url` VARCHAR(255) NULL DEFAULT NULL,
  `img_url` VARCHAR(255) NULL DEFAULT NULL,
  `model_url` VARCHAR(255) NULL DEFAULT NULL,
  `mv_url` VARCHAR(255) NULL DEFAULT NULL,
  `title` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`music_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `planetdhance_test`.`nation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planetdhance_test`.`nation` (
  `nation_id` INT UNSIGNED NOT NULL,
  `flag` VARCHAR(255) NULL DEFAULT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`nation_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `planetdhance_test`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planetdhance_test`.`users` (
  `dtype` VARCHAR(31) NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  `img_url` VARCHAR(255) NULL DEFAULT NULL,
  `introduce` VARCHAR(255) NULL DEFAULT NULL,
  `nickname` VARCHAR(255) NULL DEFAULT NULL,
  `reg_date` DATETIME NULL DEFAULT NULL,
  `renew_date` DATETIME NULL DEFAULT NULL,
  `role` VARCHAR(255) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `pwd` VARCHAR(255) NULL DEFAULT NULL,
  `oauth2sub` VARCHAR(255) NULL DEFAULT NULL,
  `nation_id` INT UNSIGNED NULL DEFAULT NULL,
  `o_auth2sub` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  INDEX `FKdv8r34m6dy3iet0g3uh10socl` (`nation_id` ASC) VISIBLE,
  CONSTRAINT `FKdv8r34m6dy3iet0g3uh10socl`
    FOREIGN KEY (`nation_id`)
    REFERENCES `planetdhance_test`.`nation` (`nation_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `planetdhance_test`.`clear`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planetdhance_test`.`clear` (
  `clear_id` INT UNSIGNED NOT NULL,
  `music_id` INT UNSIGNED NULL DEFAULT NULL,
  `user_id` INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`clear_id`),
  INDEX `FKmaini1glt5isfh8eujb3osqw` (`music_id` ASC) VISIBLE,
  INDEX `FKpgen0rbjdsn9qaiddny0rvsvj` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FKmaini1glt5isfh8eujb3osqw`
    FOREIGN KEY (`music_id`)
    REFERENCES `planetdhance_test`.`music` (`music_id`),
  CONSTRAINT `FKpgen0rbjdsn9qaiddny0rvsvj`
    FOREIGN KEY (`user_id`)
    REFERENCES `planetdhance_test`.`users` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `planetdhance_test`.`follow`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planetdhance_test`.`follow` (
  `follow_id` INT UNSIGNED NOT NULL,
  `from_id` INT UNSIGNED NULL DEFAULT NULL,
  `to_id` INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`follow_id`),
  INDEX `FK2rakgi62l6nr92ebugkknrvc8` (`from_id` ASC) VISIBLE,
  INDEX `FKked4y51ngebkbltd0wbbtyfbm` (`to_id` ASC) VISIBLE,
  CONSTRAINT `FK2rakgi62l6nr92ebugkknrvc8`
    FOREIGN KEY (`from_id`)
    REFERENCES `planetdhance_test`.`users` (`user_id`),
  CONSTRAINT `FKked4y51ngebkbltd0wbbtyfbm`
    FOREIGN KEY (`to_id`)
    REFERENCES `planetdhance_test`.`users` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `planetdhance_test`.`hibernate_sequence`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planetdhance_test`.`hibernate_sequence` (
  `next_val` BIGINT NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `planetdhance_test`.`video`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planetdhance_test`.`video` (
  `video_id` INT UNSIGNED NOT NULL,
  `hit` INT NOT NULL,
  `img_url` VARCHAR(255) NULL DEFAULT NULL,
  `like_cnt` INT NOT NULL,
  `reg_date` DATETIME NULL DEFAULT NULL,
  `scope` VARCHAR(255) NULL DEFAULT NULL,
  `video_url` VARCHAR(255) NULL DEFAULT NULL,
  `music_id` INT UNSIGNED NULL DEFAULT NULL,
  `user_id` INT UNSIGNED NULL DEFAULT NULL,
  `order_weight` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`video_id`),
  INDEX `FKd76m7v7ktymnn58wrledj5b3i` (`music_id` ASC) VISIBLE,
  INDEX `FK2k5fkq9vwjoxc3ne82hh280t0` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FK2k5fkq9vwjoxc3ne82hh280t0`
    FOREIGN KEY (`user_id`)
    REFERENCES `planetdhance_test`.`users` (`user_id`),
  CONSTRAINT `FKd76m7v7ktymnn58wrledj5b3i`
    FOREIGN KEY (`music_id`)
    REFERENCES `planetdhance_test`.`music` (`music_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `planetdhance_test`.`likes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planetdhance_test`.`likes` (
  `like_id` INT UNSIGNED NOT NULL,
  `user_id` INT UNSIGNED NULL DEFAULT NULL,
  `video_id` INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`like_id`),
  INDEX `FKnvx9seeqqyy71bij291pwiwrg` (`user_id` ASC) VISIBLE,
  INDEX `FKoncu0qreesko543aih9fxmg4k` (`video_id` ASC) VISIBLE,
  CONSTRAINT `FKnvx9seeqqyy71bij291pwiwrg`
    FOREIGN KEY (`user_id`)
    REFERENCES `planetdhance_test`.`users` (`user_id`),
  CONSTRAINT `FKoncu0qreesko543aih9fxmg4k`
    FOREIGN KEY (`video_id`)
    REFERENCES `planetdhance_test`.`video` (`video_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `planetdhance_test`.`tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planetdhance_test`.`tag` (
  `tag_id` INT UNSIGNED NOT NULL,
  `hit` INT NOT NULL,
  `img_url` VARCHAR(255) NULL DEFAULT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `type` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`tag_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `planetdhance_test`.`validate`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planetdhance_test`.`validate` (
  `validate_id` BIGINT NOT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `token` VARCHAR(500) NULL DEFAULT NULL,
  PRIMARY KEY (`validate_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `planetdhance_test`.`video_tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planetdhance_test`.`video_tag` (
  `video_tag_id` INT UNSIGNED NOT NULL,
  `tag_id` INT UNSIGNED NULL DEFAULT NULL,
  `video_id` INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`video_tag_id`),
  INDEX `FKoimfmujed58aojuxdekx4csml` (`tag_id` ASC) VISIBLE,
  INDEX `FK7a7a4rx1y3tr2ycwuqcrf580b` (`video_id` ASC) VISIBLE,
  CONSTRAINT `FK7a7a4rx1y3tr2ycwuqcrf580b`
    FOREIGN KEY (`video_id`)
    REFERENCES `planetdhance_test`.`video` (`video_id`),
  CONSTRAINT `FKoimfmujed58aojuxdekx4csml`
    FOREIGN KEY (`tag_id`)
    REFERENCES `planetdhance_test`.`tag` (`tag_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
