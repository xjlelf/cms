/**
 * 库存明细模型
 */
Ext.define('CMS.model.StockDetail', {

    //继承
    extend: 'Ext.data.Model',

    //字段
    fields: [{
        name: 'order',
        type: 'string'
    }, {
        name: 'total',
        type: 'float(2)'
    }, {
        name: 'type',
        type: 'int'
    }, {
        name: 'last_status',
        type: 'int'
    }, {
        name: 'qty',
        type: 'int'
    }, {
        name: 'order_dt',
        type: 'date'
    }]
});