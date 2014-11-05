/**
 * 客户编辑
 */
Ext.define('CMS.view.customers.Edit', {

	//继承
	extend: 'Ext.window.Window',

	//名称自定义
	alias: 'widget.customersedit',

  	//布局
  	layout: 'fit',

  	//关闭按钮
  	closeAction: 'hide',

  	//其他界面不可操作
  	modal: true,

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
            columns: 2
        },
  		items: [{
  			xtype: 'hidden',
  			name: 'id'
  		}, {
            xtype: 'textfield',
            name: 'name',
            fieldLabel: '客户全称',
            allowBlank: false,//不允许为空
            colspan: 2,
            width: 600,
            emptyText: '请填写客户全称',
            blankText: '客户全称为必填项'
        }, {
  			xtype: 'textfield',
  			name: 'simple_name',
  			fieldLabel: '客户简称',
            colspan: 2,
  			emptyText: '请填写客户简称'
  		}, {
            xtype: 'textfield',
            name: 'linkman',
            fieldLabel: '联系人',
            allowBlank: false,//不允许为空
            colspan: 2,
            emptyText: '请填写联系人',
            blankText: '联系人为必填项'
        }, {
            xtype: 'combo',
            name: 'type',
            fieldLabel: '客户类型',
            colspan: 2,
            allowBlank: false,//不允许为空
            emptyText: '请选择客户类型',
            store:'CustomerTypes',
            displayField: 'type',
            valueField: 'id'
        }, {
            xtype: 'radiogroup',
            fieldLabel: '客户状态',
            colspan: 2,
            items: [{
                boxLabel: ConstDefine.GET_CUSTOMERS_STATUS()[ConstDefine.CUSTOMERS.STATUS_1],
                name: 'status',
                inputValue: ConstDefine.CUSTOMERS.STATUS_1
            }, {
                boxLabel: ConstDefine.GET_CUSTOMERS_STATUS()[ConstDefine.CUSTOMERS.STATUS_0],
                name: 'status',
                inputValue: ConstDefine.CUSTOMERS.STATUS_0,
                checked: true
            }]
        }, {
            xtype: 'textfield',
            name: 'tel',
            fieldLabel: '座机',
            emptyText: '请填写客户座机'
        }, {
            xtype: 'textfield',
            name: 'mobile',
            fieldLabel: '移动电话',
            emptyText: '请填写移动电话'
        }, {
            xtype: 'textarea',
            name: 'addr',
            fieldLabel: '客户地址',
            emptyText: '请填写客户地址',
            colspan: 2,
            width: 700
        }, {
  			xtype: 'htmleditor',
  			name: 'detail',
            colspan: 2,
            width: 700,
  			fieldLabel: '客户描述'
  		}],

  		buttons: [{
  			text: '保存',
        	formBind: true,
        	disabled: true,
            handler: function() {
                this.up('window').fireEvent('save');
            }
  		},{
  			text: '取消',
  			handler: function() {
  				this.up('window').close();
  			}
  		}]
  	}]
});