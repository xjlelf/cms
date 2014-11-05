/**
 * 父类控制器
 */
Ext.define('CMS.controller.Admin', {

    //继承
    extend: 'Ext.app.Controller',

    //调用视图
    views: [
        'common.Page'
    ],

    //显示编辑框
    showEditDialog: function(edit_name, record) {
        var me = this;
        if (!me.EditDialog) {
            me.EditDialog = Ext.widget(edit_name);
        }
        if (!Ext.isEmpty(record)) {
            me.loadData(me, record);
            me.EditDialog.setTitle(me.c_name + ConstDefine.TITLE.ACTION.UPDATE);
        } else {
            me.EditDialog.down('form').getForm().reset();
            me.EditDialog.setTitle(me.c_name + ConstDefine.TITLE.ACTION.ADD);
        }
        me.EditDialog.show();
    },

    //给表单设定数据
    loadData: function(obj, record) {
        obj.EditDialog.down('form').loadRecord(record);
    },

    //保存数据
    saveData: function(store, url, isTree) {
        var	win = this.EditDialog,
            form = win.down('form');
        this.formSubmit(form, url, function() {
            Ext.Msg.show({
                title: '系统提示',
                msg: '保存成功',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.INFO
            });
            if (isTree) {
                isTree.setRootNode({
                    expanded: true
                });
                isTree.doLayout();
            } else {
                store.load();
            }
            win.close();
        });
    },

    //确认删除
    showDeleteDialog: function(url, record, store) {
        var me = this;
        if (!Ext.isEmpty(record)) {
            Ext.Msg.show({
                title: '系统提示',
                msg: '确定要删除选择的项？',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.WARNING,
                fn: function(btnId) {
                    if (btnId == 'yes') {
                        me.deleteData(url + record.data.id, store);
                    }
                }
            });
        } else {
            Ext.Msg.show({
                title: '系统提示',
                msg: '请选择要删除的项',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING
            });
        }
    },

    //删除数据
    deleteData: function(url, store) {
        Ext.Ajax.request({
            url: url,
            success: function() {
                store.load();
                Ext.Msg.show({
                    title: '系统提示',
                    msg: '删除成功',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO
                });
            }
        });
    },

    //增加tab
    showPanel: function(panel, mainpanel, itemId, params) {
        if (Ext.isEmpty(itemId)) {
            itemId = panel;
        }
        if (Ext.isEmpty(params)) {
            params = {
                itemId: itemId,
                closable: true
            };
        }
        if (mainpanel.getComponent(itemId)) {
            var tabpanel = mainpanel.getComponent(itemId);
        } else {
            var tabpanel = Ext.widget(panel, params);
            if (tabpanel.store && panel != 'menuslist') {
                tabpanel.getStore().load();
            }
            mainpanel.add(tabpanel);
        }
        mainpanel.setActiveTab(tabpanel);
        return tabpanel;
    },

    //表单提交
    formSubmit: function(form, url, success, params) {
        form.submit({
            url: url,
            waitMsg: '正在保存功能信息...',
            type: 'json',
            params: params,
            success: success,
            failure: function(f, o) {
                if (!Ext.isEmpty(o.response.responseText)) {
                    var text = Ext.JSON.decode(o.response.responseText),
                        message = text.message;
                } else {
                    var message = '';
                }
                if (message == ConstDefine.ERROR.CONTROL) {
                    Ext.Msg.show({
                        title: '系统提示',
                        msg: '对不起，您没有这个功能的权限',
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                } else {
                    Ext.Msg.show({
                        title: '系统提示',
                        msg: '您还未登录，请重新登录',
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.WARNING,
                        fn: function() {
                            window.location = '/';
                        }
                    });
                }
            }
        });
    },

    //显示订单详情
    showOrderDetail: function(record) {
        var tabpanel = this.showPanel('ordersdetail', Ext.getCmp('main'), 'ordersdetail' + record.data.order),
            form = tabpanel.down('form'),
            detail = form.getComponent('detail');
        tabpanel.setTitle(ConstDefine.GET_ORDERS_TYPE()[record.data.type] + ' ' + record.data.order);
        form.getComponent('customer').getStore().load();
        tabpanel.down('form').loadRecord(record);
        detail.getStore().load({
            params: {'order': record.data.order}
        });
    }
});