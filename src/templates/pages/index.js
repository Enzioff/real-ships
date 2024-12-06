import routerPageHook from '@utilities/routerPageHook.js';
import Vue from 'vue';
import { mapMutations, mapState } from 'vuex';

import FormContacts from '@components/base/forms/form-contacts.vue';
import ButtonLinkVue from '@components/ui-components/button-link/button.vue';
import ButtonLink from '@components/ui-components/button-link/component';
import Cursor from '@components/ui-components/cursor/component';
import LinkPage from '@components/ui-components/link-page/component';
import TabsOriginal from '@components/ui-components/tabs-original/component';
import Tabs from '@components/ui-components/tabs/component';
import Video from '@components/ui-components/video/video.vue';

export default {
    name: 'index',
    data() {
        return {
            template: '<main></main>',
            routeName: '',
            buttonText: null,
            swiperOptionsPrivateBoats: {
                slidesPerView: 9,
                spaceBetween: 20,
                speed: 600,
                noSwipingClass: 'no-swiping',
                centerInsufficientSlides: true,
                breakpoints: {
                    1240: {
                        slidesPerView: 6,
                        spaceBetween: 20,
                    },
                    920: {
                        slidesPerView: 1,
                        spaceBetween: 8,
                    },
                },
                pagination: {
                    el: '.t-page-main__slider-pagination-private',
                    type: 'fraction',
                    formatFractionCurrent(number) {
                        return number > 9 ? number : `0${number}`;
                    },
                    formatFractionTotal(number) {
                        return number > 9 ? number : `0${number}`;
                    },
                    renderFraction(currentClass, totalClass) {
                        return `<span class="${currentClass}"></span><span class="${totalClass}"></span>`;
                    },
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                watchOverflow: true,
            },
            swiperOptionsCommercialBoats: {
                slidesPerView: 9,
                spaceBetween: 20,
                speed: 600,
                noSwipingClass: 'no-swiping',
                centerInsufficientSlides: true,
                breakpoints: {
                    1240: {
                        slidesPerView: 6,
                        spaceBetween: 20,
                    },
                    920: {
                        slidesPerView: 1,
                        spaceBetween: 8,
                    },
                },
                pagination: {
                    el: '.t-page-main__slider-pagination-commercial',
                    type: 'fraction',
                    formatFractionCurrent(number) {
                        return number > 9 ? number : `0${number}`;
                    },
                    formatFractionTotal(number) {
                        return number > 9 ? number : `0${number}`;
                    },
                    renderFraction(currentClass, totalClass) {
                        return `<span class="${currentClass}"></span><span class="${totalClass}"></span>`;
                    },
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                watchOverflow: true,
            },
            swiperOptionsAvailableBoats: {
                slidesPerView: 9,
                spaceBetween: 20,
                speed: 600,
                noSwipingClass: 'no-swiping',
                centerInsufficientSlides: true,
                breakpoints: {
                    1240: {
                        slidesPerView: 6,
                        spaceBetween: 20,
                    },
                    920: {
                        slidesPerView: 1,
                        spaceBetween: 8,
                    },
                },
                pagination: {
                    el: '.t-page-main__slider-pagination-available',
                    type: 'fraction',
                    formatFractionCurrent(number) {
                        return number > 9 ? number : `0${number}`;
                    },
                    formatFractionTotal(number) {
                        return number > 9 ? number : `0${number}`;
                    },
                    renderFraction(currentClass, totalClass) {
                        return `<span class="${currentClass}"></span><span class="${totalClass}"></span>`;
                    },
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                watchOverflow: true,
            },
            activeModels: 0,
            idBoat: 0,
            idOpenBenefits: 0,
            aboutSwiperOptions: {
                slidesPerView: 2.5,
                speed: 800,
                spaceBetween: 24,
                watchOverflow: true,
                navigation: {
                    nextEl: '.js-button-next',
                    prevEl: '.js-button-prev',
                },
                breakpoints: {
                    920: {
                        slidesPerView: 1,
                    },
                },
            },
        };
    },
    computed: {
        ...mapState('mobile', ['isMobile']),
        ...mapState('animate', ['firstLoadMain']),
        ...mapState(['idOpenMedia']),
        screenSize() {
            return window.innerWidth < 1600;
        },
    },
    components: {
        'video-cmp': Video,
        'tabs-original-cmp': TabsOriginal,
        'link-page-cmp': LinkPage,
        'button-link-cmp': ButtonLink,
        'button-link-vue-cmp': ButtonLinkVue,
        'tabs-cmp': Tabs,
        'form-contacts-cmp': FormContacts,
        'cursor-cmp': Cursor,
    },
    methods: {
        ...mapMutations('animate', ['ChangeFirstLoadMain']),
        ...mapMutations(['changeOpenMedia']),

        openBenefits(loop) {
            this.idOpenBenefits = loop;

            setTimeout(() => {
                const coord =
                    document.querySelector('._open').getBoundingClientRect()
                        .top +
                    window.pageYOffset -
                    20;
                window.scrollTo({
                    top: coord,
                    behavior: 'smooth',
                });
            }, 50);
        },
        getTabsActive(tab) {
            this.activeModels = +tab;
            this.idBoat = 0;
            // this.$root.definitionCountBoats();
        },
        toNextBlock() {
            const coord =
                document
                    .querySelector('.t-page-main__models')
                    .getBoundingClientRect().top + window.pageYOffset;
            document.body.style.overflow = 'auto';
            this.ChangeFirstLoadMain(false);
            if (!this.isMobile) {
                this.$root.resize('100vh');
                document
                    .querySelector('.t-page-main__promo-video')
                    .classList.add('animate-video_width');
                document
                    .querySelector('.t-page-main__promo-top')
                    .classList.add('animate-block-medium');
                document
                    .querySelector('.t-page-main__promo-top')
                    .classList.add('animate-block-bottom');
                document
                    .querySelector('.t-header')
                    .classList.add('animate-header');
            }
            window.scrollTo({
                top: coord,
                behavior: 'smooth',
            });
        },
        openInfoBoat(boat) {
            this.idBoat = boat;
        },
        click(key) {
            this.changeOpenMedia(key);
        },
        LeaveEl() {
            this.changeOpenMedia(-1);
        },
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
    mounted() {
        this.routeName = this.$route.name;

        setTimeout(() => {
            this.$root.resize();
        }, 1000);
        if (this.firstLoadMain && !this.isMobile) {
            document.body.style.overflow = 'hidden';
            // eslint-disable-next-line no-inner-declarations
            window.addEventListener('wheel', this.$root.scrollAnimate);
            window.addEventListener('mousewheel', this.$root.scrollAnimate);
            window.addEventListener('DOMMouseScroll', this.$root.scrollAnimate);
            window.addEventListener(
                'MozMousePixelScroll',
                this.$root.scrollAnimate,
            );
        } else if (this.isMobile) {
            this.ChangeFirstLoadMain(false);
            document.querySelector('.t-header').classList.add('headerMainBoat');
            setTimeout(() => {
                this.$root.resize('100vh');
            }, 1000);
        }
    },
    created() {
        setTimeout(() => {
            this.$root.activeTabNameMainPage = document.querySelector(
                '.t-tabs__item span',
            ).innerHTML;
            setTimeout(() => {
                const firstBoatId = document.querySelector(
                    '.t-page-main__media-content-item',
                );
                if (firstBoatId) {
                    this.changeOpenMedia(+firstBoatId.id);
                }
            }, 100);
        }, 1000);
    },
    updated() {
        if (this.firstLoadMain && !this.isMobile) {
            this.$root.resize();
            // eslint-disable-next-line no-inner-declarations
            window.addEventListener('wheel', this.$root.scrollAnimate);
            window.addEventListener('mousewheel', this.$root.scrollAnimate);
            window.addEventListener('DOMMouseScroll', this.$root.scrollAnimate);
            window.addEventListener(
                'MozMousePixelScroll',
                this.$root.scrollAnimate,
            );
        } else if (this.isMobile) {
            document.querySelector('.t-header').classList.add('headerMainBoat');
            document.body.style.overflow = 'auto';
        }
    },
    ...routerPageHook,
    render(createElement) {
        return Vue.compile(this.template).render.call(this, createElement);
    },
};
