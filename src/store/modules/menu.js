export default {
    namespaced: true,
    state: {
        openMenu: false,
    },
    mutations: {
        /* eslint no-param-reassign: 'off' */
        setOpenMenu(state, data) {
            state.openMenu = data;
        },
    },
};
