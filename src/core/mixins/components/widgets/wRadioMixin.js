import crud from "../../../crud";

crud.conf['w-radio'] = {
    domainValues: {},
    domainValuesOrder: [],
    inline: false,
}

const wRadioMixin = {
    methods: {
        getFieldName: function () {
            return this.name;
        }
    }
}
export default wRadioMixin
