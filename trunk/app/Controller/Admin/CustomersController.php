<?php
App::uses('AdminAppController', 'Controller');

/**
 * 客户控制器
 * */
class CustomersController extends AdminAppController {

    /**
     * 客户列表数据
     * */
    public function admin_list() {
        $additionOptions = array(
            'conditions' => $this->__setAdditionConditions()
        );
        $this->_list($additionOptions);
    }

    /**
     * 设置查询条件
     *
     * @return array
     */
    private function __setAdditionConditions() {
        $additionConditions = array();
        if (isset($this->querys['query'])) {
            $additionConditions['Customer.name like'] = $this->model->selectLike($this->querys['query']);
        }
        return $additionConditions;
    }
}