import { mapMutations } from 'vuex';

export default {
    data() {
        return {
            loopId: 0,
            // itemId: 0,
        };
    },
    methods: {
        // eslint-disable-next-line no-undef
        ...mapMutations(['changeOpenMedia']),
        setActiveClassMainPage(loop, itemName) {
            this.loopId = loop;
            this.$root.activeTabNameMainPage = itemName;
            setTimeout(() => {
                const firstBoatId = document.querySelector(
                    '.t-page-main__media-content-item',
                );
                if (firstBoatId) {
                    this.changeOpenMedia(+firstBoatId.id);
                }
            }, 10);
        },
        setActiveClass(id, query) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
            this.$root.activeTabId = +id;
            if (query) {
                this.routerPush(query);
            } else if (query === null) {
                this.$router.push({
                    name: this.$route.name,
                });
            }
        },
        routerPush(query) {
            this.$router.push({
                name: this.$route.name,
                query: {
                    ...this.$route.query,
                    [query]: this.$root.activeTabId,
                    loadMore: undefined,
                    currentPage: undefined,
                },
            });
        },
    },

    mounted() {
        if (this.$route.query.media) {
            this.$root.activeTabId = this.$route.query.media;
        }
    },
};
