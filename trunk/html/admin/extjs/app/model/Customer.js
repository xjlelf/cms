/**
 * 客户模型
 */
Ext.define('CMS.model.Customer', {

    //继承
    extend: 'Ext.data.Model',

    //字段
    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'simple_name',
        type: 'string'
    }, {
        name: 'linkman',
        type: 'string'
    }, {
        name: 'tel',
        type: 'string'
    }, {
        name: 'mobile',
        type: 'string'
    }, {
        name: 'addr',
        type: 'string'
    }, {
        name: 'type',
        type: 'int'
    }, {
        name: 'status',
        type: 'int'
    }, {
        name: 'detail',
        type: 'string'
    }]
});