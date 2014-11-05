/**
 * 订单明细模型
 */
Ext.define('CMS.model.OrderDetail', {

    //继承
    extend: 'Ext.data.Model',

    //字段
    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'good',
        type: 'string'
    }, {
        name: 'product',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'price',
        type: 'float'
    }, {
        name: 'weight',
        type: 'float(2)'
    }, {
        name: 'standard',
        type: 'int'
    }, {
        name: 'qty',
        type: 'int'
    }, {
        name: 'amt',
        type: 'float'
    }, {
        name: 'remark',
        type: 'string'
    }]
});