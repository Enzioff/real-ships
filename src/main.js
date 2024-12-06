/* eslint-disable no-multi-assign */
/* eslint-disable radix */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/order */
// eslint-disable-next-line import/order
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-cond-assign */
/* eslint-disable eqeqeq */
import onScrollAnimate from '@utilities/scrollAnimate';
import { VueMaskDirective } from 'v-mask';
import Vue from 'vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import VueCookie from 'vue-cookie';
import VueResource from 'vue-resource';
import vSelect from 'vue-select';
// import { VueMasonryPlugin } from 'vue-masonry';
// import VCalendar from 'v-calendar';
// import MaskedInput from 'vue-masked-input';
import VueYoutube from 'vue-youtube';
// import YmapPlugin from 'vue-yandex-maps';
import { mapMutations, mapState } from 'vuex';

import Curtain from '@components/base/curtain/component';
import Footer from '@components/base/footer/component';
import Header from '@components/base/header/component';
import ModalCookie from '@components/base/modals/modal-cookie.vue';
import Modal from '@components/base/modals/modal.vue';

import { router } from './routes';
import { store } from './store';
import { meta } from './utilities/meta';

// import vClickOutside from 'v-click-outside';
// import DatePicker from 'vue2-datepicker';
Vue.directive('mask', VueMaskDirective);

// import VueParallaxJs from 'vue-parallax-js';
// import VueLazyload from 'vue-lazyload';
// import clampy from '@clampy-js/vue-clampy';

Vue.use(VueResource);

Vue.use(VueAwesomeSwiper /* { default global options } */);

Vue.use(VueYoutube);
// Директива v-click-outside собитые при клике вне элемента
// Vue.use(vClickOutside);

Vue.use(VueCookie);

Vue.config.devtools = true;

// Vue.use(DatePicker);

// Vue.use(VueMasonryPlugin);

// Use v-calendar & v-date-picker components
// Vue.use(VCalendar, {
//  componentPrefix: 'v',
// });

// Vue.use(MaskedInput);

vSelect.props.components.default = () => ({
    Deselect: {
        render: (createElement) => createElement('span', ''),
    },
    OpenIndicator: {
        render: (createElement) =>
            createElement(
                'svg',
                {
                    attrs: {
                        width: '18',
                        height: '10',
                        viewBox: '0 0 18 10',
                        fill: 'none',
                        xmlns: 'http://www.w3.org/2000/svg',
                    },
                },
                [
                    createElement('path', {
                        attrs: {
                            d:
                                'M16.5 1.5L10.4273 7.57268C9.64627 8.35373 8.37995 8.35372 7.5989 7.57267L1.52622 1.5',
                            stroke: '#022855',
                            'stroke-width': '2',
                        },
                    }),
                ],
            ),
    },
});

Vue.component('v-select', vSelect);

// Vue.use(VueParallaxJs);

/*
// Директива v-lazy для отложенной загрузки изображений
Vue.use(VueLazyload);
 или подключение с опциями
 Vue.use(VueLazyload, {
   preLoad: 1.3,
   error: 'dist/error.png',
   loading: 'dist/loading.gif',
   attempt: 1
 })
*/

// Директива v-clampy="3" обрезает содержимое внутри элемента и добавляет многоточие в конец
// Vue.use(clampy);

Vue.http.options.root = '/api';

Vue.component('curtain-cmp', Curtain);

Vue.directive('animation', {
    // Когда привязанный элемент вставлен в DOM...
    bind(el, binding) {
        // eslint-disable-next-line
        el.dataset.animate = false;
        if (binding.arg) {
            // eslint-disable-next-line
            el.dataset.animateDirection = binding.arg;
        }
        if (binding.modifiers) {
            Object.keys(binding.modifiers).forEach((item) => {
                // eslint-disable-next-line
                el.dataset[item] = binding.modifiers[item];
            });
        }
    },
});

// Директива v-link вместо элемента router-link
Vue.directive('link', {
    // Когда привязанный элемент вставлен в DOM...
    bind(el) {
        const href = el.getAttribute('href');
        // если ссылка внутренняя, то добавляем базовый язык впереди ссылки
        if (href.charAt(0) === '/') {
            el.setAttribute('href', router.history.base + href);
        }

        el.addEventListener('click', (e) => linkAction(e, el));
    },
    unbind(el) {
        el.removeEventListener('click', (e) => linkAction(e, el));
    },
});

