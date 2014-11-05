/**
 * 库存数据
 */
Ext.define('CMS.store.Stocks', {

    //继承
    extend: 'Ext.data.Store',

    //调用模型
    model: 'CMS.model.Stock',

    //每页条数
    pageSize: 10,

    //数据传递
    proxy: {
        type: 'ajax',
        api: {
            read: '/admin/Stocks/list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success',
            totalProperty: 'total'
        }
    }
});