export default {
    namespaced: true,
    state: {
        searchPanel: false,
    },
    getters: {},
    mutations: {
        /* eslint no-param-reassign: 'off' */
        toogleSearchPanel(state) {
            state.searchPanel = !state.searchPanel;
        },
        closeSearchPanel(state) {
            state.searchPanel = false;
        },
    },
};
