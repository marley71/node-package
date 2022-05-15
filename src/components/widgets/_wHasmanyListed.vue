
<script>
import _wBase from './_wBase.vue'

export default {
    name: "_wHasmanyListed",
    extends: _wBase,
    data() {
        let viewRef = this.getRefId((new Date().getTime()), 'hm', 'list');
        return {
            limit: 100,
            value: [],
            bgClass: 'bg-warning-soft',
            viewRef : viewRef,
            hasmanyConf: {},
        }
    },
    methods: {

        getHasmanyConf: function () {
            var that = this;
            var hmConf = that.hasmanyConf || {};
            var relationConf = that.relationConf || {};
            hmConf.metadata = relationConf;
            hmConf.defaultWidgetType = hmConf.defaultWidgetType || 'w-input';
            hmConf.actionsConfig = hmConf.actionsConfig || {};
            hmConf.fields = hmConf.fields || [];
            hmConf.fieldsConfig = hmConf.fieldsConfig || {};
            // aggiungo lo status in automatico
            if (that.value && that.value.length > 0) {
                for (var i in that.value) {
                    that.value[i].status = 'updated';
                }
            }

            // controllo le azioni se non ci sono inserisco le default
            if (!hmConf.actions) {
                hmConf.actions = ['action-insert','action-delete'];
            }
            if (hmConf.fields.indexOf('status') < 0) {
                hmConf.fields.push('status');
            }
            hmConf.fieldsConfig.status = 'w-hidden';
            // forzo alcune cose che non possono essere definite dall'utente in configurazione
            hmConf.routeName = null;
            hmConf.value = that.value;
            if (!hmConf.modelName)
                hmConf.modelName = that.name;
            if (hmConf.actions.indexOf('action-insert') >= 0) {
                var aiConf = hmConf.actionsConfig['action-insert'] || {};
                aiConf.execute = function () {
                    //this.view.value.push({});
                    that.addItem();
                    this.view.reload();
                }
                hmConf.actionsConfig['action-insert'] = aiConf;
            }
            if (hmConf.actions.indexOf('action-delete') >= 0) {
                var adConf = hmConf.actionsConfig['action-delete'] || {};
                adConf.execute = function () {
                    that.deleteItem(this.index,1);
                    this.view.reload();
                }
                hmConf.actionsConfig['action-delete'] = adConf;
            }
            var methods = hmConf.methods || {};
            methods.getFieldName = function (key) {
                return hmConf.modelName + '-' + key + '[]';
            }
            hmConf.methods = methods;



            hmConf.cRef = that.viewRef;
            //alert(hmConf.cRef)
            if (that.value && Object.keys(that.value).length > 0) {
                if (!hmConf.fields || !hmConf.fields.length) {
                    hmConf.fields = Object.keys(that.value);
                }
            }
            return hmConf;

        },
        addItem: function () {
            var that = this;
            var istanceView = that.getComponent(that.viewRef);
            console.log('viewRef',that.viewRef,that.$refs,istanceView)
            var values = istanceView.getViewData();
            var value = {
                status: 'new'
            }
            values.push(value)
            istanceView.value = values;
        },

        deleteItem: function (index) {
            var that = this;
            var istanceView = that.getComponent(that.viewRef);
            var values = istanceView.getViewData();
            values.splice(index,1);
            istanceView.value = values;
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
