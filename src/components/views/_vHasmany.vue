
<script>
import _vRecord from "./_vRecord.vue"

export default {
    name: "_vHasmany",
    extends: _vRecord,
    data() {
        return {
            confParent: 'v-record',
            defaultWidgetType: 'w-input',
            widgetTemplate: {
                name: 'tpl-base',
                layoutType: 'full'
            },
        }
    },
    methods: {
        setRouteValues: function (route) {
            // non setto nessuna route.
            return route
        },
        getFieldName: function (key) {
            var that = this
            return that.modelName + '-' + key + '[]'
        },
        getValue: function () {
            var that = this
            var value = {}
            for (var k in that.widgets) {
                value[k] = that.getWidget(k).getValue()
            }
            return value
        }
    }
}
</script>
