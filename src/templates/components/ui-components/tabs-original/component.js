export default {
    data() {
        return {
            activeItemId: 1,
        };
    },
    methods: {
        onActiveTabs(id) {
            this.activeItemId = id;
            this.$emit('tabs-active', this.activeItemId);
        },
    },
    mounted() {
        if (this.$route.name === 'main') {
            this.activeItemId = 0;
        }
    },
};
