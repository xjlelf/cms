/**
 * SQL列表
 * */
Ext.define('CMS.view.sql.List', {

    //继承
    extend: 'Ext.grid.Panel',

    //名称自定义
    alias: 'widget.sqllist',

    //列
    columns: [{
        header: '序号',
        xtype: 'rownumberer',
        flex: 0.5
    }, {
        header: 'SQL语句',
        dataIndex: 'query',
        flex: 10,
        listeners: {
            dblclick: function(obj, e) {
                this.up('grid').fireEvent('showSql', ConstDefine.delHtmlTag(e.childNodes[0].innerHTML));
            }
        },
        renderer: function(v, row) {
            if (row.record.data.error == 1) {
                return '<font color="#ff0000">' + v + '</font>';
            }
            return v;
        }
    }, {
        header: '错误数',
        dataIndex: 'error',
        flex: 1
    }, {
        header: '影响行数',
        dataIndex: 'affected',
        flex: 1
    }, {
        header: '结果行数',
        dataIndex: 'numRows',
        flex: 1
    }, {
        header: '执行时间（ms）',
        dataIndex: 'took',
        flex: 1
    }],

    //设置数据
    setData: function(data) {
        for (sql in data) {
            this.getStore().insert(0, Ext.create('CMS.model.Sql', data[sql]));
        }
        this.getView().refresh();
    }
});