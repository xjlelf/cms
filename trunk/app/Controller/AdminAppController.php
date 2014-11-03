<?php

/**
 * 后台控制器
 *
 * @package		app.Controller
 */
class AdminAppController extends AppController {

    /** GET参数数组 */
    public $querys = array();

    /** 默认布局 */
    public $layout = 'ajax';

    /** 控制器默认模型对象 */
    public $model = null;

    /** 默认标题 */
    public $title = 'CMS仓库管理系统';

    /**
     * 控制器执行前执行
     */
    public function beforeFilter() {
        $this->loadModel('ConstDefine');
        $this->querys = $this->request->query;
        $model = $this->modelClass;
        $this->model = $this->$model;
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
        if ($this->layout === 'ajax') {
            $this->view = '/Admin/ajax';
        }
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

    /**
     * 获取列表数据
     */
    public function admin_list() {
        $this->_list();
    }

    /**
     * 数据编辑
     */
    public function admin_edit() {
        $this->_edit($this->data);
    }

    /**
     * 数据删除
     *
     * @param $id
     */
    public function admin_delete($id) {
        $this->_delete($id);
    }

    /**
     * 获取列表数据
     *
     * @param $additionOptions array
     * */
    protected function _list($additionOptions = array()) {
        $options = $this->_setOptions('list', $additionOptions);
        $options = $this->_setPage($options);
        $dbData = $this->_forPaginate($options);
        $data['data'] = $this->_setData($dbData);
        if (isset($this->request['paging'][$this->modelClass]['count'])) {
            $data['total'] = $this->request['paging'][$this->modelClass]['count'];
        }
        $this->set('data', $data);
    }

    /**
     * 编辑数据
     *
     * @param array $data
     */
    protected function _edit($data = array()) {
        $this->model->set($data);
        $update_flag = $this->model->save();
        $data['success'] = $update_flag;
        $this->set('data', $data);
    }

    /**
     * 删除数据
     *
     * @param $id
     */
    protected function _delete($id) {
        $delete_flag = false;
        if (!empty($id)) {
            $delete_flag = $this->model->delete($id);
        }
        $data['success'] = $delete_flag;
        $this->set('data', $data);
    }

    /**
     * 设置查询参数
     *
     * @param string $type
     * @param array $additionOptions
     * @param string $model
     * @return array
     */
    protected function _setOptions($type = 'list', $additionOptions = array(), $model = null) {
        if (!empty($model)) {
            $this->model = $this->$model;
        }
        $options = $this->model->options[$type];
        $options = @array_merge_recursive($options, $additionOptions);
        return $options;
    }

    /**
     * 设置分页
     *
     * @param $options
     * @return mixed
     */
    protected function _setPage($options) {
        if (!empty($this->querys['page'])) {
            $this->request->params['named']['page'] = $this->querys['page'];
        }
        if (!empty($this->querys['limit'])) {
            $options['limit'] = $this->querys['limit'];
        }
        return $options;
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
                $newData[] = $value[$this->modelClass];
            }
        }
        return $newData;
    }

    /**
     * 读取分页数据
     *
     * @param $options
     * @param array $conditions
     * @param string $model
     * @return array
     */
    protected function _forPaginate($options, $conditions = array(), $model = null) {
        if (empty($model)) {
            $model = $this->modelClass;
        }
        if (!empty($options['limit'])) {
            $this->Paginator->settings = $options;
            $data = $this->Paginator->paginate($model, $conditions);
        } else {
            $data = $this->$model->find('all', $options);
        }

        return $data;
    }
}