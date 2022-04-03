
<script>
import _vRecord from "./_vRecord.vue"
import Server from "../../utility/Server";
export default {
    name: "_vEdit",
    extends: _vRecord,
    data() {
        return {
            confParent: 'v-record',
            beforeForm: null,
            beforeActions: null,
            primaryKey: 'id',
            routeName: 'edit',
            widgetTemplate: 'tpl-record',
            actions: ['action-save', 'action-back'],
            actionsConfig: {},
            fieldsConfig: {
                id: 'w-hidden'
            },
            fields: []
        }
    },
    methods: {
        setRouteValues: function (route) {
            var that = this
            if (route) {
                route.setValues({
                    modelName: that.modelName,
                    pk: that.pk
                })
            }
            return route
        },
        save(callback) {
            var that = this;
            var route = that.createRoute('update');
            var pk = that.cPk || that.pk || 0;
            route.setValues({
                modelName: that.modelName,
                pk : pk
            });
            route.setParams(that.getViewData());
            Server.route(route, function (json) {
                callback(json);
            })
        }
    }
}
</script>

