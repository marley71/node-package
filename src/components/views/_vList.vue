
<script>
import _vCollection from "./_vCollection.vue"
import jQuery from "jquery";

export default {
    name: "_vList",
    extends: _vCollection,
    data() {
        return {
            confParent: 'v-collection',
            headerClass: null,
            widgets: {},
            keys: [],
            route: null,
            pagination: {},
            defaultWidgetType: 'w-text',
            json: {},
            primaryKey: 'id',
            routeName: 'list',
            actionsConfig: {},
            fieldsConfig: {},
            orderFields: {},
            widgetTemplate: 'tpl-list',
            actions: ['action-insert', 'action-delete-selected', 'action-view', 'action-edit', 'action-delete'],
            helpText: '',
            hasFooter: true,
            //template:'default',  // default,inner
        }
    },
    methods: {

        isOrderField: function (key) {
            var that = this;
            if (that.orderFields[key])
                return true;
            return false;
        },

        getOrderConf: function (key) {
            var that = this;
            var widgetsRow = that.widgets[0];
            var conf = that.getActionConfig('a-order');
            conf.title = that.translate('app.ordina') + ' ' + widgetsRow[key].label; //that.translate(translateKey);
            conf.text = widgetsRow[key].label;
            conf.orderField = that.orderFields[key] ? that.orderFields[key] : key;
            //if (that.data.order_field)
            var order = that.metadata.order || {};
            //console.log('GETORDERCONF CALLED',key,order);
            conf.orderDirection = (order.field == conf.orderField) ? order.direction : null;
            conf.view = that;
            //console.log('order',conf);
            return conf;
        },
        selectAllRows: function () {
            var that = this;
            var sel = that.jQe('[c-row-check-all]').prop('checked');
            that.jQe('[c-row-check]').prop('checked', sel);
        },
        selectedRows: function () {
            var that = this;
            var sel = [];
            that.jQe('[c-row-check]').each(function () {
                if (jQuery(this).prop('checked')) {
                    sel.push(jQuery(this).val())
                }
            });
            console.log(that.jQe('[c-row-check]').length,'select3ed',sel);
            return sel;
        },
        setRouteValues: function (route) {
            var that = this;
            if (route) {
                route.setValues({
                    modelName: that.modelName
                });
                console.log('setRouteValues', that);
                if (that.routeConf) {
                    var _conf = that._loadRouteConf() || {};
                    console.log('routeConf params', _conf);
                    var params = route.getParams();
                    var p2 = _conf.params || {};
                    for (var k in p2) {
                        params[k] = p2[k];
                    }
                    route.setParams(params);
                }
            }
            return route;
        }
    }

}
</script>
