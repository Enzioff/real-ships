import routerPageHook from '@utilities/routerPageHook.js';
import Vue from 'vue';
import { mapMutations, mapState } from 'vuex';

import FormContactsMessage from '@components/base/forms/form-contacts-message.vue';
import Modal from '@components/base/modals/modal.vue';
import ButtonLink from '@components/ui-components/button-link/component';
import Cursor from '@components/ui-components/cursor/component';
import SliderImg from '@components/ui-components/slider-img/component';
import TabsOriginal from '@components/ui-components/tabs-original/component';
import Video from '@components/ui-components/video/video.vue';

export default {
    name: 'index',
    data() {
        return {
            template: '<main></main>',
            routeName: '',
            buttonText: null,
            height: 0,
            hiddenTextOne: false,
            hiddenTextTwo: false,
            activeSpecification: 1,
            swiperOptionsBoat: {
                slidesPerView: 2,
                loop: true,
                speed: 800,
                spaceBetween: 24,
                grabCursor: true,
                autoHeight: true,
                noSwipingClass: 'no-swiping',
                pagination: {
                    el: '.t-page-boat-id__slider-pagination',
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
                breakpoints: {
                    1160: {
                        spaceBetween: 20,
                    },
                    920: {
                        slidesPerView: 1,
                    },
                },
            },
        };
    },
    computed: {
        ...mapState('mobile', ['isMobile']),
        ...mapState('animate', ['firstLoadBoat']),
        checkboxPersonalData() {
            return false;
        },
    },
    components: {
        'slider-img': SliderImg,
        'tabs-original-cmp': TabsOriginal,
        'button-link-cmp': ButtonLink,
        'form-contacts-message-cmp': FormContactsMessage,
        'modal-cmp': Modal,
        'video-cmp': Video,
        'cursor-cmp': Cursor,
    },
    methods: {
        ...mapMutations('modal', ['Open']),
        ...mapMutations('animate', ['ChangeFirstLoadBoat']),
        hiddenText(elem) {
            this.height = document.querySelector(elem).clientHeight;
            if (this.height > 297) {
                if (elem === '.js-text-one') {
                    this.hiddenTextOne = true;
                } else if (elem === '.js-text-two') {
                    this.hiddenTextTwo = true;
                }
            }
        },
        changeHiddenText(prop) {
            if (prop === 'hiddenTextTwo') {
                this.hiddenTextTwo = !this.hiddenTextTwo;
            } else if (prop === 'hiddenTextOne') {
                this.hiddenTextOne = !this.hiddenTextOne;
            }
        },
        scrollTo(elem) {
            if (!this.isMobile) {
                document
                    .querySelector('.t-page-boat-id')
                    .classList.add('noAnimate');
                document
                    .querySelector('.t-page-boat-id__promo')
                    .classList.add('height-max');
                document
                    .querySelector('.t-page-boat-id__promo-right')
                    .classList.add('animate-video_width-height');
                document
                    .querySelector('.t-header')
                    .classList.add('animate-header');
            }
            const coord =
                document.querySelector(elem).getBoundingClientRect().top +
                window.pageYOffset;
            document.body.style.overflow = 'auto';
            setTimeout(() => {
                window.scrollTo({
                    top: coord,
                    behavior: 'smooth',
                });
            }, 10);
        },
        getTabsActive(tab) {
            this.activeSpecification = +tab;
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
        setTimeout(() => {
            if (document.querySelector('.js-text-one')) {
                this.hiddenText('.js-text-one');
            }
            if (document.querySelector('.js-text-two')) {
                this.hiddenText('.js-text-two');
            }
        }, 2000);

        this.routeName = this.$route.name;

        if (document.querySelector('.js-boat-line')) {
            setTimeout(() => {
                let middleLines = null;
                const lines = document.querySelector('.js-boat-lines');
                const img = document.querySelector('.js-boat-img');
                const widthImg = img.offsetWidth;
                const numberLines = parseInt(lines.dataset.linesNumber, 10);

                const marginLines = widthImg / (numberLines - 1);

                if (numberLines % 2 !== 0) {
                    middleLines = Math.ceil(numberLines / 2);
                }

                for (let i = 0; i < numberLines; i += 1) {
                    lines.insertAdjacentHTML(
                        'afterbegin',
                        `
                        <div class="t-page-boat-id__specification-line js-boat-line"></div>
                    `,
                    );
                }

                /* eslint no-param-reassign: ["error", { "props": false }] */

                document.querySelectorAll('.js-boat-line').forEach((line) => {
                    line.style.marginRight = `${marginLines}px`;
                });

                if (middleLines) {
                    document
                        .querySelectorAll('.js-boat-line')
                        [middleLines - 1].classList.add('_middle');
                }
            }, 10);
        }

        if (this.firstLoadBoat && !this.isMobile) {
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
            document.querySelector('.t-header').classList.add('headerMainBoat');
        }
    },
    ...routerPageHook,
    render(createElement) {
        return Vue.compile(this.template).render.call(this, createElement);
    },
};
