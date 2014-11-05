/**
 * 订单控制器
 */
Ext.define('CMS.controller.Orders', {

    //继承
    extend: 'CMS.controller.Admin',

    //调用数据
    stores: [
        'Orders',
        'OrderDetails',
        'Products',
        'Customers'
    ],

    //调用模型
    models: [
        'Order',
        'OrderDetail'
    ],

    //公用名称
    c_name: ConstDefine.TITLE.CONTROLLER.ORDERS,

    //调用视图
    views: [
        'orders.List',
        'orders.Edit',
        'orders.Detail',
        'orders.Stockin',
        'orders.Stockout'
    ],

    //事件处理
    init: function() {
        this.control({
            'orderslist': {
                edit: function(record) {
                    this.showOrderDetail(record);
                },
                delete: function(record) {
                    this.showDeleteDialog('/admin/Orders/delete/', record, this.getStore('Orders'));
                },
                export: function() {
                    window.location.href = '';
                }
            },
            'ordersedit': {
                setGoodsInfo: function(productList, list, selectedRecords) {
                    this.setGoodsInfo(productList, list, selectedRecords);
                }
            },
            'ordersstockin': {
                save: function(form, store) {
                    this.saveOrder(form, store);
                }
            },
            'ordersstockout': {
                save: function(form, store) {
                    this.saveOrder(form, store);
                }
            },
            'ordersdetail': {
                save: function(form, store) {
                    this.saveOrder(form, store);
                }
            }
        });
    },

    //设置产品信息
    setGoodsInfo: function(productList, list, selectedRecords) {
        var me = productList,
            isMulti = me.multiSelect,
            hasRecords = selectedRecords.length > 0;
        if (!me.ignoreSelection && me.isExpanded) {
            if (!isMulti) {
                Ext.defer(me.collapse, 1, me);
            }
            if (isMulti || hasRecords) {
                me.setValue(selectedRecords, false);
            }
            if (hasRecords) {
                var store = me.up('grid').getStore();
                var record = me.up('grid').getSelectionModel().getSelection();
                var update_flag = true;
                for (var item in store.data.items) {
                    if (selectedRecords[0].data.good == store.data.items[item].data.good) {
                        update_flag = false;
                        break;
                    }
                }
                if (update_flag) {
                    selectedRecords[0].data.product = selectedRecords[0].data.id;
                    selectedRecords[0].data.id = 0;
                    record[0].set(selectedRecords[0].data);
                    me.fireEvent('select', me, selectedRecords);
                } else {
                    Ext.Msg.show({
                        title: '系统提示',
                        msg: '此产品已经在订单中',
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.WARNING
                    });
                }
            }
            me.inputEl.focus();
        }
    },

    //保存订单
    saveOrder: function(form, store) {
        var recordList = new Array();
        store.each(function(record) {
            recordList.push(record.data);
        });
        this.formSubmit(form, 'admin/Orders/edit', function(f, o) {
            var data = form.getForm().getValues();
//            var record = form.getForm().getRecord();
//            record.set(data);
//            alert(record.data.order);
            Ext.Msg.show({
                title: '系统提示',
                msg: '保存订单成功',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.INFO
            });
        }, {'detailJson': Ext.encode(recordList)});
    }
});