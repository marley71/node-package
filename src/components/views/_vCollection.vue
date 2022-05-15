<script>

import jQuery from "jquery";
import _vBase from './_vBase.vue'

export default {
    name: "_vCollection",
    extends: _vBase,
    data() {
        return {
            modelName: null,
            value: [],
            metadata: {},
            needSelection: false,
            collectionActionsName: [],
            recordActionsName: [],
            collectionActions: {},
            recordActions: [],
            paginator: true
        }
    },
    unmounted() {
        console.log('unmounted _vCollection');
        // for (var row in this.widgets) {
        //     for (var key in this.widgets[row]) {
        //         console.log('unmounted',this.getWidget(row, key));
        //         this.getWidget(row, key) && this.getWidget(row, key).unmount();
        //     }
        // }
        // for (let row in this.recordActions) {
        //     for (let key in this.recordActions[row]) {
        //         this.getRecordAction(row, key) && this.getRecordAction(row, key).unmount();
        //     }
        // }
        // for (let key in this.collectionActions) {
        //     this.getCollectionAction(key) && this.getCollectionAction(key).unmount();
        // }
    },
    methods: {
        draw: function () {
            var that = this;
            that.createWidgets();
            that.checkValidActions();
            that.createActionsConf();
            that.loading = false;
            // console.log('draw',that.loading,that);
            // that.completed();
            // console.log('draw1',that.loading,that);

            //that.$forceUpdate();
            //that.completed();

            setTimeout(function () {
                that.completed();
            }, 100);
        },

        setWidgetValue: function (row, key, value) {
            var that = this;
            if (!that.widgets[row][key]) {
                throw 'accesso a render con chiave inesistente ' + row + "," + key;
            }
            var wConf = that.widgets[row][key];
            that.store.cRefs[wConf.cRef].setValue(value);
        },
        createWidgets: function () {
            var that = this;
            that.setKeys();
            var widgets = [];
            var value = that.value;
            for (var i in value) {
                widgets.push({});
                for (var k in that.keys) {
                    var key = that.keys[k];
                    widgets[i][key] = that._createWidgetConfig(key,value[i]);
                    widgets[i][key].cRef = that.getRefId(that.uid, 'w', i, key);
                }
            }
            that.widgets = widgets;
        },
        /**
         * valorizza i campi correnti calcolandoli o dai dati o dalla configurazione nella proprietà fields.
         * il risulato viene memorizzato in keys
         */
        setKeys: function () {
            var that = this;
            var keys = [];
            if (that.fields && that.fields.length > 0)
                keys = that.fields;
            if (that.cFields) {
                keys = that.cFields.split(',');
            }
            if (keys.length == 0 && that.value.length)
                keys = Object.keys(that.value[0]);
            that.keys = keys;
        },
        /**
         * ritorna solo le keys visibili
         **/
        getVisibleKeys() {
            var that = this;
            var visible = [];
            for (let i in that.keys) {
                if (!that.isHiddenField(that.keys[i]))
                    visible.push(that.keys[i]);
            }
            return visible;
        },
        getVisibleWidgets(row) {
            var that = this;
            var visible = {};
            for (let key in row) {
                if (!that.isHiddenField(key))
                    visible[key] = row[key]
            }
            return visible;
        },

        getHiddenWidgets(row) {
            var that = this;
            var hidden = {};
            for (let key in row) {
                if (that.isHiddenField(key))
                    hidden[key] = row[key]
            }
            return hidden;
        },

        getWidget: function (row, key) {
            var wConf = (this.widgets[row] && this.widgets[row][key]) ? this.widgets[row][key]:null;
            console.log('wConf dalla view',row,key,wConf);
            if (!wConf) {
                //console.warn('attenzione widget non trovato per riga ' + row +  " key " + key);
                return null;
            }
            console.log('getWidget dalla view',wConf.cRef,this.$refs[wConf.cRef])
            return this.$refs[wConf.cRef].getWidget();
            //return this.store.cRefs[wConf.cRef];
        },

        getRecordAction: function (row, actionName) {
            var aConf = this.recordActions[row][actionName];
            if (!aConf) {
                //console.warn('attenzione recordAction non trovata per riga ' + row +  " nome " + actionName);
                return null;
            }
            //window.DD = this.$refs;
            //console.log('ref ',aConf.cRef,this.$refs[aConf.cRef])
            return this.$refs[aConf.cRef].getAction();
            //return this.store.cRefs[aConf.cRef];
        },
        getCollectionAction: function (actionName) {
            var aConf = this.collectionActions[actionName];
            if (!aConf) {
                //console.warn('attenzione action non trovata nome ' + actionName);
                return null;
            }
            return this.$refs[aConf.cRef].getAction();
            //return this.store.cRefs[aConf.cRef];
        },
        /**
         * controlla la validità delle azioni inserite nel vettore actions
         * e se e' di tipo record o collection.
         * se una azione non e' valida viene rimossa dal vettore
         */
        checkValidActions: function () {
            var that = this;
            var collectionActionsName = [];
            var recordActionsName = [];
            for (var i in that.actions) {
                var aName = that.actions[i];
                var aConf = {};
                var valid = true;

                if (that.store.conf[aName]) {
                    aConf = that.store.conf[aName];
                } else if (that.actionsConfig[aName]) {
                    aConf = that.mergeConf(that.actionsConfig[aName]);
                } else {
                    valid = false;
                    console.warn("Impossibile trovare la configurazione di " + aName);
                }
                //aConf = that.mergeConf(aConf);
                if (valid) {
                    //console.log('aConf',aName,aConf);
                    if (aConf.type == 'collection') {
                        collectionActionsName.push(aName);
                    } else if (aConf.type == 'record') {
                        recordActionsName.push(aName);
                    } else {
                        console.log('action ', aConf);
                        throw aName + ", tipo di action (" + aConf.type + ") non definito! valori accettati sono record,collection";
                    }
                }
            }
            //console.log('data',data,'conf',conf,'keys',keys);
            that.collectionActionsName = collectionActionsName;
            that.recordActionsName = recordActionsName;
            that.collectionActions = {};
            that.recordActions = [];
        },

        createActionsConf: function () {
            var that = this;
            that.createCollectionActions();
            console.log('vCollection.createCollectionActions')
            for (var i in that.value) {
                that.recordActions.push({});
                that.createRecordActions(i);
            }
        },
        createRecordActions: function (row) {
            var that = this;
            //console.log('row',row,that.recordActionsName);
            var recordActionsName = that.recordActionsName;
            var recordActions = that.recordActions;
            for (var k in recordActionsName) {
                var aName = recordActionsName[k];
                var aConf = that.getActionConfig(aName);
                //var a = jQuery.extend(true,{},aConf);
                //a.id = data.value[i].id;
                aConf.modelData = {};
                Object.assign(aConf.modelData, that.value[row]);
                aConf.modelName = that.cModel;
                aConf.index = row;
                aConf.cRef = that.getRefId(that.uid, 'ra', row, aName);
                aConf.name = aName;
                aConf.view = that;
                recordActions[row][aName] = aConf;
            }
        },
        createCollectionActions: function () {
            var that = this;
            var collectionActions = [];
            var collectionActionsName = that.collectionActionsName;

            for (var i in collectionActionsName) {
                var aName = collectionActionsName[i];
                var aConf = that.getActionConfig(aName);
                aConf.modelData = jQuery.extend(true, {}, that.value);
                aConf.modelName = that.cModel;
                aConf.rootElement = that.$el;
                aConf.cRef = that.getRefId(that.uid, 'ca', aName);
                that.needSelection = that.needSelection || aConf.needSelection;
                aConf.name = aName;
                aConf.view = that;
                collectionActions[aName] = aConf;
                //collectionActions[aName] = that.merge({},aConf);
            }
            that.collectionActions = collectionActions;
        },
        getViewData: function () {
            var that = this;
            var values = [];
            for (var i=0;i<that.value.length;i++) {
                var v = {};
                for (var j in that.keys) {
                    var k = that.keys[j];
                    v[k] = that.getWidget(i,k).getValue();
                }
                values.push(v);
            }
            return values;
        },
        /**
         * funzione chiamata per gli ordinamenti delle liste con dati non dinamici, ma statici
         */
        staticOrder: function (orderField, orderDirection) {
            var that = this;
            that.loading = true;
            var value = that.cloneObj(that.value);
            that.value = new Array();
            that.$forceUpdate();
            var __sortOn = function (arr, prop, direction) {
                console.log('prop', prop, 'direction', direction)
                var sortOrder = direction == 'ASC' ? 1 : -1;
                arr.sort(
                    function (a, b) {
                        if (a[prop] < b[prop]) {
                            return -1 * sortOrder;
                        } else if (a[prop] > b[prop]) {
                            return 1 * sortOrder;
                        } else {
                            return 0;
                        }
                    }
                );
            }
            __sortOn(value, orderField, orderDirection);
            that.metadata.order = {
                field: orderField,
                direction: orderDirection
            };
            that.loading = true;
            console.log('nuovi valori ordinati', value);
            that.$set(that, 'value', value);
            //that.orderDirection = order_direction;

            setTimeout(function () {
                that.loading = false;  //  per far in modo di autodisegnarsi di nuovo
                that.reload();
            }, 100);
        },
        /**
         * aspetta che i widgets o il widgets esista e poi chiama la callback
         * @param widgets array  o array di array [row,key] che rappresentano le coordinate  dei widgets che vogliamo aspettare
         * @param callback funzione da chiamare quando i widgets esistono
         */
        waitWidget(widgets,callback) {
            var that = this;
            var __waitW = function () {
                var ok = true;
                if (Array.isArray(widgets) && Array.isArray(widgets[0])) {
                    for (var i in widgets) {
                        if (!that.getWidget(widgets[i][0],widgets[i][1])) {
                            ok = false;
                        }
                    }
                } else {
                    if (!that.getWidget(widgets[0],widgets[1])) {
                        ok = false;
                    }
                }
                if (ok) {
                    return callback();
                }
                setTimeout(__waitW,200);
            }
            __waitW();
        }
    }
}
</script>

<style scoped>

</style>
