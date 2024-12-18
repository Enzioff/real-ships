import Vue from 'vue';

export default {
    namespaced: true,
    state: {
        items: {},
    },
    getters: {
        items(state) {
            return state.items;
        },
    },
    mutations: {
        /* eslint no-param-reassign: 'off' */
        addItems(state, data) {
            state.items = data;
        },
    },
    actions: {
        loadItems(store, to) {
            return new Promise((resolve) => {
                const url = 'meta?url=';
                Vue.http
                    .get(url + to)
                    .then((response) => response.json())
                    .then((data) => {
                        store.commit('addItems', data);
                        resolve();
                    });
            });
        },
    },
};
