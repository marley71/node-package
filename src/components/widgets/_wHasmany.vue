

<script>
import _wBase from './_wBase.vue'

export default {
    name: "_wHasmany",
    extends: _wBase,
    data() {
        return {
            confViews: {},
            limit: 100,
            value: []
        }
    },
    mounted: function () {
        var that = this;
        that.keyCounter = 0; // intero per generare chiave uniche
        //console.log('hasmany',that.value);
        if (that.value && that.value.length > 0) {
            for (var i in that.value) {
                that.value[i].status = 'updated';
                var _conf = that.getHasmanyConf(that.value[i]);
                that.confViews[_conf.cRef] = _conf;
            }
            this.$forceUpdate();
        }
    },

    methods: {

        getHasmanyConf: function (value) {
            var that = this;
            var hmConf = that.hasmanyConf || {};
            var relationConf = that.relationConf || {};
            hmConf = this.mergeConfView({
                fields: [],
                fieldsConfig: {},
                routeName: null,
                value: value,
                metadata: relationConf,
                widgetTemplate: 'tpl-record',
            }, hmConf);
            hmConf.cRef = that.getRefId(that.uid, 'hm', that.keyCounter++);
            //alert(hmConf.cRef)
            if (value && Object.keys(value).length > 0) {
                if (!hmConf.fields || !hmConf.fields.length) {
                    hmConf.fields = Object.keys(value);
                }
            }
            if (!('modelNaname' in hmConf)) {
                hmConf.modelName = that.name;
            }
            return hmConf;

        },
        addItem: function () {
            var that = this;
            //var conf = that.getHasmanyConf(null);
            var value = {
                status: 'new'
            }
            that.value.push(value);
            var _conf = that.getHasmanyConf(value);
            that.confViews[_conf.cRef] = _conf;
            this.$forceUpdate();
        },

        deleteItem: function (refId) {
            var that = this;
            console.log('delete', refId, that.store.cRefs[refId].value)
            var newConfViews = {};
            // per questioni di aggiornamento assegno ad un'altra variabile, altrimenti vue non renderizza come dovuto
            for (var vId in that.confViews) {
                newConfViews[vId] = that.confViews[vId];
            }
            delete newConfViews[refId];
            //that.store.cRefs[refId].unmount();
            console.log('newConfView',newConfViews);
            that.confViews = newConfViews;
            this.$forceUpdate();
        },
        showItem: function (refId) {
            //console.log('show item',index,this.confViews[index]);
            console.log('showItem', refId, this.confViews[refId])
            if (!this.confViews[refId])
                return false;
            return (this.confViews[refId].value.status != 'deleted')
        },
        outOfLimit: function () {
            var that = this;
            var valid = 0;
            for (var k in that.confViews) {
                if (that.confViews[k].value.status != 'deleted')
                    valid++;
            }
            //console.log('outlimit',valid,that.limit);
            return (valid >= that.limit);
        },

        getValue: function () {
            var that = this;
            var value = [];
            for (let k in that.confViews) {
                var vId = this.confViews[k].cRef;
                value.push(that.store.cRefs[vId].getValue());
            }
            return value;
        }
    }
}
</script>

