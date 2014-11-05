<?php
App::uses('AdminAppController', 'Controller');

/**
 * 订单控制器
 * */
class OrdersController extends AdminAppController {

    /**
     * 订单列表数据
     * */
    public function admin_list() {
        $additionOptions = array(
            'conditions' => $this->__setAdditionConditions()
        );
        $this->_list($additionOptions);
    }

    /**
     * 设置数据
     *
     * @param $data
     * @return array
     */
    protected function _setData($data) {
        $newData = array();
        if (!empty($data)) {
            foreach ($data as $value) {
                $value[$this->modelClass]['customer_name'] = $value['Customer']['name'];
                $newData[] = $value[$this->modelClass];
            }
        }
        return $newData;
    }

    /**
     * 订单编辑
     */
    public function admin_edit() {
        $data = $this->request->data;
        $order['OrderDetail'] = $this->getDetail($data['detailJson']);
        unset($data['detailJson']);
        unset($data['good']);
        unset($data['qty']);
        $order['Order'] = $data;
        $update_flag = $this->Order->saveOrder($order);
        $update_flag = true;
        $data = array('success' => $update_flag);
        $this->set('data', $data);
    }

    /**
     * 获取订单明细
     *
     * @param $detail
     * @return array
     */
    public function getDetail($detail) {
        $data = $this->objectToArray(json_decode($detail));
        $data = $this->__removeErrorData($data);
        return $data;
    }

    /**
     * 删除数据
     *
     * @param $id
     */
    protected function _delete($id) {
        $delete_flag = false;
        if (!empty($id)) {
            $delete_flag = $this->model->deleteOrder($id);
        }
        $data['success'] = $delete_flag;
        $this->set('data', $data);
    }

    /**
     * 把对象转成数组
     *
     * @param $object
     * @return array
     */
    public function objectToArray($object){
        $result = array();
        $object = is_object($object) ? get_object_vars($object) : $object;
        foreach ($object as $key => $val) {
            $val = (is_object($val) || is_array($val)) ? $this->objectToArray($val) : $val;
            $result[$key] = $val;
        }
        return $result;
    }

    /**
     * 去除不全的数据
     *
     * @param array $data
     * @return array
     */
    private function __removeErrorData($data = array()) {
        if (!empty($data)) {
            foreach ($data as $key => $value) {
                $val = array_filter(array_values($value));

                if (empty($val)) {
                    unset($data[$key]);
                }
            }
        }
        return $data;
    }

    /**
     * 设置查询条件
     *
     * @return array
     */
    private function __setAdditionConditions() {
        $additionConditions = array();
        if (isset($this->querys['order'])) {
            $additionConditions['Order.order like'] = $this->model->selectLike($this->querys['order'], false);
        }
        return $additionConditions;
    }

    /**
     * 验证订单编号唯一性
     */
    public function admin_isUnique() {
        $data = $this->data;
        if (!empty($data['id'])) {
            $this->Order->id = $data['id'];
        }
        $options = array('Order.order' => $data['order']);
        $flag = $this->Order->isUnique($options);
        $data = array('success' => $flag);
        $this->set('data', $data);
    }
}