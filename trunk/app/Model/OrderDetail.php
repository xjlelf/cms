<?php
/**
 * 订单明细模型
 * */
class OrderDetail extends AppModel {

    /**
     * 要连的表
     * */
    public $belongsTo = array(
        'Product' => array(
            'className'  => 'Product',
            'foreignKey' => 'product'
        ),
        'Order' => array(
            'className'  => 'Order',
            'conditions' => '`Order`.`order`=`OrderDetail`.`order`',
            'foreignKey' => false
        )
    );

    /** 查询条件数组 */
    public $options = array(
        'list' => array(
            'fields' => array(
                'OrderDetail.order',
                'OrderDetail.product',
                'OrderDetail.price',
                'OrderDetail.qty',
                'OrderDetail.amt',
                'Product.good',
                'Product.name'
            )
        ),
        'detaillist' => array(
            'fields' => array(
                'Order.order',
                'Order.total',
                'Order.order_dt',
                'Order.type',
                'Order.last_status',
                'OrderDetail.qty'
            ),
            'order' => 'Order.order_dt DESC'
        )
    );
}