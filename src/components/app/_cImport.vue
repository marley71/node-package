

<script>
import _cComponent from "../misc/_cComponent.vue";
import Server from "../../utility/Server";
export default {
    name: "_cImport",
    extends: _cComponent,
    props: ['cProviderName'],
    data() {
        var that = this;
        //var conf = that._getConf();
        var d = {
            jobId: null,
            providerName: null,
            progressValue: 20,
            saveEnabled: false,
            uploadEnabled: true,
            progressEnabled: false,
            step: 'upload',
            timerStatus: null,
            multiSheets : false,
            selectSheetConf : {
                cRef : 'sheetSelect',
                methods : {
                    change() {
                        var sheetName = this.domainValues[this.getValue()];
                        this.setSheet(sheetName);
                    }
                }
            },
            // configurazione widget upload ajax
            //confUpload : that._defaultUploadConf(conf),
            // configurazione view-insert upload job
            viewUpload: {
                cRef: 'viewUpload',
                routeName: 'datafile_insert',
                fields: [],
                actions: ['action-save', 'action-back'],
                actionsConfig: {
                    'action-save': {
                        text: 'app.importa-csv'
                    }
                }
            },
            // configurazione view-save job
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
            // configurazione view-list job
            viewList: {
                routeName: 'datafile_data',
                errorClass : 'bg-danger-soft .border-top .border-primary .bw--2',
                actions : ['action-mostra-tutti','action-show-error'],
                showError : false,
                canEdit : false,
                // configurazione select
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
    emits: {
        startImport : ({jobId}) => {
            let that = this;
            that.jobId = jobId;
            that.progressEnabled = true;
            that.checkStatus();
        }
    },
    mounted() {
        var that = this;
        that.emitter.on('start-import',function (params) {
            console.log('event',params);
            that.jobId = params.jobId;
            that.progressEnabled = true;
            that.checkStatus();
        })
        if (that.cProviderName)
            that.providerName = that.cProviderName;
        that.confUpload.modelName = that.confUpload.modelName || that.providerName;
        that.confUpload.type = 'w-upload-ajax';
    },
    unmounted() {
        var that = this;
        console.log('BEFORE DESTROY',that.timerStatus);
        if (that.timerStatus)
            window.clearTimeout(that.timerStatus);
    },
    methods : {
        importForm() {
            let that = this;
            let importView = that.$refs.viewUpload;
            let viewParams = importView.getViewData();

            var w = importView.getWidget('resource');
            var value = JSON.parse(w.getValue());
            var r = this.createRoute('load_datafile');
            //var viewParams = thatAction.view.getViewData();
            r.setParams(viewParams);
            r.setParam('fileName',value.id);
            r.setParam('datafileProviderName',that.providerName);
            // var params = thatAction.merge(viewParams,{
            //     'fileName': value.id,
            //     'datafileProviderName': thatAction.csvDashboard.providerName,
            // })
            // r.setParams(params);
            console.log('ROUTE',r.getConf());
            //that.waitStart('caricamento file da importare...');
            Server.route(r,function (json) {
                console.log('json',json);
                var checkError = that.checkJobError(json);
                if (checkError.error) {
                    that.step = 'upload'
                    that.errorDialog(checkError.msg).show();
                    return ;
                }
                that.step = 'loading';
                var params = {
                    jobId : json.jobId,
                    progressEnabled : true,
                }
                console.log('evento','start-import',params)
                that.emitter.emit('start-import',params);
            })
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
                    that.errorDialog(json.msg).show();
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
                that.errorDialog(checkError.msg).show();
                if (that.timerStatus) {
                    clearInterval(that.timerStatus);
                    that.timerStatus = null;
                }

                return ;
            }
            if (json.job.end) {
                console.log('job end',that.step)
                that.progressEnabled = false;
                clearInterval(that.timerStatus);
                that.timerStatus = null;
                if (that.step == 'loading') {
                    that.step = 'tosave';
                    that.saveEnabled = true;
                    that.uploadEnabled = false;
                    //that.datafileConf.jobId = that.jobId;
                    //that.modelName = that.csvProviderName;
                }
                if (that.step == 'saving') {
                    that.step = 'upload';
                    that.uploadEnabled = true;
                    that.saveEnabled = false;
                    that.alertSuccess('Dati salvati',3000).show();
                }
                console.log('job end 2',that.step,that.saveEnabled,that.uploadEnabled)
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
            var userConf = that.viewList; //that.merge({},that.viewList);
            userConf.modelName = that.providerName;
            userConf.actions = [];
            return userConf;
        },
        _saveConf() {
            var that = this;
            var userConf = that.viewSave; //that.merge({},that.viewSave);
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
                        thatAction.errorDialog(json.msg).show();
                        return ;
                    }
                    thatAction.csvDashboard.jobId = json.jobId;
                    thatAction.csvDashboard.step='saving';
                    thatAction.csvDashboard.progressEnabled = true;
                    thatAction.csvDashboard.checkStatus();
                })
            }
            userConf.actionsConfig['action-save'] = aS;

            return  userConf;
        },
        _uploadConf() {
            let that = this;
            //let userConf = that.viewUpload; //that.merge({},that.viewUpload);
            let userConf = {
                cRef: 'viewUpload',
                routeName: 'datafile_insert',
                fields: [],
                actions: ['action-save', 'action-cancel'],
                fieldsConfig: {},
                actionsConfig: {
                    'action-save': {
                        text: 'app.importa-csv',
                        enabled:false,
                        csvDashboard : that,
                        execute() {
                            that.importForm();
                        }
                    }
                }
            }

            userConf.modelName = that.providerName;
            let confUpload = that._defaultUploadConf();
            // let confUpload = {};
            //
            // console.log('confUpload',confUpload);
            //
            let rsName = confUpload.name;
            if (userConf.fields.indexOf(rsName) < 0)
                userConf.fields.push(rsName);
            // //userConf.fields.push('resource');
            userConf.fieldsConfig[rsName] = confUpload;
            return  userConf;
        },

        _defaultUploadConf() {
            var thatImport = this;
            var conf = thatImport._getConf();
            var confUpload = {
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
                    onError() {

                    },
                    onSuccess() {
                        var that = this
                        var viewUpload = thatImport.$refs.viewUpload;
                        window.pippo = thatImport;
                        console.log('viewUpload action-save', viewUpload.getAction('action-save'))
                        viewUpload.getAction('action-save').setEnabled(true)
                    }
                }
            }
            confUpload = this.mergeConf2(confUpload,(conf.confUpload || {}))
            // var tmp = conf.confUpload || {};
            // for (var k in tmp) {
            //     confUpload[k] = tmp[k];
            // }
            console.log('BBBBB',confUpload);
            return confUpload;
        }
    },
}
</script>

<style scoped>

</style>
