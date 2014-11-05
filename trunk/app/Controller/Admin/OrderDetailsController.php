<?php
App::uses('AdminAppController', 'Controller');

/**
 * 订单明细控制器
 * */
class OrderDetailsController extends AdminAppController {

    /**
     * 订单明细列表数据
     * */
    public function admin_list() {
        $additionOptions = array(
            'conditions' => array(
                'OrderDetail.order' => $this->querys['order']
            )
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
                $value[$this->modelClass]['name'] = $value['Product']['name'];
                $value[$this->modelClass]['good'] = $value['Product']['good'];
                $newData[] = $value[$this->modelClass];
            }
        }
        return $newData;
    }

    /**
     * 库存明细列表
     */
    public function admin_detailList() {
        $additionOptions = array(
            'conditions' => array(
                'Product.good' => $this->querys['good']
            )
        );
        $options = $this->_setOptions('detaillist', $additionOptions);
        $options = $this->_setPage($options);
        $dbData = $this->_forPaginate($options);
        $data['data'] = $this->__setDetailData($dbData);
        if (isset($this->request['paging'][$this->modelClass]['count'])) {
            $data['total'] = $this->request['paging'][$this->modelClass]['count'];
        }
        $this->set('data', $data);
    }

    /**
     * 设置明细数据
     *
     * @param $data
     * @return array
     */
    private  function __setDetailData($data) {
        $newData = array();
        if (!empty($data)) {
            foreach ($data as $value) {
                $value[$this->modelClass]['order'] = $value['Order']['order'];
                $value[$this->modelClass]['total'] = $value['Order']['total'];
                $value[$this->modelClass]['order_dt'] = $value['Order']['order_dt'];
                $value[$this->modelClass]['type'] = $value['Order']['type'];
                $value[$this->modelClass]['last_status'] = $value['Order']['last_status'];
                $newData[] = $value[$this->modelClass];
            }
        }
        return $newData;
    }
}