
<script>
import _wBase from './_wBase.vue'
export default {
    name: "_wBelongsTo",
    extends:_wBase,
    data() {
        return {
            labelFields: ['text']
        }
    },
    methods: {
        getFieldName: function () {
            return this.name + '[]'
        }
    }
}
</script>

<style scoped>

</style>
