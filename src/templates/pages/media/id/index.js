import routerPageHook from '@utilities/routerPageHook.js';
import Vue from 'vue';
import { mapState } from 'vuex';

import Article from '@components/ui-components/article/component';
import Button from '@components/ui-components/button/component';
import Comeback from '@components/ui-components/comeback/component';
import BuilderAuthor from '@components/ui-components/constructor-blocks/builder-author/component';
import BuilderDescription from '@components/ui-components/constructor-blocks/builder-description/component';
import BuilderList from '@components/ui-components/constructor-blocks/builder-list/component';
import BuilderQuote from '@components/ui-components/constructor-blocks/builder-quote/component';
import BuilderSlider from '@components/ui-components/constructor-blocks/builder-slider/component';
import Cursor from '@components/ui-components/cursor/component';
import SliderImg from '@components/ui-components/slider-img/component';
import Video from '@components/ui-components/video/video.vue';

export default {
    name: 'index',
    data() {
        return {
            template: '<main></main>',
            buttonText: null,
            activeClass: [],
            swiperOptions: {
                slidesPerView: 2,
                speed: 800,
                spaceBetween: 64,
                watchOverflow: true,
                noSwipingClass: 'no-swiping',
                navigation: {
                    nextEl: '.js-button-next',
                    prevEl: '.js-button-prev',
                },
                breakpoints: {
                    1600: {
                        spaceBetween: 48,
                    },
                    1160: {
                        spaceBetween: 32,
                    },
                    // 920: {
                    //     slidesPerView: 1,
                    //     spaceBetween: 24,
                    // },
                },
            },
        };
    },
    computed: {
        ...mapState('mobile', ['isMobile']),
    },
    components: {
        'comeback-cmp': Comeback,
        'builder-description-cmp': BuilderDescription,
        'builder-quote-cmp': BuilderQuote,
        'builder-list-cmp': BuilderList,
        'builder-slider-cmp': BuilderSlider,
        'builder-author-cmp': BuilderAuthor,
        'slider-img': SliderImg,
        'video-cmp': Video,
        'article-cmp': Article,
        'button-cmp': Button,
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
    },
    mounted() {},
    ...routerPageHook,
    render(createElement) {
        return Vue.compile(this.template).render.call(this, createElement);
    },
};
