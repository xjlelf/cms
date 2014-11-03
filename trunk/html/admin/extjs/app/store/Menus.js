/**
 * 系统菜单栏数据
 */
Ext.define('CMS.store.Menus', {

    //继承
    extend: 'Ext.data.TreeStore',

    //默认目录
    root: {
        id: 0,
        text: '系统菜单',
        children: [{
            id: 1,
            text: '系统管理',
            children: [{
                id: 11,
                text: '功能管理',
                leaf: 1
            }]
        }, {
            id: 2,
            text: '会员管理',
            children: [{
                id: 21,
                text: '会员一览',
                controller: 'Users',
                leaf: 1
            }]
        }]
    }
});