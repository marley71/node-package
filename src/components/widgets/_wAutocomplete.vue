<script>
export default {
    name: "_wAutocomplete",
    data() {
        return {
            resources: [
                'https://cdnjs.cloudflare.com/ajax/libs/jquery-autocomplete/1.0.7/jquery.auto-complete.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/jquery-autocomplete/1.0.7/jquery.auto-complete.min.js'
            ],
            routeName: 'autocomplete',
            primaryKey: 'id', // campo da utilizzare per assegnare il valore selezionato
            suggestValues: {},
            labelFields: [], // campi da visualizzare nell'autocomplete
            minLength: 3, // caratteri minimi prima che parta la ricerca
            clearButton: false,
            selectedLabel: false, //se visualizzare o no la scelta dell'autocomplete nella sezione label
            json: null,
        }
    }
}
</script>
