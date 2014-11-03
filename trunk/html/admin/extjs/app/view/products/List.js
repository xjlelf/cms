/**
 * 产品列表
 * */
Ext.define('CMS.view.products.List', {

    //继承
    extend: 'Ext.grid.Panel',

    //名称自定义
    alias: 'widget.productslist',

    //名称
    title: ConstDefine.TITLE.CONTROLLER.PRODUCTS + ConstDefine.TITLE.ACTION.LIST,

    //调用数据
    store: 'Products',

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
        flex: 1.5
    }, {
        header: '产品价格（元）',
        dataIndex: 'price',
        align: 'right',
        flex: 1
    }, {
        header: '产品规格',
        dataIndex: 'weight',
        align: 'center',
        flex: 1,
        renderer: function(value, row) {
            return value + ConstDefine.GET_PRODUCTS_STANDARD()[row.record.data.standard];
        }
    }, {
        header: '产品状态',
        dataIndex: 'status',
        align: 'center',
        flex: 1,
        renderer: function(value) {
            return ConstDefine.GET_PRODUCTS_STATUS()[value];
        }
    }, {
        header: '操作',
        xtype: 'actioncolumn',
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
    }, '->', {
        itemId: 'good',
        xtype: 'textfield',
        fieldLabel: '产品编号',
        width: 300,
        labelWidth: 60
    }, {
        xtype: 'button',
        icon: ConstDefine.COMMON_ICONS_PATH + 'search.png',
        text: '搜索',
        handler: function() {
            this.up('grid').reload(this.up().getComponent('good').getValue());
        }
    }],

    //底部栏
    bbar: {
        xtype: 'commonpage',
        store: 'Products'
    },

    //重新载入
    reload: function(good) {
        var me = this,
            params = {'good': good},
            store = me.getStore();
        store.load({
            params: params
        });
    }
});