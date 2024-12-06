import routerPageHook from '@utilities/routerPageHook.js';
import Vue from 'vue';
import { mapState } from 'vuex';

export default {
    name: 'index',
    data() {
        return {
            template: '<main></main>',
            activeClass: [],
            swiperOptionsPrivateBoats: {
                slidesPerView: 2.1,
                loop: true,
                spaceBetween: 64,
                centeredSlides: true,
                slidesOffsetBefore: 120,
                speed: 600,
                threshold: 15,
                breakpoints: {
                    1160: {
                        spaceBetween: 32,
                        slidesOffsetBefore: 66,
                    },
                    1366: {
                        spaceBetween: 36,
                        slidesOffsetBefore: 90,
                    },
                    920: {
                        slidesPerView: 1,
                        spaceBetween: 8,
                        slidesOffsetBefore: 0,
                    },
                },
                pagination: {
                    el: '.t-page-models__slider-pagination-private',
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
            },
            swiperOptionsCommercialBoats: {
                slidesPerView: 2.1,
                loop: true,
                spaceBetween: 64,
                centeredSlides: true,
                slidesOffsetBefore: 120,
                speed: 600,
                threshold: 15,
                breakpoints: {
                    1160: {
                        spaceBetween: 32,
                        slidesOffsetBefore: 66,
                    },
                    1366: {
                        spaceBetween: 36,
                        slidesOffsetBefore: 90,
                    },
                    920: {
                        slidesPerView: 1,
                        spaceBetween: 8,
                        slidesOffsetBefore: 0,
                    },
                },
                pagination: {
                    el: '.t-page-models__slider-pagination-commercial',
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
            },
            swiperOptionsAvailableBoats: {
                slidesPerView: 2.1,
                loop: true,
                spaceBetween: 64,
                centeredSlides: true,
                slidesOffsetBefore: 120,
                speed: 600,
                threshold: 15,
                breakpoints: {
                    1160: {
                        spaceBetween: 32,
                        slidesOffsetBefore: 66,
                    },
                    1366: {
                        spaceBetween: 36,
                        slidesOffsetBefore: 90,
                    },
                    920: {
                        slidesPerView: 1,
                        spaceBetween: 8,
                        slidesOffsetBefore: 0,
                    },
                },
                pagination: {
                    el: '.t-page-models__slider-pagination-available',
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
            },
        };
    },
    computed: {
        ...mapState('mobile', ['isMobile']),
    },
    components: {},
    methods: {
        closeMenu() {
            this.$root.closeMenu();
        },
    },
    ...routerPageHook,
    render(createElement) {
        return Vue.compile(this.template).render.call(this, createElement);
    },
};
