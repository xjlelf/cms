/**
 * ExtJs入口文件
 * */
Ext.require('/html.admin.extjs.app.config.constdefine');
var ConstDefine = Ext.create('/html.admin.extjs.app.config.constdefine');

 Ext.application({

    //定义命名空间的名字
    name: 'CMS',

    //指定核心代码文件夹
    appFolder: '/html/admin/extjs/app',

    //默认调用菜单控制器
    controllers: [
        'Welcome',
        'Sql',
        'Admin'
    ],

    //默认调用渲染
    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [{
                xtype: 'welcomeindex'
            }]
        });
    }
});

//获取后台访问数据的SQL数据
Ext.Ajax.on('requestcomplete', function(conn, response, options, eOpts) {
    if (!Ext.isEmpty(response.responseText)) {
        var text = Ext.JSON.decode(response.responseText),
            sql = text.sqlLogs;
        var sqlList = Ext.getCmp('sql');
        if (!Ext.isEmpty(sqlList)) {
            sqlList.setData(sql);
        }
    }
});