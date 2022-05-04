
<script>
import _wBase from './_wBase.vue'
import moment from "moment-with-locales-es6";
export default {
    name: "_wDateText",
    extends: _wBase,
    data() {
        return {
            displayFormat: 'DD/MM/YYYY',
            dateFormat: 'yyyy-mm-dd',
            formattedValue: null,
            invalidDateString:'app.data-non-valida',
        }
    },
    methods: {
        _ready () {
            var that = this
            var md = moment(that.value);
            if (md.isValid()) {
                that.formattedValue = md.format(that.displayFormat)
            } else {
                that.formattedValue = that.translate(that.invalidDateString) ;
            }

        }
    }
}
</script>

<style scoped>

</style>
