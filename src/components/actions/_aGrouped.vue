
<script>
import _cComponent from "../misc/_cComponent.vue";
import jQuery from "jquery";

export default {
    name: "_aGrouped",
    extends : _cComponent,
    data() {
        return {
            componentName : 'a-grouped',
            confParent: 'c-component',
            type: null,
            visible: true,
            enabled: true,
            title: '',
            css: '',
            icon: '',
            text: '',
            //controlType: 'button',
            href: '',
            target: '_self',
            needSelection: false,
            view: null,
            actions: [],
            actionsConfig: {},
            alertTime: null // eventuale timer per la visualizzazione di un messaggio in alert 0 chiusura manuale, null valore default , n numero millisecondi che il messaggio deve rimanere

        }
    },
    mounted: function () {
        var that = this;
        //console.log('actions',this.actions);
        var actionsConf = {};
        for (var k in that.actions) {
            var row = that.index
            var aName = that.actions[k];
            var conf = that.store.conf[aName] || {};
            var customConf = that.actionsConfig[aName] || {};

            conf = that.mergeConf(conf);
            conf = that.merge(conf,customConf);
            conf.modelData = this.cloneObj(that.view.value[row]);
            conf.modelName = this.view.modelName;
            conf.index = row;
            conf.cRef = that.getRefId(that._uid, 'ra', row, aName);
            conf.name = aName;
            conf.view = that.view;
            if (!conf.componentName) {
                conf.componentName = 'a-base';
            }
            actionsConf[aName] = conf;
            //that._createActionComponent(aName,conf);
        }
        //console.log('actionsConfig',actionsConf);
        that.actionsConfig = actionsConf;
    },
    computed: {
        _disabled: function () {
            var that = this;
            if (!that.enabled)
                return true;
            if (jQuery.isFunction(that.enabled)) {
                return !that.enabled.apply(that);
            }
            return !that.enabled;
        },
        _visible: function () {
            var that = this;
            if (!that.visible)
                return false;
            if (jQuery.isFunction(that.visible)) {
                return that.visible.apply(that);
            }
            return that.visible;
        }
    },
    methods: {

        setEnabled: function (enable) {
            this.enabled = enable;
        },

        setVisible: function (visible) {
            this.visible = visible;
        }
    }
}
</script>
