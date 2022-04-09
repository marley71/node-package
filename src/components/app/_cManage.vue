
<script>
import _cComponent from "../misc/_cComponent.vue";
//import crudStore from '../../utility/crudStore';

export default {
    name: "_cManage",
    extends: _cComponent,
    data() {
        return {
            listSelector : null,
            searchSelector : null,
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

            layoutGradientColor: null,
            manageHeaderClass: null,
            manageHeaderTextClass: 'text-dark',
            updateTitle: '',
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
            insert: null
        }
    },
    mounted: function () {
        this.insertConf = this._getInsertConfiguration();
        this.editConf = this._getEditConfiguration();
        this._createList();
        this._createSearch();
        this.showList();
        this.showList();
    },
    unmounted() {
        console.log('manage unmounted')
        // var listComp = this.getComponent('list');
        // if (listComp) listComp.unmount();
        //
        // var listEditComp = this.getComponent('listEdit');
        // if (listEditComp) listEditComp.unmount();
        //
        // var editComp = this.getComponent('edit');
        // if (editComp) editComp.unmount();
        //
        // var searchComp = this.getComponent('search');
        // if (searchComp) searchComp.unmount();
        //
        // var viewComp = this.getComponent('view');
        // if (viewComp) viewComp.unmount();
        //
        // var insertComp = this.getComponent('insert');
        // if (insertComp) insertComp.unmount();
    },

    methods: {
        _createList: function () {
            var that = this;
            var listComp = this.getComponent('list');
            if (listComp)
                listComp.unmount();
            var conf = that.inlineEdit?that._getListEditConfiguration():that._getListConfiguration();
            var cName = that.inlineEdit?that.listEditComponentName:that.listComponentName;
            conf.cRef = that._uid + '-list'
            var tId = that.createContainer(that.jQe(that.listSelector),true);
            that.newComponent(cName,{
                cConf: conf,
            }).mount('#'+tId);
            //console.log('lista creata',that.listComp.route,conf);
        },
        showList() {

        },
        _createSearch: function () {
            var that = this;
            var searchComp = this.getComponent('search');
            if (!that.search || !that.search.fields || that.search.fields.length == 0)
                return;
            if (searchComp)
                searchComp.unmount();
            var conf = that._getSearchConfiguration();
            conf.cRef = that._uid + '-search'
            var tId = that.createContainer(that.jQe(that.searchSelector),true);

            that.newComponent(that.searchComponentName,{
                cConf: conf,
            }).mount('#' + tId);
        },
        showSearch() {

        },
        _createEdit: function (action) {
            var thisManage = this;
            // var editComp = this.getComponent('edit');
            // if (editComp) {
            //     editComp.unmount();
            // }
            // var insertComp = this.getComponent('insert');
            // if (insertComp) {
            //     insertComp.unmount();
            // }

            if (!this.edit) {
                throw new Error({message:'configurazione edit non trovata',code:500});
            }
            //console.log('primary key ',thisManage.listComp.primaryKey,action)
            var listComp = thisManage.getComponent('list');
            var pkTranslation = thisManage.translate(thisManage.edit.modelName + "." + listComp.primaryKey + '.label');

            thisManage.updateTitle = 'Modifica ' + thisManage.translate(thisManage.edit.modelName+'.label');

            var conf = thisManage._getEditConfiguration();

            var tId = thisManage.createContainer(thisManage.jQe(thisManage.updateSelector),true);

            conf.pk = action.modelData[listComp.primaryKey];
            conf.cRef = thisManage._uid + '-edit'
            thisManage.newComponent(thisManage.editComponentName,{
                cConf: conf,
            }).mount('#' + tId);
        },
        showEdit() {

        },
        _createView: function (action) {
            var thisManage = this;
            //var that = this;
            var listComp = this.getComponent('list');
            let primaryKey = listComp.primaryKey;
            let modelName = listComp.modelName;

            var pkTranslation = thisManage.translate(modelName + "." + primaryKey + '.label');
            thisManage.viewTitle = thisManage.translate("model." + modelName, 0) + ' (' +
                pkTranslation +
                ':' + action.modelData[primaryKey] + ')';

            var viewComp = this.getComponent('view');
            if (viewComp) {
                viewComp.unmount();
            }
            var pk = action.modelData[primaryKey];

            var id = 'd' + (new Date().getTime());
            var dlgView = thisManage.customDialog('<div id="' + id + '"></div>');
            var conf = thisManage._getViewConfiguration();
            conf.pk = action.modelData[primaryKey];
            conf.cRef = that._uid + '-view'
            console.log('cManage viewConf',conf,'action caller',action);
            thisManage.newComponent(thisManage.viewComp,{
                cConf: conf,
            }).mount('#' + id);

            dlgView.show();
        },
        showView() {

        },
        _createInsert: function (action) {
            var thisManage = this;
            thisManage.updateTitle = 'Inserimento ' + thisManage.translate(thisManage.modelName+'.label');
            var tId = thisManage.createContainer(thisManage.jQe(thisManage.updateSelector),true);

            // var id = 'd' + (new Date().getTime());
            // thisManage.jQe('[c-edit-container]').html('<div id="' + id + '"></div>');
            var insertComp = this.getComponent('insert');
            if (insertComp)
                insertComp.unmount();

            var editComp = this.getComponent('edit');
            if (editComp) {
                editComp.unmount();
            }
            this.insertConf.cRef = thisManage._uid + '-insert';
            console.log('_createInsert',thisManage.insertConf);

            thisManage.newComponent(thisManage.insertComponentName,{
                cConf: thisManage.insertConf,
            }).mount('#' + tId);

        },
        showInsert() {

        },
        _actionSaveBack: function () {
            var thisManage = this;
            return thisManage.merge(thisManage.store.conf['action-save'], {
                text: 'Salva e Torna alla lista',
                afterExecute: function () {
                    thisManage.showList();
                    var listComp = thisManage.getComponent('list');
                    //this.view.unmount();
                    listComp.reload();
                }
            });
        },
        _actionBack: function () {
            var thisManage = this;
            return {
                execute: function () {
                    thisManage.showList();
                    //this.view.unmount();
                    var listComp = thisManage.getComponent('list');
                    listComp.reload();
                }
            }
        },
        _getListConfiguration: function () {
            var thisManage = this;
            var listConf = thisManage.list || {};

            if (!thisManage.inlineEdit) {
                //listConf = conf.listConf || originalConf.list || {};
                listConf = thisManage.mergeConfView({}, listConf);
                // se sono presente l'action-edit,action-view o action-insert le ridefinisco per la gestione automatica da parte della c-manage
                if (listConf.actions.indexOf('action-edit') >= 0) {
                    var aEdit = listConf.actionsConfig['action-edit'] || {};
                    aEdit.execute = function () {
                        thisManage._createEdit(this);
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
            return thisManage.merge({},listConf);
            //return listConf;
        },
        _getListEditConfiguration: function () {
            var thisManage = this;
            var listEditConf = thisManage.listEdit || {};

            //if (thisManage.inlineEdit) {
            listEditConf = thisManage.mergeConfView(thisManage.conf['v-list-edit'], listEditConf);
            //listEditConf = thisManage.mergeConfView(store.conf.listEdit, listEditConf);
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
            var listComp = thisManage.inlineEdit?this.getComponent('listEdit'):this.getComponent('list');
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
            return thisManage.merge({},searchConf);
            //return searchConf;
        },
        _getEditConfiguration: function () {
            var thisManage = this;
            var editConf = thisManage.edit || {};
            editConf = thisManage.mergeConfView(thisManage.store.conf['v-edit'], editConf);
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
            insertConf = thisManage.mergeConfView(thisManage.store.conf['v-insert'], insertConf);

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
            viewConf = thisManage.mergeConfView(thisManage.store.conf['v-view'], viewConf);
            return viewConf;
        },

        getComponent(type) {
            return this.store.cRefs[this._uid+'-'+type]
        }
    }
}
</script>