router.beforeEach((to, from, next) => {
    // для страниц с параметром footerHide в routes скрываем футер
    store.commit(
        'UpdateFooterHide',
        to.matched.some((record) => record.meta.footerHide),
    );

    window.removeEventListener('scroll', onScrollAnimate);
    const hideBeforeRouteElements = document.querySelectorAll(
        '.hide-before-route',
    );
    hideBeforeRouteElements.forEach((el) => el.classList.add('hiddenForRoute'));

    if (
        (from.name == 'main' &&
            !store._modules.root._children.animate.state.firstLoadMain &&
            !store._modules.root._children.mobile.state.isMobile) ||
        (from.name == 'boat-id' &&
            !store._modules.root._children.animate.state.firstLoadBoat &&
            !store._modules.root._children.mobile.state.isMobile)
    ) {
        document.querySelector('.t-header').classList.add('animate-header');
    }

    // если переходим на страницу, доступную только при регистрации, то редиректим на 403
    // if (to.matched.some(record => record.meta.requiresAuth)) {
    //   if (!store.getters['profile/isAuth']) {
    //     next({
    //       name: 'E403'
    //     })
    //   } else {
    //     next();
    //   }
    // } else {
    //   next();
    // }

    // next();
    // eslint-disable-next-line no-undef

    store.dispatch('locale/LoadLocale').then(
        () => {
            next();
        },
        (newPath) => {
            next(newPath);
        },
    );
});

