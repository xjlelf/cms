/**
 * 订单模型
 */
Ext.define('CMS.model.Order', {

    //继承
    extend: 'Ext.data.Model',

    //字段
    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'order',
        type: 'string'
    }, {
        name: 'customer',
        type: 'int'
    }, {
        name: 'customer_name',
        type: 'string'
    }, {
        name: 'order_dt',
        type: 'date'
    }, {
        name: 'total',
        type: 'float(2)'
    }, {
        name: 'last_status',
        type: 'int'
    }, {
        name: 'type',
        type: 'int'
    }]
});