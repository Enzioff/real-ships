// eslint-disable-next-line import/no-extraneous-dependencies
import { mapMutations, mapState } from 'vuex';

import Locale from '@components/base/locale/locale';
import Boats from '@components/ui-components/boats/component';
import Menu from '@components/ui-components/menu/component';

export default {
    data() {
        return {
            isScrollTop: false,
            isFirstScreen: true,
            namePage: null,
            swiperHeaderBoats: {
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
                        slidesPerView: 2,
                        spaceBetween: 29,
                    },
                },
            },
        };
    },
    components: {
        'locale-cmp': Locale,
        'boats-cmp': Boats,
        'menu-cmp': Menu,
    },
    computed: {
        ...mapState('menu', ['openMenu']),
        ...mapState('mobile', ['isMobile']),
        ...mapState('animate', ['firstLoadMain', 'firstLoadBoat']),
        classScroll() {
            return {
                't-header_scroll': this.isScrollTop,
                'animate-header':
                    (this.isFirstScreen &&
                        !this.isMobile &&
                        !this.firstLoadMain &&
                        this.$route.name === 'main') ||
                    (!this.firstLoadBoat && this.$route.name === 'boat-id'),
            };
        },
    },
    methods: {
        ...mapMutations('menu', ['setOpenMenu']),
        openCloseMenu() {
            this.isFirstScreen = window.scrollY < window.innerHeight;
            if (this.openMenu) {
                document
                    .querySelector('.t-header__block-bottom')
                    .classList.add('_close');
                setTimeout(() => {
                    this.setOpenMenu(false);
                    this.$root.enableScroll();
                }, 300);
                if (
                    (this.firstLoadMain && this.$route.name === 'main') ||
                    (this.firstLoadBoat && this.$route.name === 'boat-id')
                ) {
                    document.body.style.overflow = 'hidden';
                    window.addEventListener('wheel', this.$root.scrollAnimate);
                    window.addEventListener(
                        'mousewheel',
                        this.$root.scrollAnimate,
                    );
                    window.addEventListener(
                        'DOMMouseScroll',
                        this.$root.scrollAnimate,
                    );
                    window.addEventListener(
                        'MozMousePixelScroll',
                        this.$root.scrollAnimate,
                    );
                } else {
                    document.body.style.overflow = 'auto';
                }
                window.addEventListener('scroll', this.$root.scrollNavMenu);
                if (
                    this.isFirstScreen &&
                    !this.isMobile &&
                    (document.querySelector('.animate-block-bottom') ||
                        document.querySelector('.height-max'))
                ) {
                    document
                        .querySelector('.t-header')
                        .classList.add('animate-header');
                } else {
                    document
                        .querySelector('.t-header')
                        .classList.remove('animate-header');
                    document
                        .querySelector('.t-header')
                        .classList.remove('headerMainBoat');
                }
            } else {
                this.setOpenMenu(true);
                this.$root.disableScroll();
                window.removeEventListener('scroll', this.$root.scrollNavMenu);
                window.removeEventListener('wheel', this.$root.scrollAnimate);
                window.removeEventListener(
                    'mousewheel',
                    this.$root.scrollAnimate,
                );
                window.removeEventListener(
                    'DOMMouseScroll',
                    this.$root.scrollAnimate,
                );
                window.removeEventListener(
                    'MozMousePixelScroll',
                    this.$root.scrollAnimate,
                );
                document.body.style.overflow = 'hidden';
                window.removeEventListener('wheel', this.$root.scrollAnimate);
                window.removeEventListener(
                    'mousewheel',
                    this.$root.scrollAnimate,
                );
                window.removeEventListener(
                    'DOMMouseScroll',
                    this.$root.scrollAnimate,
                );
                window.removeEventListener(
                    'MozMousePixelScroll',
                    this.$root.scrollAnimate,
                );
                document
                    .querySelector('.t-header')
                    .classList.remove('animate-header');
                document
                    .querySelector('.t-header')
                    .classList.remove('headerMainBoat');
            }
        },
        closeMenu() {
            this.$root.closeMenu();
        },
    },

    mounted() {
        window.addEventListener('scroll', this.$root.scrollNavMenu);
    },
};
