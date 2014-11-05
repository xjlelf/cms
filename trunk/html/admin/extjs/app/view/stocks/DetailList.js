/**
 * 库存明细列表
 * */
Ext.define('CMS.view.stocks.DetailList', {

    //继承
    extend: 'Ext.grid.Panel',

    //名称自定义
    alias: 'widget.stocksdetaillist',

    //构造函数
    constructor: function(config) {
        var store = Ext.create('CMS.store.StockDetails', {
            //设置数据源
            proxy: {
                type: 'ajax',
                url: '/admin/OrderDetails/detailList',
                extraParams : {
                    good: config.good
                },
                reader: {
                    type: 'json',
                    root: 'data',
                    totalProperty: 'total'
                }
            }
        });
        var me = this;
        me.store = store;
        me.bbar.store = store;
        me.title = ConstDefine.TITLE.CONTROLLER.STOCKS + ConstDefine.TITLE.ACTION.DETAIL + ' ' + config.name
        store.load();
        this.callParent([config]);
    },

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
        header: '订单总价',
        dataIndex: 'total',
        flex: 1
    }, {
        header: '订单类型',
        dataIndex: 'type',
        flex: 1,
        renderer: function(value) {
            return ConstDefine.GET_ORDERS_TYPE()[value];
        }
    }, {
        header: '订单状态',
        dataIndex: 'last_status',
        flex: 1,
        renderer: function(value) {
            return ConstDefine.GET_ORDERS_LAST_STATUS()[value];
        }
    }, {
        header: '订单时间',
        dataIndex: 'order_dt',
        renderer: Ext.util.Format.dateRenderer('Y年m月d日'),
        flex: 1
    }, {
        header: '产品数量',
        dataIndex: 'qty',
        flex: 1
    }, {
        header: '操作',
        xtype: 'actioncolumn',
        flex: 1,
        align: 'center',
        items: [{
            icon: ConstDefine.COMMON_ICONS_PATH + 'application_view_detail.png',
            tooltip: '订单详情',
            handler: function(grid, rowIndex) {
                var row = grid.getStore().getAt(rowIndex);
                grid.up('panel').fireEvent('detail', row);
            }
        }]
    }],

    //底部栏
    bbar: {
        xtype: 'commonpage'
    }
});