<?php
/**
 * 设置常量的模型
 */
class ConstDefine extends AppModel {

    /** 常量类没有数据库表 */
    public $useTable = false;

    /** 错误信息 */
    const ERROR_LOGIN = '密码不正确或者用户名不存在';
}