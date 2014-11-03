<?php

/**
 * 后台控制器
 *
 * @package		app.Controller
 */
class AdminAppController extends AppController {

    /** 默认布局 */
    public $layout = 'admin';

    /** 默认标题 */
    public $title = 'CMS仓库管理系统';

    /**
     * 控制器执行前执行
     */
    public function beforeFilter() {
        $this->loadModel('ConstDefine');
        // 验证管理员的登录情况
        $this->__authAdmin();
        if ($this->Auth->user()) {
            $this->set('admin', $this->Auth->user());
        }
    }

    /**
     * 控制器结束后执行
     * */
    public function beforeRender() {
        $this->set('title', $this->title);
    }

    /**
     * 验证管理员登录情况
     * */
    private function __authAdmin() {
        // 是否有Auth组件
        if (!isset($this->Auth)) { return false; }
        // 允许不登录的action
        if(!empty($this->authallow)){
            $this->Auth->allow($this->authallow);
        }
        // 设置session名称
        AuthComponent::$sessionKey = 'Auth.Manager';
        // 设置管理员表的信息
        $this->Auth->authenticate = array('Form' => array(
            'fields' => array(
                'username' => 'logid',
                'password' => 'pwd'
            ),
            'userModel' => 'Manager'
        ));
        // 设置登录方法
        $this->Auth->loginAction = array('controller' => 'Welcome', 'action' => 'login');
        // 取消登录成功之后自动跳转
        $this->Auth->autoRedirect  = false;
        $this->Auth->logoutRedirect= array('controller' => 'Welcome', 'action' => 'login');
    }
}