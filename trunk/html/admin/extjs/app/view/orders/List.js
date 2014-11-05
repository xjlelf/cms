/**
 * 订单列表
 * */
Ext.define('CMS.view.orders.List', {

    //继承
    extend: 'Ext.grid.Panel',

    //名称自定义
    alias: 'widget.orderslist',

    //数据
    store: 'Orders',

    //名称
    title: ConstDefine.TITLE.CONTROLLER.ORDERS + ConstDefine.TITLE.ACTION.LIST,

    //列
    columns: [{
        header: '序号',
        xtype: 'rownumberer',
        flex: 0.25
    }, {
        header: '订单编号',
        dataIndex: 'order',
        flex: 1
    }, {
        header: '客户名称',
        dataIndex: 'customer_name',
        flex: 1.5
    }, {
        header: '订单总价（元）',
        dataIndex: 'total',
        align: 'right',
        flex: 1
    }, {
        header: '订单日期',
        align: 'center',
        dataIndex: 'order_dt',
        renderer: Ext.util.Format.dateRenderer('Y年m月d日'),
        flex: 1
    }, {
        header: '订单类型',
        dataIndex: 'type',
        align: 'center',
        flex: 0.5,
        renderer: function(value) {
            return ConstDefine.GET_ORDERS_TYPE()[value];
        }
    }, {
        header: '订单状态',
        dataIndex: 'last_status',
        align: 'center',
        flex: 0.5,
        renderer: function(value) {
            return ConstDefine.GET_ORDERS_LAST_STATUS()[value];
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
        text: '导出',
        tooltip: '导出',
        icon: ConstDefine.COMMON_ICONS_PATH + 'application_add.png',
        handler: function() {
            this.up('panel').fireEvent('export');
        }
    }, '->', {
        itemId: 'order',
        xtype: 'textfield',
        fieldLabel: '订单编号',
        width: 300,
        labelWidth: 60
    }, {
        xtype: 'button',
        icon: ConstDefine.COMMON_ICONS_PATH + 'search.png',
        text: '搜索',
        handler: function() {
            this.up('grid').reload(this.up().getComponent('order').getValue());
        }
    }],

    //底部栏
    bbar: {
        xtype: 'commonpage',
        store: 'Orders'
    },

    //重新载入
    reload: function(order) {
        var me = this,
            params = {'order': order},
            store = me.getStore();
        store.load({
            params: params
        });
    }
});