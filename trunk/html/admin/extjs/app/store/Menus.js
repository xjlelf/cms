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
            text: '产品管理',
            children: [{
                id: 21,
                text: '产品一览',
                controller: 'Products',
                url: 'productslist',
                leaf: 1
            }]
        }, {
            id: 3,
            text: '客户管理',
            children: [{
                id: 31,
                text: '客户一览',
                controller: 'Customers',
                url: 'customerslist',
                leaf: 1
            }]
        }]
    },

    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'text',
        type: 'string'
    }, {
        name: 'controller',
        type: 'string'
    }, {
        name: 'url',
        type: 'string'
    }]
});