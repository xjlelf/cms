/**
 * 库存列表
 * */
Ext.define('CMS.view.stocks.List', {

    //继承
    extend: 'Ext.grid.Panel',

    //名称自定义
    alias: 'widget.stockslist',

    //名称
    title: ConstDefine.TITLE.CONTROLLER.STOCKS + ConstDefine.TITLE.ACTION.LIST,

    //调用数据
    store: 'Stocks',

    //列
    columns: [{
        header: '序号',
        xtype: 'rownumberer',
        flex: 0.25
    }, {
        header: '产品编号',
        dataIndex: 'good',
        flex: 1
    }, {
        header: '产品名称',
        dataIndex: 'name',
        flex: 2
    }, {
        header: '产品规格',
        dataIndex: 'weight',
        flex: 1,
        renderer: function(value, row) {
            return value + ConstDefine.GET_PRODUCTS_STANDARD()[row.record.data.standard];
        }
    }, {
        header: '产品库存',
        dataIndex: 'qty',
        flex: 1
    }, {
        header: '操作',
        xtype: 'actioncolumn',
        flex: 1,
        align: 'center',
        items: [{
            icon: ConstDefine.COMMON_ICONS_PATH + 'application_view_detail.png',
            tooltip: '库存明细',
            handler: function(grid, rowIndex) {
                var row = grid.getStore().getAt(rowIndex);
                grid.up('panel').fireEvent('detail', row);
            }
        }]
    }],

    //头部栏
    tbar: [{
        xtype: 'button',
        text: '导出',
        tooltip: '导出',
        icon: ConstDefine.COMMON_ICONS_PATH + 'application_put.png',
        handler: function() {
            this.up('panel').fireEvent('export');
        }
    }, '->', {
        itemId: 'product',
        xtype: 'textfield',
        fieldLabel: '产品编号',
        width: 300,
        labelWidth: 60
    }, {
        xtype: 'button',
        icon: ConstDefine.COMMON_ICONS_PATH + 'search.png',
        text: '搜索',
        handler: function() {
            this.up('grid').reload(this.up().getComponent('product').getValue());
        }
    }],

    //底部栏
    bbar: {
        xtype: 'commonpage',
        store: 'Stocks'
    }
});