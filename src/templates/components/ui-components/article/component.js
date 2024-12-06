import { mapState } from 'vuex';

export default {
    data() {
        return {};
    },
    methods: {
        scrollTo() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        },
    },
    computed: {
        ...mapState('mobile', ['isMobile']),
    },
};
