/**
 * 系统SQL模型
 */
Ext.define('CMS.model.Sql', {

    //继承
    extend: 'Ext.data.Model',

    //字段
    fields: [{
        name: 'query',
        type: 'string'
    }, {
        name: 'error',
        type: 'int'
    }, {
        name: 'affected',
        type: 'int'
    }, {
        name: 'numRows',
        type: 'int'
    }, {
        name: 'took',
        type: 'int'
    }]
});