
<script>
import _cComponent from "../misc/_cComponent.vue";
export default {
    name: "_dAlert",
    extends : _cComponent,
    methods : {
        show : function () {
            var that = this;
            window.jQuery(that.jQe()).popover('show');
            if (that.cTime !== 0) {
                setTimeout(function() {
                    that.hide();
                }, that.cTime);
            }
        },
        hide : function () {
            var that = this;
            window.jQuery(that.jQe()).popover('hide');
            window.jQuery(that.jQe()).remove();
            //that.visible = false;
        },
    }
}
</script>
