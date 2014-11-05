<?php
App::uses('AdminAppController', 'Controller');

/**
 * 库存控制器
 * */
class StocksController extends AdminAppController {

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
                $value[$this->modelClass]['good'] = $value['Product']['good'];
                $value[$this->modelClass]['name'] = $value['Product']['name'];
                $value[$this->modelClass]['weight'] = $value['Product']['weight'];
                $value[$this->modelClass]['standard'] = $value['Product']['standard'];
                $newData[] = $value[$this->modelClass];
            }
        }
        return $newData;
    }
}