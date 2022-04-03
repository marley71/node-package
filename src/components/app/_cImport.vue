

<script>
import _cComponent from "../misc/_cComponent.vue";
//import crud from "../../core/crud";
import Server from "../../utility/Server";
export default {
    name: "_cImport",
    extends: _cComponent,
    props: ['cProviderName'],
    data() {
        var d = {
            jobId: null,
            providerName: null,
            progressValue: 20,
            saveEnabled: false,
            uploadEnabled: true,
            progressEnabled: false,
            status: 'upload',
            timerStatus: null,
            confUpload: {
                name: 'resource',
                template: 'tpl-base',
                type: 'w-upload-ajax',
                maxFileSize: '2M',
                modelName: null,
                extensions: [
                    'csv'
                ],
                ajaxFields: {
                    field: 'resource',
                    resource_type: 'attachment'
                },
                methods: {
                    onError () {

                    },
                    onSuccess () {
                        var that = this
                        var viewUpload = that.getComponent('viewUpload')
                        viewUpload.getAction('action-save').setEnabled(true)
                    }
                }
            },
            viewUpload: {
                cRef: 'viewUpload',
                routeName: 'datafile_insert',
                fields: [],
                actions: ['action-save', 'action-cancel'],
                actionsConfig: {
                    'action-save': {
                        text: 'app.importa-csv'
                    }
                }
            },
            viewSave: {
                methods: {
                    setRouteValues: function (route) {
                        if (route) {
                            route.setValues({
                                jobId: this.$parent.jobId,
                                modelName: this.$parent.providerName
                            })
                        }
                        return route
                    }
                },
                cRef: 'viewSave',
                routeName: 'datafile_import',
                fields: [],
                actions: ['action-save-import'],
                actionsConfig: {
                    'action-save-import': {
                        text: 'Salva File Caricato',
                        css: 'btn bnt-outline-secondary btn-info',
                        type: 'record'
                    }
                }
            },
            viewList: {
                routeName: 'datafile_data',
                errorClass : 'bg-danger-soft .border-top .border-primary .bw--2',
                actions : ['action-mostra-tutti','action-show-error'],
                showError : false,
                canEdit : false,
                multiSheets : false,
                // configurazione select
                selectSheetConf : {
                    cRef : 'sheetSelect',
                    methods : {
                        change() {
                            var sheetName = this.domainValues[this.getValue()];
                            this.$parent.setSheet(sheetName);
                        }
                    }
                },
                editError : {
                    title : 'app.modifica',
                    icon : 'fa fa-edit',
                    execute() {
                        alert('modirica' + this.index + " " + this.key);
                    }
                },
                methods : {
                    tdClass(index,key) {
                        var that = this;
                        if (that.hasError(index,key))
                            return 'field-' + key + ' ' + that.errorClass;
                        return 'field-' + key;
                    },
                    hasError(index,key) {
                        var that = this;
                        var errors = that.value[index].errors || [];
                        if (errors.length > 0) {
                            for (var i in errors) {
                                if (key == errors[i].field_name)
                                    return true
                            }

                        }
                        return false;
                    },
                    setSheet(sheetName) {
                        var that = this;
                        console.log('setSheet',sheetName);
                        var params = that.route.getParams();
                        if (sheetName)
                            params['s_datafile_sheet'] = sheetName;
                        else
                            params['s_datafile_sheet'] = '';
                        that.reload();

                    },
                    setRouteValues : function (route) {
                        var that = this;
                        route.setValues({
                            jobId : this.$parent.jobId,
                            modelName : this.$parent.providerName,
                        });
                        var datafile_only_errors = that.showError?1:0;
                        route.setParam('datafile_only_errors',datafile_only_errors);
                        return route;
                    },
                    editErrorConf(index,key) {
                        var that = this;
                        var conf =  that.merge(that.editError,{
                            index : index,
                            key : key,
                            view : that,
                        })
                        console.log('conf Edit',conf);
                        return conf;
                    },
                    setErrors() {
                        var that = this;
                        console.log('csvdata ',this);
                        for (var i in that.value) {
                            var rowData = that.value[i];
                            if (rowData.errors && rowData.errors.length) {
                                var rowJQ = window.jQuery(that.jQe().find('tbody tr').get(i));
                                for (var c in rowData.errors) {
                                    var error = rowData.errors[c];
                                    console.log("found error",'.field-'+error.field_name,error.field_name,rowJQ.find('.field-'+error.field_name).length);
                                    var colJQ = rowJQ.find('.field-'+error.field_name);
                                    colJQ.addClass('danger')
                                        .attr('data-toggle',"tooltip")
                                        .attr('data-errors',error)
                                        .attr('title',error.error_name);
                                    //.attr('title','bosadf afdaf ');
                                    window.jQuery(colJQ).tooltip({
                                        container : 'body',
                                        html : true,
                                    });
                                    if (that.hasClassError(error.field_name)) {
                                        colJQ.attr('data-error_index',i+":"+c);
                                        colJQ.click(function () {
                                            var error_index = window.jQuery(this).attr('data-error_index');
                                            var idx = error_index.split(':');
                                            var error = that.value[idx[0]].errors[idx[1]];
                                            that.app.log.debug('cliccato',error_index,error);
                                            that.errorClicked(error);
                                        });
                                    }
                                }
                                //.addClass('danger');
                            }
                        }
                    },
                    hasClassError : function (fieldName) {
                        var that = this;
                        console.log('fieldName',fieldName,that.value[fieldName].errors)
                        if (that.value[fieldName].errors)
                            return true;
                        return false;
                    },
                    // completed() {
                    //     console.log('v-list csv completed',this.metadata);
                    //     this.getComponent('sheetSelect').setDomainValues(this.metadata.sheets,this.metadata.sheets_order);
                    //     var params = this.route.getParams();
                    //     var selectedSheetName = params['s_datafile_sheet'];
                    //     if (selectedSheetName) {
                    //         this.getComponent('sheetSelect').setValue(Object.values(this.metadata.sheets).indexOf(selectedSheetName));
                    //     }
                    //
                    //     // this.selectSheetConf.domainValues = this.metadata.sheets;
                    //     // this.selectSheetConf.domainValuesOrder = this.metadata.sheets_order;
                    //     this.multiSheets = (this.metadata.sheets_order.length > 0)
                    // }
                }
            }
        }
        return d;
    },
    mounted() {
        var that = this;
        crud.EventBus.$on('start-import',function (params) {
            console.log('event',params);
            that.jobId = params.jobId;
            that.progressEnabled = true;
            that.checkStatus();
        })

    },
    unmounted() {
        var that = this;
        console.log('BEFORE DESTROY',that.timerStatus);
        if (that.timerStatus)
            window.clearTimeout(that.timerStatus);
    },
    methods : {

        dynamicData(conf) {
            var that = this;
            console.log('cConf ',that.cConf,window[that.cConf]);
            if (that.cProviderName)
                conf.providerName = that.cProviderName;
            conf.confUpload.modelName = conf.confUpload.modelName || conf.providerName;
            console.log('dynamic data ',conf);
            return conf;
        },

        checkStatus : function () {
            var that = this;
            var r = that.createRoute('status_queue');
            r.setValues({
                id : that.jobId
            });
            Server.route(r,function (json) {
                if (json.error) {
                    that.progressEnabled = false;
                    that.errorDialog(json.msg);
                    return ;
                }
                that.progress(json);
            })
        },
        progress : function (json) {
            var that = this;

            var checkError = that.checkJobError(json);

            if (checkError.error ) {
                that.progressEnabled = false;
                that.errorDialog(checkError.msg);
                if (that.timerStatus) {
                    clearInterval(that.timerStatus);
                    that.timerStatus = null;
                }

                return ;
            }
            if (json.job.end) {
                console.log('job end',that.status)
                that.progressEnabled = false;
                clearInterval(that.timerStatus);
                that.timerStatus = null;
                if (that.status == 'loading') {
                    that.status = 'tosave';
                    that.saveEnabled = true;
                    that.uploadEnabled = false;
                    //that.datafileConf.jobId = that.jobId;
                    //that.modelName = that.csvProviderName;
                }
                if (that.status == 'saving') {
                    that.status = 'upload';
                    that.uploadEnabled = true;
                    that.saveEnabled = false;
                }
                console.log('job end 2',that.status,that.saveEnabled,that.uploadEnabled)
                return ;
            }
            console.log('check',that.timerStatus);
            if (!that.timerStatus)
                that.timerStatus = setInterval(that.checkStatus,2000)
        },

        checkJobError : function (json) {
            if (json.error) {
                return  {
                    error : 1,
                    msg : json.msg
                };
            }
            if (json.job && json.job.error) {
                return {
                    error : 1,
                    msg : json.job.msg
                };
            }
            return {
                error : 0
            };
        },
        _listConf() {
            var that = this;
            var userConf = that.merge({},that.viewList);
            userConf.modelName = that.providerName;
            return userConf;
        },
        _saveConf() {
            var that = this;
            var userConf = that.merge({},that.viewSave);
            userConf.modelName = that.providerName;
            userConf.actionsConfig = that.viewSave.actionsConfig || {};
            userConf.fieldsConfig = that.viewSave.fieldsConfig || {};
            var aS = userConf.actionsConfig['action-save-import'] || {};
            aS.csvDashboard = that;
            aS.execute = function () {
                var thatAction = this;
                var r = thatAction.createRoute('save_datafile');
                var viewParams = thatAction.view.getViewData();
                r.setParams(viewParams);
                r.setParam('datafile_load_id',thatAction.csvDashboard.jobId);
                r.setParam('datafileProviderName',thatAction.csvDashboard.providerName);

                // var params = thatAction.merge(viewParams,{
                //     datafile_load_id : thatAction.csvDashboard.jobId,
                //     datafileProviderName : thatAction.csvDashboard.providerName,
                // })
                // r.setParams(params);
                Server.route(r,function (json) {
                    if (json.error) {
                        thatAction.errorDialog(json.msg);
                        return ;
                    }
                    thatAction.csvDashboard.jobId = json.jobId;
                    thatAction.csvDashboard.status = 'saving';
                    thatAction.csvDashboard.progressEnabled = true;
                    thatAction.csvDashboard.checkStatus();
                })
            }
            userConf.actionsConfig['action-save'] = aS;

            return  userConf;
        },
        _uploadConf() {
            var that = this;
            var userConf = that.merge({},that.viewUpload);
            userConf.modelName = that.providerName;
            userConf.actionsConfig = that.viewUpload.actionsConfig || {};
            userConf.fieldsConfig = that.viewUpload.fieldsConfig || {};
            console.log('aaaa',userConf,'viewUpload',that.viewUpload);

            var rsName = that.confUpload.name;
            userConf.fields.push(rsName);
            //userConf.fields.push('resource');
            userConf.fieldsConfig[rsName] = that.confUpload;
            var aS = userConf.actionsConfig['action-save'] || {};
            aS.enabled =  false;
            aS.csvDashboard = that;
            aS.execute = function () {
                var thatAction = this;
                thatAction.csvDashboard.status = 'loading';
                var w = thatAction.view.getWidget('resource');
                var value = JSON.parse(w.getValue());
                var r = thatAction.createRoute('load_datafile');
                var viewParams = thatAction.view.getViewData();
                r.setParams(viewParams);
                r.setParam('fileName',value.id);
                r.setParam('datafileProviderName',thatAction.csvDashboard.providerName);
                // var params = thatAction.merge(viewParams,{
                //     'fileName': value.id,
                //     'datafileProviderName': thatAction.csvDashboard.providerName,
                // })
                // r.setParams(params);
                console.log('ROUTE',r.getConf());
                //that.waitStart('caricamento file da importare...');
                Server.route(r,function (json) {
                    console.log('json',json);
                    var checkError = thatAction.csvDashboard.checkJobError(json);
                    if (checkError.error) {
                        thatAction.csvDashboard.status = 'upload';
                        thatAction.errorDialog(checkError.msg);
                        return ;
                    }
                    var params = {
                        jobId : json.jobId,
                        progressEnabled : true,
                    }
                    thatAction.$crud.EventBus.$emit('start-import',params);
                })
            }
            userConf.actionsConfig['action-save'] = aS;
            return  userConf;
        }
    }
}
</script>

<style scoped>

</style>
