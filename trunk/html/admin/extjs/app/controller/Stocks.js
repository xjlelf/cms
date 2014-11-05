/**
 * 库存控制器
 */
Ext.define('CMS.controller.Stocks', {

    //继承
    extend: 'CMS.controller.Admin',

    //调用数据
    stores: 'Stocks',

    //调用模型
    models: 'Stock',

    //公用名称
    c_name: ConstDefine.TITLE.CONTROLLER.STOCKS,

    //调用视图
    views: [
        'stocks.List',
        'stocks.DetailList'
    ],

    //事件处理
    init: function() {
        this.control({
            'stockslist': {
                detail: function(record) {
                    this.showDetailList(record);
                },
                export: function() {
                    window.location.href = ConstDefine.DOWNLOAD_CSV_PATH + 'Stock';
                }
            },
            'stocksdetaillist': {
                detail: function(record) {
                    this.showOrderDetail(record);
                }
            }
        });
    },

    //显示库存明细
    showDetailList: function(record) {
        var itemId = 'stocksdetaillist' + record.data.good,
            params = {
            itemId: itemId,
            good: record.data.good,
            name: record.data.name,
            closable: true
        }
        this.showPanel('stocksdetaillist', Ext.getCmp('main'), itemId, params);
    }
});