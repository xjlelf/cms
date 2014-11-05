/**
 * 客户控制器
 */
Ext.define('CMS.controller.Customers', {

    //继承
    extend: 'CMS.controller.Admin',

    //调用数据
    stores: [
        'Customers',
        'CustomerTypes'
    ],

    //调用模型
    models: 'Customer',

    //公用名称
    c_name: ConstDefine.TITLE.CONTROLLER.CUSTOMERS,

    //调用视图
    views: [
        'customers.List',
        'customers.Edit'
    ],

    //事件处理
    init: function() {
        this.control({
            'customerslist': {
                create: function() {
                    this.showEditDialog('customersedit');
                },
                edit: function(record) {
                    this.showEditDialog('customersedit', record);
                },
                delete: function(record) {
                    this.showDeleteDialog('/admin/Customers/delete/', record, this.getStore('Customers'));
                }
            },
            'customersedit': {
                save: function() {
                    this.saveData(this.getStore('Customers'), '/admin/Customers/edit');
                }
            }
        });
    }
});