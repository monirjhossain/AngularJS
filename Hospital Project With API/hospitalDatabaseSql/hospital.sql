/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : hospital

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2020-09-12 15:33:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for administrators
-- ----------------------------
DROP TABLE IF EXISTS `administrators`;
CREATE TABLE `administrators` (
  `AdministratorId` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(255) DEFAULT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `Username` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Country` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Phone` varchar(11) DEFAULT '',
  `Address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`AdministratorId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of administrators
-- ----------------------------
INSERT INTO `administrators` VALUES ('1', 'admin', 'admin', 'admin', 'admin', 'admin', 'admin@gmail.com', 'admin', 'admin');

-- ----------------------------
-- Table structure for appointments
-- ----------------------------
DROP TABLE IF EXISTS `appointments`;
CREATE TABLE `appointments` (
  `AppointmentId` int(11) NOT NULL AUTO_INCREMENT,
  `Customer` varchar(255) DEFAULT NULL,
  `Doctor` varchar(255) DEFAULT NULL,
  `Date` varchar(255) DEFAULT '',
  `SlotDate` varchar(255) DEFAULT '',
  `SlotStartTime` varchar(255) DEFAULT '',
  `SlotEndTime` varchar(255) DEFAULT '',
  `EmployeeId` int(11) DEFAULT NULL,
  `Department` varchar(255) DEFAULT NULL,
  `Payment` double DEFAULT NULL,
  PRIMARY KEY (`AppointmentId`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of appointments
-- ----------------------------
INSERT INTO `appointments` VALUES ('4', 'aaaaa', 'shah', '1593360540000', '1592852400000', '09:00', '09:30', '1', 'Dental', '1000');
INSERT INTO `appointments` VALUES ('5', 'uuuu', 'Ali', '1593361351000', '1593457200000', '16:18', '15:17', '1', 'Dental', '1000000');
INSERT INTO `appointments` VALUES ('6', 'Umer Ch', 'Ali', '1593374278000', '1593457200000', '2020-06-30T12:01', '2020-06-30T13:00', '1', 'Dental', null);
INSERT INTO `appointments` VALUES ('7', 'alexa', 'Ali', '1593374554000', '1593457200000', '14:00', '15:00', '1', 'Dental', '1000');
INSERT INTO `appointments` VALUES ('8', 'aaaaaaaa', 'shah', '1593374982000', '1595962800000', '14:00', '15:00', '1', 'Dental', '1.1');
INSERT INTO `appointments` VALUES ('10', 'qqqqq', null, '', '', '', '', null, null, null);
INSERT INTO `appointments` VALUES ('11', 'qqqqqq', null, '', '', '', '', null, null, null);
INSERT INTO `appointments` VALUES ('12', 'qqqq', null, '', '', '', '', null, null, null);
INSERT INTO `appointments` VALUES ('13', 'qqqqqq', null, '', '', '', '', null, null, null);
INSERT INTO `appointments` VALUES ('14', 'qqqqqqq', null, '', '', '', '', null, null, null);
INSERT INTO `appointments` VALUES ('15', 'qqqqqqq', null, '', '', '', '', null, null, null);
INSERT INTO `appointments` VALUES ('16', 'qqqqqq', null, '', '', '', '', null, null, null);
INSERT INTO `appointments` VALUES ('17', 'qqqqqq', null, '', '', '', '', null, null, null);
INSERT INTO `appointments` VALUES ('18', 'qqqq', null, '', '', '', '', null, null, null);
INSERT INTO `appointments` VALUES ('19', 'qqqqqqqqq', null, '', '', '', '', null, null, null);
INSERT INTO `appointments` VALUES ('20', 'qqqqqqq', null, '', '', '', '', null, null, null);
INSERT INTO `appointments` VALUES ('21', 'qqqqq', null, '', '', '', '', null, null, null);
INSERT INTO `appointments` VALUES ('22', 'qqqqqqqqq', null, '', '', '', '', null, null, null);
INSERT INTO `appointments` VALUES ('23', 'qqqqqqq', null, '', '', '', '', null, null, null);
INSERT INTO `appointments` VALUES ('24', 'qqqqqq', null, '', '', '', '', null, null, null);

-- ----------------------------
-- Table structure for customers
-- ----------------------------
DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
  `CustomerId` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(255) DEFAULT '',
  `LastName` varchar(255) DEFAULT '',
  `Username` varchar(255) DEFAULT '',
  `Password` varchar(255) DEFAULT '',
  `Country` varchar(255) DEFAULT '',
  `Email` varchar(255) DEFAULT '',
  `Address` varchar(255) DEFAULT '',
  `Phone` varchar(11) DEFAULT '',
  PRIMARY KEY (`CustomerId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of customers
-- ----------------------------
INSERT INTO `customers` VALUES ('1', 'aliaaaaaaa', 'ali', 'ali', 'aaaaaaaaaaaa', 'Pakistan', 'ali@gmail.com', 'ali', 'ali');
INSERT INTO `customers` VALUES ('2', 'bilal', 'bilal', 'bilal', 'bilal', 'bilal', 'bilal@gmail.com', 'bilal', '+9222222');

-- ----------------------------
-- Table structure for departments
-- ----------------------------
DROP TABLE IF EXISTS `departments`;
CREATE TABLE `departments` (
  `DepartmentId` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`DepartmentId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of departments
-- ----------------------------
INSERT INTO `departments` VALUES ('1', 'Cardiology');
INSERT INTO `departments` VALUES ('2', 'Dental');
INSERT INTO `departments` VALUES ('3', 'Neurologist');
INSERT INTO `departments` VALUES ('4', 'Pediatric');
INSERT INTO `departments` VALUES ('5', 'Xray');
INSERT INTO `departments` VALUES ('6', 'Urology');
INSERT INTO `departments` VALUES ('7', 'Traumtology');
INSERT INTO `departments` VALUES ('8', 'Pulmonary');
INSERT INTO `departments` VALUES ('10', 'Medicine');

-- ----------------------------
-- Table structure for doctors
-- ----------------------------
DROP TABLE IF EXISTS `doctors`;
CREATE TABLE `doctors` (
  `DoctorId` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(255) DEFAULT '',
  `LastName` varchar(255) DEFAULT '',
  `Username` varchar(255) DEFAULT '',
  `Password` varchar(255) DEFAULT '',
  `Country` varchar(255) DEFAULT '',
  `Email` varchar(255) DEFAULT '',
  `Address` varchar(255) DEFAULT '',
  `Phone` varchar(11) DEFAULT '',
  `Speciality` varchar(255) DEFAULT NULL,
  `Availability` varchar(255) DEFAULT NULL,
  `Hospital` varchar(255) DEFAULT NULL,
  `Department` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`DoctorId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of doctors
-- ----------------------------
INSERT INTO `doctors` VALUES ('1', 'Ali', 'Shah', 'ali', 'ali', 'American Samoa', 'ali@gmail.com', 'Wapda Town', '+9230069778', 'Allergy', 'YES', 'Sundas Hospital', 'Pediatric');
INSERT INTO `doctors` VALUES ('2', 'a', 'a', 'a', 'a', 'Cocos (Keeling) Islands', 'a', 'a', 'a', 'Allergy', 'YES', 'Sundas Hospital', 'Urology');
INSERT INTO `doctors` VALUES ('3', 'shah', 'shah', 'shah', 'shah', 'shah', 'shah', 'shah', 'shah', 'shah', 'shah', 'shah', 'Cardiology');
INSERT INTO `doctors` VALUES ('4', 'bilal', 'bilal', 'bilal', 'bilal', 'Pakistan', 'bilal', 'bilal', 'bilal', 'Adult Intensivist', 'YES', 'Sundas Hospital', 'Dental');
INSERT INTO `doctors` VALUES ('5', 'uzair', 'uzair', 'uzair', 'uzair', 'Pakistan', 'uzair', 'uzair', 'uzair', 'Allergy', 'YES', 'Sundas Hospital', 'Dental');
INSERT INTO `doctors` VALUES ('6', 'wasif', 'wasif', 'wasif', 'wasif', 'wasif', 'wasif@yahoo.com', 'wasif', '+999999999', 'wasif', 'wasif', 'wasif', 'wasif');
INSERT INTO `doctors` VALUES ('7', 'Asad', 'Shah', 'asadshah', 'Alishah1', 'Canada', 'asadshah@gmail.com', 'Wapda Town', '+9230066999', 'Kidney', 'Yes', 'Shahid', 'Dental');
INSERT INTO `doctors` VALUES ('8', 'faizan', 'shah', 'faizan', 'Faizanshah1', 'India', 'faizan@gmail.com', 'Wapda Town', '+9230069778', 'a', 'a', 'a', 'Xray');
INSERT INTO `doctors` VALUES ('9', 'apaa', 'shah', 'apaa', 'Alishah1', 'Afghanistan', 'appaa@gmail.com', 'wapda town', '+9999999', 'kidney', 'yes', 'Sundas Hospital', 'Urology');
INSERT INTO `doctors` VALUES ('10', 'Syed Ali mran', 'Imran', 'abcd', 'Alishah1', 'Pakistan', 'ooooooooo@gmail.com', '06', '+9230069778', 'kkkk', 'YES', 'Sundas Hospital', 'Cardiology');

-- ----------------------------
-- Table structure for employees
-- ----------------------------
DROP TABLE IF EXISTS `employees`;
CREATE TABLE `employees` (
  `EmployeeId` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(255) DEFAULT '',
  `LastName` varchar(255) DEFAULT '',
  `Username` varchar(255) DEFAULT '',
  `Password` varchar(255) DEFAULT '',
  `Country` varchar(255) DEFAULT '',
  `Email` varchar(255) DEFAULT '',
  `Address` varchar(255) DEFAULT '',
  `Phone` varchar(11) DEFAULT '',
  `Hospital` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`EmployeeId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of employees
-- ----------------------------
INSERT INTO `employees` VALUES ('1', 'emp', 'emp', 'emp', 'emp', 'Pakistan', 'emp@gmail.com', 'emp', '+99999999', 'Sundas Hospital');
INSERT INTO `employees` VALUES ('2', 'Wasim', 'Nool', 'Wasimnolaq', 'Wapda Town', 'land Islands', 'wasimnool@gmail.com', 'Wapda Town', '+9300697780', 'Sundas Hospital');
INSERT INTO `employees` VALUES ('3', 'Faizu', 'shah', 'faizu', 'Mustafa town', 'Albania', 'faizu@gmail.com', 'Mustafa town', '+9999999999', 'Sundas Hospital');

-- ----------------------------
-- Table structure for hospitals
-- ----------------------------
DROP TABLE IF EXISTS `hospitals`;
CREATE TABLE `hospitals` (
  `HospitalId` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  `Username` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Country` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Phone` varchar(11) DEFAULT '',
  `Address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`HospitalId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of hospitals
-- ----------------------------
INSERT INTO `hospitals` VALUES ('1', 'Sundas Hospital', 'hos', 'hos', 'Namibia', 'sundashospital@gmail.com', '+9222222', 'Wapda Town');

-- ----------------------------
-- Table structure for specialities
-- ----------------------------
DROP TABLE IF EXISTS `specialities`;
CREATE TABLE `specialities` (
  `Name` varchar(255) DEFAULT NULL,
  `SpecialityId` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`SpecialityId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of specialities
-- ----------------------------
