
<script>
import _wBase from './_wBase.vue'
export default {
    name: "_wPreview",
    extends : _wBase,
    data() {
        return {
            icon: false,
            iconClass: '',
            iconSize:'fa fa-2x',
            value: {},
            mimetypes: {
                // associazione mimetype del file con icona da visualizzare
                icons: {
                    'default': 'fa fa-file',
                    'application/xls': 'fa fa-file-excel',
                    'xlsx': 'fa fa-file-excel',
                    'application/vnd.ms-excel': 'fa fa-file-excel',
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'fa fa-file-excel',
                    'zip': 'fa fa-file-archive',
                    'mp3': 'fa fa-file-audio',
                    'image/jpeg': 'fa fa-file-image',
                    'application/pdf': 'fa fa-file-pdf',
                    'txt': 'fa fa-file-alt',
                    'text/plain': 'fa fa-file-alt',
                    'text/csv': 'fa fa-file-csv'
                },
                // associazione mimetype del file con il tipo upload documento
                docType: [
                    'application/vnd.ms-excel',
                    'application/xls',
                    'xlsx',
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'zip',
                    'mp3',
                    'application/pdf',
                    'txt',
                    'text/csv',
                    'text/plain'
                ],
                // associazione mimetype del file con il tipo upload image
                imageType: [
                    'image/jpeg',
                    'image/png'
                ]
            },
            currentMimetype : null,
        }
    },
    mounted() {
        this.setProps();
    },
    methods: {
        setProps: function () {
            var that = this
            if (!that.value.mimetype) {
                console.warn('mimetype not found ' + that.value.mimetype)
                return null
            }
            if (that.mimetypes.docType.indexOf(that.value.mimetype) >= 0) {
                that.icon = true
                that.iconClass = that.mimetypes.icons['default']
                if (that.mimetypes.icons[that.value.mimetype]) {
                    that.iconClass = that.mimetypes.icons[that.value.mimetype]
                }
                that.currentMimetype = 'doc';

                //return 'doc'
            } else if (that.mimetypes.imageType.indexOf(that.value.mimetype) >= 0) {
                //return 'image'
                that.currentMimetype = 'image';
            } else {
                console.warn('mimetype invalid ' + that.value.mimetype)
                that.currentMimetype = that.value.mimetype;
            }
            //return null
        },
        setValue(value) {
            //console.log('wPreview.SetValue',value);
            this.value = value;
            this.setProps();
        }
    },

}
</script>

