<script>
import _cComponent from "../misc/_cComponent.vue";

export default {
    name : '_wBase',
    extends : _cComponent,
    data() {
        return {
            confParent: 'c-component',
            name: null,
            value: null,
            defaultValue: null,
            label: null,
            view: null,         // riferimento alla view,
            required: false,
            placeholder : '',
        }
    },
    methods : {
        getFieldName: function () {
            var that = this;
            return that.name;
        },

        getValue : function() {
            return this.value;
        },
        setValue : function(value) {
            this.value = value;
        },
        reset : function() {
            //console.log('defaultValue',this.defaultValue)
            this.value = this.defaultValue;
        },
        //events
        change : function () {
            var that = this;
            //console.log('Wbase change',that);
            var methods = that.methods || {};
            if (methods.change) {
                methods.change.apply(that);
            }
        },
        updateConf : function (conf) {
            this.conf = conf;
        },
    }
}
</script>
