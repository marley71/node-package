const vActionMixin = {
    props: ['cAction'],
    data() {
        var that = this
        // console.log('CA');
        // return {
        //     componentName : 'a-base',
        //     cConf : {},
        //     name : 'action-none'
        // }
        var ca = that.cAction || {};

        var aData = {
            componentName : ca.componentName || 'a-base',
            cConf : ca, //that.merge({},ca),
            name : ca.name || 'action-none'
        }
        return aData;


        // ca = window.jQuery.extend({
        //     componentName : 'a-base',
        //     cConf : {},
        //     name : 'action-none'
        // },ca);
        // return ca;

        // var aConf = {
        //     componentName : 'a-base',
        //     cConf : {},
        //     name : 'action-none'
        // }
        // if (that.cAction) {
        //     aConf = {
        //         componentName : that.cAction.componentName,
        //         cConf: that.cAction,
        //         name: that.cAction.name,
        //     }
        //     // aConf = {
        //     //     name: that.cAction.name,
        //     //     conf: that.cAction,
        //     //     componentName : that.cAction.componentName
        //     // }
        // } else {
        //     console.warn('configurazione azione non valida', this.cAction)
        // }
        // console.log('aConf',aConf);
        // return aConf
    }
}
export default vActionMixin
