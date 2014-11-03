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
            MANAGERTYPES: '管理员角色'
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

    //去掉所有的html标记
    delHtmlTag: function(str) {
        return str.replace(/<[^>]+>/g, '');
    }
});