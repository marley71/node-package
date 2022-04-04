import crud from "../../../crud";

crud.conf['d-alert'] = {
    confParent: 'c-component',
}

const dAlertMixin = {
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
export default dAlertMixin
