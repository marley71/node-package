import crud from "../../../crud";
import Server from "../../../Server222";

crud.conf['v-insert'] = {
    confParent: 'v-record',
    beforeForm: null,
    beforeActions: null,
    primaryKey: 'id',
    routeName: 'insert',
    widgetTemplate: 'tpl-record',
    actions: ['action-save', 'action-back'],
    actionsConfig: {},
    fieldsConfig: {
        id: 'w-hidden'
    },
    fields: []
}

const vInsertMixin = {
    methods: {
        setRouteValues: function (route) {
            var that = this
            if (route) {
                route.setValues({
                    modelName: that.modelName
                })
            }
            return route
        },
        save(callback) {
            var that = this;
            var route = that.createRoute('create');
            route.setValues({
                modelName: that.modelName,
            });
            route.setParams(that.getViewData());
            Server.route(route, function (json) {
                callback(json);
            })
        }
    }
}
export default vInsertMixin
