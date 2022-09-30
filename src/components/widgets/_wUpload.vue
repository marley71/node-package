
<script>
import _wBase from './_wBase.vue'
import jQuery from "jquery";
export default {
    name: "_wUpload",
    extends: _wBase,
    data() {
        return {
            maxFileSize: '',
            error: false,
            errorMessage: '',
            extensions: []
        }
    },
    methods: {
        getValue: function () {
            var that = this;
            console.log('filedesc', jQuery(that.$el).find('[c-file]').prop('files'));
            var fileDesc = jQuery(that.$el).find('[c-file]').prop('files');
            if (fileDesc.length) {
                return fileDesc[0];
            }
            return null;
        },
        _validate: function () {
            return true;
        },
        validate: function () {
            var that = this
            // TODO eseguire validazione
            console.log('validate', that.getValue())
            that.change();
            if (that._validate()) {
                that.$emit('success', that)
            } else
                that.$emit('error', that)
        }
    }
}
</script>
