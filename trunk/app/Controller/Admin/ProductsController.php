<?php
App::uses('AdminAppController', 'Controller');

/**
 * 产品控制器
 * */
class ProductsController extends AdminAppController {

    /**
     * 产品列表数据
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
            $additionConditions['Product.good like'] = $this->model->selectLike($this->querys['query'], false);
        }
        if (isset($this->querys['good'])) {
            $additionConditions['Product.good like'] = $this->model->selectLike($this->querys['good'], false);
        }
        return $additionConditions;
    }

//    /**
//     * 验证产品编号唯一性
//     */
//    public function admin_isUnique() {
//        $data = $this->data;
//        if (!empty($data['id'])) {
//            $this->Product->id = $data['id'];
//        }
//        $options = array('Product.good' => $data['good']);
//        $flag = $this->Product->isUnique($options);
//        $data = array('success' => $flag);
//        $this->set('data', $data);
//    }
}