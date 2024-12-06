import Vue from 'vue';
import Vuex from 'vuex';

import animate from './modules/animate';
import curtain from './modules/curtain';
import locale from './modules/locale';
import menu from './modules/menu';
import meta from './modules/meta';
import mobile from './modules/mobile';
import modal from './modules/modal';
import search from './modules/search';

Vue.use(Vuex);
Vue.config.devtools = true;

export const store = new Vuex.Store({
    state: {
        idOpenMedia: 1,
        isFooterHide: false,
    },
    getters: {},
    mutations: {
        /* eslint no-param-reassign: 'off' */
        changeOpenMedia(state, data) {
            state.idOpenMedia = data;
        },
        UpdateFooterHide(state, param) {
            state.isFooterHide = param;
        },
    },
    modules: {
        curtain,
        locale,
        meta,
        modal,
        menu,
        mobile,
        search,
        animate,
    },
    strict: process.env.NODE_ENV !== 'production',
});
