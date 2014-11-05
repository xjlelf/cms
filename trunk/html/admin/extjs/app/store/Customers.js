/**
 * 客户数据
 */
Ext.define('CMS.store.Customers', {

    //继承
    extend: 'Ext.data.Store',

    //调用模型
    model: 'CMS.model.Customer',

    //数据传递
    proxy: {
        type: 'ajax',
        api: {
            read: '/admin/Customers/list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success',
            totalProperty: 'total'
        }
    }
});