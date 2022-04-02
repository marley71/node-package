
<script>
import _wBase from './_wBase.vue'
import choiceMixin from '../../mixins/choiceMixin'
export default {
    name: "_wCheckbox",
    extends : _wBase,
    mixins : [choiceMixin],
    data() {
        return {
            inline: true,
            domainValues: {},
            domainValuesOrder: [],
            value: []
        }
    }
}
</script>
