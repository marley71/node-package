

<script>
import _wBase from './_wBase.vue'
export default {
    name: "_wTexthtml",
    extends: _wBase,
    data() {
        return {
            editor: null, // puntatore all'editor html
            resources: [
                'https://cdn.ckeditor.com/ckeditor5/24.0.0/classic/ckeditor.js'
            ]
        }
    },
    methods: {
        afterLoadResources () {
            var that = this
            window.ClassicEditor
                .create(document.querySelector('.summernote'))
                .then(editor => {
                    console.log(editor)
                    that.editor = editor
                    that.editor.model.document.on('change:data', () => {
                        console.log('The data has changed!')
                        that.jQe('[c-summernote]').val(that.editor.getData())
                    })
                })
                .catch(error => {
                    console.error(error)
                })
        },
        getValue: function () {
            var that = this
            return that.editor.getData()
        },
        setValue: function (text) {
            this.editor.setData(text)
            this.jQe('[c-summernote]').val(text)
        }
    }
}
</script>
