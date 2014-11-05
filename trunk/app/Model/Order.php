<?php
/**
 * 订单模型
 * */
class Order extends AppModel {

    /**
     * 要连的表
     * */
    public $hasMany = array(
        'OrderDetail' => array(
            'className'  => 'OrderDetail',
            'foreignKey' => 'order'
        )
    );

    /**
     * 要连的表
     * */
    public $belongsTo = array(
        'Customer' => array(
            'className'  => 'Customer',
            'foreignKey' => 'customer'
        )
    );

    /** 查询条件数组 */
    public $options = array(
        'list' => array(
            'fields' => array(
                'Order.id',
                'Order.order',
                'Order.customer',
                'Order.order_dt',
                'Order.total',
                'Order.type',
                'Order.last_status',
                'Customer.name'
            ),
            'order' => 'Order.order_dt DESC'
        )
    );

    /**
     * 保存订单
     *
     * @param $data
     * @return bool|mixed
     */
    public function saveOrder($data) {
        $update_flag = false;
        if (!empty($data)) {
            $data = $this->__setOrder($data);
            $this->begin();
            $update_flag = $this->revertOrder($data);
            if ($update_flag) {
                $stock = ClassRegistry::init('Stock');
                $update_flag = $stock->saveStock($data);
                if ($update_flag) {
                    $update_flag = $this->OrderDetail->saveAll($data['OrderDetail'], array('atomic' => false));
                    if ($update_flag) {
                        $this->set($data['Order']);
                        $update_flag = $this->save();
                    }
                }
            }

            if ($update_flag) {
                $this->commit();
            } else {
                $this->rollback();
            }
        }
        return $update_flag;
    }

    /**
     * 设置订单
     *
     * @param $data
     * @return mixed
     */
    private function __setOrder($data) {
        $total = 0;
        if (!empty($data['OrderDetail'])) {
            foreach ($data['OrderDetail'] as $key => $value) {
                $total += $value['amt'];
                $data['OrderDetail'][$key]['order'] = $data['Order']['order'];
            }
        }
        $data['Order']['total'] = $total;
        $data['Order']['last_status'] = ConstDefine::ORDER_LAST_STATUS_0;
        return $data;
    }

    /**
     * 删除订单
     *
     * @param $id
     * @return bool
     */
    public function deleteOrder($id) {
        $order = $this->getFieldById(array(
            'Order.id',
            'Order.order',
            'Order.type'
        ), $id);
        $this->begin();
        $update_flag = $this->revertOrder($order);
        if ($update_flag) {
            $update_flag = $this->delete($id);
        }
        if ($update_flag) {
            $this->commit();
        } else {
            $this->rollback();
        }
        return $update_flag;
    }

    /**
     * 还原库存并删除订单明细
     *
     * @param $order
     * @return bool
     */
    private function revertOrder($order) {
        $update_flag = true;
        if (!empty($order['Order']['id'])) {
            $stock = ClassRegistry::init('Stock');
            $options = array_merge($this->OrderDetail->options['list'], array(
                'conditions' => array(
                    'OrderDetail.order' => $order['Order']['order']
                )
            ));
            $oldData['OrderDetail'] = $this->OrderDetail->find('all', $options);
            $oldData['Order']['type'] = $order['Order']['type'];
            $update_flag = $stock->revertStock($oldData);
            if ($update_flag) {
                $update_flag = $this->OrderDetail->deleteAll(array('OrderDetail.order' => $order['Order']['order']));
            }
        }
        return $update_flag;
    }
}