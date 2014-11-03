/**
 * 项目常量定义文件
 */
Ext.define('/html.admin.extjs.app.config.constdefine', {

    /* 小图标路劲 */
    COMMON_ICONS_PATH: '/html/admin/extjs/ext4.2.1/resources/icons/',

    /* 标题 */
    TITLE: {
        // 项目标题
        PROJECT: '欢迎进入CMS仓库管理系统',

        // 控制器
        CONTROLLER: {
            MENUS: '菜单',
            MANAGERS: '管理员',
            MANAGERTYPES: '管理员角色',
            PRODUCTS: '产品'
        },

        // 行为
        ACTION: {
            LIST: '列表',
            ADD: '添加',
            UPDATE: '修改',
            LOGIN: '登录',
            DETAIL: '明细',
            CONTROL: '权限分配',
            HISTORY_LIST: '历史列表'
        }
    },

    //产品参数
    PRODUCTS: {
        STATUS_0: 0,
        STATUS_1: 1,

        STANDARD_1: 1,
        STANDARD_2: 2
    },

    //获取产品状态参数
    GET_PRODUCTS_STATUS: function() {
        var PRODUCTS_STATUS = {};
        PRODUCTS_STATUS[this.PRODUCTS.STATUS_0] = '下架';
        PRODUCTS_STATUS[this.PRODUCTS.STATUS_1] = '正常';
        return PRODUCTS_STATUS;
    },

    //获取产品规格参数
    GET_PRODUCTS_STANDARD: function() {
        var PRODUCTS_STANDARD = {};
        PRODUCTS_STANDARD[this.PRODUCTS.STANDARD_1] = '千克/桶';
        PRODUCTS_STANDARD[this.PRODUCTS.STANDARD_2] = '千克/包';
        return PRODUCTS_STANDARD;
    },

    //去掉所有的html标记
    delHtmlTag: function(str) {
        return str.replace(/<[^>]+>/g, '');
    }
});