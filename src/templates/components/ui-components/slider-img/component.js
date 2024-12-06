import { mapState } from 'vuex';

export default {
    data() {
        return {
            swiperOptions: {
                slidesPerView: 1,
                // slidesOffsetBefore: 10,
                spaceBetween: 24,
                loop: true,
                speed: 800,
                noSwipingClass: 'no-swiping',
                pagination: {
                    el: '.t-slider-img__pagination',
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
};
