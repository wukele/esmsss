-- phpMyAdmin SQL Dump
-- version 2.10.2
-- http://www.phpmyadmin.net
-- 
-- 主机: localhost
-- 生成日期: 2011 年 01 月 25 日 02:14
-- 服务器版本: 5.0.45
-- PHP 版本: 5.2.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

-- 
-- 数据库: `protest`
-- 

-- --------------------------------------------------------

-- 
-- 表的结构 `alarm_level_setup`
-- 

CREATE TABLE IF NOT EXISTS `alarm_level_setup` (
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

-- 
-- 导出表中的数据 `alarm_level_setup`
-- 


-- --------------------------------------------------------

-- 
-- 表的结构 `alarm_operate`
-- 

CREATE TABLE IF NOT EXISTS `alarm_operate` (
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

-- 
-- 导出表中的数据 `alarm_operate`
-- 


-- --------------------------------------------------------

-- 
-- 表的结构 `alarm_policy`
-- 

CREATE TABLE IF NOT EXISTS `alarm_policy` (
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

-- 
-- 导出表中的数据 `alarm_policy`
-- 


-- --------------------------------------------------------

-- 
-- 表的结构 `alarm_policy_effect_area`
-- 

CREATE TABLE IF NOT EXISTS `alarm_policy_effect_area` (
  `area_id` int(11) NOT NULL COMMENT '区域ID',
  `alarm_policy_id` int(11) NOT NULL COMMENT '报警策略ID',
  `device_variable_id` int(11) NOT NULL COMMENT '设备变量ID',
  PRIMARY KEY  (`area_id`,`alarm_policy_id`,`device_variable_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- 
-- 导出表中的数据 `alarm_policy_effect_area`
-- 


-- --------------------------------------------------------

-- 
-- 表的结构 `bspk_data_device`
-- 

CREATE TABLE IF NOT EXISTS `bspk_data_device` (
  `rule_id` int(20) NOT NULL auto_increment,
  `value_id` varchar(20) NOT NULL,
  `value_name` varchar(40) default NULL,
  `device_number` varchar(40) default NULL,
  `device_value_id` varchar(20) NOT NULL,
  PRIMARY KEY  (`rule_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC AUTO_INCREMENT=2 ;

-- 
-- 导出表中的数据 `bspk_data_device`
-- 


-- --------------------------------------------------------

-- 
-- 表的结构 `bspk_info_page`
-- 

CREATE TABLE IF NOT EXISTS `bspk_info_page` (
  `bspk_page_id` int(10) NOT NULL auto_increment,
  `bspk_page_name` varchar(255) default NULL,
  `bspk_image_path` varchar(255) default NULL,
  `bspk_image_width` int(3) default NULL,
  `bspk_image_height` int(3) default NULL,
  `bspk_page_resource` varchar(20) default NULL,
  `bspk_oper_code` varchar(10) default NULL,
  `bspk_page_type` varchar(2) NOT NULL,
  PRIMARY KEY  (`bspk_page_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC AUTO_INCREMENT=10000002 ;

-- 
-- 导出表中的数据 `bspk_info_page`
-- 

INSERT INTO `bspk_info_page` VALUES (10000001, 'UpsMain', 'image/power_10.jpg', NULL, 550, '10000001', 'UPS', 'NO');

-- --------------------------------------------------------

-- 
-- 表的结构 `bspk_page_resource`
-- 

CREATE TABLE IF NOT EXISTS `bspk_page_resource` (
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
  UNIQUE KEY `un_value_id_key` USING BTREE (`value_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC AUTO_INCREMENT=1000003 ;

-- 
-- 导出表中的数据 `bspk_page_resource`
-- 

INSERT INTO `bspk_page_resource` VALUES (1000001, '10000001', 'textfield', 478, 480, 60, 30, 'L10000011', '', '');
INSERT INTO `bspk_page_resource` VALUES (1000002, '10000001', 'textfield', 300, 400, 60, 30, 'L10000012', '', '');

-- --------------------------------------------------------

-- 
-- 表的结构 `bspk_resource_config`
-- 

CREATE TABLE IF NOT EXISTS `bspk_resource_config` (
  `config_sn` int(11) NOT NULL auto_increment,
  `config_parameter` varchar(100) default NULL,
  `config_value` varchar(255) default NULL,
  `config_type` varchar(4) default NULL,
  `configDesc` varchar(100) default NULL,
  `resource_id` int(11) default NULL,
  PRIMARY KEY  (`config_sn`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC AUTO_INCREMENT=1 ;

-- 
-- 导出表中的数据 `bspk_resource_config`
-- 


-- --------------------------------------------------------

-- 
-- 表的结构 `code_classify`
-- 

CREATE TABLE IF NOT EXISTS `code_classify` (
  `classify_primary_key` varchar(255) NOT NULL default '' COMMENT '分类主键',
  `classify_id` int(11) NOT NULL,
  `classify_name` varchar(255) NOT NULL COMMENT '分类名称',
  `describe` varchar(255) default NULL COMMENT '描述',
  PRIMARY KEY  (`classify_primary_key`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- 
-- 导出表中的数据 `code_classify`
-- 


-- --------------------------------------------------------

-- 
-- 表的结构 `code_component`
-- 

CREATE TABLE IF NOT EXISTS `code_component` (
  `component_id` int(6) NOT NULL auto_increment,
  `code_xtype` varchar(20) NOT NULL,
  `component_name` varchar(40) default NULL,
  `component_resource_id` varchar(20) default NULL,
  `full_type` varchar(100) default NULL,
  PRIMARY KEY  (`component_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1000003 ;

-- 
-- 导出表中的数据 `code_component`
-- 

INSERT INTO `code_component` VALUES (1000001, 'textfield', '普通字段', 'B000001', 'Ext.form.TextField');
INSERT INTO `code_component` VALUES (1000002, 'ImageBox', '图片框', 'E000001', 'Ext.ems.ImageBox');

-- --------------------------------------------------------

-- 
-- 表的结构 `code_list`
-- 

CREATE TABLE IF NOT EXISTS `code_list` (
  `CODE_ID` int(11) NOT NULL,
  `CODE_TYPE` varchar(255) NOT NULL,
  `CODE_VALUE` varchar(255) NOT NULL,
  `CODE_DESC` varchar(255) default NULL,
  `SEQ_NO` int(4) default NULL,
  PRIMARY KEY  (`CODE_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- 
-- 导出表中的数据 `code_list`
-- 


-- --------------------------------------------------------

-- 
-- 表的结构 `code_table`
-- 

CREATE TABLE IF NOT EXISTS `code_table` (
  `code_id` int(11) NOT NULL COMMENT '代码ID',
  `classify_primary_key` varchar(255) NOT NULL COMMENT '分类主键',
  `code_classify_id` int(11) NOT NULL COMMENT '代码分类ID',
  `code_value` varchar(255) default NULL COMMENT '代码值',
  `code_display_name` varchar(255) default NULL COMMENT '代码显示名称',
  PRIMARY KEY  (`code_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- 
-- 导出表中的数据 `code_table`
-- 


-- --------------------------------------------------------

-- 
-- 表的结构 `comm_alarm`
-- 

CREATE TABLE IF NOT EXISTS `comm_alarm` (
  `comm_sn` int(11) NOT NULL auto_increment,
  `inst_code` varchar(0) NOT NULL,
  `run_times` int(11) default '0',
  `run_status` int(11) default '0',
  `oper_no` varchar(20) default NULL,
  `run_date` datetime default NULL,
  `insert_date` datetime default NULL,
  `device_id` varchar(20) default NULL,
  PRIMARY KEY  (`comm_sn`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- 
-- 导出表中的数据 `comm_alarm`
-- 


-- --------------------------------------------------------

-- 
-- 表的结构 `component_resource_code`
-- 

CREATE TABLE IF NOT EXISTS `component_resource_code` (
  `component_resource_sn` int(6) NOT NULL auto_increment,
  `resource_type` varchar(6) default NULL,
  `script_url` varchar(100) default NULL,
  `need_script` int(1) NOT NULL default '0',
  `component_resource_id` varchar(20) NOT NULL,
  PRIMARY KEY  (`component_resource_sn`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10000003 ;

-- 
-- 导出表中的数据 `component_resource_code`
-- 

INSERT INTO `component_resource_code` VALUES (10000001, 'BASE', '', 0, 'B000001');
INSERT INTO `component_resource_code` VALUES (10000002, 'EXTEND', '/js/comm/ImageBoxComponent.js', 1, 'E000001');

-- --------------------------------------------------------

-- 
-- 表的结构 `control_command`
-- 

CREATE TABLE IF NOT EXISTS `control_command` (
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

-- 
-- 导出表中的数据 `control_command`
-- 


-- --------------------------------------------------------

-- 
-- 表的结构 `device_table`
-- 

CREATE TABLE IF NOT EXISTS `device_table` (
  `device_id` int(11) NOT NULL auto_increment COMMENT '设备ID',
  `device_name` varchar(255) character set utf8 NOT NULL COMMENT '设备名称',
  `device_type` varchar(255) character set utf8 NOT NULL COMMENT '设备类型',
  `device_ip` varchar(255) character set utf8 NOT NULL COMMENT '设备IP',
  `collect_task_id` int(11) NOT NULL COMMENT '采集任务ID',
  `action_flag` smallint(6) NOT NULL COMMENT '活动标志',
  PRIMARY KEY  (`device_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10000004 ;

-- 
-- 导出表中的数据 `device_table`
-- 

INSERT INTO `device_table` VALUES (10000001, '设备1', '电力', '192.168.1.100', 1000001, 1);
INSERT INTO `device_table` VALUES (10000002, '设备2', '电力', '192.168.1.102', 1000002, 1);
INSERT INTO `device_table` VALUES (10000003, '设备3', '漏水', '192.168.1.103', 1000003, 1);

-- --------------------------------------------------------

-- 
-- 表的结构 `device_variable`
-- 

CREATE TABLE IF NOT EXISTS `device_variable` (
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

-- 
-- 导出表中的数据 `device_variable`
-- 


-- --------------------------------------------------------

-- 
-- 表的结构 `engine_parameter`
-- 

CREATE TABLE IF NOT EXISTS `engine_parameter` (
  ` parameter_id` int(6) NOT NULL,
  `engine_id` varchar(11) default NULL,
  `parameter_name` varchar(20) default NULL,
  `parameter_value` varchar(100) default NULL,
  PRIMARY KEY  (` parameter_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- 
-- 导出表中的数据 `engine_parameter`
-- 

INSERT INTO `engine_parameter` VALUES (1, '1', 'javascript', 'js/engines/DirectDataEngine.js');

-- --------------------------------------------------------

-- 
-- 表的结构 `filter_setup`
-- 

CREATE TABLE IF NOT EXISTS `filter_setup` (
  `buffer_id` int(11) NOT NULL COMMENT '缓冲ID',
  `device_variable_id` int(11) NOT NULL COMMENT '设备变量ID',
  `buffer_time` datetime NOT NULL COMMENT '缓冲时间',
  `buffer_number` int(11) NOT NULL COMMENT '缓冲次数',
  `buffer_region_minimum_value` varchar(255) NOT NULL COMMENT '缓冲区间最小值',
  `buffer_region_maximum_value` varchar(255) NOT NULL COMMENT '缓冲区间最大值',
  PRIMARY KEY  (`buffer_id`,`device_variable_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- 
-- 导出表中的数据 `filter_setup`
-- 


-- --------------------------------------------------------

-- 
-- 表的结构 `history_data`
-- 

CREATE TABLE IF NOT EXISTS `history_data` (
  `history_id` int(11) NOT NULL COMMENT '历史ID',
  `device_variable_id` int(255) NOT NULL COMMENT '设备变量ID',
  `variable_physics_value` varchar(255) default NULL COMMENT '变量物理值',
  `variable_logic_value` varchar(255) default NULL COMMENT '变量逻辑值',
  `collect_time` datetime default NULL COMMENT '采集时间',
  PRIMARY KEY  (`history_id`,`device_variable_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- 
-- 导出表中的数据 `history_data`
-- 


-- --------------------------------------------------------

-- 
-- 表的结构 `info_config`
-- 

CREATE TABLE IF NOT EXISTS `info_config` (
  `CONFIG_ID` varchar(20) NOT NULL,
  `CONFIG_NAME` varchar(30) default NULL,
  `CONFIG_VALUE` varchar(50) NOT NULL,
  `CONFIG_DESC` varchar(100) default NULL,
  PRIMARY KEY  (`CONFIG_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- 
-- 导出表中的数据 `info_config`
-- 

INSERT INTO `info_config` VALUES ('1000001', 'MaxInactiveInterval', '60', 'MaxInactiveInterval');
INSERT INTO `info_config` VALUES ('1000002', 'BackgroundImagePath', 'BackgroundImage', 'BackgroundImagePath');
INSERT INTO `info_config` VALUES ('1000003', 'BackgroundImagePath', 'upload/bgImage', 'BackgroundImagePath');
INSERT INTO `info_config` VALUES ('1000004', 'tpl_page_type', 'E', 'E');

-- --------------------------------------------------------

-- 
-- 表的结构 `info_dept`
-- 

CREATE TABLE IF NOT EXISTS `info_dept` (
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

-- 
-- 导出表中的数据 `info_dept`
-- 

INSERT INTO `info_dept` VALUES ('324324', '100000', 'ASD', '1', 'SDF', '831', 'DSF', 'ASD', '', 'ASD', '1', 'ASD', '', 'SAD', 'ASD', 'ASD');
INSERT INTO `info_dept` VALUES ('100000', '324324', '大石福海', '1', '场地1', '831', '123', '123324', '12324', '123', '1', '', '', '', '', '');

-- --------------------------------------------------------

-- 
-- 表的结构 `info_device_page`
-- 

CREATE TABLE IF NOT EXISTS `info_device_page` (
  `page_id` int(11) NOT NULL,
  `page_resource_id` varchar(20) default NULL,
  `page_type` varchar(6) default NULL,
  `page_image_url` varchar(255) default NULL,
  `page_name` varchar(40) default NULL,
  `page_icon` varchar(40) default NULL,
  `page_image_width` int(4) NOT NULL,
  `page_image_height` int(4) NOT NULL,
  `page_top` int(4) default NULL,
  `page_left` int(4) default NULL,
  `oper_code` varchar(4) default NULL,
  `device_id` varchar(20) default NULL,
  `device_type` varchar(20) default NULL,
  PRIMARY KEY  (`page_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- 
-- 导出表中的数据 `info_device_page`
-- 


-- --------------------------------------------------------

-- 
-- 表的结构 `info_engine`
-- 

CREATE TABLE IF NOT EXISTS `info_engine` (
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

-- 
-- 导出表中的数据 `info_engine`
-- 

INSERT INTO `info_engine` VALUES (1, 'DE101', 'directEngine', 'DirectDataEngine.action', '1', 'AJ', NULL, 10);

-- --------------------------------------------------------

-- 
-- 表的结构 `info_event`
-- 

CREATE TABLE IF NOT EXISTS `info_event` (
  `event_sn` int(10) NOT NULL auto_increment,
  `event_name` varchar(40) default NULL,
  `event_description` varchar(255) default NULL,
  `fire_time` datetime default NULL,
  `event_level` int(2) default NULL,
  `is_confirm` int(1) default NULL,
  `source_entity_code` varchar(20) NOT NULL,
  `device_var_id` varchar(20) default NULL,
  PRIMARY KEY  (`event_sn`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- 
-- 导出表中的数据 `info_event`
-- 


-- --------------------------------------------------------

-- 
-- 表的结构 `info_menu`
-- 

CREATE TABLE IF NOT EXISTS `info_menu` (
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

-- 
-- 导出表中的数据 `info_menu`
-- 

INSERT INTO `info_menu` VALUES ('10000001', NULL, '1000001', NULL, 0, 1, 1, 'ems_dispatcher_page_action.action', 'UPS 监控系统', 'UPS 监控系统', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '1');
INSERT INTO `info_menu` VALUES ('20000004', NULL, '2000001', NULL, 0, 2, 1, 'temphumidity_monitor.action', '温湿度监控', '温湿度监控', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '1');
INSERT INTO `info_menu` VALUES ('20000005', NULL, '2000001', NULL, 0, 3, 1, 'leakage_detection.action', '漏水检测', '漏水检测', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '1');
INSERT INTO `info_menu` VALUES ('200000041', '20000004', '2000001', NULL, 0, 0, 1, 'roomhumidity_monitor.action', '房间湿度监控', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '1');
INSERT INTO `info_menu` VALUES ('60000001', NULL, '6000001', NULL, 0, 0, 1, 'pages/admin/userAdmin/RoleAddEntityRule/RoleAddEntityRule.jsp', '角色功能新增', '角色功能新增', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '1');
INSERT INTO `info_menu` VALUES ('60000002', NULL, '6000001', NULL, 0, 0, 1, 'pages/admin/userAdmin/RoleAddDevice/RoleMangerDevice.jsp', '角色设备新增', '角色设备新增', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '1');
INSERT INTO `info_menu` VALUES ('70000001', NULL, '7000001', NULL, 0, 0, 1, 'pages/admin/pageAdmin/SubSystemModuleAdmin/SubSystemModuleMgr.jsp', '子系统管理', '子系统管理', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '1');
INSERT INTO `info_menu` VALUES ('70000002', NULL, '7000001', NULL, 0, 0, 1, 'pages/admin/pageAdmin/PageTemplateAdd/PageTmeplateManger.jsp', '页面底图管理', '页面底图管理', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '1');
INSERT INTO `info_menu` VALUES ('60000003', NULL, '6000001', NULL, 0, 0, 1, 'pages/admin/userAdmin/InfoDeptManager/InfoDeptManager.jsp', '部门信息管', '部门信息管', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '1');
INSERT INTO `info_menu` VALUES ('60000004', NULL, '6000001', NULL, 0, 0, 1, 'user_manager_main_view.action', '用户管理', '用户管理', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '1');
INSERT INTO `info_menu` VALUES ('60000005', NULL, '6000001', NULL, 0, 0, 1, 'pages/admin/userAdmin/RoleManage/RoleManageMain.jsp', '角色管理', '角色管理', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '1');
INSERT INTO `info_menu` VALUES ('70000003', NULL, '7000001', NULL, 0, 0, 1, 'pages/admin/pageAdmin/RemainTplPage/RemainTemlatePage.jsp', '模板页维护', '模板页维护', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '1');
INSERT INTO `info_menu` VALUES ('70000005', NULL, '7000001', NULL, 0, 0, 1, 'pages/admin/pageAdmin/TplPageComponentMgr/TplPageCompMgr.jsp', '模板页面组件新增', '模板页面组件新增', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '1');
INSERT INTO `info_menu` VALUES ('70000006', NULL, '7000001', NULL, 0, 0, 1, 'pages/admin/pageAdmin/TplComponentData/BskpComponentData.jsp', '模板页数据绑定', '模板页数据绑定', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '1');
INSERT INTO `info_menu` VALUES ('70000007', NULL, '7000001', NULL, 0, 0, 1, 'pages/admin/pageAdmin/TplPageResource/TplPageResource.jsp', '模板页面组件管理', '模板页面组件管理', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '1');
INSERT INTO `info_menu` VALUES ('60000006', NULL, '6000001', NULL, 0, 0, 1, 'pages/admin/userAdmin/RuleOperRoleManager/RuleOperRoleManager.jsp', '用户角色管理', '用户角色管理', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '1');

-- --------------------------------------------------------

-- 
-- 表的结构 `info_oper`
-- 

CREATE TABLE IF NOT EXISTS `info_oper` (
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

-- 
-- 导出表中的数据 `info_oper`
-- 

INSERT INTO `info_oper` VALUES ('TEST01', '0000', '0001', '*', '张长风', '0:0:0:0:0:0:0:1', '123456', 'wifename', 'wifename', 1, '1', '13527360252', 'whitecellcisco@hotmail.com', '13527360252', 1, NULL, NULL, NULL, NULL, 1, '0', '1', '999999', NULL, 1469, NULL, NULL, NULL, NULL, NULL, '100', '10', 0, '1', '0', '1', '1', '0:0:0:0:0:0:0:1');
INSERT INTO `info_oper` VALUES ('TEST02', '0', NULL, NULL, 'dORA', '0:0:0:0:0:0:0:1', '123456', NULL, NULL, 1, 'CQ', '123245', NULL, '12345687', NULL, NULL, NULL, NULL, NULL, NULL, '0', NULL, '999999', NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, '1', '0:0:0:0:0:0:0:1');

-- --------------------------------------------------------

-- 
-- 表的结构 `info_page`
-- 

CREATE TABLE IF NOT EXISTS `info_page` (
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

-- 
-- 导出表中的数据 `info_page`
-- 

INSERT INTO `info_page` VALUES (10000001, '10000001', 'NOR', 'image/power_10.jpg', 'UpsMain', NULL, 800, 800, 0, 0, 'SHOW', '10000001');

-- --------------------------------------------------------

-- 
-- 表的结构 `info_page_resource`
-- 

CREATE TABLE IF NOT EXISTS `info_page_resource` (
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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1000003 ;

-- 
-- 导出表中的数据 `info_page_resource`
-- 

INSERT INTO `info_page_resource` VALUES (1000001, '10000001', 'textfield', 500, 500, 60, 20, 'L10000011', NULL, NULL);
INSERT INTO `info_page_resource` VALUES (1000002, '10000001', 'textfield', 300, 400, 60, 30, 'L10000012', NULL, NULL);

-- --------------------------------------------------------

-- 
-- 表的结构 `info_role`
-- 

CREATE TABLE IF NOT EXISTS `info_role` (
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

-- 
-- 导出表中的数据 `info_role`
-- 

INSERT INTO `info_role` VALUES ('OP', '0', '1', NULL, '操作员', '操作员', 'TEST01', 1, NULL, '1', '1', NULL, NULL);
INSERT INTO `info_role` VALUES ('AD', '0', '1', NULL, '系统管理员', '系统管理员', 'TEST01', 1, NULL, '1', '1', NULL, NULL);

-- --------------------------------------------------------

-- 
-- 表的结构 `info_sys_module`
-- 

CREATE TABLE IF NOT EXISTS `info_sys_module` (
  `module_code` varchar(20) NOT NULL,
  `module_name` varchar(50) NOT NULL,
  `module_index` varchar(10) default NULL,
  `is_active` int(1) default '1',
  PRIMARY KEY  (`module_code`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- 
-- 导出表中的数据 `info_sys_module`
-- 

INSERT INTO `info_sys_module` VALUES ('1000001', '动力配电监控', '1', 1);
INSERT INTO `info_sys_module` VALUES ('3000001', '场地安全监控', '3', 1);
INSERT INTO `info_sys_module` VALUES ('5000001', '设备通讯状态监控', '5', 1);
INSERT INTO `info_sys_module` VALUES ('6000001', '用户管理', '6', 1);
INSERT INTO `info_sys_module` VALUES ('7000001', '页面管理', '7', 1);
INSERT INTO `info_sys_module` VALUES ('0000000', '主页面', '0', 1);

-- --------------------------------------------------------

-- 
-- 表的结构 `linkage_history`
-- 

CREATE TABLE IF NOT EXISTS `linkage_history` (
  `history_id` int(11) NOT NULL COMMENT '历史ID',
  `linkage_policy_id` int(11) NOT NULL COMMENT '联动策略ID',
  `linkage_value` varchar(255) NOT NULL COMMENT '联动值',
  `linkage_time` datetime NOT NULL COMMENT '联动时间',
  `linkage_result` varchar(255) default NULL COMMENT '联动结果',
  PRIMARY KEY  (`history_id`,`linkage_policy_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- 
-- 导出表中的数据 `linkage_history`
-- 


-- --------------------------------------------------------

-- 
-- 表的结构 `linkage_policy_setup`
-- 

CREATE TABLE IF NOT EXISTS `linkage_policy_setup` (
  `linkage_policy_id` int(11) NOT NULL COMMENT '联动策略ID',
  `trigger_id` int(11) NOT NULL,
  `device_variable_id` int(255) NOT NULL COMMENT '设备变量ID',
  `linkage_policy_name` varchar(255) NOT NULL COMMENT '联动策略名称',
  `describe` varchar(255) default NULL COMMENT '描述',
  `linkage_value` varchar(255) NOT NULL COMMENT '联动值',
  `execute_delay` int(11) NOT NULL COMMENT '执行延时',
  PRIMARY KEY  (`linkage_policy_id`,`trigger_id`,`device_variable_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- 
-- 导出表中的数据 `linkage_policy_setup`
-- 


-- --------------------------------------------------------

-- 
-- 表的结构 `linkage_trigger_setup`
-- 

CREATE TABLE IF NOT EXISTS `linkage_trigger_setup` (
  `trigger_id` int(11) NOT NULL COMMENT '触发ID',
  `device_variable_id` int(11) NOT NULL COMMENT '设备变量ID',
  `trigger_name` varchar(255) NOT NULL COMMENT '触发名称',
  `describe` varchar(255) default NULL COMMENT '描述',
  `trigger_range_minimum_value` varchar(255) NOT NULL COMMENT '触发范围最小值',
  `trigger_range_maximum_value` varchar(255) NOT NULL COMMENT '触发范围最大值',
  PRIMARY KEY  (`trigger_id`,`device_variable_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- 
-- 导出表中的数据 `linkage_trigger_setup`
-- 


-- --------------------------------------------------------

-- 
-- 表的结构 `log_comm_alarm`
-- 

CREATE TABLE IF NOT EXISTS `log_comm_alarm` (
  `comm_sn` int(11) NOT NULL auto_increment,
  `inst_code` varchar(0) NOT NULL,
  `run_times` int(11) default '0',
  `run_status` int(11) default '0',
  `oper_no` varchar(20) default NULL,
  `run_date` datetime default NULL,
  `insert_date` datetime default NULL,
  `device_id` varchar(20) default NULL,
  `result` varchar(50) default NULL,
  PRIMARY KEY  (`comm_sn`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC AUTO_INCREMENT=1 ;

-- 
-- 导出表中的数据 `log_comm_alarm`
-- 


-- --------------------------------------------------------

-- 
-- 表的结构 `log_info_event`
-- 

CREATE TABLE IF NOT EXISTS `log_info_event` (
  `log_event_sn` int(15) NOT NULL default '0',
  `event_sn` int(10) NOT NULL,
  `event_name` varchar(40) default NULL,
  `event_description` varchar(255) default NULL,
  `fire_time` datetime default NULL,
  `event_level` int(2) default NULL,
  `is_confirm` int(1) default NULL,
  `source_entity_code` varchar(20) NOT NULL,
  `process_time` datetime default NULL,
  `oper_no` varchar(20) default NULL,
  `device_var_id` varchar(20) default NULL,
  PRIMARY KEY  (`log_event_sn`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- 
-- 导出表中的数据 `log_info_event`
-- 


-- --------------------------------------------------------

-- 
-- 表的结构 `real_time_data`
-- 

CREATE TABLE IF NOT EXISTS `real_time_data` (
  `data_sn` int(10) NOT NULL auto_increment,
  `device_var_id` varchar(20) NOT NULL,
  `var_phy_value` varchar(255) default NULL,
  `var_logic_value` varchar(255) default NULL,
  `collect_time` datetime default NULL,
  PRIMARY KEY  (`data_sn`),
  UNIQUE KEY `un_real_var` (`device_var_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

-- 
-- 导出表中的数据 `real_time_data`
-- 

INSERT INTO `real_time_data` VALUES (1, 'UPS10011', '218', '234', '2010-11-23 11:45:02');

-- --------------------------------------------------------

-- 
-- 表的结构 `rule_data_device`
-- 

CREATE TABLE IF NOT EXISTS `rule_data_device` (
  `rule_id` int(20) NOT NULL auto_increment,
  `value_id` varchar(20) NOT NULL,
  `value_name` varchar(40) default NULL,
  `device_number` varchar(40) default NULL,
  `device_value_id` varchar(20) NOT NULL,
  PRIMARY KEY  (`rule_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

-- 
-- 导出表中的数据 `rule_data_device`
-- 

INSERT INTO `rule_data_device` VALUES (1, 'L10000011', 'UPS', 'UPS1001', 'UPS10011');

-- --------------------------------------------------------

-- 
-- 表的结构 `rule_engine_data`
-- 

CREATE TABLE IF NOT EXISTS `rule_engine_data` (
  `rule_id` int(6) NOT NULL auto_increment,
  `engine_name` varchar(40) default NULL,
  `engine_code` varchar(20) default NULL,
  `engine_type` varchar(20) default NULL,
  `value_id` varchar(20) default NULL,
  `value_type` varchar(6) default NULL,
  PRIMARY KEY  (`rule_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

-- 
-- 导出表中的数据 `rule_engine_data`
-- 

INSERT INTO `rule_engine_data` VALUES (1, 'directEngine', 'DE101', 'AJ', 'L10000011', NULL);
INSERT INTO `rule_engine_data` VALUES (2, 'directEngine', 'DE101', 'AJ', 'L10000012', NULL);

-- --------------------------------------------------------

-- 
-- 表的结构 `rule_oper_role`
-- 

CREATE TABLE IF NOT EXISTS `rule_oper_role` (
  `OPER_NO` varchar(10) NOT NULL,
  `ROLE_CODE` varchar(6) NOT NULL,
  `RID` int(6) NOT NULL auto_increment,
  PRIMARY KEY  (`RID`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

-- 
-- 导出表中的数据 `rule_oper_role`
-- 

INSERT INTO `rule_oper_role` VALUES ('TEST01', 'AD', 5);

-- --------------------------------------------------------

-- 
-- 表的结构 `rule_role_func`
-- 

CREATE TABLE IF NOT EXISTS `rule_role_func` (
  `ROLE_CODE` varchar(6) NOT NULL,
  `ENTITY_TYPE` varchar(10) NOT NULL,
  `ENTITY_CODE` varchar(15) NOT NULL,
  `ENTITY_ID` int(11) NOT NULL auto_increment,
  PRIMARY KEY  (`ENTITY_ID`),
  UNIQUE KEY `UN_KEY` (`ROLE_CODE`,`ENTITY_TYPE`,`ENTITY_CODE`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=137 ;

-- 
-- 导出表中的数据 `rule_role_func`
-- 

INSERT INTO `rule_role_func` VALUES ('OP', 'M', '10000001', 1);
INSERT INTO `rule_role_func` VALUES ('AD', 'M', '60000006', 135);
INSERT INTO `rule_role_func` VALUES ('AD', 'M', '60000002', 10);
INSERT INTO `rule_role_func` VALUES ('AD', 'M', '70000003', 130);
INSERT INTO `rule_role_func` VALUES ('AD', 'M', '60000001', 5);
INSERT INTO `rule_role_func` VALUES ('AD', 'M', '60000003', 129);
INSERT INTO `rule_role_func` VALUES ('OP', 'E', '10000003', 126);
INSERT INTO `rule_role_func` VALUES ('AD', 'M', '60000004', 125);
INSERT INTO `rule_role_func` VALUES ('AD', 'M', '70000001', 2);
INSERT INTO `rule_role_func` VALUES ('AD', 'M', '10000001', 116);
INSERT INTO `rule_role_func` VALUES ('OP', 'E', '10000001', 102);
INSERT INTO `rule_role_func` VALUES ('AD', 'M', '70000002', 7);
INSERT INTO `rule_role_func` VALUES ('OP', 'E', '10000002', 127);
INSERT INTO `rule_role_func` VALUES ('AD', 'M', '70000005', 12);
INSERT INTO `rule_role_func` VALUES ('AD', 'M', '60000005', 128);
INSERT INTO `rule_role_func` VALUES ('AD', 'M', '70000006', 15);
INSERT INTO `rule_role_func` VALUES ('AD', 'M', '70000007', 9);
INSERT INTO `rule_role_func` VALUES ('AD', 'E', '10000002', 136);
INSERT INTO `rule_role_func` VALUES ('NOR', 'E', '10000002', 134);

-- --------------------------------------------------------

-- 
-- 表的结构 `tlp_page_image`
-- 

CREATE TABLE IF NOT EXISTS `tlp_page_image` (
  `image_name` varchar(255) default NULL,
  `image_id` int(11) NOT NULL auto_increment,
  `image_path` varchar(255) default NULL,
  `image_display_name` varchar(255) NOT NULL,
  `flag` varchar(2) default NULL,
  `image_desc` varchar(255) default NULL,
  `oper_no` varchar(20) default NULL,
  PRIMARY KEY  (`image_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=60 ;

-- 
-- 导出表中的数据 `tlp_page_image`
-- 

INSERT INTO `tlp_page_image` VALUES ('nvxCNhKJyT.bmp', 58, 'upload/bgImage', '场地', '1', NULL, NULL);
INSERT INTO `tlp_page_image` VALUES ('wnoOppcrjR.bmp', 59, 'upload/bgImage', '电压', '1', NULL, NULL);

-- --------------------------------------------------------

-- 
-- 表的结构 `tpl_info_page`
-- 

CREATE TABLE IF NOT EXISTS `tpl_info_page` (
  `tpl_page_id` int(10) NOT NULL auto_increment,
  `tpl_page_name` varchar(255) default NULL,
  `tpl_image_path` varchar(255) default NULL,
  `tpl_image_width` int(3) default NULL,
  `tpl_image_height` int(3) default NULL,
  `tpl_page_resource` varchar(20) default NULL,
  `tpl_oper_code` varchar(10) default NULL,
  `tpl_page_type` varchar(2) NOT NULL,
  PRIMARY KEY  (`tpl_page_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=23 ;

-- 
-- 导出表中的数据 `tpl_info_page`
-- 

INSERT INTO `tpl_info_page` VALUES (22, '电压', 'upload/bgImage/wnoOppcrjR.bmp', 1050, 600, 'WD00001', NULL, 'E');
INSERT INTO `tpl_info_page` VALUES (21, '场地', 'upload/bgImage/nvxCNhKJyT.bmp', 1024, 800, 'TY0001', NULL, 'E');

-- --------------------------------------------------------

-- 
-- 表的结构 `tpl_page_resource`
-- 

CREATE TABLE IF NOT EXISTS `tpl_page_resource` (
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
  UNIQUE KEY `un_value_id_key` USING BTREE (`value_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC AUTO_INCREMENT=1000016 ;

-- 
-- 导出表中的数据 `tpl_page_resource`
-- 

INSERT INTO `tpl_page_resource` VALUES (1000001, 'TPOWER0G', 'textfield', 500, 500, 60, 20, 'L10000011', '', '');
INSERT INTO `tpl_page_resource` VALUES (1000003, 'WD000001', 'textfield', 10, 10, 30, 30, NULL, NULL, NULL);
INSERT INTO `tpl_page_resource` VALUES (1000014, 'TY0001', 'textfeild', 100, 100, 100, 20, NULL, NULL, NULL);
INSERT INTO `tpl_page_resource` VALUES (1000005, 'TY000001', 'textfield', 100, 100, 100, 30, NULL, NULL, NULL);
INSERT INTO `tpl_page_resource` VALUES (1000013, 'TY0001', 'textfield', 300, 200, 103, 25, NULL, NULL, NULL);

-- --------------------------------------------------------

-- 
-- 表的结构 `tpl_resource_config`
-- 

CREATE TABLE IF NOT EXISTS `tpl_resource_config` (
  `config_sn` int(11) NOT NULL auto_increment,
  `config_parameter` varchar(100) default NULL,
  `config_value` varchar(255) default NULL,
  `config_type` varchar(4) default NULL,
  `configDesc` varchar(100) default NULL,
  `resource_id` int(11) default NULL,
  PRIMARY KEY  (`config_sn`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- 
-- 导出表中的数据 `tpl_resource_config`
-- 


-- --------------------------------------------------------

-- 
-- 表的结构 `variable_type`
-- 

CREATE TABLE IF NOT EXISTS `variable_type` (
  `variable_type_id` int(11) NOT NULL COMMENT '变量类型ID',
  `variable_type_name` varchar(255) NOT NULL COMMENT '变量类型名称',
  `describe` varchar(255) NOT NULL COMMENT '描述',
  `variable_unit` varchar(255) NOT NULL COMMENT '变量值度量单位',
  PRIMARY KEY  (`variable_type_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- 
-- 导出表中的数据 `variable_type`
-- 

