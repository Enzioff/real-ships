// import onScrollAnimate from '@utilities/scrollAnimate';
// import routerPageHook from '@utilities/routerPageHook.js';
import Vue from 'vue';
import { mapState } from 'vuex';

import ArticleVueCmp from '@components/ui-components/article/article.vue';
import Article from '@components/ui-components/article/component';
import Button from '@components/ui-components/button/component';
import Cursor from '@components/ui-components/cursor/component';
import LoadMoreBtn from '@components/ui-components/load-more/load-more.vue';
import Tabs from '@components/ui-components/tabs/component';

export default {
    name: 'index',
    data() {
        return {
            template: '<main></main>',
            pagination: null,
            mediaCards: [],
            buttonText: null,
            activeClass: [],
        };
    },
    computed: {
        ...mapState('mobile', ['isMobile']),
    },
    components: {
        'tabs-cmp': Tabs,
        'article-cmp': Article,
        'button-cmp': Button,
        'load-more-cmp': LoadMoreBtn,
        'article-vue-cmp': ArticleVueCmp,
        'cursor-cmp': Cursor,
    },
    methods: {
        hoverCursor(className, text) {
            if (!this.isMobile) {
                const cursor = document.querySelector('.js-cursor');
                const activeClass = document.querySelectorAll(className);
                if (text) {
                    document.querySelector('.js-cursor span').innerHTML = text;
                }

                let buttonTextLocal;
                const mouseMove = (e) => {
                    if (buttonTextLocal) {
                        document.querySelector(
                            '.js-cursor span',
                        ).innerHTML = buttonTextLocal;
                    }
                    buttonTextLocal = document.querySelector('.js-cursor span')
                        .innerHTML;

                    const x = e.pageX;
                    const y = e.pageY;
                    cursor.style.visibility = 'visible';
                    cursor.style.opacity = '1';
                    cursor.style.left = `${x}px`;
                    cursor.style.top = `${y}px`;
                };
                const mouseLeave = () => {
                    if (buttonTextLocal) {
                        document.querySelector(
                            '.js-cursor span',
                        ).innerHTML = buttonTextLocal;
                    }
                    cursor.style.visibility = 'hidden';
                    cursor.style.opacity = '0';
                };
                /* eslint-disable-next-line */
                for (const item of activeClass) {
                    item.addEventListener('mousemove', mouseMove);
                    item.addEventListener('mouseleave', mouseLeave);
                }
            }
        },
        setPagination() {
            setTimeout(() => {
                this.pagination = this.$root.convertTwigToJs(
                    'pagination',
                    '.js-pagination',
                );
            }, 100);
        },
    },
    updated() {
        setTimeout(() => {
            if (!this.$route.query.media) {
                this.$root.activeTabId = 0;
            }
        }, 500);
    },
    mounted() {
        this.setPagination();
    },

    beforeRouteUpdate(to, from, next) {
        if (!to.query.loadMore) {
            const url = `templates${to.path}`;

            if (document.querySelector('.t-page-media__items')) {
                document.querySelector('.t-page-media__items').style.opacity =
                    '0';
            }

            Vue.http
                .get(url, { params: to.query })
                .then(
                    (data) => {
                        next();
                        setTimeout(() => {
                            this.template = data.data;
                            this.setPagination();
                            this.mediaCards = [];
                        }, 100);
                    },
                    () => {
                        next('/404');
                    },
                )
                .then(() => {
                    setTimeout(() => {
                        if (document.querySelector('.t-page-media__items')) {
                            document.querySelector(
                                '.t-page-media__items',
                            ).style.opacity = '1';
                        }
                    }, 300);
                });
        } else {
            const url =
                process.env.NODE_ENV !== 'production'
                    ? 'media.json'
                    : `${to.path}`.substring(1);
            Vue.http.get(url, { params: to.query }).then(
                (data) => {
                    next();
                    if (data.data.items) {
                        this.mediaCards = this.mediaCards.concat(
                            data.data.items,
                        );
                        this.pagination = data.data.pagination;
                    }
                    // setTimeout(() => {
                    //     onScrollAnimate();
                    // }, 10);
                },
                () => {
                    next('/404');
                },
            );
        }
    },

    beforeRouteEnter(to, from, next) {
        if (window.content) {
            next((vm) => {
                // сброс параметров url
                if (Object.keys(vm.$route.query).length > 0) {
                    vm.$router.push({
                        name: vm.$route.name,
                        query: {
                            ...vm.$route.query,
                            loadMore: undefined,
                            currentPage: undefined,
                        },
                    });
                }
                /* eslint no-param-reassign: "error" */
                vm.template = window.content;
                window.content = undefined;
            });
        } else {
            const url = `templates${to.path}`;
            Vue.http.get(url, { params: to.query }).then(
                (data) => {
                    next((vm) => {
                        // сброс параметров url
                        if (Object.keys(vm.$route.query).length > 0) {
                            vm.$router.push({
                                name: vm.$route.name,
                                query: {
                                    ...vm.$route.query,
                                    loadMore: undefined,
                                    currentPage: undefined,
                                },
                            });
                        }
                        vm.template = data.data;
                    });
                },
                () => {
                    next('/404');
                },
            );
        }
    },

    // ...routerPageHook,
    render(createElement) {
        return Vue.compile(this.template).render.call(this, createElement);
    },
};
