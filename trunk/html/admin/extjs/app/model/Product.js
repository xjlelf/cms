/**
 * 产品模型
 */
Ext.define('CMS.model.Product', {

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
        name: 'name',
        type: 'string'
    }, {
        name: 'price',
        type: 'float(2)'
    }, {
        name: 'weight',
        type: 'float(2)'
    }, {
        name: 'standard',
        type: 'int'
    }, {
        name: 'status',
        type: 'int'
    }, {
        name: 'detail',
        type: 'string'
    }]
});