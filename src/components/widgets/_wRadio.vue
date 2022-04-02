
<script>
import _wBase from './_wBase.vue'
import choiceMixin from '../../mixins/choiceMixin'
export default {
    name: "_wRadio",
    extends : _wBase,
    mixins: [choiceMixin],
    data() {
        return {
            domainValues: {},
            domainValuesOrder: [],
        }
    },
    methods: {
        getFieldName: function () {
            return this.name;
        }
    }
}
</script>
