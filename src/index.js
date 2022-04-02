// import { defineStore } from 'pinia'
// const crudStore = defineStore('crudStore', {
//     state : () => ({
//         prop1 : 'propsss'
//     })
// })



import crud from './core/crud'

//import coreMixin from './core/mixins/coreMixin'
//import dialogsMixin from './core/mixins/dialogsMixin'
import mainMixin from './core/mixins/mainMixin'
//import choiceMixin from './core/mixins/choiceMixin'

//import aBaseMixin from './core/mixins/components/actions/aBaseMixin'
import aGroupedMixin from './core/mixins/components/actions/aGroupedMixin'
import aOrderMixin from './core/mixins/components/actions/aOrderMixin'

import cCalendarMixin from './core/mixins/components/app/cCalendarMixin'
import cImportMixin from './core/mixins/components/app/cImportMixin'
import cManageMixin from './core/mixins/components/app/cManageMixin'
import cPageMixin from './core/mixins/components/app/cPageMixin'

import dAlertMixin from './core/mixins/components/dialogs/dAlertMixin'
import dBaseMixin from './core/mixins/components/dialogs/dBaseMixin'

import cComponentMixin from './core/mixins/components/misc/cComponentMixin'
import cPaginatorMixin from './core/mixins/components/misc/cPaginatorMixin'
import cWaitMixin from './core/mixins/components/misc/cWaitMixin'

// --- views ---
import vActionMixin from './core/mixins/components/views/vActionMixin'
import vWidgetMixin from './core/mixins/components/views/vWidgetMixin'
import vBaseMixin from './core/mixins/components/views/vBaseMixin'
import vCollectionMixin from './core/mixins/components/views/vCollectionMixin'
import vRecordMixin from './core/mixins/components/views/vRecordMixin'
import vListMixin from './core/mixins/components/views/vListMixin'
import vListEditMixin from './core/mixins/components/views/vListEditMixin'
import vEditMixin from './core/mixins/components/views/vEditMixin'
import vInsertMixin from './core/mixins/components/views/vInsertMixin'
import vViewMixin from './core/mixins/components/views/vViewMixin'
import vSearchMixin from './core/mixins/components/views/vSearchMixin'
import vHasmanyMixin from './core/mixins/components/views/vHasmanyMixin'


import Server from './core/Server'
import Route from './core/Routes'
import ProtocolList from './core/ProtocolList'
import ProtocolRecord from './core/ProtocolRecord'


// ---- nuovi oggetti

import crudStore from './utility/crudStore'
import coreMixin from './mixins/coreMixin'
import dialogsMixin from './mixins/dialogsMixin'
import choiceMixin from './mixins/choiceMixin'

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
// --- views --
import _vBase from './components/views/_vBase.vue'
import _vRecord from './components/views/_vRecord.vue'
import _vCollection from './components/views/_vCollection.vue'
import _vList from './components/views/_vList.vue'
import _vView from './components/views/_vView.vue'
import _vAction from './components/views/_vAction.vue'
import _vWidget from './components/views/_vWidget.vue'

export default {
    crud,
    //coreMixin,
    //dialogsMixin,
    mainMixin,
    //choiceMixin,
    //aBaseMixin,
    aGroupedMixin,
    aOrderMixin,
    cCalendarMixin,
    cImportMixin,
    cManageMixin,
    cPageMixin,
    dAlertMixin,
    dBaseMixin,
    cComponentMixin,
    cPaginatorMixin,
    cWaitMixin,
    vActionMixin,
    vWidgetMixin,
    vBaseMixin,
    vRecordMixin,
    vCollectionMixin,
    vListMixin,
    vListEditMixin,
    vEditMixin,
    vInsertMixin,
    vViewMixin,
    vSearchMixin,
    vHasmanyMixin,
    Server,
    Route,
    ProtocolList,
    ProtocolRecord,
    // nuovi oggetti

    crudStore, coreMixin, dialogsMixin, choiceMixin,
    _cComponent,_cPaginator,_cWait,
    _wBase,_wInput,_wAutocomplete,_wB2Select2,_wB2mSelect2,_wBelongsTo,_wCheckbox,_wCustom,
    _wDatePicker,_wDateSelect,_wDateText,_wHasmany,_wHasmanyListed,_wHidden,_wImage,_wInputHelped,
    _wMap,_wMapView,_wPreview,_wRadio,_wSelect,_wStatus,_wSwap,_wText,_wTextarea,_wTexthtml,
    _wUpload,_wUploadAjax,
    _aBase,
    _vBase,_vRecord,_vCollection,_vAction,_vWidget,_vList,_vView
}





