/**
 * 产品编辑
 */
Ext.define('CMS.view.products.Edit', {

	//继承
	extend: 'Ext.window.Window',

	//名称自定义
	alias: 'widget.productsedit',

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
            itemId: 'id',
  			xtype: 'hidden',
  			name: 'id'
  		}, {
            xtype: 'textfield',
            name: 'name',
            fieldLabel: '产品名称',
            allowBlank: false,//不允许为空
            emptyText: '请填写产品名称',
            blankText: '产品名称为必填项'
        }, {
            xtype: 'textfield',
            name: 'good',
            fieldLabel: '产品编号',
            allowBlank: false,//不允许为空
            emptyText: '请填写产品编号',
            blankText: '产品编号为必填项'
        }, {
            xtype: 'numberfield',
            name: 'price',
            fieldLabel: '产品价格',
            minValue: 0
        }, {
            layout:'column',
            border: false,
            items:[{
                columnWidth: 0.7,
                layout: 'form',
                border: false,
                items: [{
                    xtype:'textfield',
                    name: 'weight',
                    fieldLabel: '产品规格'
                }]
            }, {
                columnWidth: 0.3,
                layout: 'form',
                margin: '-1 0 0 5',
                border: false,
                items: [{
                    xtype: 'combo',
                    store: 'ProductStandards',
                    name: 'standard',
                    displayField: 'standard',
                    valueField: 'id',
                    value: ConstDefine.PRODUCTS.STANDARD_1,
                    editable: false
                }]
            }]
        }, {
            xtype: 'radiogroup',
            fieldLabel: '产品状态',
            colspan: 2,
            items: [{
                boxLabel: ConstDefine.GET_PRODUCTS_STATUS()[ConstDefine.PRODUCTS.STATUS_1],
                name: 'status',
                inputValue: ConstDefine.PRODUCTS.STATUS_1,
                checked: true
            }, {
                boxLabel: ConstDefine.GET_PRODUCTS_STATUS()[ConstDefine.PRODUCTS.STATUS_0],
                name: 'status',
                inputValue: ConstDefine.PRODUCTS.STATUS_0
            }]
        }, {
  			xtype: 'htmleditor',
  			name: 'detail',
            colspan: 2,
            width: 700,
  			fieldLabel: '产品描述'
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