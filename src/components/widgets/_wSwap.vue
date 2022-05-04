
<script>
import _wBase from './_wBase.vue'
import Server from "../../utility/Server";
export default {
    name: "_wSwap",
    extends : _wBase,
    data() {
        return {
            activeIcon: 'fa-check',
            routeName: 'set',
            title: 'swap',
            bgInactive: '#FF0000',
            bgActive: 'bg-red-400',
            domainValues: {
                0: 'app.no',
                1: 'app.si'
            },
            slot: '',
            toggleActive: false,
            switchClass: 'form-switch-success',
            dataSwitched: false,
            isAjax:true,  // se e' un controllo che deve fare la chiamata di update altrimenti e' un controllo normale in una form
            json : null, // ultimo json caricato dalla chiamata ajax,
            currentIndex : 0,  // indice corrente delle chiavi di domainValues
        }
    },
    methods: {
        _ready() {
            var that = this;
            var keys = Object.keys(that.domainValues);
            that.currentIndex = keys.indexOf(''+that.value);
            that.toggleActive = that.currentIndex?true:false;
            //console.log('index e toggle ',that.currentIndex,that.toggleActive,keys,that.value,that.domainValues);
        },
        setRouteValues: function (route) {
            var that = this;
            route.setValues({
                modelName: that.modelName,
            });
            route.setParams({
                id: that.modelData.id,
                field: that.name,
                value: that._getNext()
            });
            return route;
        },
        _swap: function () {
            var that = this;
            if (that.isAjax) {
                var r = that._getRoute();
                that.setRouteValues(r);
                that.waitStart()
                Server.route(r, function (json) {
                    that.waitEnd();
                    that.json = json;
                    if (json.error) {
                        that.errorDialog(json.msg);
                        return;
                    }


                    var keys = Object.keys(that.domainValues);
                    that.value = keys[that.currentIndex];
                    that.slot = that.domainValues[keys[that.currentIndex]];
                    that.toggleActive = that.currentIndex?true:false;
                    //console.log('value',that.value,'index',that.currentIndex);
                    that.change();
                })
            } else {
                that.value = that._getNext();
                var keys = Object.keys(that.domainValues);
                that.slot = that.domainValues[keys[that.currentIndex]];
                that.toggleActive = that.currentIndex?true:false;
                //console.log('value',that.value,'index',that.currentIndex);
                that.change();
            }

        },
        swap(event) {
            var that = this;
            console.log('event',event)
            event.preventDefault();
            that._swap();
        },
        /**
         * sposta l'indice di uno e restituisce il valore successivo
         * @private
         */
        _getNext() {
            var that = this;
            var keys = Object.keys(that.domainValues);
            var newIndex = (that.currentIndex + 1) % keys.length;
            //console.log('_getNext','value',keys[newIndex], 'index', newIndex);
            that.currentIndex = newIndex;
            return keys[newIndex];
        },
    }
}
</script>
