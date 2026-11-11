-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: fruteria
-- ------------------------------------------------------
-- Server version	5.5.5-10.11.16-MariaDB

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
-- Table structure for table `cuentas`
--

DROP TABLE IF EXISTS `cuentas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuentas` (
  `id_cuentas` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `saldo_anterior` decimal(12,2) NOT NULL DEFAULT 0.00,
  `saldo_actual` decimal(12,2) NOT NULL DEFAULT 0.00,
  `ultima_trasaccion_id` int(11) DEFAULT NULL,
  `acudiente_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_cuentas`),
  UNIQUE KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `fk_cuentas_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuentas`
--

LOCK TABLES `cuentas` WRITE;
/*!40000 ALTER TABLE `cuentas` DISABLE KEYS */;
INSERT INTO `cuentas` VALUES (1,2,0.00,0.00,NULL,NULL);
/*!40000 ALTER TABLE `cuentas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institucion`
--

DROP TABLE IF EXISTS `institucion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institucion` (
  `id_institucion` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_institucion`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institucion`
--

LOCK TABLES `institucion` WRITE;
/*!40000 ALTER TABLE `institucion` DISABLE KEYS */;
INSERT INTO `institucion` VALUES (1,'Universidad Minuto de Dios','Institución universitaria',1,'2026-11-09 22:49:16'),(2,'Otra','Otras instituciones',1,'2026-11-09 22:49:16');
/*!40000 ALTER TABLE `institucion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medio_pago`
--

DROP TABLE IF EXISTS `medio_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medio_pago` (
  `id_medio_pago` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_medio_pago`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medio_pago`
--

LOCK TABLES `medio_pago` WRITE;
/*!40000 ALTER TABLE `medio_pago` DISABLE KEYS */;
INSERT INTO `medio_pago` VALUES (1,'Efectivo','Pago realizado en efectivo',1,'2026-11-09 22:42:09'),(2,'Transferencia','Pago mediante transferencia bancaria',1,'2026-11-09 22:42:09'),(3,'Nequi','Pago mediante Nequi',1,'2026-11-09 22:42:09'),(4,'Daviplata','Pago mediante Daviplata',1,'2026-11-09 22:42:09');
/*!40000 ALTER TABLE `medio_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `passwords`
--

DROP TABLE IF EXISTS `passwords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passwords` (
  `id_password` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_password`),
  UNIQUE KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `fk_passwords_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passwords`
--

LOCK TABLES `passwords` WRITE;
/*!40000 ALTER TABLE `passwords` DISABLE KEYS */;
INSERT INTO `passwords` VALUES (1,1,'$2b$12$d1yVzVzG7G7uFm077mFZ9.ZTmYCsU99X44zUQ74a1Bmni57QhwA4y','2026-11-09 22:55:54','2026-11-09 22:55:54'),(2,2,'$2b$12$d1yVzVzG7G7uFm077mFZ9.ZTmYCsU99X44zUQ74a1Bmni57QhwA4y','2026-11-09 22:55:54','2026-11-09 22:55:54'),(3,3,'$2b$12$d1yVzVzG7G7uFm077mFZ9.ZTmYCsU99X44zUQ74a1Bmni57QhwA4y','2026-11-09 22:55:54','2026-11-09 22:55:54');
/*!40000 ALTER TABLE `passwords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('A7VCxSwTEkXrq8t0Xe2tbyeJdywR2VUg',1794295008,'{\"cookie\":{\"originalMaxAge\":28800000,\"expires\":\"2026-11-10T07:16:16.298Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"user\":{\"id_usuario\":1,\"nombre\":\"Administrador\",\"apellidos\":\"Sistema\",\"correo\":\"admin@fruteria.com\"}}'),('eE3VCZLecR4tx4g2hGcT4LAZO8TLMvvJ',1794294817,'{\"cookie\":{\"originalMaxAge\":28800000,\"expires\":\"2026-11-10T07:12:08.187Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"user\":{\"id_usuario\":1,\"nombre\":\"Administrador\",\"apellidos\":\"Sistema\",\"correo\":\"admin@fruteria.com\"}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_transaccion`
--

DROP TABLE IF EXISTS `tipo_transaccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_transaccion` (
  `id_tipo_transaccion` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id_tipo_transaccion`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_transaccion`
--

LOCK TABLES `tipo_transaccion` WRITE;
/*!40000 ALTER TABLE `tipo_transaccion` DISABLE KEYS */;
INSERT INTO `tipo_transaccion` VALUES (1,'Crédito','Compra de productos a crédito',1),(2,'Pago','Abono o pago de una deuda',1);
/*!40000 ALTER TABLE `tipo_transaccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_usuario`
--

DROP TABLE IF EXISTS `tipo_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_usuario` (
  `id_tipo_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id_tipo_usuario`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_usuario`
--

LOCK TABLES `tipo_usuario` WRITE;
/*!40000 ALTER TABLE `tipo_usuario` DISABLE KEYS */;
INSERT INTO `tipo_usuario` VALUES (1,'Administrador','Administración general del sistema',1),(2,'Cliente','Cliente de la frutería',1),(3,'Empleado','Personal encargado de la operación',1);
/*!40000 ALTER TABLE `tipo_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transacciones`
--

DROP TABLE IF EXISTS `transacciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transacciones` (
  `id_transacciones` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `tipo_transaccion_id` int(11) NOT NULL,
  `monto` decimal(12,2) NOT NULL,
  `saldo_anterior` decimal(12,2) NOT NULL,
  `saldo_actual` decimal(12,2) NOT NULL,
  `medio_pago_id` int(11) DEFAULT NULL,
  `estado` varchar(30) NOT NULL DEFAULT 'completada',
  `descripcion` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_transacciones`),
  KEY `idx_transacciones_usuario` (`usuario_id`),
  KEY `idx_transacciones_tipo` (`tipo_transaccion_id`),
  KEY `idx_transacciones_medio_pago` (`medio_pago_id`),
  KEY `idx_transacciones_fecha` (`created_at`),
  CONSTRAINT `fk_transacciones_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transacciones`
--

LOCK TABLES `transacciones` WRITE;
/*!40000 ALTER TABLE `transacciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `transacciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `tipo_usuario` varchar(50) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `correo` varchar(150) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `institucion` varchar(150) DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Administrador','Sistema','Administrador','3001234567','admin@fruteria.com',1,'Frutería',30),(2,'Carlos','Gomez','Cliente','3101234567','carlos@gmail.com',1,NULL,25),(3,'Maria','Rodriguez','Empleado','3201234567','maria@fruteria.com',1,'Frutería',28);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-09 18:21:50
