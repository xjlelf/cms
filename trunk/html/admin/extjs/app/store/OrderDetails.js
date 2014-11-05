/**
 * 订单明细数据
 */
Ext.define('CMS.store.OrderDetails', {

    //继承
    extend: 'Ext.data.Store',

    //调用模型
    model: 'CMS.model.OrderDetail',

    //数据传递
    proxy: {
        type: 'ajax',
        api: {
            read: '/admin/OrderDetails/list',
            create: '/admin/Orders/saveDetail'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success',
            totalProperty: 'total'
        }
    }
});