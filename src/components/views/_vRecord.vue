
<script>
import _vBase from './_vBase.vue'

export default {
    name: "_vRecord",
    extends: _vBase,
    props: ['cPk'],
    provide: ['route'],
    data() {
        var that = this;
        var d = {
            modelName: null,
            widgetTemplate: 'tpl-record',
            pk: 0,
            value: {},
            metadata: {},
            route: null,
            widgets: {},
            actionsConf: [],
            actionsName: {},
            defaultWidgetType: 'w-input',
            fields: [],
            fieldsConfig: {}
        }
        if (that.cPk)
            d.pk = that.cPk;
        return d;
    },
    unmounted() {
        console.log('unmounted _vRecord');
        // for (let key in this.widgets) {
        //     this.getWidget(key) && this.getWidget(key).unmount();
        // }
        // for (let key in this.actionsConf) {
        //     this.getAction(key) && this.getAction(key).unmount();
        // }
    },
    methods: {
        // da generalizzare prendendo i paramatri di default dalla route e instanziandoli
        // setRouteValues: function (route) {
        //     var that = this;
        //     console.log('setRouteValues', that);
        //     if (that.routeConf) {
        //         var _conf = that._loadRouteConf();
        //         console.log('routeConf params', _conf);
        //         var params = route.getParams();
        //         var p2 = _conf.params || {};
        //         for (var k in p2) {
        //             params[k] = p2[k];
        //         }
        //         route.setParams(params);
        //     }
        //     return route;
        // },
        draw: function () {
            var that = this;
            that.checkValidActions();
            that.createActionsConf();
            that.createWidgets();
            that.loading = false;
            setTimeout(function () {
                that.completed();
            }, 100)
        },
        setWidgetValue: function (key, value) {
            var that = this;
            if (!that.widgets[key]) {
                throw 'accesso a render con chiave inesistente ' + key;
            }
            that.store.cRefs[that.widgets[key].cRef].setValue(value);
        },
        /**
         * crea le configurazioni per i widgets della view
         */
        createWidgets: function () {
            var that = this;
            var keys = (that.fields && that.fields.length > 0) ? that.fields : Object.keys(that.value);
            var widgets = {};
            for (var k in keys) {
                var key = keys[k];
                widgets[key] = that._createWidgetConfig(key,that.value);
                widgets[key].cRef = that.getRefId(that._uid, 'w', key);
            }

            //console.log('v-record.widgets', widgets);
            that.widgets = widgets;
        },

        /**
         * controlla la validità delle azioni inserite nel vettore actions
         * se una azione non e' valida viene rimossa dal vettore
         */
        checkValidActions: function () {
            var that = this;
            var actions = [];
            for (var i in that.actions) {
                var aName = that.actions[i];
                if (that.store.conf[aName])
                    actions.push(aName);
                else if (that.actionsConfig[aName])
                    actions.push(aName);
                else
                    console.warn("Impossibile trovare la definizione di " + aName);

            }
            that.actions = actions;
        },
        /**
         * crea le configurazioni per tutte le azioni valide
         */
        createActionsConf: function () {
            var that = this;
            var actionsConf = {};

            //console.log('confff',that.actions,that);
            for (var i in that.actions) {
                var aName = that.actions[i];
                var aConf = that.getActionConfig(aName);
                // //that._createActionComponent(aName,aConf);
                var v = that.value || {};
                aConf.modelData = this.cloneObj(v);
                aConf.modelName = that.cModel;
                //aConf.rootElement = that.$el;
                aConf.cRef = that.getRefId(that._uid, 'a', aName);
                aConf.name = aName;
                aConf.view = that;
                actionsConf[aName] = aConf;
                //actionsConf[aName] = {};
            }
            that.actionsConf = actionsConf;
        },
        getViewData: function () {
            var that = this;
            var data = {};
            if (that.jQe('form').length) {
                data = this.getFormData(that.jQe('form'));
            }
            return data;
        },

        reset: function () {
            var that = this;
            for (var k in that.widgets) {
                this.getWidget(k).reset();
            }
        },
        getWidget: function (key) {
            var rConf = this.widgets[key];
            if (!rConf) {
                //console.warn('attenzione widget non trovato key ' + key);
                return null;
            }
            //console.log('getWidget',key,rConf);
            return this.store.cRefs[rConf.cRef];
        },
        getAction: function (name) {
            var rConf = this.actionsConf[name];
            if (!rConf) {
                //console.warn('attenzione action non trovata nome ' + name);
                return null;
            }
            //console.log('getAction',name,rConf);
            return this.store.cRefs[rConf.cRef];
        },
        /**
         * aspetta che i widgets o il widgets esista e poi chiama la callback
         * @param widgets stringa o array di stringhe che rappresentano le keys dei widgets che vogliamo aspettare
         * @param callback funzione da chiamare quando i widgets esistono
         */
        waitWidget(widgets,callback) {
            var that = this;
            var __waitW = function () {
                var ok = true;
                //console.log('waitW Record',widgets);
                if (Array.isArray(widgets) ) {
                    console.log('array');
                    for (var i in widgets) {
                        if (!that.getWidget(widgets[i])) {
                            ok = false;
                        }
                    }
                } else {
                    //console.log('get normal',that.getWidget(widgets),that.widgets);
                    if (!that.getWidget(widgets)) {
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
