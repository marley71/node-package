<script>

import coreMixin from "../../mixins/coreMixin";
import dialogsMixin from "../../mixins/dialogsMixin";
import crudVars from '../../utility/crudVars';
import Server from '../../utility/Server'

export default {
    name: '_cComponent',
    props: ['cConf'],
    mixins: [coreMixin,dialogsMixin],
    inject: ['store'],
    created() {
        var that = this;
        var store = crudVars;
        console.log('_cComponent store',store);
        var conf = that._getConf() || {};
        console.log('_cComponent conf',conf);

        for (let k in conf) {
            if (['methods','computed'].indexOf(k) >= 0)
                continue;
            this[k] = conf[k];
        }
        var methods = conf.methods || {};
        for (let k in methods) {
            this[k] = methods[k];
            //console.log('methods',k,methods[k].toString())
        }
        if (conf.cRef) {
            store.cRefs[conf.cRef] = this;
        }
        that.Server = Server;
        // var computed = conf.computed || {};
        // for (var k in computed) {
        //     this[k] = computed[k];
        // }
        //console.log('thisssss',this);
    },
    mounted() {
        var that = this;
        //console.log('LOADRESOURCES',that.resources)
        if (that.resources && that.resources.length) {
            that.beforeLoadResources();
            that.loadResources(that.resources,function () {
                that.resourcesLoaded = true;
                that.afterLoadResources();
                // serve per rilasciare il controllo in modo che vue scriva l'html nel container.
                setTimeout(function () {
                    that._ready();
                    that.ready();
                },5);
            })
        } else {
            that.resourcesLoaded = true;
            setTimeout(function () {
                that._ready();
                that.ready();
            },5);
        }
    },
    data() {
        // TODO si dovrebbe usare lo store dell'app
        var store = crudVars;
        return {
            resourcesLoaded: false,
            uid : this._getNewUid(),
            resources: [],
            store : store,
        }
    },
    methods: {
        /**
         * wrapper jQuery che lavora nel template del componenente
         * @param selector
         * @return {*}
         */
        jQe(selector) {
            var that = this;
            console.log('jQe',that.$refs,that.$refs.el)
            if (selector) {
                return window.jQuery(that.$refs.el).find(selector).addBack(selector);
            }
            return window.jQuery(that.$refs.el);
        },
        beforeLoadResources : function () {
            //console.log('cComponent.beforeLoadResources')
        },
        afterLoadResources : function () {
            //console.log('cComponent.afterLoadResources');
        },

        _ready() {
            // methodo per il ready del core dell'oggetto
        },

        ready() {
            // methodo per il ready del dell'oggetto per codice di customizzazione
        },

        _getNewUid() {
            var store = crudVars;
            store.uniqueId++;
            console.log('uniqueId',store.uniqueId);
            return store.uniqueId;
        },

        _getModelConfs() {
            var store = crudVars;
            return store.modelConfs;
        },

        _getConf() {
            var that = this;
            var conf = that.cConf || {};
            if (that.cConf) {
                if (typeof that.cConf === 'string' || that.cConf instanceof String) {
                    console.log('_cComponent',that.cConf,that._getModelConfs())
                    conf = that.getDescendantProp(that._getModelConfs(), that.cConf);
                }
            }
            return conf;
        }
    }
}
</script>
