import crud from "../../../crud";
import moment from "moment-with-locales-es6";

crud.conf['w-date-text'] = {
    displayFormat: 'DD/MM/YYYY',
    dateFormat: 'yyyy-mm-dd',
    formattedValue: null,
    invalidDateString:'app.data-non-valida',
}

const wDateTextMixin = {
    methods: {
        _ready () {
            var that = this
            var md = moment(that.value);
            if (md.isValid()) {
                that.formattedValue = md.format(that.displayFormat)
            } else {
                that.formattedValue = that.translate(that.invalidDateString) ;
            }

        }
    }
}
export default wDateTextMixin
