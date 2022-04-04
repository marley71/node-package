
import crud from "../../../crud";

crud.conf['c-page'] = {}

const cPageMixin = {
    beforeDestroy() {
        if (this.component)
            this.component.$destroy();
    },
    mounted() {
        var that = this;
        if (!that.cPath) {
            if (!crud.env.mainPage) {
                that.jQe('#page_container').html(that.translate('app.pagina-non-trovata'));
                return;
            }
            that.cPath = crud.env.mainPage;
        }
        var id = Math.floor(Math.random()*1000);
        var name = 'page'+id;

        that.createComponent(name,that.cPath,function () {
            var cdef = crud.app.component(name);
            var conf = that.cConf || {};
            var componente = new cdef({
                propsData : { cConf : conf}
            });
            componente.$mount('#page_container' );
            that.component = componente;
        })
    },
    _dynamicData(conf) {
        conf.component = null;
        return conf;
    }

}
export default cPageMixin