// eslint-disable-next-line
router.afterEach((to, from) => {
    if (to.name == 'boat-id' && to.params.id !== from.params.id) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    if (
        to.name == 'thanks' ||
        to.name == 'thanks-subscription' ||
        to.name == 'thanks-vacancies'
    ) {
        setTimeout(() => {
            router.go(-1);
        }, 3000);
    }

    if (
        (to.name == 'main' &&
            store._modules.root._children.animate.state.firstLoadMain &&
            !store._modules.root._children.mobile.state.isMobile) ||
        (to.name == 'boat-id' &&
            store._modules.root._children.animate.state.firstLoadBoat &&
            !store._modules.root._children.mobile.state.isMobile)
    ) {
        document.body.style.overflow = 'hidden';
        document.querySelector('.t-header').classList.remove('animate-header');
    } else {
        document.body.style.overflow = 'auto';
    }

    if (
        to.name == 'boat-id' &&
        !store._modules.root._children.animate.state.firstLoadBoat &&
        !store._modules.root._children.mobile.state.isMobile
    ) {
        store.commit('animate/ChangeFirstLoadBoat', true);
        document.body.style.overflow = 'hidden';
    }

    // topScrollNone используем в routes.js для страниц дочерних например, когда скролл наверх не нужен
    if (
        to.name !== from.name &&
        (!to.matched.some((record) => record.meta.topScrollNone) ||
            !from.matched.some((record) => record.meta.topScrollNone))
    ) {
        // скролл наверх страницы
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'instant',
            });
        }, 750);

        store.dispatch('meta/loadItems', to.path).then(() => {
            meta(store);
        });
    }

    setTimeout(() => {
        onScrollAnimate();
        window.addEventListener('scroll', onScrollAnimate);
    }, 1100);
    setTimeout(() => {
        store.commit('curtain/Show');
    }, 5950);
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    components: {
        'header-cmp': Header,
        'modal-cmp': Modal,
        'footer-cmp': Footer,
        'modal-cookie-cmp': ModalCookie,
    },
    data() {
        return {
            staticText: undefined,
            currentYear: undefined,
            firstLoad: false,
            activeTabId: 0,
            activeTabNameMainPage: '',
            isFirstScreen: true,
        };
    },
    computed: {
        ...mapState('menu', ['openMenu']),
        ...mapState('animate', ['firstLoadMain', 'firstLoadBoat']),
        ...mapState('mobile', ['isMobile']),
        ...mapState('animate', [
            'twoScroll',
            'threeScroll',
            'firstLoadMain',
            'firstLoadBoat',
        ]),
        pageClass() {
            return `t-page_${this.$route.name}`;
        },
    },
    methods: {
        ...mapMutations('mobile', ['setIsMobile']),
        ...mapMutations('modal', ['Open', 'Close', 'setModalCookie']),
        ...mapMutations('animate', [
            'ChangeTwoScroll',
            'ChangeThreeScroll',
            'ChangeFirstLoadMain',
            'ChangeFirstLoadBoat',
        ]),
        ...mapMutations('menu', ['setOpenMenu']),

        definitionCountBoats() {
            const boatsParent = document.querySelectorAll('.js-boat-count');

            if (boatsParent.length > 0) {
                boatsParent.forEach((items) => {
                    const boats = items.querySelectorAll('.t-boats__item');
                    const widthItems = items.offsetWidth;
                    const countBoats = boats.length;

                    let sumBoat = 0;

                    boats.forEach((boat) => {
                        sumBoat += boat.offsetWidth;
                    });

                    const residue = widthItems - sumBoat;

                    boats.forEach((boat) => {
                        /* eslint no-param-reassign: "error" */
                        boat.style.marginRight = `${
                            residue / (countBoats - 1)
                        }px`;
                    });

                    // console.log('242323324');
                });
            }
        },

        convertTwigToJs(data, classData) {
            // console.log(document.querySelector(classData));
            let dataEvents = document
                .querySelector(classData)
                .getAttribute(`data-${data}`);
            dataEvents = dataEvents.replace(/'/g, '"');
            return JSON.parse(dataEvents);
        },
        resize(height) {
            const { paddingTop } = getComputedStyle(
                document.querySelector('.t-page-padding-big'),
            );
            const titleHeight = getComputedStyle(
                document.querySelector('.t-page-main__promo-top'),
            ).height;
            if (height) {
                document.querySelector(
                    '.t-page-main__promo-video',
                ).style.height = height;
            } else {
                document.querySelector(
                    '.t-page-main__promo-video',
                ).style.height = `calc(100vh - ${paddingTop} - ${titleHeight} - 24px)`;
            }
        },
        scrollAnimate(e) {
            const delta = (e.deltaY || -e.wheelDelta || e.detail) > 10 || 1;
            if (delta) {
                const video = document.querySelector(
                    '.t-page-main__promo-video',
                );
                const block = document.querySelector('.t-page-main__promo-top');
                const header = document.querySelector('.t-header');
                const boat = document.querySelector(
                    '.t-page-boat-id__promo-right',
                );
                if (!document.querySelector('.t-video') && !boat) {
                    document.body.style.overflow = 'auto';
                } else if (boat && this.firstLoadBoat && !this.isMobile) {
                    boat.classList.add('animate-video_width-height');
                    header.classList.add('animate-header');
                    document
                        .querySelector('.t-page-boat-id__promo')
                        .classList.add('height-max');
                    this.ChangeFirstLoadBoat(false);
                    setTimeout(() => {
                        document.body.style.overflow = 'auto';
                    }, 1000);
                } else if (video && this.firstLoadMain && !this.isMobile) {
                    if (!document.querySelector('.animate-video_width')) {
                        setTimeout(() => {
                            this.ChangeTwoScroll(true);
                        }, 1000);
                    }
                    video.classList.add('animate-video_width');
                    if (this.twoScroll) {
                        this.ChangeTwoScroll(false);
                        this.resize('63vh');
                        block.classList.add('animate-block-medium');
                        setTimeout(() => {
                            this.ChangeThreeScroll(true);
                        }, 1000);
                    }
                    if (this.threeScroll) {
                        this.ChangeThreeScroll(false);
                        this.ChangeFirstLoadMain(false);
                        this.resize('100vh');
                        block.classList.add('animate-block-bottom');
                        header.classList.add('animate-header');
                        setTimeout(() => {
                            document.body.style.overflow = 'auto';
                        }, 1000);
                    }
                }
            }
        },

        // setDataAnimateFalse(selector = '') {
        //     document.querySelectorAll(selector + '[data-animate="true"]').forEach((item) => {
        //     item.setAttribute('data-animate', false);
        //     item.setAttribute('data-delay', true);
        //   });
        // },
        // num2str(n, text_forms) {
        //   n = Math.abs(n) % 100;
        //   let n1 = n % 10;
        //   if (n > 10 && n < 20) {
        //     return text_forms[2];
        //   }
        //   if (n1 > 1 && n1 < 5) {
        //     return text_forms[1];
        //   }
        //   if (n1 === 1) {
        //     return text_forms[0];
        //   }
        //   return text_forms[2];
        // },
        // scrollToBlock(selector) {
        //   let elem = document.querySelector(selector);
        //   if (elem) {
        //     let animationOffset = elem.getAttribute('data-animate') === 'false' ? 50 : 0;
        //     let top = elem.getBoundingClientRect().top + window.pageYOffset -
        //       document.querySelector('header').clientHeight - animationOffset;
        //     window.scrollTo({
        //       top: top,
        //       behavior: 'smooth',
        //     });
        //   }
        // },
        //
        // openModal(data) {
        //   this.disableScroll();
        //   this.Open(data);
        // },
        // closeModal() {
        //   this.enableScroll();
        //   this.Close();
        // },
        // preventDefault(e) {
        //   e = e || window.event;
        //   if (e.preventDefault)
        //     e.preventDefault();
        //   e.returnValue = false;
        // },
        // preventDefaultForScrollKeys(e) {
        //   if (this.keys[e.keyCode]) {
        //     this.preventDefault(e);
        //     return false;
        //   }
        // },
        disableScroll() {
            window.removeEventListener('scroll', this.scrollNavMenu);
            if (this.isMobile) {
                const body = document.querySelector('body');
                if (body.style.position !== 'fixed') {
                    const heightScroll = window.pageYOffset;
                    body.style.cssText = `overflow-y: scroll; top: ${-heightScroll}px; position: fixed;`;
                }
            } else {
                if (window.addEventListener)
                    // older FF
                    window.addEventListener(
                        'DOMMouseScroll',
                        this.preventDefault,
                        { passive: false },
                    );
                document.addEventListener('wheel', this.preventDefault, {
                    passive: false,
                }); // Disable scrolling in Chrome
                document.addEventListener('touchmove', this.preventDefault, {
                    passive: false,
                }); // mobile
                window.onwheel = this.preventDefault; // modern standard
                window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
                // window.ontouchmove  = preventDefault; // mobile
                document.onkeydown = this.preventDefaultForScrollKeys;
            }
        },
        enableScroll() {
            window.addEventListener('scroll', this.scrollNavMenu);
            if (this.isMobile) {
                const body = document.querySelector('body');
                const heightTop = body.style.top;

                if (heightTop) {
                    body.style.cssText =
                        'overflow-y: auto; top: auto; position: relative;';
                    window.scrollTo({
                        top: -parseInt(heightTop),
                        behavior: 'instant',
                    });
                    if (
                        this.$route.name === 'main' ||
                        this.$route.name === 'boat-id'
                    ) {
                        if (-parseInt(heightTop) > window.innerHeight) {
                            document
                                .querySelector('.t-header')
                                .classList.remove('headerMainBoat');
                        } else {
                            document
                                .querySelector('.t-header')
                                .classList.add('headerMainBoat');
                        }
                    }
                }
            } else {
                if (window.removeEventListener)
                    window.removeEventListener(
                        'DOMMouseScroll',
                        this.preventDefault,
                        { passive: false },
                    );
                document.removeEventListener('wheel', this.preventDefault, {
                    passive: false,
                }); // Enable scrolling in Chrome
                document.removeEventListener('touchmove', this.preventDefault, {
                    passive: false,
                }); // mobile
                window.onmousewheel = document.onmousewheel = null;
                window.onwheel = null;
                // window.ontouchmove = null;
                document.onkeydown = null;
            }
        },
        scrollNavMenu() {
            const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;
            this.isScrollTop = window.pageYOffset > this.offset;
            this.isFirstScreen = window.scrollY < window.innerHeight;
            if (
                !this.isFirstScreen ||
                (this.isFirstScreen &&
                    this.isMobile &&
                    !(
                        this.$route.name === 'main' ||
                        this.$route.name === 'boat-id'
                    ))
            ) {
                document
                    .querySelector('.t-header')
                    .classList.remove('animate-header');
                document
                    .querySelector('.t-header')
                    .classList.remove('headerMainBoat');
            } else if (
                (this.isFirstScreen &&
                    this.$route.name === 'main' &&
                    !this.firstLoadMain) ||
                (this.isFirstScreen &&
                    this.$route.name === 'boat-id' &&
                    !this.firstLoadBoat)
            ) {
                document
                    .querySelector('.t-header')
                    .classList.add('animate-header');
            }
            // скроллим вниз
            if (scrollTop > 80 && scrollTop > this.scrollPrev) {
                this.setOpenMenu(false);
                document.querySelector('.t-header').classList.add('out');
            } else {
                document.querySelector('.t-header').classList.remove('out');
            }
            this.scrollPrev = scrollTop;
        },

        closeMenu() {
            this.isFirstScreen = window.scrollY < window.innerHeight;
            if (this.openMenu) {
                document
                    .querySelector('.t-header__block-bottom')
                    .classList.add('_close');
                setTimeout(() => {
                    this.setOpenMenu(false);
                    this.enableScroll();
                }, 300);
            }
            setTimeout(() => {
                if (
                    (this.firstLoadMain && this.$route.name === 'main') ||
                    (this.firstLoadBoat && this.$route.name === 'boat-id')
                ) {
                    window.addEventListener('wheel', this.scrollAnimate);
                    window.addEventListener('mousewheel', this.scrollAnimate);
                    window.addEventListener(
                        'DOMMouseScroll',
                        this.scrollAnimate,
                    );
                    window.addEventListener(
                        'MozMousePixelScroll',
                        this.scrollAnimate,
                    );
                }
                // if (
                //     (this.isFirstScreen &&
                //         !this.isMobile &&
                //         this.$route.name === 'main' &&
                //         !this.firstLoadMain) ||
                //     (this.$route.name === 'boat-id' && !this.firstLoadBoat)
                // ) {
                //     document
                //         .querySelector('.t-header')
                //         .classList.add('animate-header');
                // } else if (
                //     this.isFirstScreen &&
                //     this.isMobile &&
                //     (this.$route.name === 'main' ||
                //         this.$route.name === 'boat-id')
                //     // eslint-disable-next-line no-empty
                // ) {
                //     document
                //         .querySelector('.t-header')
                //         .classList.add('headerMainBoat');
                // } else {
                //     document
                //         .querySelector('.t-header')
                //         .classList.remove('animate-header');
                //     document
                //         .querySelector('.t-header')
                //         .classList.remove('headerMainBoat');
                // }
            }, 1500);
        },
    },
    created() {
        this.setIsMobile();
        window.addEventListener('resize', () => this.setIsMobile());

        this.staticText = window.staticText;

        // расчет текущего года для футера
        this.currentYear = new Date().getFullYear();
    },
    mounted() {
        setTimeout(() => {
            this.firstLoad = true;
        }, 1550);
        if (this.isMobile) {
            this.ChangeFirstLoadBoat(false);
            this.ChangeFirstLoadMain(false);
            document.body.style.overflow = 'auto';
        }
    },
    beforeMount() {
        const content = document.getElementById('content');
        window.content = content.innerHTML;

        if (typeof content.remove === 'function') {
            // If support  is found
            content.remove();
        } else {
            // If not
            content.outerHTML = '';
        }
    },
});

// переход по ссылке
function linkAction(e, item) {
    e.preventDefault();
    if (item.getAttribute('to')) {
        console.log(item.getAttribute('to'));
        router.push(item.getAttribute('to')).catch((err) => {
            console.log('linkAction router push error', err);
        });
    } else {
        const path = item.getAttribute('href');

        if (path.indexOf(router.history.base) !== -1) {
            const newPath = path.replace(router.history.base, '');

            router.push(newPath).catch((err) => {
                console.log('linkAction router push error', err);
            });
        }
        if (
            router.currentRoute.fullPath !== path &&
            path.indexOf(router.history.base) === -1
        ) {
            router.push(path).catch((err) => {
                console.log('linkAction router push error', err);
            });
        }
    }
}
