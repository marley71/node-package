

<script>
import _wBase from './_wBase.vue'
export default {
    name: "_wHidden",
    extends: _wBase,
    methods : {
        getValue() {
            return this.jQe('input').val();
        },
        setValue(value) {
            this.value = value;
            this.jQe('input').val(value);
        }
    }
}
</script>

