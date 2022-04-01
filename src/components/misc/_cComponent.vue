<script>
// import Route from '../../../Routes'
// import crud from "../../../crud";
// import Server from "../../../Server";
import coreMixin from "../../mixins/coreMixin";
import dialogsMixin from "../../mixins/dialogsMixin";

export default {
    name: '_cComponent',
    props: ['cConf'],
    mixins: [coreMixin,dialogsMixin],
    created() {
        var conf = this.cConf || {};
        if (this.cConf) {
            if (typeof this.cConf === 'string' || this.cConf instanceof String)
                conf = window[this.cConf];
        }
        console.log('conf',conf);
        for (var k in conf) {
            if (['methods','computed'].indexOf(k) >= 0)
                continue;
            this[k] = conf[k];
        }
        var methods = conf.methods || {};
        for (var k in methods) {
            this[k] = methods[k];
        }
        // var computed = conf.computed || {};
        // for (var k in computed) {
        //     this[k] = computed[k];
        // }
        //console.log('thisssss',this);
    },
    mounted() {
        var that = this;
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
        return {
            resourcesLoaded: false
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

        /**
         * istanzia l'oggetto route definito da routeName nella configurazione altrimenti ritorna null
         * @param routeName : nome della route se null la prende dalla proprieta routeName del componente
         * @return {null}
         * @private
         */
        _getRoute : function (routeName) {
            var that = this;
            if (that.route)
                return that.route;
            var rn = routeName?routeName:that.routeName;
            if (!rn)
                return null;
            return that.createRoute(rn);
            // if (!crud.routes[rn])
            //     throw "Impossibile trovare la route " + rn;
            // //console.log('routeName',rn,crud.routes[rn])
            // return new Route(crud.routes[rn]);
        },
    }
}
</script>
