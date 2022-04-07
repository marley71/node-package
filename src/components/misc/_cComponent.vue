<script>

import coreMixin from "../../mixins/coreMixin";
import dialogsMixin from "../../mixins/dialogsMixin";
import crudStore from '../../utility/crudStore';

export default {
    name: '_cComponent',
    props: ['cConf'],
    mixins: [coreMixin,dialogsMixin],
    created() {
        var that = this;
        //const store = crudStore()
        var conf = this.cConf || {};
        if (this.cConf) {
            if (typeof this.cConf === 'string' || this.cConf instanceof String)
                conf = that.getDescendantProp(that._getModelConfs(),this.cConf);
        }
        //console.log('conf',conf);
        for (var k in conf) {
            if (['methods','computed'].indexOf(k) >= 0)
                continue;
            this[k] = conf[k];
        }
        var methods = conf.methods || {};
        for (var k in methods) {
            this[k] = methods[k];
        }
        if (conf.cRef) {
            that.store.cRefs[conf.cRef] = this;
        }
        // var computed = conf.computed || {};
        // for (var k in computed) {
        //     this[k] = computed[k];
        // }
        //console.log('thisssss',this);
    },
    mounted() {
        var that = this;
        console.log('LOADRESOURCES',that.resources)
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
        const store = crudStore()
        return {
            resourcesLoaded: false,
            store : store,
            _uid : this._getNewUid(),
            resources: [],
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
            if (selector) {
                return window.jQuery(that.$el).find(selector).addBack(selector);
            }
            return window.jQuery(that.$el);
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
            const store = crudStore()
            store.uniqueId++;
            return store.uniqueId;
        },

        _getModelConfs() {
            return this.store.app.config.globalProperties.$modelConfs;
        }
    }
}
</script>
