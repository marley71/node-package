<template>

</template>

<script>
import _wBase from './_wBase.vue'
export default {
    name: "_wText",
    extends: _wBase,
    data() {
        return {
            maxLineLength: 0, // numero di caratteri massimi per linea quando voglio il testo formato da linee di lunghezza massima
            maxLength: 0,  // numero di caratteri da tagliare per non sbordare
        }
    }
}
</script>

<style scoped>

</style>
