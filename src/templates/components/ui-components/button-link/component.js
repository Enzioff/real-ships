import { mapMutations } from 'vuex';

export default {
    data() {
        return {};
    },
    methods: {
        ...mapMutations('modal', ['Open']),
    },
};
