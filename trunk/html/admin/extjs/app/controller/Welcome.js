/**
 * 欢迎栏控制器
 */
Ext.define('CMS.controller.Welcome', {

    //继承
    extend: 'CMS.controller.Admin',

    //调用数据
    stores: [
        'Menus'
    ],

    //调用视图
    views: [
        'welcome.Index',
        'welcome.MenusList'
    ],

    //应用程序加载完成之后，Viewport创建之前触发
    init: function() {
        this.control({
            'systemmenuslist': {
                itemmousedown: this.createPanel
            }
        });
    },

    //Viewport创建之后触发
    onLaunch: function() {
    },

    //创建Panel
    createPanel: function(selModel, record) {
        if (record.get('leaf')) {
            var panel = record.get('url');
            var controller = record.get('controller');
            if (controller) {
                c = this.getController(Ext.String.capitalize(controller));
            }
            this.showPanel(panel, Ext.getCmp('main'));
        }
    }
});