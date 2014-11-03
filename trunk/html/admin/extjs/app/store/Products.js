/**
 * 产品数据
 */
Ext.define('CMS.store.Products', {

    //继承
    extend: 'Ext.data.Store',

    //调用模型
    model: 'CMS.model.Product',

    //每页条数
    pageSize: 10,

    //数据传递
    proxy: {
        type: 'ajax',
        api: {
            read: '/admin/Products/list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success',
            totalProperty: 'total'
        }
    }
});