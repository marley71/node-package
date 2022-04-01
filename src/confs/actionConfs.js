/**
 * azioni predefinite per l'utilizzo generale della libreria, estendono la proprietò crud.confs
 */

import Server from '../utility/Server';

const actionConfs = {
    'action-record-grouped' : {
        componentName:'a-grouped',
        type :'record',
        title: 'grouped'
    },
    'action-collection-grouped' : {
        componentName:'a-grouped',
        type :'collection',
        title: 'grouped'
    },
    'action-reset' : {
        type : 'collection',
        title : 'app.reset',
        css: 'rounded',
        text : 'app.reset',
        execute : function () {
            if (this.view) {
                //console.log('target ref',this.view.targetRef);
                this.view.reset();
                return ;
            }
        }
    },
    'action-search' : {
        type : 'collection',
        title : 'app.cerca',
        css: 'bg-blue-300 rounded',
        icon : 'fa fa-search',
        text : 'app.cerca',
        execute () {
            //console.log('action-search',this,'view',this.view.targetRef);
            if (this.view && this.view.targetRef) {
                //console.log('target ref',this.view.targetRef);
                var targetView =  this.getComponent(this.view.targetRef);
                var formData = this.view.getViewData();
                targetView.route.setParams(formData);
                targetView.route.setParam('page',1);
                targetView.reload();
                return ;
            }
        }
    },
    'action-save' : {
        type : 'collection',
        title : 'app.salva',
        css: 'bg-green-500 text-white rounded',
        icon : 'fa fa-save',
        text : 'app.salva',
        json : null,
        execute (callback) {
            this._save(callback)
        },
        methods: {
            _save (callback) {
                var that = this;
                that.waitStart();
                that.view.save(function (json) {
                    that.waitEnd();
                    if (json.error) {
                        that.errorDialog(json.msg)
                        return ;
                    }
                    that.json = json;
                    var msg = json.msg?json.msg:that.translate('app.salvataggio-ok');
                    that.alertSuccess(msg,that.alertTime);
                    callback();
                })
            }
        }
    },
    'action-save-back' : {
        type : 'collection',
        title : 'app.salva.torna-indietro',
        css: 'bg-green-500 text-white rounded',
        icon : 'fa fa-save',
        text : 'app.salva',
        json : null,
        execute (callback) {
            this._save(callback)
        },
        methods: {
            _save (callback) {
                var that = this;
                that.waitStart();
                that.view.save(function (json) {
                    that.waitEnd();
                    if (json.error) {
                        that.errorDialog(json.msg)
                        return ;
                    }
                    that.json = json;
                    var msg = json.msg?json.msg:that.translate('app.salvataggio-ok');
                    that.alertSuccess(msg,that.alertTime);
                    callback();
                })
            }
        },
        afterExecute () {
            window.history.back();
        }
    },
    'action-edit' : {
        type : 'record',
        title : 'app.modifica',
        css: '',
        text : '',
        icon : 'fa fa-edit',
        execute () {
            let url = '#/edit/' + this.pascalCase('model_'+this.view.modelName) + '.edit/' + this.modelData[this.view.primaryKey]
            document.location.href=url
        }
    },
    'action-view' : {
        type : 'record',
        title : 'app.vista',
        css: '',
        icon : 'fa fa-eye',
        text : '',
        execute () {
            let url = '#/view/' + this.pascalCase('model_'+this.view.modelName) + '/' + this.modelData[this.view.primaryKey]
            document.location.href=url;
        }
    },
    'action-delete' : {
        type : 'record',
        title : 'app.cancella',
        css: 'bg-red-100',
        icon : 'fa fa-times',
        text : '',
        setRouteValues : function(route) {
            var that = this;
            route.setValues({
                modelName: that.view.modelName
            });
            route.setParams({
                id : that.modelData[that.view.primaryKey]
            });
            return route;
        },
        execute : function () {
            var that = this;
            var dlg = that.confirmDialog(that.translate('app.conferma-cancellazione') ,{
                ok : function () {
                    var r = that.createRoute('delete');
                    that.setRouteValues(r);
                    Server.route(r,function (json) {
                        if (json.error) {
                            that.errorDialog(json.msg);
                            return ;
                        }
                        var msg = json.msg?json.msg:that.translate('app.cancellazione-successo');
                        that.alertSuccess(msg);
                        that.view.reload();
                        dlg.hide();
                    });
                }
            });
        }
    },
    'action-save-row' : {
        type: 'record',
        title: 'app.salva',
        css: '',
        text: '',
        icon: 'fa fa-save',
        visible: false,
        methods: {
            setRouteValues : function(route) {
                var that = this;
                route.setValues({
                    modelName: that.view.modelName,
                    pk : that.modelData[that.view.primaryKey]
                });
                return route;
            }
        },
        execute: function () {
            var that = this;
            var values = that.view.getRowEditData(that.index);
            //var id = that.view.value[that.index][that.view.primaryKey];
            var r = that.createRoute('update');
            that.setRouteValues(r);
            r.setParams(values);
            Server.route(r, function (json) {
                if (json.error) {
                    that.errorDialog(json.msg);
                    return;
                }
                var msg = json.msg?json.msg:that.translate('app.salvataggio-ok');
                that.alertSuccess(msg,that.alertTime);
                var values = json.result;
                that.view.setRowData(that.index,values);
                that.view.setViewMode(that.index);
                //that.view.reload();
            })
            console.log('values', values);
        },
    },
    'action-edit-mode':  {
        type : 'record',
        title : 'app.modifica',
        css: '',
        text : '',
        icon : 'fa fa-edit',
        execute : function () {
            var that = this;
            that.view.setEditMode(that.index);
        }
    },
    'action-view-mode' : {
        type : 'record',
        title : 'app.annulla',
        css: '',
        //text : 'back',
        icon : 'fa fa-arrow-left',
        visible : false,
        execute : function () {
            var that = this;
            that.view.setViewMode(that.index);
        }
    },
    'action-insert' : {
        type : 'collection',
        visible : true,
        enabled : true,
        title : 'app.nuovo',
        css: 'bg-green-100 rounded ',
        icon : 'fa fa-plus',
        text : 'app.nuovo',
        execute  :function () {
            //var url = "/insert/" + this.view.modelName + "/new";
            let url = '#/insert/' + this.pascalCase('model_'+this.view.modelName) + ".insert"
            document.location.href=url;
        }
    },
    'action-back' : {
        type : 'collection',
        title : 'app.indietro',
        css: 'rounded',
        icon : 'fa fa-backward',
        text : 'app.indietro',
        execute : function () {
            window.history.back();
        }
    },
    'action-delete-selected' : {
        type : 'collection',
        title : 'app.cancella-selezionati',
        css: 'bg-red-100 rounded',
        icon : 'fa fa-trash',
        text : '',
        needSelection : true,
        setRouteValues : function(route) {
            var that = this;
            route.setValues({
                modelName: that.view.modelName,
            });
            return route;
        },
        execute : function () {
            var that = this;
            var checked = that.view.selectedRows();
            var num = checked.length;
            if (num === 0)
                return ;
            that.confirmDialog(that.translate('app.conferma-multidelete',false,[num]), {
                ok : function () {
                    var r = that.createRoute('multi-delete');
                    that.setRouteValues(r);
                    r.setParams({'ids': checked});
                    that.waitStart();
                    Server.route(r,function (json) {
                        that.waitEnd();
                        if (json.error) {
                            that.errorDialog(json.msg);
                            return ;
                        }
                        that.view.reload();
                        //that.callback(json);
                    })
                }
            });
            console.log('selected',that.view.selectedRows())
        }
    },
    'action-show-error' : {
        text : 'app.mostra-solo-errori', //'Mostra solo errori',
        css : 'btn-outline-danger',
        type : 'collection',
        controlType:'button',
        execute() {
            this.view.showError = true;
            this.view.reload();
        },
        visible() {
            if (this.view.metadata.has_datafile_errors)
                return true
            return false;
        }
    },
    'action-mostra-tutti' : {
        text : 'app.mostra-tutti', // 'Mostra tutti',
        type : 'collection',
        controlType:'button',
        execute() {
            this.view.showError = false;
            this.view.reload();
        },
        visible() {
            if (this.view.metadata.has_datafile_errors)
                return true
            return false;
        }

    }
}
export default actionConfs
