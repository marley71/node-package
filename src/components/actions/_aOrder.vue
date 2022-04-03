
<script>
import _aBase from './_aBase.vue'
export default {
    name: "_aOrder",
    extends : _aBase,
    data() {
        return {
            componentName : 'a-order',
            confParent: 'a-base',
            type: 'collection',
            title: 'app.order',
            css: '',
            iconSortAsc: '',
            iconSortDesc: '',
            iconSort: '',
            icon: null,
            text: ''
        }
    },
    mounted: function () {
        var direction = this.cConf.orderDirection ? this.cConf.orderDirection.toLowerCase() : null;
        if (direction == 'desc')
            this.icon = this.iconSortDesc;
        else if (direction == 'asc')
            this.icon = this.iconSortAsc
        else
            this.icon = this.iconSort;
        if (this.text) {
            var langKey = (this.view && this.view.langContext) ? this.view.langContext + '.' + this.text : this.text;
            if (this.hasTranslation(langKey + '.label'))
                this.text = this.translate(langKey + '.label')
        }
    },
    methods : {
        execute: function () {
            console.log('order execute', this);
            var that = this;
            if (that.view.route) {

                let order_direction = (!that.orderDirection || that.orderDirection.toLowerCase() == 'desc') ? 'ASC' : 'DESC';
                that.view.route.setParam('order_field',that.orderField);
                that.view.route.setParam('order_direction',order_direction);
                that.view.reload();
            } else {
                let order_direction = (!that.orderDirection || that.orderDirection.toLowerCase() == 'desc') ? 'ASC' : 'DESC';
                that.view.staticOrder(that.orderField, order_direction);
            }

        }
    }
}
</script>
