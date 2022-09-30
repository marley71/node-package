
<script>
import _wBase from './_wBase.vue'
import choiceMixin from '../../mixins/choiceMixin'
export default {
    name: "_wStatus",
    extends : _wBase,
    mixins: [choiceMixin],
    data() {
        return {
            iconClass: 'fa fa-circle',
            title: 'status',
            statusType: 'text',
            defaultDomainValues: {
                icon: {
                    0: 'fa fa-circle text-red-500',
                    1: 'fa fa-circle text-green-500'
                },
                text: {
                    0: 'app.no',
                    1: 'app.si'
                }
            },
            domainValues: {
                0: 'fa fa-circle text-red-500',
                1: 'fa fa-circle text-green-500'
            },
            domainValuesOrder : [],
        }
    }
}
</script>
