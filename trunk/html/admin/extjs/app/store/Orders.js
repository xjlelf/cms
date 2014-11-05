/**
 * 订单数据
 */
Ext.define('CMS.store.Orders', {

    //继承
    extend: 'Ext.data.Store',

    //调用模型
    model: 'CMS.model.Order',

    //数据传递
    proxy: {
        type: 'ajax',
        api: {
            read: '/admin/Orders/list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success',
            totalProperty: 'total'
        }
    }
});