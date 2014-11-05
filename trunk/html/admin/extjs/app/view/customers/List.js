/**
 * 客户列表
 * */
Ext.define('CMS.view.customers.List', {

    //继承
    extend: 'Ext.grid.Panel',

    //名称自定义
    alias: 'widget.customerslist',

    //名称
    title: ConstDefine.TITLE.CONTROLLER.CUSTOMERS + ConstDefine.TITLE.ACTION.LIST,

    //调用数据
    store: 'Customers',

    //列
    columns: [{
        header: '序号',
        xtype: 'rownumberer',
        flex: 0.25
    }, {
        header: '客户名称',
        dataIndex: 'name',
        flex: 2
    }, {
        header: '联系人',
        dataIndex: 'linkman',
        flex: 1
    }, {
        header: '电话',
        dataIndex: 'tel',
        flex: 1
    }, {
        header: '客户类型',
        dataIndex: 'type',
        flex: 0.5,
        renderer: function(value) {
            return ConstDefine.GET_CUSTOMERS_TYPE()[value];
        }
    }, {
        header: '客户状态',
        dataIndex: 'status',
        flex: 0.5,
        renderer: function(value) {
            return ConstDefine.GET_CUSTOMERS_STATUS()[value];
        }
    }, {
        header: '操作',
        xtype: 'actioncolumn',
        flex: 1,
        align: 'center',
        items: [{
            icon: ConstDefine.COMMON_ICONS_PATH + 'application_edit.png',
            tooltip: '编辑',
            handler: function(grid, rowIndex) {
                var row = grid.getStore().getAt(rowIndex);
                grid.up('panel').fireEvent('edit', row);
            }
        }, '->', {
            icon: ConstDefine.COMMON_ICONS_PATH + 'application_delete.png',
            tooltip: '删除',
            handler: function(grid, rowIndex) {
                var row = grid.getStore().getAt(rowIndex);
                grid.up('panel').fireEvent('delete', row);
            }
        }]
    }],

    //头部栏
    tbar: [{
        xtype: 'button',
        text: '添加',
        tooltip: '添加新功能',
        icon: ConstDefine.COMMON_ICONS_PATH + 'application_add.png',
        handler: function() {
            this.up('panel').fireEvent('create');
        }
    }]
});