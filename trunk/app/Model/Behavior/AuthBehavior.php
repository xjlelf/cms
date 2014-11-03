<?php

/**
 * 自定义模型行为
 * 
 * @package       Cake.Model.Behavior
 * */
class AuthBehavior extends ModelBehavior {

    /**
     * 在操作数据库之前，记录当前的管理者
     *
     * @param Model $model
     * @param array $options
     * @return mixed|void
     */
    public function beforeSave(Model $model, $options = array()) {
		if (!empty($_SESSION['Auth']['Manager']['id'])) {
			$author = $_SESSION['Auth']['Manager']['id'];
		}
		$model->data[$model->name]['author'] = $author;
	}
}