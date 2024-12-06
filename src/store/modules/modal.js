export default {
    namespaced: true,
    state: {
        modalComponent: null,
        modalProps: null,
        modalClassContent: null,
    },
    getters: {
        // getModalComponent(state) {
        //   return state.modalComponent[state.modalComponent.length - 1];
        // },
        modalComponent(state) {
            return state.modalComponent;
        },
        modalProps(state) {
            return state.modalProps;
        },
        modalClassContent(state) {
            return state.modalClassContent;
        },
    },
    mutations: {
        /* eslint no-param-reassign: 'off' */
        // openModal(state, newState) {
        //   state.modalComponent.push(newState);
        // },
        // closeModal(state) {
        //   state.modalComponent.splice(state.modalComponent.length - 1, 1);
        // },
        Open(state, data) {
            state.modalComponent = data.newState;
            state.modalProps = data.props;
            if (data.modalContent) {
                state.modalClassContent = data.modalContent;
            }
            const body = document.querySelector('body');
            body.style.cssText = 'overflow-y: hidden';
        },
        Close(state) {
            state.modalComponent = null;
            state.modalProps = null;
            state.modalClassContent = null;
            const body = document.querySelector('body');
            body.style.cssText = 'overflow-y: auto';
        },
    },
};
