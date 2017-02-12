
SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for think_employee
-- ----------------------------
DROP TABLE IF EXISTS `think_employee`;
CREATE TABLE `think_employee` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `UpdateTime` datetime DEFAULT NULL,
  `CreateTime` datetime NOT NULL,
  `State` int(11) NOT NULL DEFAULT '0',
  `LoginName` varchar(64) DEFAULT NULL,
  `UserName` varchar(64) DEFAULT NULL,
  `Password` varchar(64) DEFAULT NULL,
  `LoginTimes` int(11) NOT NULL DEFAULT '0',
  `LatestLoginTime` datetime DEFAULT NULL,
  `CurrLoginTime` datetime DEFAULT NULL,
  `LatestLoginIP` varchar(64) DEFAULT NULL,
  `CurrLoginIP` varchar(64) DEFAULT NULL,
  `RoleId` int(11) NOT NULL DEFAULT '0',
  `IsUse` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for think_role
-- ----------------------------
DROP TABLE IF EXISTS `think_role`;
CREATE TABLE `think_role` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `UpdateTime` datetime DEFAULT NULL,
  `CreateTime` datetime DEFAULT NULL,
  `State` int(11) NOT NULL DEFAULT '0',
  `RoleName` varchar(64) DEFAULT NULL,
  `RoleState` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for think_sysmenu
-- ----------------------------
DROP TABLE IF EXISTS `think_sysmenu`;
CREATE TABLE `think_sysmenu` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `UpdateTime` datetime DEFAULT NULL,
  `CreateTime` datetime DEFAULT NULL,
  `State` int(11) NOT NULL DEFAULT '0',
  `MenuName` varchar(64) DEFAULT NULL,
  `Controller` varchar(64) DEFAULT NULL,
  `Action` varchar(64) DEFAULT NULL,
  `ParentId` int(11) NOT NULL DEFAULT '0',
  `MenuLevel` int(11) DEFAULT NULL,
  `IsView` tinyint(4) NOT NULL DEFAULT '0',
  `ICON` varchar(64) DEFAULT NULL,
  `OrderNum` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;


CREATE TABLE `think_roleauthor` (
  `RoleId` int(11) NOT NULL,
  `MenuId` int(11) NOT NULL,
  PRIMARY KEY (`RoleId`,`MenuId`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `think_employee`;
CREATE TABLE `think_employee` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `UpdateTime` datetime DEFAULT NULL,
  `CreateTime` datetime DEFAULT NULL,
  `State` int(11) NOT NULL DEFAULT '0',
  `LoginName` varchar(64) DEFAULT NULL,
  `UserName` varchar(64) DEFAULT NULL,
  `Password` varchar(64) DEFAULT NULL,
  `LoginTimes` varchar(64) DEFAULT NULL,
  `LatestLoginTime` datetime DEFAULT NULL,
  `CurrLoginTime` datetime DEFAULT NULL,
  `LatestLoginIP` varchar(64) DEFAULT NULL,
  `CurrLoginIP` varchar(64) DEFAULT NULL,
  `RoleId` varchar(64) DEFAULT NULL,
  `IsUse` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
