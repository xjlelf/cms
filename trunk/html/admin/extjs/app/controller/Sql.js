/**
 * SQL控制器
 */
Ext.define('CMS.controller.Sql', {

    //继承
    extend: 'CMS.controller.Admin',

    //调用视图
    views: [
        'sql.List'
    ],

    //应用程序加载完成之后，Viewport创建之前触发
    init: function() {
        this.control({
            'sqllist': {
                showSql: function(sql) {
                    var me = this;
                    if (!me.showSqlDialog) {
                        me.showSqlDialog = Ext.create('Ext.window.Window', {
                            layout: 'fit',
                            title: 'SQL详情',
                            //关闭按钮
                            closeAction: 'hide',
                            items: [{
                                itemId: 'sql',
                                xtype: 'textarea',
                                readOnly: true,
                                height: 300,
                                width:600
                            }]
                        });
                    }
                    me.showSqlDialog.getComponent('sql').setValue(sql);
                    me.showSqlDialog.show();
                }
            }
        });
    }
});