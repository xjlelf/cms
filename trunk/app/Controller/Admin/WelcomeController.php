<?php
App::uses('AdminAppController', 'Controller');

class WelcomeController extends AdminAppController {

    /** 允许未登录的方法 */
    public $authallow = array(
        'admin_login'
    );

    public function admin_index() {}

    public function admin_login() {}
}