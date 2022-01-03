import Server from '../../../Server'
import crud from "../../../crud";

crud.conf['w-b2-select2'] = {
    labelFields: [],
    resources: [
        'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.12/css/select2.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.12/js/select2.min.js'
    ],
    routeName: 'autocomplete',
    route: null,
    primaryKey: 'id',
    allowClear: true,
    data: null, // eventuali dati statici
    json:null
}

const wB2Select2Mixin = {
    methods: {

        afterLoadResources: function () {
            var that = this;
            console.log('afterLoadResources')
            if (that.routeName === null) {  // caso di valori statici
                that._initSelectStatic();
            } else {
                that._initSelectAjax();
            }
            that._connectEvents();
        },

        _connectEvents: function () {
            var that = this;
            that.jQe('[c-select2]').on('select2:select', function (e) {
                that.change(e);
            });
        },

        getLabel: function (value) {
            var that = this;
            var label = "";
            if (that.labelFields.length > 0) {
                for (var i in that.labelFields) {
                    label += value[that.labelFields[i]] + " ";
                }
            } else {
                label = value[that.primaryKey];
            }

            return label;
        },
        getValue: function () {
            var that = this;
            console.log('b2 getValue')
            var selValue = that.jQe('[c-select2]').select2('data');
            //console.log('selvalue', selValue);
            return selValue.length > 0 ? selValue[0].id : null;

        },
        setRouteValues: function (route) {
            var that = this;
            route.setValues({foormName: that.foormName, viewType: that.viewType});
            return route;
            // -- standard
            route.setValues({modelName: this.modelName});
            return route;
        },
        reset: function () {
            if (this.defaultValue)
                this.value = this.defaultValue;
            else
                this.value = null;
        },

        /**
         * inizializzazione select con dati statici
         * @private
         */
        _initSelectStatic: function () {
            var that = this;
            var data = that._getDataValues();
            console.log('_initSelectStatic DATA',data);
            that.jQe('[c-select2]').select2({
                data: data,
                placeholder: that.translate(that.placeholder ? that.placeholder : 'app.seleziona'),
                allowClear: that.allowClear,
                theme: that.theme,
            });
        },
        /**
         * inizializzazione select ajax, in caso contenta un valore gia' selezionato,
         * allora staticamenti la property data deve avere un item simile alla risposta json e deve
         * avere come primary key uguale alla property value.
         * @private
         */
        _initSelectAjax: function () {
            var that = this;
            var data = that._getDataValues();
            console.log('_initSelectAjax DATA',data);
            that.jQe('[c-select2]').select2({
                data: data,
                ajax: that._getAjaxConf(),
                placeholder: that.translate(that.placeholder ? that.placeholder : 'app.seleziona'),
                allowClear: that.allowClear,
                theme: that.theme,
            });
        },
        /**
         * configurazione ajax per la gestione dei risultati
         * @return {{headers: *, delay: number, method: string, data: (function(*): {field: core-w-b2-select2.methods.name, value: *}), dataType: string, processResults: (function(*): {results: []}), url: *}}
         * @private
         */
        _getAjaxConf: function () {
            var that = this;
            that.route = that._getRoute();
            that.setRouteValues(that.route);
            var url = that.route.getUrl();
            var ajax = {
                url: url,
                method: that.route.getMethod(),
                headers: Server.getHearders(),
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        value: params.term,
                        field: that.name,
                    }
                },
                processResults: function (json) {
                    // Tranforms the top-level key of the response object from 'items' to 'results'
                    that.json = json;
                    var items = [];
                    for (var i in json.result) {
                        items.push({
                            id: json.result[i][that.primaryKey],
                            text: that.getLabel(json.result[i]),
                            record: json.result[i]
                        });
                    }
                    //console.log(that.primaryKey,'items',items);
                    return {
                        results: items
                    };
                },
            };
            return ajax;
        },

        /**
         * ritorna e aggiusta i dati statici con eventuali valori gia' selezionati.
         * @private
         */
        _getDataValues: function () {
            var that = this;
            if (that.data === null && that.value) {
                console.log('select statica ma senza valori presenti in data');
                return [];
            }
            var data = that.data || [];
            // trasformo il valore con i labelFields per coerenza con la parte ajax
            for (var i in data) {
                data[i].id = data[i][that.primaryKey];
                data[i].text = that.getLabel(that.data[i]);
                if (data[i][that.primaryKey] == that.value) {
                    data[i].selected = true;
                }
            }
            return data;
        }
    }
}
export default wB2Select2Mixin
