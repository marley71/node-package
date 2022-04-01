
<script>
import _vRecord from './_vRecord.vue'
export default {
    name: "_vView",
    extends : _vRecord,
    data() {
        return {
            confParent: 'v-record',
            defaultWidgetType: 'w-text',
            beforeActions: null,
            primaryKey: 'id',
            routeName: 'view',
            fieldsConfig: {},
            actions: [],
            actionsConfig: {},

        }
    },
    methods: {
        setRouteValues: function (route) {
            var that = this
            if (route) {
                console.assert(that.modelName,{modelName:that.modelName,errorMsg:'invalid modelName'});
                console.assert(that.pk,{pk:that.pk,errorMsg:'invalid pk'});
                route.setValues({
                    modelName: that.modelName,
                    pk: that.pk
                })
            }
            return route
        }
    }
}
</script>

<style scoped>

</style>
