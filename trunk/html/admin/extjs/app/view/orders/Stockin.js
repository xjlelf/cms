/**
 * 入库单
 */
Ext.define('CMS.view.orders.Stockin', {

	//继承
	extend: 'Ext.panel.Panel',

	//名称自定义
	alias: 'widget.ordersstockin',

  	//布局
  	layout: 'fit',

    //标题
    title: ConstDefine.TITLE.CONTROLLER.STOCKIN,

  	//子项
  	items: [{
        xtype: 'form',
        bodyPadding: 10,
        border: 0,
        defaults: {
            labelWidth: 60,
            width: 300
        },
        layout: {
            type: 'table',
            columns: 3
        },
  		items: [{
            xtype: 'textfield',
            name: 'order',
            fieldLabel: '订单编号',
            allowBlank: false,//不允许为空
            emptyText: '请填写订单编号',
            blankText: '订单编号为必填项'
        }, {
  			xtype: 'combo',
  			name: 'customer',
  			fieldLabel: '客户名称',
  			allowBlank: false,//不允许为空
  			emptyText: '请填写客户名称',
  			blankText: '客户名称为必填项',
            store: 'Customers',
            displayField: 'name',
            valueField: 'id',
            forceSelection: true,
            minChars: 1
  		}, {
            xtype: 'datefield',
            name: 'order_dt',
            fieldLabel: '订单时间',
            format: 'Y-m-d',
            allowBlank: false,//不允许为空
            emptyText: '请填写订单时间',
            blankText: '订单时间为必填项'
        }, {
            xtype: 'hidden',
            name: 'type',
            value: ConstDefine.ORDERS.TYPE_1
        }, {
            itemId: 'detail',
  			xtype: 'ordersedit',
            store: Ext.create('CMS.store.OrderDetails'),
            isReset: true,
            colspan: 3,
            width: 1000
  		}],

  		buttons: [{
  			text: '保存',
        	formBind: true,
        	disabled: true,
            icon: ConstDefine.COMMON_ICONS_PATH + 'disk.png',
            handler: function() {
                var form = this.up('panel'),
                    store = form.getComponent('detail').getStore();
                this.up('panel').up('panel').fireEvent('save', form, store);
            }
  		},{
  			text: '重置',
            icon: ConstDefine.COMMON_ICONS_PATH + 'arrow_undo.png',
  			handler: function() {
                var me = this.up('form');
                Ext.Msg.show({
                    title: '系统提示',
                    msg: '确定不保存并重置所有内容吗？',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.WARNING,
                    fn: function(btnId) {
                        if (btnId == 'yes') {
                            me.getForm().reset();
                            me.getComponent('detail').gridReset();
                        }
                    }
                });
  			}
  		}]
  	}]
});