export default {
    namespaced: true,
    state: {
        mobileMenuVisible: false,
        isMobile: false,
    },
    getters: {},
    mutations: {
        /* eslint no-param-reassign: 'off' */
        setIsMobile(state) {
            state.isMobile = window.innerWidth < 920;
        },
        toogleMobileMenu(state) {
            state.mobileMenuVisible = !state.mobileMenuVisible;
        },
    },
};
