<script>
import _cComponent from "../misc/_cComponent.vue";
import Server from "../../utility/Server";

export default {
    name: "_vBase",
    extends: _cComponent,
    data() {
        return {
            confParent: 'c-component',
            viewTitle: '',
            langContext: '',
            loading: true,
            errorMsg: '',
            routeConf: null,
            autoload: true // carica la sorgente dati automaticamente
        }
    },
    mounted() {
        var that = this;
        that.route = that._getRoute();
        if (that.autoload) {
            that.load();
        }
    },
    methods: {
        load() {
            var that = this;
            that.beforeLoadData();
            that.setRouteValues(that.route);
            that.fetchData(that.route, function (json) {
                that.json = json;
                that.fillData(that.route, json);
                that.afterLoadData(json);
                console.log('vBase.load that, json',that,json);
                that.draw();
            });
        },

        reload() {
            var that = this;
            that.loading = true;
            setTimeout(function () {
                that.load();
            },10)

        },

        draw() {
            throw "Implementare il metodo draw";
        },
        // evento chiamato quando la view ha caricato i dati e disegnato tutti i controlli e azioni
        completed: function () {

        },
        fetchData: function (route, callback) {
            var that = this;
            if (!route) {
                //that.afterLoadData({});
                callback({});
                return;
            }
            //console.log('fetchData',route.getConf());
            Server.route(route, function (json) {
                if (json.error) {
                    that.errorDialog(json.msg);
                    that.errorMsg = json.msg;
                    return
                }
                //that.afterLoadData(json);
                callback(json);
            })
        },
        beforeLoadData () {

        },
        afterLoadData () {

        },
        _loadConf: function () {
            var that = this;
            var defaultConf = that._getDefaultConf();
            var currentConf = that._getConf();
            var mergedConf = that.mergeConfView(defaultConf, currentConf);
            //console.log('v-base _loadConf', mergedConf);
            return mergedConf;
        },

        /**
         * crea la configurazione base per ogni singola azione della view, se incontra un'azione
         * custom con una configurazione non definita, la definisce in store.conf[action-name]
         * @param name
         * @return {*|{}}
         */
        getActionConfig: function (name) {
            var that = this;
            var conf = that.store.conf[name] || {};
            if (!conf.componentName)
                conf.componentName = 'a-base';
            //var componentName = conf.componentName ? conf.componentName : 'a-base';
            conf = that.merge(that.store.conf[conf.componentName], conf);
            if (that.actionsConfig[name]) {
                conf = that.merge(conf, that.actionsConfig[name]);
            }
            // console.log('actionconfig',name,conf)
            conf = that.merge({},conf);
            return conf;
        },


        _getConf: function () {
            var that = this;
            var conf = {}; //null;
            if (that.cConf) {
                if (typeof that.cConf === 'string' || that.cConf instanceof String) {
                    conf = this.getDescendantProp(window, that.cConf);
                } else
                    conf = that.cConf;
            } else {
                var modelName = that.cModel;
                var type = that.cType;
                console.log('Check exist default conf ' + 'Model' + this.pascalCase(modelName));
                if (window['Model' + this.pascalCase(modelName)]) {
                    var cm = window['Model' + this.pascalCase(modelName)];
                    if (cm[type])
                        conf = cm[type];
                    else {
                        if (type == 'insert' && cm['edit'])
                            conf = cm['edit'];
                        else {
                            conf = that.store.conf[type];
                        }
                    }

                }

            }
            //console.log('v-base _getConf', conf);
            return conf;
        },


        _getDefaultConf: function () {
            var that = this;
            //var _compName = this.$options.name;
            console.log('confDefaultName', that.cConfDefaultName, 'componentName', that.$options.name, 'viewConf', that.cType)
            var defaultConf = that.mergeConf(that.store.conf[that.cConfDefaultName]);
            var componentNameConf = that.mergeConf(that.store.conf[that.$options.name]);
            //var typeConf = that.mergeConf(store.conf[that.cType]);

            var mergedConf = that.merge(defaultConf, componentNameConf);
            //mergedConf = that.merge(mergedConf, typeConf);
            console.log('v-base _getDefaultConf', mergedConf);
            return mergedConf;
        },

        _loadRouteConf: function () {
            var that = this;
            var conf = null;
            console.log('_load routeConf', that.routeConf, 'cConf', this.cConf);
            if (that.routeConf) {
                if (typeof that.routeConf === 'string' || that.routeConf instanceof String) {
                    conf = this.getDescendantProp(that.store, that.routeConf);
                } else
                    conf = that.routeConf;
            }
            return conf;
        },
        /**
         * ritorna la configurazione minimale di base di un widget rispettando le priorita' tra le configurazioni
         * @param key : nome del campo di cui vogliamo la configurazione
         * @param confiName : nome variabile configurazione nell'oggetto conf. opzionale
         * @returns {{type: *}}
         * @private
         */
        _defaultWidgetConfig: function (key, configName) {
            var that = this;
            var c = {
                type: that.defaultWidgetType,
            };
            configName = configName ? configName : 'fieldsConfig';
            var conf = (that[configName] && that[configName][key]) ? that[configName][key] : null;
            //console.log('CONF',key,conf,configName,that.conf[configName]);
            if (conf) {
                // in caso di stringa lo considero come il type del render
                if (typeof conf === 'string' || conf instanceof String) {
                    c.type = conf;
                } else {
                    c = this.merge(c, conf);
                }
            }

            c = this.merge(c, (that.metadata[key] || {}));
            //console.log('_defaultWidgetConfig',c);
            return c;
        },
        getFieldName: function (key) {
            return key;
        },
        isHiddenField: function (key) {
            var type = this.defaultWidgetType;
            if (this.fieldsConfig[key]) {
                if (typeof this.fieldsConfig[key] === 'string' || this.fieldsConfig[key] instanceof String)
                    type = this.fieldsConfig[key];
                else
                    type = this.fieldsConfig[key].type ? this.fieldsConfig[key].type : type;

                if (type === 'w-hidden')
                    return true;
            }
            return false;
        },

        /**
         * crea la configurazione iniziale per un widget mergiando le configurazioni della vista
         * con quelle che arrivano dal json o da valori impostati
         * @param key
         * @param modelData
         * @return {{type: Object}}
         * @private
         */
        _createWidgetConfig (key,modelData) {
            var that = this;

            var w = that._defaultWidgetConfig(key);
            w.modelData = modelData;
            if (modelData && (key in modelData))
                w.value = modelData[key];
            w.view = that;
            w.name = that.getFieldName(key);
            if (!('label' in w)) {
                w.label = key;
                // se c'e' un langContext, applico la regola
                if (that.langContext) {
                    w.label = that.translate(key + '.label', that.langContext);
                }
            } else {
                w.label = that.translate(w.label);
            }
            if (!w.template)
                w.template = that.widgetTemplate;
            return w;
            // creo una copia per non far fallire la funzione reactive per gli oggetti con riferimento..
            //return that.merge({},w);
        },

        /**
         * riempe la view con i dati che arrivano dalla chiamata ajax della route
         * attraverso il protocollo definito nella route
         * @param route
         * @param json
         */
        fillData: function (route, json) {
            var that = this;
            if (route) {
                var protocol = that.createProtocol(route.getProtocol());
                protocol.jsonToData(json);
                var prop = Object.getOwnPropertyNames(protocol);
                for (var i in prop) {
                    that[prop[i]] = protocol[prop[i]];
                }
            }
            that.json = json;
        },

    }
}
</script>

<style scoped>

</style>
