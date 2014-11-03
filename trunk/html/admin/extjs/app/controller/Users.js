/**
 * 父类控制器
 */
Ext.define('CMS.controller.Users', {

    //继承
    extend: 'CMS.controller.Admin',

    //调用数据
    stores: [
        'Users'
    ],

    //调用模型
    models: 'User',

    //公用名称
    c_name: ConstDefine.TITLE.CONTROLLER.MANAGERS,

    //调用视图
    views: [
        'managers.List',
        'managers.Edit'
    ],

    //事件处理
    init: function() {
        this.control({
            'managerslist': {
                create: function(record) {
                    this.showEditDialog('managersedit');
                },
                edit: function(record) {
                    record.data.type = record.data.type == 0 ? null : record.data.type;
                    this.showEditDialog('managersedit', record);
                    this.EditDialog.down('form').getComponent('type').getStore('ManagerTypes').load();
                },
                delete: function(record) {
                    this.showDeleteDialog('/admin/Managers/delete/', record, this.getStore('Managers'));
                }
            },
            'managersedit': {
                save: function() {
                    this.saveData(this.getStore('Managers'), '/admin/Managers/edit');
                }
            }
        });
    }
});