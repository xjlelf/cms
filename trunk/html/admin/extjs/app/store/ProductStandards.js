/**
 * 产品规格数据
 */
Ext.define('CMS.store.ProductStandards', {

    //继承
    extend: 'Ext.data.Store',

    //字段
    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'standard',
        type: 'string'
    }],

    //数据
    data: [{
        'id': ConstDefine.PRODUCTS.STANDARD_1,
        'standard': ConstDefine.GET_PRODUCTS_STANDARD()[ConstDefine.PRODUCTS.STANDARD_1]
    }, {
        'id': ConstDefine.PRODUCTS.STANDARD_2,
        'standard': ConstDefine.GET_PRODUCTS_STANDARD()[ConstDefine.PRODUCTS.STANDARD_2]
    }]
});