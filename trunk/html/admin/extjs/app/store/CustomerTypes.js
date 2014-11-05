/**
 * 客户类型数据
 */
Ext.define('CMS.store.CustomerTypes', {

    //继承
    extend: 'Ext.data.Store',

    //字段
    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'type',
        type: 'string'
    }],

    //数据
    data: [{
        'id': ConstDefine.CUSTOMERS.TYPE_1,
        'type': ConstDefine.GET_CUSTOMERS_TYPE()[ConstDefine.CUSTOMERS.TYPE_1]
    }, {
        'id': ConstDefine.CUSTOMERS.TYPE_2,
        'type': ConstDefine.GET_CUSTOMERS_TYPE()[ConstDefine.CUSTOMERS.TYPE_2]
    }, {
        'id': ConstDefine.CUSTOMERS.TYPE_3,
        'type': ConstDefine.GET_CUSTOMERS_TYPE()[ConstDefine.CUSTOMERS.TYPE_3]
    }]
});