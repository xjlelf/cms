/**
 * 库存明细数据
 */
Ext.define('CMS.store.StockDetails', {

    //继承
    extend: 'Ext.data.Store',

    //调用模型
    model: 'CMS.model.StockDetail',

    //每页条数
    pageSize: 10
});