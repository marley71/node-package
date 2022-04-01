<script>
import _wBase from './_wBase.vue'

export default {
    name: "_wInput",
    extends : _wBase,
    data() {
      return {
          inputType: 'text',
          placeholder: ''
      }
    },
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

<style scoped>

</style>


