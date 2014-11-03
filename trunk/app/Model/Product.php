<?php
/**
 * 产品模型
 * */
class Product extends AppModel {

    /** 查询条件数组 */
    public $options = array(
        'list' => array(
            'fields' => array(
                'Product.id',
                'Product.good',
                'Product.name',
                'Product.price',
                'Product.weight',
                'Product.standard',
                'Product.status',
                'Product.detail'
            )
        )
    );
}