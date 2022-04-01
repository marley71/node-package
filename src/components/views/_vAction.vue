<script>
export default {
    name: "_vAction",
    props: ['cAction'],
    data() {
        var that = this
        var ca = that.cAction || {};
        var aData = {
            componentName : ca.componentName || 'a-base',
            cConf : ca, //that.merge({},ca),
            name : ca.name || 'action-none'
        }
        return aData;
    }
}
</script>
