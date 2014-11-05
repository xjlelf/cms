/**
 * 订单编辑
 */
Ext.define('CMS.view.orders.Edit', {

	//继承
	extend: 'Ext.grid.Panel',

	//名称自定义
	alias: 'widget.ordersedit',

    //列处理
    features: [{
        ftype: 'summary'
    }],

    //列
    columns: [{
        header: '序号',
        xtype: 'rownumberer',
        flex: 0.25
    }, {
        header: '产品编号',
        dataIndex: 'good',
        width: 250,
        editor: {
            xtype: 'combo',
            store: 'Products',
            displayField: 'good',
            valueField: 'good',
            pageSize: 10,
            //显示样式
            listConfig: {
                getInnerTpl: function() {
                    return '<div><span style="float:left">{good}</span><span>&nbsp;</span><span style="float:right">{name}</span></div>';
                }
            },
            forceSelection: true,
            minChars: 1,
            //选择项
            onListSelectionChange: function(list, selectedRecords) {
                this.up('grid').fireEvent('setGoodsInfo', this, list, selectedRecords);
            }
        }
    }, {
        header: '产品名称',
        dataIndex: 'name',
        flex: 2,
        editor: {
            xtype: 'textfield'
        }
    }, {
        header: '产品价格',
        dataIndex: 'price',
        align: 'right',
        width: 100,
        editor: {
            xtype: 'numberfield',
            minValue: 0,
            onChange: function(price) {
                var record = this.up('grid').getSelectionModel().getSelection();
                record[0].data.amt = record[0].data.qty * price;
            }
        },
        renderer: function(value, metadata, record, rowIndex) {
            value = (value * 1).toFixed(2);
            return value;
		}
    }, {
        header: '产品数量',
        dataIndex: 'qty',
        width: 100,
        align: 'center',
        editor: {
            xtype: 'numberfield',
            allowDecimals : false,//不允许输入小数
            minValue: 0,
            onChange: function(qty) {
                var record = this.up('grid').getSelectionModel().getSelection();
                record[0].data.amt = record[0].data.price * qty;
            }
        },
        summaryType: 'sum',
        summaryRenderer: function(value, summaryData, dataIndex) {
            return '总数：' + value;
        }
    }, {
        header: '产品小计',
        dataIndex: 'amt',
        align: 'right',
        flex: 1,
        renderer: function(value,metadata,record,rowIndex){
            value = (value * 1).toFixed(2);
            return value;
        },
        summaryType: 'sum',
        summaryRenderer: function(value, summaryData, dataIndex) {
            value = (value * 1).toFixed(2);
            return '合计：' + value;
        }
    }, {
        header: '备注',
        dataIndex: 'remark',
        flex: 1,
        editor: {
            xtype: 'textfield'
        }
    }],

    //插件
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],

    //默认事件
    initComponent: function() {
        if (this.isReset) {
            this.gridReset();
        }
        this.callParent(arguments);
    },

    //重置订单明细
    gridReset: function() {
        this.getStore().removeAll();
        for (var i=0;i<10;i++) {
            this.getStore().add(Ext.create('CMS.model.OrderDetail'));
        }
    },

    //事件监听
    listeners: {
        'cellcontextmenu': function(grid, column, columnIndex, record, row, rowIndex, e) {
            e.preventDefault();
            this.rightClick.showAt(e.getXY());
            this.rightClick.grid = grid;
            this.rightClick.rowIndex = rowIndex;
            this.rightClick.record = record;
        }
    },

    //鼠标右击事件
    rightClick: Ext.create('Ext.menu.Menu', {
        items : [{
            itemId: 'add',
            text: '插入行'
        }, {
            itemId: 'delete',
            text : '删除行'
        }],
        listeners: {
            click: function(obj, e) {
                switch (e.itemId) {
                    case 'add':
                        obj.grid.getStore().insert(obj.rowIndex + 1, Ext.create('CMS.model.OrderDetail'));
                        break;
                    case 'delete':
                        if (obj.grid.getStore().data.items.length > 1) {
                            obj.grid.getStore().remove(obj.record);
                        } else {
                            Ext.Msg.show({
                                title: '系统提示',
                                msg: '订单明细不能为空',
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.WARNING
                            });
                        }
                        break;
                }
                //刷新序号
                obj.grid.up('grid').getView().refresh();
            }
        }
    })
});