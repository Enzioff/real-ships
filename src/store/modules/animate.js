export default {
    namespaced: true,
    state: {
        twoScroll: false,
        threeScroll: false,
        firstLoadMain: true,
        firstLoadBoat: true,
    },
    mutations: {
        ChangeTwoScroll(state, value) {
            // eslint-disable-next-line no-param-reassign
            state.twoScroll = value;
        },
        ChangeThreeScroll(state, value) {
            // eslint-disable-next-line no-param-reassign
            state.threeScroll = value;
        },
        ChangeFirstLoadMain(state, value) {
            // eslint-disable-next-line no-param-reassign
            state.firstLoadMain = value;
        },
        ChangeFirstLoadBoat(state, value) {
            // eslint-disable-next-line no-param-reassign
            state.firstLoadBoat = value;
        },
    },
};
