<?php
/**
 * 设置常量的模型
 */
class ConstDefine extends AppModel {

    /** 常量类没有数据库表 */
    public $useTable = false;

    /** 错误信息 */
    const ERROR_LOGIN = '密码不正确或者用户名不存在';

    /** 订单状态 */
    const ORDER_LAST_STATUS_0 = '0';
    const ORDER_LAST_STATUS_1 = '1';
    const ORDER_LAST_STATUS_2 = '2';
    const ORDER_LAST_STATUS_3 = '3';

    /** 订单类型 */
    const ORDER_TYPE_1 = '1';
    const ORDER_TYPE_2 = '2';
    const ORDER_TYPE_3 = '3';
    const ORDER_TYPE_4 = '4';
}