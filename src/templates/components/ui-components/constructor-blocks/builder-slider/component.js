export default {
    data() {
        return {
            swiperOptions: {
                slidesPerView: 1,
                speed: 800,
                loop: true,
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
};
