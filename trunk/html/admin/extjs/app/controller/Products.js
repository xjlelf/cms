/**
 * 产品控制器
 */
Ext.define('CMS.controller.Products', {

    //继承
    extend: 'CMS.controller.Admin',

    //调用数据
    stores: [
        'Products',
        'ProductStandards'
    ],

    //调用模型
    models: 'Product',

    //公用名称
    c_name: ConstDefine.TITLE.CONTROLLER.PRODUCTS,

    //调用视图
    views: [
        'products.List',
        'products.Edit'
    ],

    //事件处理
    init: function() {
        this.control({
            'productslist': {
                create: function() {
                    this.showEditDialog('productsedit');
                },
                edit: function(record) {
                    this.showEditDialog('productsedit', record);
                },
                delete: function(record) {
                    this.showDeleteDialog('/admin/Products/delete/', record, this.getStore('Products'));
                }
            },
            'productsedit': {
                save: function() {
                    this.saveData(this.getStore('Products'), '/admin/Products/edit');
                }
            }
        });
    }
});