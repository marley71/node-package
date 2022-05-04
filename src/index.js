

// ---- nuovi oggetti
import Server from './utility/Server'
import Route from './utility/Routes'
import ProtocolList from './utility/ProtocolList'
import ProtocolRecord from './utility/ProtocolRecord'

//import { crudStore } from './utility/crudStore.js'
import crudVars from './utility/crudVars.js'
import coreMixin from './mixins/coreMixin'
import dialogsMixin from './mixins/dialogsMixin'
import choiceMixin from './mixins/choiceMixin'
import mainMixin from './mixins/choiceMixin'

// -- misc --
import _cComponent from './components/misc/_cComponent.vue'
import _cPaginator from './components/misc/_cPaginator.vue'
import _cWait from './components/misc/_cWait.vue'
// --widgets --
import _wAutocomplete from './components/widgets/_wAutocomplete.vue'
import _wB2Select2 from './components/widgets/_wB2Select2.vue'
import _wB2mSelect2 from './components/widgets/_wB2mSelect2.vue'
import _wBase from './components/widgets/_wBase.vue'
import _wBelongsTo from './components/widgets/_wBelongsTo.vue'
import _wCheckbox from './components/widgets/_wCheckbox.vue'
import _wCustom from './components/widgets/_wCustom.vue'
import _wDatePicker from './components/widgets/_wDatePicker.vue'
import _wDateSelect from './components/widgets/_wDateSelect.vue'
import _wDateText from './components/widgets/_wDateText.vue'
import _wHasmany from './components/widgets/_wHasmany.vue'
import _wHasmanyListed from './components/widgets/_wHasmanyListed.vue'
import _wHidden from './components/widgets/_wHidden.vue'
import _wImage from './components/widgets/_wImage.vue'
import _wInput from './components/widgets/_wInput.vue'
import _wInputHelped from './components/widgets/_wInputHelped.vue'
import _wMap from './components/widgets/_wMap.vue'
import _wMapView from './components/widgets/_wMapView.vue'
import _wPreview from './components/widgets/_wPreview.vue'
import _wRadio from './components/widgets/_wRadio.vue'
import _wSelect from './components/widgets/_wSelect.vue'
import _wStatus from './components/widgets/_wStatus.vue'
import _wSwap from './components/widgets/_wSwap.vue'
import _wText from './components/widgets/_wText.vue'
import _wTextarea from './components/widgets/_wTextarea.vue'
import _wTexthtml from './components/widgets/_wTexthtml.vue'
import _wUpload from './components/widgets/_wUpload.vue'
import _wUploadAjax from './components/widgets/_wUploadAjax.vue'
// --- actions
import _aBase from './components/actions/_aBase.vue'
import _aOrder from './components/actions/_aOrder.vue'
import _aGrouped from './components/actions/_aGrouped.vue'
// --- views --
import _vBase from './components/views/_vBase.vue'
import _vRecord from './components/views/_vRecord.vue'
import _vCollection from './components/views/_vCollection.vue'
import _vList from './components/views/_vList.vue'
import _vListEdit from './components/views/_vListEdit.vue'
import _vEdit from './components/views/_vEdit.vue'
import _vInsert from './components/views/_vInsert.vue'
import _vSearch from './components/views/_vSearch.vue'
import _vView from './components/views/_vView.vue'
import _vHasmany from './components/views/_vHasmany.vue'
import _vAction from './components/views/_vAction.vue'
import _vWidget from './components/views/_vWidget.vue'
// --- app ---
import _cCalendar from './components/app/_cCalendar.vue'
import _cImport from './components/app/_cImport.vue'
import _cManage from './components/app/_cManage.vue'
// --- dialogs -----
import _dBase from './components/dialogs/_dBase.vue'
import _dAlert from './components/dialogs/_dAlert.vue'

//console.log('aaaaaaaaaaaa',crudStore)

export default {

    // nuovi oggetti
    Server,
    Route,
    ProtocolList,
    ProtocolRecord,
    //crudStore,
    crudVars,
    coreMixin, dialogsMixin, choiceMixin,mainMixin,
    _cComponent,_cPaginator,_cWait,
    _wBase,_wInput,_wAutocomplete,_wB2Select2,_wB2mSelect2,_wBelongsTo,_wCheckbox,_wCustom,
    _wDatePicker,_wDateSelect,_wDateText,_wHasmany,_wHasmanyListed,_wHidden,_wImage,_wInputHelped,
    _wMap,_wMapView,_wPreview,_wRadio,_wSelect,_wStatus,_wSwap,_wText,_wTextarea,_wTexthtml,
    _wUpload,_wUploadAjax,
    _aBase,_aOrder,_aGrouped,
    _vBase,_vRecord,_vCollection,_vAction,_vWidget,_vList,_vListEdit,_vEdit,_vInsert,
    _vSearch,_vView,_vHasmany,
    _cCalendar,_cImport,_cManage,
    _dBase,_dAlert,
}





