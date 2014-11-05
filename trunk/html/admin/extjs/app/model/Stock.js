/**
 * 库存模型
 */
Ext.define('CMS.model.Stock', {

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
        name: 'qty',
        type: 'int'
    }, {
        name: 'weight',
        type: 'float(2)'
    }, {
        name: 'standard',
        type: 'int'
    }, {
        name: 'qty2',
        type: 'int'
    }]
});