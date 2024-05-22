import crud from "../../../crud";

crud.conf['c-manage'] = {
    // -- selector varie aree della manage
    listSelector : null,
    searchSelecor : null,
    updateAreaSelector : null,
    updateSelector:null,
    viewSelector: null,

    listComponentName: 'v-list',
    searchComponentName: 'v-search',
    listEditComponentName: 'v-list-edit',
    editComponentName: 'v-edit',
    insertComponentName: 'v-insert',
    viewComponentName: 'v-view',

    inlineEdit: false,

    listComp: null,
    searchComp: null,
    listEditComp: null,
    editComp: null,
    insertComp: null,
    viewComp: null,

    layoutGradientColor: null,
    manageHeaderClass: null,
    manageHeaderTextClass: 'text-dark',
    updateTitle: '',
    insertTitle: '',
    viewTitle: '',
    resources: [
        'https://unpkg.com/velocity-animate@2.0.6/velocity.min.js'
    ],
    // configurazioni delle varie view
    list: {},
    edit: {},
    search: {},
    view: {},
    listEdit: {},
    insert: null,
    hasTitle : true,
}

const cManageMixin = {
    mounted: function () {
        this.insertConf = this._getInsertConfiguration();
        this.editConf = this._getEditConfiguration();
        this._createList();
        this._createSearch();
        this.showList();
        this.showList();
    },
    beforeDestroy() {
        if (this.listComp) this.listComp.$destroy();
        if (this.listEditComp) this.listEditComp.$destroy();
        if (this.editComp) this.editComp.$destroy();
        if (this.searchComp) this.searchComp.$destroy();
        if (this.viewComp) this.viewComp.$destroy();
        if (this.insertComp) this.insertComp.$destroy();
    },

    methods: {
        _createList: function () {
            var that = this;
            if (that.listComp)
                that.listComp.$destroy();
            var conf = that.inlineEdit?that._getListEditConfiguration():that._getListConfiguration();
            var cName = that.inlineEdit?that.listEditComponentName:that.listComponentName;
            var cDef = that.dynamicComponent(cName);
            that.listComp = new cDef({
                propsData: {
                    cConf: conf,
                    cRef: that._uid + 'list-view'
                }
            });
            var tId = that.createContainer(that.jQe(that.listSelector),true);
            that.listComp.$mount('#'+tId);
        },
        showList() {

        },
        _createSearch: function () {
            var that = this;
            if (!that.search || !that.search.fields || that.search.fields.length == 0)
                return;
            if (that.searchComp)
                that.searchComp.$destroy();
            var conf = that._getSearchConfiguration();
            var tId = that.createContainer(that.jQe(that.searchSelector),true);
            var cDef = that.dynamicComponent(that.searchComponentName);

            that.searchComp = new cDef({
                propsData: {
                    cConf: conf,
                }
            });
            that.searchComp.$mount('#' + tId);
        },
        showSearch() {

        },
        _createEdit: function (action) {
            var thisManage = this;
            if (thisManage.editComp) {
                thisManage.editComp.$destroy();
                thisManage.editComp = null;
            }
            if (thisManage.insertComp) {
                thisManage.insertComp.$destroy();
                thisManage.insertComp = null;
            }

            if (!this.edit) {
                throw new Error({message:'configurazione edit non trovata',code:500});
            }
            //console.log('primary key ',thisManage.listComp.primaryKey,action)
            var pkTranslation = thisManage.translate(thisManage.edit.modelName + "." + thisManage.listComp.primaryKey + '.label');

            if (!thisManage.updateTitle) {
                thisManage.updateTitle = thisManage.translate('app.edit') + ' ' + thisManage.translate(thisManage.modelName+'.label');
            }

            var conf = thisManage._getEditConfiguration();

            var tId = thisManage.createContainer(thisManage.jQe(thisManage.updateSelector),true);

            conf.pk = action.modelData[thisManage.listComp.primaryKey];

            thisManage.editComp = thisManage.showComponent('#' + tId,thisManage.editComponentName,{
                cConf : conf,
            })


            // var cDef = thisManage.dynamicComponent(thisManage.editComponentName);
            // thisManage.editComp = new cDef({
            //     propsData: {
            //         cConf: conf
            //     }
            // });
            // console.log('Manage._createEdit mount ',thisManage.editComponentName);
            // thisManage.editComp.$mount('#' + tId);
        },
        showEdit() {

        },
        _createView: function (action) {
            var thisManage = this;
            //var that = this;

            let primaryKey = thisManage.listComp.primaryKey;
            let modelName = thisManage.listComp.modelName;

            var pkTranslation = thisManage.translate(modelName + "." + primaryKey + '.label');
            thisManage.viewTitle = thisManage.translate("model." + modelName, 0) + ' (' +
                pkTranslation +
                ':' + action.modelData[primaryKey] + ')';

            if (thisManage.viewComp) {
                thisManage.viewComp.$destroy();
                thisManage.viewComp = null;
            }
            var pk = action.modelData[primaryKey];

            var id = 'd' + (new Date().getTime());
            var dlgView = thisManage.customDialog('<div id="' + id + '"></div>');
            var conf = thisManage._getViewConfiguration();
            conf.pk = action.modelData[primaryKey];
            console.log('cManage viewConf',conf,'action caller',action);
            var cDef = thisManage.dynamicComponent(thisManage.viewComponentName);
            thisManage.viewComp = new cDef({
                propsData: {
                    cConf: conf,
                    //cBig: true,
                }
            });
            thisManage.viewComp.$mount('#' + id);
            dlgView.show();
        },
        showView() {

        },
        _createInsert: function (action) {
            var thisManage = this;
            if (!thisManage.insertTitle) {
                thisManage.updateTitle = thisManage.translate('app.insert') + ' ' + thisManage.translate(thisManage.modelName+'.label');
            } else {
                thisManage.updateTitle = thisManage.insertTitle;
            }
            var tId = thisManage.createContainer(thisManage.jQe(thisManage.updateSelector),true);

            // var id = 'd' + (new Date().getTime());
            // thisManage.jQe('[c-edit-container]').html('<div id="' + id + '"></div>');
            if (thisManage.insertComp)
                thisManage.insertComp.$destroy();
            if (thisManage.editComp) {
                thisManage.editComp.$destroy();
                thisManage.editComp = null;
            }

            console.log('_createInsert',thisManage.insertConf);
            var cDef = thisManage.dynamicComponent(thisManage.insertComponentName);
            thisManage.insertComp = new cDef({
                propsData: {
                    cConf: thisManage.insertConf
                }
            });

            thisManage.insertComp.$mount('#' + tId);

        },
        showInsert() {

        },
        _actionSaveBack: function () {
            var thisManage = this;

            return thisManage.merge(thisManage.$crud.conf['action-save'], {
                text: thisManage.translate('app.save-and-back-list'),
                afterExecute: function () {
                    thisManage.showList();
                    this.view.$destroy();
                    thisManage.listComp.reload();
                }
            });
        },
        _actionBack: function () {
            var thisManage = this;
            return {
                execute: function () {
                    thisManage.showList();
                    this.view.$destroy();
                    thisManage.listComp.reload();
                }
            }
        },
        _getListConfiguration: function () {
            var thisManage = this;
            // var modelConf = "Model" + thisManage.pascalCase(conf.modelName);
            // var originalConf = window[modelConf] ? window[modelConf] : {};
            // //console.log('conf.modelName',conf.modelName,modelConf,originalConf);
            // var originalConf = thisManage.list || {};
            var listConf = thisManage.list || {};

            if (!thisManage.inlineEdit) {
                //listConf = conf.listConf || originalConf.list || {};
                listConf = thisManage.mergeConfView(thisManage.$crud.conf['v-list'], listConf);
                // se sono presente l'action-edit,action-view o action-insert le ridefinisco per la gestione automatica da parte della c-manage
                if (listConf.actions.indexOf('action-edit') >= 0) {
                    var aEdit = listConf.actionsConfig['action-edit'] || {};
                    aEdit.execute = function () {
                        console.log('action-edit da manage - call _createEdit')
                        thisManage._createEdit(this);
                        console.log('action-edit da manage - call showEdit')
                        thisManage.showEdit();
                    }
                    listConf.actionsConfig['action-edit'] = aEdit;
                }
                if (listConf.actions.indexOf('action-view') >= 0) {
                    var aView = listConf.actionsConfig['action-view'] || {};
                    aView.execute = function () {
                        thisManage._createView(this);
                        thisManage.showView();
                    }
                    listConf.actionsConfig['action-view'] = aView;
                }

                if (listConf.actions.indexOf('action-insert') >= 0) {
                    var aInsert = listConf.actionsConfig['action-insert'] || {};
                    aInsert.execute = function () {
                        thisManage._createInsert(this);
                        thisManage.showInsert();
                    }
                    listConf.actionsConfig['action-insert'] = aInsert;
                }
            }
            return listConf;
        },
        _getListEditConfiguration: function () {
            var thisManage = this;
            var listEditConf = thisManage.listEdit || {};

            //if (thisManage.inlineEdit) {
                listEditConf = thisManage.mergeConfView(thisManage.$crud.conf['v-list-edit'], listEditConf);
                //listEditConf = thisManage.mergeConfView(thisManage.$crud.conf.listEdit, listEditConf);
                console.log('acions list edit ', listEditConf.actions);
                if (listEditConf.actions.indexOf('action-view') >= 0) {
                    listEditConf.actionsConfig['action-view'] = {
                        execute: function () {
                            thisManage._createView(this);
                            thisManage.showView();
                        }
                    }
                }

                if (listEditConf.actions.indexOf('action-insert') >= 0) {
                    listEditConf.actionsConfig['action-insert'] = {
                        execute: function () {
                            thisManage._createInsert(this);
                            thisManage.showInsert();
                        }
                    }
                }
            //}
            return listEditConf;
        },
        _getSearchConfiguration: function () {
            var thisManage = this;
            var searchConf = thisManage.search || {};
            var listComp = thisManage.inlineEdit?thisManage.listEditComp:thisManage.listComp;
            if (!searchConf.actionsConfig) searchConf.actionsConfig = {};

            var acSearch = searchConf.actionsConfig['action-search'] || {};
            // forzo la execute della search, siamo in un manage...
            acSearch.execute = function () {
                var that = this;
                var formData = that.view.getViewData();
                listComp.route.setParams(formData);
                listComp.route.setParam('page',1);
                listComp.reload();
                return;
            };
            searchConf.actionsConfig['action-search'] = acSearch;
            return searchConf;
        },
        _getEditConfiguration: function () {
            var thisManage = this;

            var editConf = thisManage.edit || {};
            editConf = thisManage.mergeConfView(thisManage.$crud.conf['v-edit'], editConf);
            // prendo eventuali configurazioni locali al modello.
            var _asb = editConf.actionsConfig['action-save-back'] || {};
            editConf = thisManage.mergeConfView(editConf, {
                actionsConfig: {
                    'action-save-back': thisManage.merge(thisManage._actionSaveBack(),_asb),
                    'action-back': thisManage._actionBack(),
                    //'action-save' : thisManage.merge(_as,)
                }
            });
            if (editConf.actions.indexOf('action-save-back') < 0)
                editConf.actions.push('action-save-back');
            if (editConf.actions.indexOf('action-back') < 0)
                editConf.actions.push('action-back');
            return editConf;
        },
        _getInsertConfiguration: function () {
            var thisManage = this;
            var insertConf = thisManage.insert || thisManage.edit || {};
            insertConf = thisManage.mergeConfView(thisManage.$crud.conf['v-insert'], insertConf);

            // prendo eventuali configurazioni locali al modello.
            var _asb = insertConf.actionsConfig['action-save-back'] || {};
            var _ab = insertConf.actionsConfig['action-back'] || {};
            insertConf = thisManage.mergeConfView(insertConf, {
                actionsConfig: {
                    'action-save-back': thisManage.merge(thisManage._actionSaveBack(),_asb),
                    'action-back': thisManage.merge(thisManage._actionBack(),_ab)
                }
            });
            if (insertConf.actions.indexOf('action-save-back') < 0)
                insertConf.actions.push('action-save-back');
            if (insertConf.actions.indexOf('action-back') < 0)
                insertConf.actions.push('action-back');
            var actionSaveIndex = insertConf.actions.indexOf('action-save');
            if (actionSaveIndex >= 0) {
                delete insertConf.actions[actionSaveIndex];
            }
            return insertConf;
        },

        _getViewConfiguration: function () {
            var thisManage = this;
            var viewConf = thisManage.view || {};
            viewConf = thisManage.mergeConfView(thisManage.$crud.conf['v-view'], viewConf);
            return viewConf;
        }
    }
}
export default cManageMixin
