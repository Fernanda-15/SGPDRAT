-- MySQL Script generated by MySQL Workbench
-- Sun Apr 17 15:27:18 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema sgpdrat_test
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sgpdrat_test
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sgpdrat_test` DEFAULT CHARACTER SET utf8 ;
USE `sgpdrat_test` ;

-- -----------------------------------------------------
-- Table `sgpdrat_test`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sgpdrat_test`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombreUsuario` VARCHAR(16) NOT NULL,
  `contrasena` VARCHAR(255) NOT NULL,
  `rol` VARCHAR(16) NOT NULL,
  `nombre` VARCHAR(128) NOT NULL,
  `cedula` VARCHAR(9) NOT NULL,
  `telefono` VARCHAR(16) NOT NULL,
  `correo` VARCHAR(128) NOT NULL,
  `remember_token` VARCHAR(128) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 0
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `sgpdrat_test`.`proyecto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sgpdrat_test`.`proyecto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `numero_contratacion` VARCHAR(32) NOT NULL,
  `nombre` VARCHAR(128) NOT NULL,
  `objetivo` VARCHAR(1024) NOT NULL,
  `ubicacion` VARCHAR(256) NOT NULL,
  `fecha_inicio` DATETIME NOT NULL,
  `fecha_final` DATETIME NOT NULL,
  `forma_pago` VARCHAR(32) NOT NULL,
  `monto_adjudicado` DOUBLE(10,2) NOT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_Proyecto_User_idx` (`user_id` ASC) ,
  CONSTRAINT `FK_Proyecto_User`
    FOREIGN KEY (`user_id`)
    REFERENCES `sgpdrat_test`.`users` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 0
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `sgpdrat_test`.`inspeccion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sgpdrat_test`.`inspeccion` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `proyecto_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `numero` INT NOT NULL,
  `fecha` DATETIME NOT NULL,
  `observaciones` VARCHAR(2048) NOT NULL,
  `firma` VARCHAR(128) NOT NULL,
  `avance_obra` DOUBLE(10,2) NOT NULL,
  `porcentaje_pagado` DOUBLE(10,2) NOT NULL,
  `tareas_ejecutadas` INT NOT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_Inspeccion_User_idx` (`user_id` ASC) ,
  INDEX `FK_Inspeccion_Proyecto_idx` (`proyecto_id` ASC) ,
  CONSTRAINT `FK_Inspeccion_Proyecto`
    FOREIGN KEY (`proyecto_id`)
    REFERENCES `sgpdrat_test`.`proyecto` (`id`),
  CONSTRAINT `FK_Inspeccion_User`
    FOREIGN KEY (`user_id`)
    REFERENCES `sgpdrat_test`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `sgpdrat_test`.`archivos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sgpdrat_test`.`archivos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `inspeccion_id` INT NOT NULL,
  `nombre` VARCHAR(128) NOT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_Archivos_Inspeccion_idx` (`inspeccion_id` ASC) ,
  CONSTRAINT `FK_Archivos_Inspeccion`
    FOREIGN KEY (`inspeccion_id`)
    REFERENCES `sgpdrat_test`.`inspeccion` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `sgpdrat_test`.`comentario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sgpdrat_test`.`comentario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `proyecto_id` INT NOT NULL,
  `contenido` VARCHAR(2048) NOT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_Comentario_Proyecto_idx` (`proyecto_id` ASC) ,
  CONSTRAINT `FK_Comentario_Proyecto`
    FOREIGN KEY (`proyecto_id`)
    REFERENCES `sgpdrat_test`.`proyecto` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 0
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `sgpdrat_test`.`fotos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sgpdrat_test`.`fotos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `inspeccion_id` INT NOT NULL,
  `nombre` VARCHAR(128) NOT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_Fotos_Inspeccion_idx` (`inspeccion_id` ASC) ,
  CONSTRAINT `FK_Fotos_Inspeccion`
    FOREIGN KEY (`inspeccion_id`)
    REFERENCES `sgpdrat_test`.`inspeccion` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `sgpdrat_test`.`log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sgpdrat_test`.`log` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `proyecto_id` INT NOT NULL,
  `usuario` VARCHAR(16) NOT NULL,
  `descripcion` VARCHAR(1024) NOT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_Log_Proyecto_idx` (`proyecto_id` ASC) ,
  CONSTRAINT `FK_Log_Proyecto`
    FOREIGN KEY (`proyecto_id`)
    REFERENCES `sgpdrat_test`.`proyecto` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 0
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `sgpdrat_test`.`pago`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sgpdrat_test`.`pago` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `proyecto_id` INT NOT NULL,
  `numero` INT NOT NULL,
  `proyeccion` DOUBLE(10,2) NOT NULL,
  `monto` DOUBLE(10,2) NOT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_Pago_Proyecto_idx` (`proyecto_id` ASC) ,
  CONSTRAINT `FK_Pago_Proyecto`
    FOREIGN KEY (`proyecto_id`)
    REFERENCES `sgpdrat_test`.`proyecto` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 0
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `sgpdrat_test`.`tarea`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sgpdrat_test`.`tarea` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `proyecto_id` INT NOT NULL,
  `numero` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(1024) NOT NULL,
  `peso` DOUBLE(10,2) NOT NULL,
  `avance` DOUBLE(10,2) NOT NULL,
  `fecha_inicio` DATETIME NOT NULL,
  `fecha_final` DATETIME NOT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_Tarea_Proyecto_idx` (`proyecto_id` ASC) ,
  CONSTRAINT `FK_Tarea_Proyecto`
    FOREIGN KEY (`proyecto_id`)
    REFERENCES `sgpdrat_test`.`proyecto` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 0
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;