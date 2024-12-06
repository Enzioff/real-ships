import { mapState } from 'vuex';

import FormSubscribe from '@components/base/forms/form-subscribe.vue';
import Boats from '@components/ui-components/boats/component';
import Menu from '@components/ui-components/menu/component';
import SocialNetworks from '@components/ui-components/social-networks/component';

export default {
    data() {
        return {
            swiperFooterBoats: {
                slidesPerView: 9,
                spaceBetween: 20,
                speed: 600,
                centerInsufficientSlides: true,
                breakpoints: {
                    1160: {
                        slidesPerView: 6,
                        spaceBetween: 20,
                    },
                    920: {
                        slidesPerView: 1.9,
                        spaceBetween: 48,
                    },
                },
                on: {
                    slideNextTransitionStart: () =>
                        this.changeActiveSlide('next'),
                    slidePrevTransitionStart: () =>
                        this.changeActiveSlide('prev'),
                },
            },
            activeSlide: 0,
        };
    },
    components: {
        'boats-cmp': Boats,
        'menu-cmp': Menu,
        'social-networks-cmp': SocialNetworks,
        'form-subscribe-cmp': FormSubscribe,
    },
    computed: {
        ...mapState('mobile', ['isMobile']),
        ...mapState(['isFooterHide']),
    },
    methods: {
        scrollTo(elem) {
            const coord =
                document.querySelector(elem).getBoundingClientRect().top +
                window.pageYOffset;
            window.scrollTo({
                top: coord,
                behavior: 'smooth',
            });
            this.$root.closeMenu();
        },
        changeActiveSlide(param) {
            if (param === 'next') {
                this.activeSlide += 1;
            } else if (param === 'prev') {
                this.activeSlide -= 1;
            }
        },
    },

    mounted() {},
};
