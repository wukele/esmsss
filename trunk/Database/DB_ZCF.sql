/*
Navicat MySQL Data Transfer

Source Server         : Localhost
Source Server Version : 50045
Source Host           : localhost:3306
Source Database       : protest

Target Server Type    : MYSQL
Target Server Version : 50045
File Encoding         : 65001

Date: 2010-12-19 13:30:56
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `alarm_level_setup`
-- ----------------------------
DROP TABLE IF EXISTS `alarm_level_setup`;
CREATE TABLE `alarm_level_setup` (
  `alarm_level_id` int(11) NOT NULL COMMENT '报警级别设置ID',
  `device_variable_id` int(11) NOT NULL COMMENT '变量类型ID',
  `effect_range_minimum_value` varchar(255) NOT NULL COMMENT '作用范围最小值',
  `effect_range_maximum_value` varchar(255) NOT NULL COMMENT '作用范围最大值',
  `correspond_alarm_level
correspond
correspond` smallint(6) NOT NULL COMMENT '对应报警级别',
  `name` varchar(255) default NULL COMMENT '名称',
  PRIMARY KEY  (`alarm_level_id`,`device_variable_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of alarm_level_setup
-- ----------------------------

-- ----------------------------
-- Table structure for `alarm_operate`
-- ----------------------------
DROP TABLE IF EXISTS `alarm_operate`;
CREATE TABLE `alarm_operate` (
  `alarm_history_id` int(11) NOT NULL COMMENT '报警历史ID',
  `alarm_policy_id` int(11) NOT NULL COMMENT '报警策略ID',
  `device_variable_id` int(11) NOT NULL COMMENT '设备变量ID',
  `alarm_time` datetime NOT NULL COMMENT '报警时间',
  `alarm_format` varchar(255) NOT NULL COMMENT '报警形式',
  `alarm_send_address` varchar(255) NOT NULL COMMENT '报警发送地址',
  `alarm_operate_result` varchar(255) NOT NULL COMMENT '报警操作结果',
  `alarm_affirm_personnel` varchar(255) NOT NULL COMMENT '报警确认人员',
  `alarm_affirm_time` datetime NOT NULL COMMENT '报警确认时间',
  `alarm_relieve_time` datetime NOT NULL COMMENT '报警解除时间',
  `alarm_relieve_send_format` varchar(255) NOT NULL COMMENT '报警解除发送形式',
  `alarm_relieve_send_address` varchar(255) NOT NULL COMMENT '报警解除发送地址',
  `alarm_relieve_operate_result` varchar(255) NOT NULL COMMENT '报警解除操作结果',
  PRIMARY KEY  (`alarm_history_id`,`alarm_policy_id`,`device_variable_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of alarm_operate
-- ----------------------------

-- ----------------------------
-- Table structure for `alarm_policy`
-- ----------------------------
DROP TABLE IF EXISTS `alarm_policy`;
CREATE TABLE `alarm_policy` (
  `alarm_policy_id` int(11) NOT NULL COMMENT '报警策略ID',
  `alarm_level_id` int(11) NOT NULL COMMENT '报警级别设置ID',
  `policy_work_starttime` datetime NOT NULL COMMENT '策略工作起始时间',
  `policy_work_endtime` datetime NOT NULL COMMENT '策略工作结束时间',
  `alarm_format` varchar(255) NOT NULL COMMENT '报警形式',
  `information_send_address` varchar(255) NOT NULL COMMENT '信息发送地址',
  `intormation_content` varchar(255) NOT NULL COMMENT '信息内容',
  `unrelieve_event_realarm_time` datetime NOT NULL COMMENT '未解除事件重复报警时间',
  `alarm_relieve_recover_inform` varchar(255) NOT NULL COMMENT '报警解除恢复通知',
  PRIMARY KEY  (`alarm_policy_id`,`alarm_level_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of alarm_policy
-- ----------------------------

-- ----------------------------
-- Table structure for `alarm_policy_effect_area`
-- ----------------------------
DROP TABLE IF EXISTS `alarm_policy_effect_area`;
CREATE TABLE `alarm_policy_effect_area` (
  `area_id` int(11) NOT NULL COMMENT '区域ID',
  `alarm_policy_id` int(11) NOT NULL COMMENT '报警策略ID',
  `device_variable_id` int(11) NOT NULL COMMENT '设备变量ID',
  PRIMARY KEY  (`area_id`,`alarm_policy_id`,`device_variable_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of alarm_policy_effect_area
-- ----------------------------

-- ----------------------------
-- Table structure for `code_classify`
-- ----------------------------
DROP TABLE IF EXISTS `code_classify`;
CREATE TABLE `code_classify` (
  `classify_primary_key` varchar(255) NOT NULL default '' COMMENT '分类主键',
  `classify_id` int(11) NOT NULL,
  `classify_name` varchar(255) NOT NULL COMMENT '分类名称',
  `describe` varchar(255) default NULL COMMENT '描述',
  PRIMARY KEY  (`classify_primary_key`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of code_classify
-- ----------------------------

-- ----------------------------
-- Table structure for `code_component`
-- ----------------------------
DROP TABLE IF EXISTS `code_component`;
CREATE TABLE `code_component` (
  `component_id` int(6) NOT NULL auto_increment,
  `code_xtype` varchar(20) NOT NULL,
  `component_name` varchar(40) default NULL,
  `component_resource_id` varchar(20) default NULL,
  `full_type` varchar(100) default NULL,
  PRIMARY KEY  (`component_id`)
) ENGINE=MyISAM AUTO_INCREMENT=1000003 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of code_component
-- ----------------------------
INSERT INTO `code_component` VALUES ('1000001', 'textfield', '普通字段', 'B000001', 'Ext.form.TextField');
INSERT INTO `code_component` VALUES ('1000002', 'ImageBox', '图片框', 'E000001', 'Ext.ems.ImageBox');

-- ----------------------------
-- Table structure for `code_table`
-- ----------------------------
DROP TABLE IF EXISTS `code_table`;
CREATE TABLE `code_table` (
  `code_id` int(11) NOT NULL COMMENT '代码ID',
  `classify_primary_key` varchar(255) NOT NULL COMMENT '分类主键',
  `code_classify_id` int(11) NOT NULL COMMENT '代码分类ID',
  `code_value` varchar(255) default NULL COMMENT '代码值',
  `code_display_name` varchar(255) default NULL COMMENT '代码显示名称',
  PRIMARY KEY  (`code_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of code_table
-- ----------------------------

-- ----------------------------
-- Table structure for `component_resource_code`
-- ----------------------------
DROP TABLE IF EXISTS `component_resource_code`;
CREATE TABLE `component_resource_code` (
  `component_resource_sn` int(6) NOT NULL auto_increment,
  `resource_type` varchar(6) default NULL,
  `script_url` varchar(100) default NULL,
  `need_script` int(1) NOT NULL default '0',
  `component_resource_id` varchar(20) NOT NULL,
  PRIMARY KEY  (`component_resource_sn`)
) ENGINE=MyISAM AUTO_INCREMENT=10000003 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of component_resource_code
-- ----------------------------
INSERT INTO `component_resource_code` VALUES ('10000001', 'BASE', '', '0', 'B000001');
INSERT INTO `component_resource_code` VALUES ('10000002', 'EXTEND', '/js/comm/ImageBoxComponent.js', '1', 'E000001');

-- ----------------------------
-- Table structure for `control_command`
-- ----------------------------
DROP TABLE IF EXISTS `control_command`;
CREATE TABLE `control_command` (
  `control_log_id` int(11) NOT NULL COMMENT '控制记录ID',
  `device_variable_id` int(11) NOT NULL COMMENT '设备变量ID',
  `setup_value` varchar(255) NOT NULL COMMENT '设置值',
  `setup_time` datetime NOT NULL COMMENT '设置时间',
  `lose_efficacy_time` datetime NOT NULL COMMENT '失效时间',
  `setup_personnel` varchar(255) NOT NULL COMMENT '设置人员',
  `status` varchar(255) NOT NULL COMMENT '状态',
  `status_time` datetime NOT NULL COMMENT '状态时间',
  PRIMARY KEY  (`control_log_id`,`device_variable_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of control_command
-- ----------------------------

-- ----------------------------
-- Table structure for `device_table`
-- ----------------------------
DROP TABLE IF EXISTS `device_table`;
CREATE TABLE `device_table` (
  `device_id` int(11) NOT NULL COMMENT '设备ID',
  `device_name` varchar(255) NOT NULL COMMENT '设备名称',
  `device_type` varchar(255) NOT NULL COMMENT '设备类型',
  `device_ip` varchar(255) NOT NULL COMMENT '设备IP',
  `collect_task_id` int(11) NOT NULL COMMENT '采集任务ID',
  `action_flag` smallint(6) NOT NULL COMMENT '活动标志'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of device_table
-- ----------------------------

-- ----------------------------
-- Table structure for `device_variable`
-- ----------------------------
DROP TABLE IF EXISTS `device_variable`;
CREATE TABLE `device_variable` (
  `device_variable_id` int(11) NOT NULL COMMENT '设备变量ID',
  `device_id` int(11) NOT NULL COMMENT '设备ID',
  `variable_type_id` int(11) NOT NULL COMMENT '变量类型ID',
  `variable_name` varchar(255) NOT NULL COMMENT '变量名称',
  `variable_describe` varchar(255) default NULL COMMENT '变量描述',
  `read_write_authority` varchar(255) NOT NULL COMMENT '读写权限',
  `read_way_code_type_id` int(11) NOT NULL COMMENT '读取方式代码分类ID',
  `read_way_code_value` varchar(255) NOT NULL COMMENT '读取方式代码值',
  `variable_addressing` varchar(255) NOT NULL COMMENT '变量寻址',
  `adjusted_value` varchar(255) NOT NULL COMMENT '校正值',
  `offset` varchar(255) default NULL COMMENT '偏移量',
  `conversion_coefficient` varchar(255) default NULL COMMENT '转换系数',
  `variable_analysis_code_type_id` int(11) NOT NULL COMMENT '变量解析代码分类ID',
  `maximum_value` varchar(255) default NULL COMMENT '最大值',
  `minimum_value` varchar(255) default NULL COMMENT '最小值',
  `collect_frequency` int(11) NOT NULL COMMENT '采集频率',
  `is_save_log` smallint(6) default NULL COMMENT '是否保存历史记录',
  `action_flag` smallint(6) default NULL COMMENT '活动标志',
  PRIMARY KEY  (`device_variable_id`,`device_id`,`variable_type_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of device_variable
-- ----------------------------

-- ----------------------------
-- Table structure for `engine_parameter`
-- ----------------------------
DROP TABLE IF EXISTS `engine_parameter`;
CREATE TABLE `engine_parameter` (
  ` parameter_id` int(6) NOT NULL,
  `engine_id` varchar(11) default NULL,
  `parameter_name` varchar(20) default NULL,
  `parameter_value` varchar(100) default NULL,
  PRIMARY KEY  (` parameter_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of engine_parameter
-- ----------------------------
INSERT INTO `engine_parameter` VALUES ('1', '1', 'javascript', 'js/engines/DirectDataEngine.js');

-- ----------------------------
-- Table structure for `filter_setup`
-- ----------------------------
DROP TABLE IF EXISTS `filter_setup`;
CREATE TABLE `filter_setup` (
  `buffer_id` int(11) NOT NULL COMMENT '缓冲ID',
  `device_variable_id` int(11) NOT NULL COMMENT '设备变量ID',
  `buffer_time` datetime NOT NULL COMMENT '缓冲时间',
  `buffer_number` int(11) NOT NULL COMMENT '缓冲次数',
  `buffer_region_minimum_value` varchar(255) NOT NULL COMMENT '缓冲区间最小值',
  `buffer_region_maximum_value` varchar(255) NOT NULL COMMENT '缓冲区间最大值',
  PRIMARY KEY  (`buffer_id`,`device_variable_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of filter_setup
-- ----------------------------

-- ----------------------------
-- Table structure for `history_data`
-- ----------------------------
DROP TABLE IF EXISTS `history_data`;
CREATE TABLE `history_data` (
  `history_id` int(11) NOT NULL COMMENT '历史ID',
  `device_variable_id` int(255) NOT NULL COMMENT '设备变量ID',
  `variable_physics_value` varchar(255) default NULL COMMENT '变量物理值',
  `variable_logic_value` varchar(255) default NULL COMMENT '变量逻辑值',
  `collect_time` datetime default NULL COMMENT '采集时间',
  PRIMARY KEY  (`history_id`,`device_variable_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of history_data
-- ----------------------------

-- ----------------------------
-- Table structure for `info_config`
-- ----------------------------
DROP TABLE IF EXISTS `info_config`;
CREATE TABLE `info_config` (
  `CONFIG_ID` varchar(20) NOT NULL,
  `CONFIG_NAME` varchar(30) default NULL,
  `CONFIG_VALUE` varchar(50) NOT NULL,
  `CONFIG_DESC` varchar(100) default NULL,
  PRIMARY KEY  (`CONFIG_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of info_config
-- ----------------------------
INSERT INTO `info_config` VALUES ('1000001', 'MaxInactiveInterval', '60', 'MaxInactiveInterval');

-- ----------------------------
-- Table structure for `info_dept`
-- ----------------------------
DROP TABLE IF EXISTS `info_dept`;
CREATE TABLE `info_dept` (
  `DEPT_NO` varchar(6) NOT NULL,
  `PARENT_DEPT_NO` varchar(6) default NULL,
  `PATH_CODE` varchar(64) default NULL,
  `DEPT_TYPE` varchar(6) default NULL,
  `DEPT_NAME` varchar(64) NOT NULL,
  `LOCAL_NET` varchar(6) default NULL,
  `COMMENTS` varchar(60) default NULL,
  `PHONE` varchar(20) default NULL,
  `FAX` varchar(20) default NULL,
  `ADDRESS` varchar(128) default NULL,
  `FLAG` varchar(1) NOT NULL default '1',
  `RES_CHAR1` varchar(64) default NULL,
  `RES_CHAR2` varchar(64) default NULL,
  `AREA_ID` varchar(8) default NULL,
  `CHANNEL_TYPE` varchar(6) default NULL,
  `SUB_CHANNEL_TYPE` varchar(6) default NULL,
  PRIMARY KEY  (`DEPT_NO`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of info_dept
-- ----------------------------

-- ----------------------------
-- Table structure for `info_engine`
-- ----------------------------
DROP TABLE IF EXISTS `info_engine`;
CREATE TABLE `info_engine` (
  `engine_id` int(6) NOT NULL default '0',
  `engine_code` varchar(12) default NULL,
  `engine_name` varchar(40) default NULL,
  `action_name` varchar(40) default NULL,
  `action_config` varchar(20) default NULL,
  `engine_type` varchar(30) default NULL,
  `action_class` varchar(40) default NULL,
  `max_interval` int(6) default '3' COMMENT '单位为秒',
  PRIMARY KEY  (`engine_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of info_engine
-- ----------------------------
INSERT INTO `info_engine` VALUES ('1', 'DE101', 'directEngine', 'DirectDataEngine.action', '1', 'AJ', null, '10');

-- ----------------------------
-- Table structure for `info_event`
-- ----------------------------
DROP TABLE IF EXISTS `info_event`;
CREATE TABLE `info_event` (
  `event_sn` int(10) NOT NULL,
  `event_name` varchar(40) default NULL,
  `event_description` varchar(255) default NULL,
  `fire_time` datetime default NULL,
  `event_level` int(2) default NULL,
  `is_confirm` int(1) default NULL,
  `source_entity_code` varchar(20) NOT NULL,
  PRIMARY KEY  (`event_sn`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of info_event
-- ----------------------------

-- ----------------------------
-- Table structure for `info_menu`
-- ----------------------------
DROP TABLE IF EXISTS `info_menu`;
CREATE TABLE `info_menu` (
  `MENU_CODE` varchar(10) NOT NULL,
  `PARENT_MENU_CODE` varchar(10) default NULL,
  `MODULE_CODE` varchar(10) NOT NULL default '0',
  `PATH_CODE` varchar(64) default NULL,
  `MENU_COL` int(4) NOT NULL default '0',
  `MENU_ROW` int(4) NOT NULL default '0',
  `ISSHOW` int(1) NOT NULL default '1',
  `MENU_URL` varchar(256) default NULL,
  `MENU_TITLE` varchar(256) NOT NULL,
  `COMMENTS` varchar(255) default NULL,
  `ICON_URL` varchar(128) default NULL,
  `ISACTIVE` int(1) NOT NULL default '1',
  `RES_CHAR1` varchar(255) default NULL,
  `RES_CHAR2` varchar(255) default NULL,
  `RES_CHAR3` varchar(255) default NULL,
  `RES_INIT1` int(11) default NULL,
  `RES_INIT2` int(11) default NULL,
  `RES_INIT3` int(11) default NULL,
  `DEPLOY_SYS_CODE` varchar(10) default NULL,
  PRIMARY KEY  (`MENU_CODE`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of info_menu
-- ----------------------------
INSERT INTO `info_menu` VALUES ('10000001', null, '1000001', null, '0', '1', '1', 'ems_dispatcher_page_action.action', 'UPS 监控系统', 'UPS 监控系统', null, '1', null, null, null, null, null, null, '1');
INSERT INTO `info_menu` VALUES ('20000004', null, '2000001', null, '0', '2', '1', 'temphumidity_monitor.action', '温湿度监控', '温湿度监控', null, '1', null, null, null, null, null, null, '1');
INSERT INTO `info_menu` VALUES ('20000005', null, '2000001', null, '0', '3', '1', 'leakage_detection.action', '漏水检测', '漏水检测', null, '1', null, null, null, null, null, null, '1');
INSERT INTO `info_menu` VALUES ('200000041', '20000004', '2000001', null, '0', '0', '1', 'roomhumidity_monitor.action', '房间湿度监控', null, null, '1', null, null, null, null, null, null, null);

-- ----------------------------
-- Table structure for `info_oper`
-- ----------------------------
DROP TABLE IF EXISTS `info_oper`;
CREATE TABLE `info_oper` (
  `OPER_NO` varchar(10) NOT NULL,
  `REGION_ID` varchar(15) NOT NULL default '0',
  `DEPT_NO` varchar(10) default '0',
  `ROLE_CODE` varchar(10) default NULL,
  `OPER_NAME` varchar(60) default NULL,
  `LOGIN_NAME` varchar(60) default NULL,
  `OPER_PWD` varchar(64) default NULL,
  `QUESTION` varchar(128) default NULL,
  `ANSWER` varchar(64) default NULL,
  `GENDER` int(1) default '1',
  `POSITIONS` varchar(32) default '1',
  `PHONE` varchar(20) default NULL,
  `EMAIL` varchar(64) default NULL,
  `MOBILE_NO` varchar(20) default NULL,
  `NEED_SMS` int(1) default NULL,
  `OPER_MESSAGE` varchar(228) default NULL,
  `EFF_DATE` date default NULL,
  `EXP_HINT_DATE` date default NULL,
  `EXP_DATE` date default NULL,
  `INIT_FLAG` int(1) default '1',
  `DEAL_TYPE` varchar(1) NOT NULL default '0',
  `APP_TYPE` varchar(5) default '1',
  `STATISTICAL_DEPT_NO` varchar(10) NOT NULL default '999999',
  `OPER_ALIAS` varchar(16) default NULL,
  `LOGIN_COUNT` double default NULL,
  `RES_INIT1` int(11) default NULL,
  `RES_INIT2` int(11) default NULL,
  `RES_CHAR1` varchar(64) default NULL,
  `RES_CHAR2` varchar(64) default NULL,
  `PWD_ENCODE` varchar(64) default NULL,
  `OPER_STATUS` varchar(6) default '100',
  `OPER_KIND` varchar(2) default '10',
  `FLAG` int(11) default '0',
  `ACCT_STATUS` varchar(6) default '1',
  `BUSI_TYPE` varchar(1) default '0',
  `DERATE_FLAG` varchar(1) default '1',
  `IS_ONLINE` varchar(1) default '0',
  `LOGIN_IP` varchar(64) default NULL,
  PRIMARY KEY  (`OPER_NO`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of info_oper
-- ----------------------------
INSERT INTO `info_oper` VALUES ('TEST01', '0000', '0001', '*', '张长风', '', '123456', 'wifename', 'wifename', '1', '1', '13527360252', 'whitecellcisco@hotmail.com', '13527360252', '1', null, null, null, null, '1', '0', '1', '999999', null, '558', null, null, null, null, null, '100', '10', '0', '1', '0', '1', '0', '');

-- ----------------------------
-- Table structure for `info_page`
-- ----------------------------
DROP TABLE IF EXISTS `info_page`;
CREATE TABLE `info_page` (
  `page_id` int(11) NOT NULL,
  `page_resource_id` varchar(20) default NULL,
  `page_type` varchar(6) default NULL,
  `page_image_url` varchar(255) default NULL,
  `page_name` varchar(40) default NULL,
  `page_icon` varchar(255) default NULL,
  `page_image_width` int(4) NOT NULL,
  `page_image_height` int(4) NOT NULL,
  `page_top` int(4) default NULL,
  `page_left` int(4) default NULL,
  `oper_code` varchar(4) default NULL,
  `menu_code` varchar(20) default NULL,
  PRIMARY KEY  (`page_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of info_page
-- ----------------------------
INSERT INTO `info_page` VALUES ('10000001', '10000001', 'NOR', 'image/power_10.jpg', 'UpsMain', null, '800', '800', '0', '0', 'SHOW', '10000001');

-- ----------------------------
-- Table structure for `info_page_resource`
-- ----------------------------
DROP TABLE IF EXISTS `info_page_resource`;
CREATE TABLE `info_page_resource` (
  `resource_id` int(11) NOT NULL auto_increment,
  `page_resource` varchar(20) default NULL,
  `xtype_code` varchar(20) default NULL,
  `resource_top` int(4) default NULL,
  `resource_left` int(4) default NULL,
  `resource_width` int(4) default NULL,
  `resource_height` int(4) default NULL,
  `value_id` varchar(20) default NULL,
  `config` varchar(255) default NULL,
  `base_cls` varchar(20) default NULL,
  PRIMARY KEY  (`resource_id`),
  UNIQUE KEY `un_value_id_key` (`value_id`)
) ENGINE=MyISAM AUTO_INCREMENT=1000003 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of info_page_resource
-- ----------------------------
INSERT INTO `info_page_resource` VALUES ('1000001', '10000001', 'textfield', '500', '500', '60', '30', 'L10000011', null, null);
INSERT INTO `info_page_resource` VALUES ('1000002', '10000001', 'textfield', '300', '400', '60', '30', 'L10000012', null, null);

-- ----------------------------
-- Table structure for `info_role`
-- ----------------------------
DROP TABLE IF EXISTS `info_role`;
CREATE TABLE `info_role` (
  `ROLE_CODE` varchar(6) NOT NULL,
  `REGION_ID` varchar(15) NOT NULL default '0',
  `ROLE_LEVEL` varchar(6) NOT NULL,
  `LOCAL_NET` varchar(6) default NULL,
  `COMMENTS` varchar(128) default NULL,
  `ROLE_NAME` varchar(32) default NULL,
  `OPER_NO` varchar(10) NOT NULL,
  `ISACTIVE` int(1) NOT NULL default '1',
  `RES_CHAR` varchar(64) default NULL,
  `SYS_TYPE` varchar(6) default '1',
  `ROLE_TYPE` varchar(6) default '1',
  `BELONG_TYPE` varchar(1) default NULL,
  `DEPT_NO` varchar(6) default NULL,
  PRIMARY KEY  (`ROLE_CODE`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of info_role
-- ----------------------------
INSERT INTO `info_role` VALUES ('OP', '0', '1', null, '操作员', '操作员', 'TEST01', '1', null, '1', '1', null, null);

-- ----------------------------
-- Table structure for `info_sys_module`
-- ----------------------------
DROP TABLE IF EXISTS `info_sys_module`;
CREATE TABLE `info_sys_module` (
  `module_code` varchar(20) NOT NULL,
  `module_name` varchar(50) NOT NULL,
  `module_index` varchar(10) default NULL,
  `is_active` int(1) default '1',
  PRIMARY KEY  (`module_code`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of info_sys_module
-- ----------------------------
INSERT INTO `info_sys_module` VALUES ('1000001', '动力配电监控', '1', '1');
INSERT INTO `info_sys_module` VALUES ('2000001', '场地环境监控', '2', '1');
INSERT INTO `info_sys_module` VALUES ('3000001', '场地安全监控', '3', '1');
INSERT INTO `info_sys_module` VALUES ('4000001', '机柜微环境监控', '4', '1');
INSERT INTO `info_sys_module` VALUES ('5000001', '设备通讯状态监控', '5', '1');

-- ----------------------------
-- Table structure for `linkage_history`
-- ----------------------------
DROP TABLE IF EXISTS `linkage_history`;
CREATE TABLE `linkage_history` (
  `history_id` int(11) NOT NULL COMMENT '历史ID',
  `linkage_policy_id` int(11) NOT NULL COMMENT '联动策略ID',
  `linkage_value` varchar(255) NOT NULL COMMENT '联动值',
  `linkage_time` datetime NOT NULL COMMENT '联动时间',
  `linkage_result` varchar(255) default NULL COMMENT '联动结果',
  PRIMARY KEY  (`history_id`,`linkage_policy_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of linkage_history
-- ----------------------------

-- ----------------------------
-- Table structure for `linkage_policy_setup`
-- ----------------------------
DROP TABLE IF EXISTS `linkage_policy_setup`;
CREATE TABLE `linkage_policy_setup` (
  `linkage_policy_id` int(11) NOT NULL COMMENT '联动策略ID',
  `trigger_id` int(11) NOT NULL,
  `device_variable_id` int(255) NOT NULL COMMENT '设备变量ID',
  `linkage_policy_name` varchar(255) NOT NULL COMMENT '联动策略名称',
  `describe` varchar(255) default NULL COMMENT '描述',
  `linkage_value` varchar(255) NOT NULL COMMENT '联动值',
  `execute_delay` int(11) NOT NULL COMMENT '执行延时',
  PRIMARY KEY  (`linkage_policy_id`,`trigger_id`,`device_variable_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of linkage_policy_setup
-- ----------------------------

-- ----------------------------
-- Table structure for `linkage_trigger_setup`
-- ----------------------------
DROP TABLE IF EXISTS `linkage_trigger_setup`;
CREATE TABLE `linkage_trigger_setup` (
  `trigger_id` int(11) NOT NULL COMMENT '触发ID',
  `device_variable_id` int(11) NOT NULL COMMENT '设备变量ID',
  `trigger_name` varchar(255) NOT NULL COMMENT '触发名称',
  `describe` varchar(255) default NULL COMMENT '描述',
  `trigger_range_minimum_value` varchar(255) NOT NULL COMMENT '触发范围最小值',
  `trigger_range_maximum_value` varchar(255) NOT NULL COMMENT '触发范围最大值',
  PRIMARY KEY  (`trigger_id`,`device_variable_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of linkage_trigger_setup
-- ----------------------------

-- ----------------------------
-- Table structure for `log_info_event`
-- ----------------------------
DROP TABLE IF EXISTS `log_info_event`;
CREATE TABLE `log_info_event` (
  `log_event_sn` int(15) NOT NULL default '0',
  `event_sn` int(10) default NULL,
  `event_name` varchar(40) default NULL,
  `event_description` varchar(255) default NULL,
  `fire_time` datetime default NULL,
  `event_level` int(2) default NULL,
  `is_confirm` int(1) default NULL,
  `source_entity_code` varchar(20) default NULL,
  `process_time` datetime default NULL,
  `oper_no` varchar(20) default NULL,
  PRIMARY KEY  (`log_event_sn`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of log_info_event
-- ----------------------------

-- ----------------------------
-- Table structure for `real_time_data`
-- ----------------------------
DROP TABLE IF EXISTS `real_time_data`;
CREATE TABLE `real_time_data` (
  `data_sn` int(10) NOT NULL auto_increment,
  `device_var_id` varchar(20) NOT NULL,
  `var_phy_value` varchar(255) default NULL,
  `var_logic_value` varchar(255) default NULL,
  `collect_time` datetime default NULL,
  PRIMARY KEY  (`data_sn`),
  UNIQUE KEY `un_real_var` (`device_var_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of real_time_data
-- ----------------------------
INSERT INTO `real_time_data` VALUES ('1', 'UPS10011', '218', '234', '2010-11-23 11:45:02');

-- ----------------------------
-- Table structure for `realtime_data`
-- ----------------------------
DROP TABLE IF EXISTS `realtime_data`;
CREATE TABLE `realtime_data` (
  `device_variable_id` int(11) NOT NULL COMMENT '设备变量ID',
  `variable_physics_value` varchar(255) default NULL COMMENT '变量物理值',
  `variable_logic_value` varchar(255) default NULL COMMENT '变量逻辑值',
  `is_valid` smallint(6) default NULL COMMENT '是否有效',
  `update_time` datetime default NULL COMMENT '更新时间',
  PRIMARY KEY  (`device_variable_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of realtime_data
-- ----------------------------

-- ----------------------------
-- Table structure for `rule_data_device`
-- ----------------------------
DROP TABLE IF EXISTS `rule_data_device`;
CREATE TABLE `rule_data_device` (
  `rule_id` int(20) NOT NULL auto_increment,
  `value_id` varchar(20) NOT NULL,
  `value_name` varchar(40) default NULL,
  `device_number` varchar(40) default NULL,
  `device_value_id` varchar(20) NOT NULL,
  PRIMARY KEY  (`rule_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rule_data_device
-- ----------------------------
INSERT INTO `rule_data_device` VALUES ('1', 'L10000011', 'UPS', 'UPS1001', 'UPS10011');

-- ----------------------------
-- Table structure for `rule_engine_data`
-- ----------------------------
DROP TABLE IF EXISTS `rule_engine_data`;
CREATE TABLE `rule_engine_data` (
  `rule_id` int(6) NOT NULL,
  `engine_name` varchar(40) default NULL,
  `engine_code` varchar(20) default NULL,
  `engine_type` varchar(20) default NULL,
  `value_id` varchar(20) default NULL,
  `value_type` varchar(6) default NULL,
  PRIMARY KEY  (`rule_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rule_engine_data
-- ----------------------------
INSERT INTO `rule_engine_data` VALUES ('1', 'directEngine', 'DE101', 'AJ', 'L10000011', null);
INSERT INTO `rule_engine_data` VALUES ('2', 'directEngine', 'DE101', 'AJ', 'L10000012', null);

-- ----------------------------
-- Table structure for `rule_oper_role`
-- ----------------------------
DROP TABLE IF EXISTS `rule_oper_role`;
CREATE TABLE `rule_oper_role` (
  `OPER_NO` varchar(10) NOT NULL,
  `ROLE_CODE` varchar(6) NOT NULL,
  `RID` int(6) NOT NULL auto_increment,
  PRIMARY KEY  (`RID`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rule_oper_role
-- ----------------------------
INSERT INTO `rule_oper_role` VALUES ('TEST01', 'OP', '1');

-- ----------------------------
-- Table structure for `rule_role_func`
-- ----------------------------
DROP TABLE IF EXISTS `rule_role_func`;
CREATE TABLE `rule_role_func` (
  `ROLE_CODE` varchar(6) NOT NULL,
  `ENTITY_TYPE` varchar(10) NOT NULL,
  `ENTITY_CODE` varchar(15) NOT NULL,
  PRIMARY KEY  (`ENTITY_CODE`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rule_role_func
-- ----------------------------
INSERT INTO `rule_role_func` VALUES ('OP', 'M', '10000001');
INSERT INTO `rule_role_func` VALUES ('OP', 'M', '20000004');
INSERT INTO `rule_role_func` VALUES ('OP', 'M', '20000005');
INSERT INTO `rule_role_func` VALUES ('OP', 'M', '200000041');

-- ----------------------------
-- Table structure for `variable_type`
-- ----------------------------
DROP TABLE IF EXISTS `variable_type`;
CREATE TABLE `variable_type` (
  `variable_type_id` int(11) NOT NULL COMMENT '变量类型ID',
  `variable_type_name` varchar(255) NOT NULL COMMENT '变量类型名称',
  `describe` varchar(255) NOT NULL COMMENT '描述',
  `variable_unit` varchar(255) NOT NULL COMMENT '变量值度量单位',
  PRIMARY KEY  (`variable_type_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of variable_type
-- ----------------------------
