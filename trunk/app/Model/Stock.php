<?php
/**
 * 库存模型
 * */
class Stock extends AppModel {

    /**
     * 要连的表
     * */
    public $belongsTo = array(
        'Product' => array(
            'className'  => 'Product',
            'foreignKey' => 'product'
        )
    );

    /** 查询条件数组 */
    public $options = array(
        'list' => array(
            'fields' => array(
                'Stock.id',
                'Stock.product',
                'Stock.qty',
                'Stock.qty2',
                'Product.good',
                'Product.name',
                'Product.weight',
                'Product.standard'
            )
        ),
        'simple' => array(
            'fields' => array(
                'Stock.id',
                'Stock.product',
                'Stock.qty',
                'Stock.qty2'
            )
        )
    );

    /**
     * 保存库存
     *
     * @param $data
     * @return bool|mixed
     */
    public function saveStock($data) {
        $update_flag = false;
        if (!empty($data['OrderDetail'])) {
            foreach ($data['OrderDetail'] as $value) {
                $stock = $this->getStock($value, $data['Order']['type']);
                $data['Stock'][] = $stock;
            }
            $update_flag = $this->saveAll($data['Stock'], array('atomic' => false));
        }
        return $update_flag;
    }

    /**
     * 还原库存
     *
     * @param $data
     * @return bool|mixed
     */
    public function revertStock($data) {
        $update_flag = false;
        if (!empty($data)) {
            foreach ($data['OrderDetail'] as $value) {
                $stock = $this->getStock($value['OrderDetail'], $data['Order']['type'], true);
                $data['Stock'][] = $stock;
            }
            $update_flag = $this->saveAll($data['Stock'], array('atomic' => false));
        }
        return $update_flag;
    }

    /**
     * 获取库存
     *
     * @param $product
     * @param $type
     * @param bool $isRevert
     * @return array
     */
    public function getStock($product, $type, $isRevert = false) {
        $options = $this->options['simple'];
        $options = array_merge($options, array(
            'conditions' => array(
                'Stock.product' => $product['product']
            )
        ));
        $data = $this->find('first', $options);
        if (empty($data)) {
            $data['Stock'] = array(
                'product' => $product['product'],
                'qty' => $product['qty']
            );
        } else {
            $data['Stock']['qty'] = $this->changQty($data['Stock']['qty'], $product['qty'], $type, $isRevert);
        }
        return $data;
    }

    /**
     * 改变库存数
     *
     * @param $qty
     * @param $offset
     * @param $type
     * @param bool $isRevert
     * @return mixed
     */
    public function changQty($qty, $offset, $type, $isRevert = false) {
        switch ($type) {
            case ConstDefine::ORDER_TYPE_1:
            case ConstDefine::ORDER_TYPE_3:
                if ($isRevert) {
                    return $qty - $offset;
                } else {
                    return $qty + $offset;
                }
                break;
            case ConstDefine::ORDER_TYPE_2:
            case ConstDefine::ORDER_TYPE_4:
                if ($isRevert) {
                    return $qty + $offset;
                } else {
                    return $qty - $offset;
                }
                break;
        }
    }
}