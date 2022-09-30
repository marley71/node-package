//import Server from '../../core/Server'
import jQuery from 'jquery'
import crudStore from '../utility/crudStore';

const mainMixin = {

    methods: {
        loadConfigurations (callback) {
            var that = this;
            that.loadLanguageFile(function () {
                that.loadRoutesFile(function () {
                    that.loadActionsFile( function () {
                        that.loadEnvFile(function () {
                            that.loadEnvMeta();
                            var initFuncion = that.getMetaValue('crud.init');
                            console.log('initFunction',initFuncion);
                            if (typeof window[initFuncion] === 'function') {
                            //if (initFuncion) {
                                window[initFuncion].apply(that,[callback]);
                                //window[initFuncion](callback);
                            }
                            else
                                return callback();
                        })
                    })
                })
            })
        },
        getMetaValue (key) {
            return jQuery('meta[name="'+ key + '"]').attr('content');
        },
        loadLanguageFile (callback) {
            var that = this;
            const store = crudStore();
            var languageFile = that.getMetaValue('crud.translations');
            if (languageFile) {
                Server.get(languageFile,{},function (json) {
                    console.log('caricato file',languageFile);
                    store.lang = json;
                    return callback();
                })
            } else
                return callback();
        },
        loadRoutesFile (callback) {
            var that = this;
            const store = crudStore();
            var routesFile = that.getMetaValue('crud.routes');
            if (routesFile) {
                Server.get(routesFile,{},function (json) {
                    console.log('caricato file',routesFile);
                    for (var k in json) {
                        store.routes[k] = json[k];
                        return callback();
                    }

                })
            } else
                return callback();
        },
        loadActionsFile (callback) {
            var that = this;
            const store = crudStore();
            var actionsFile = that.getMetaValue('crud.actions');
            if (actionsFile) {
                Server.get(actionsFile,{},function (json) {
                    console.log('caricato file',actionsFile);
                    for (var k in json) {
                        store.actions[k] = json[k];
                    }
                    return callback();
                })
            }else
                return callback();
        },
        loadEnvMeta () {
            var that = this;
            const store = crudStore();
            var nokey = "crud.env.";
            jQuery('meta[name*="crud.env."]').each(function () {
                var name = jQuery(this).attr('name');
                var key = name.substr(nokey.length);
                console.log('filedKey', key);
                store.env[key] = jQuery(this).attr('content');
            })
        },
        loadEnvFile (callback) {
            var that = this;
            const store = crudStore();
            var envFile = that.getMetaValue('crud.env-file');
            if (envFile) {
                Server.get(envFile,{},function (json) {
                    console.log('caricato env file',envFile);
                    store.env = json;
                    return callback();
                })
            } else
                return callback();
        }
    }
}
export default mainMixin
