
<script>
import _wBase from './_wBase.vue'
import choiceMixin from '../../mixins/choiceMixin'
export default {
    name: "_wInputHelped",
    extends : _wBase,
    mixins: [choiceMixin],
    data() {
        return {
            domainValues: {},
            domainValuesOrder: [],
            customValue: false
        }
    },
    methods: {
        getFieldName() {
            return this.name
        }
    }
}
</script>
