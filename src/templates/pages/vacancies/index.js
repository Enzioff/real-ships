import routerPageHook from '@utilities/routerPageHook.js';
import Vue from 'vue';
import { mapState } from 'vuex';

import FormVacancies from '@components/base/forms/form-vacancies.vue';
import Button from '@components/ui-components/button/component';
import Cursor from '@components/ui-components/cursor/component';

export default {
    name: 'index',
    data() {
        return {
            template: '<main></main>',
            activeClass: [],
            routeName: '',
            hiddenText: false,
            idOpenVacancy: -1,
            idClickVacancy: null,
            activePosition: '',
        };
    },
    methods: {
        onVacancy(id) {
            if (id === this.idOpenVacancy) {
                this.idOpenVacancy = -1;
            } else {
                this.idOpenVacancy = id;
            }
        },
        changeHiddenText() {
            this.hiddenText = !this.hiddenText;
        },
        getActiveVacancy(activePosition, itemId) {
            this.activePosition = activePosition;
            this.idClickVacancy = itemId;
            const coord =
                document
                    .querySelector('.js-responseVacancy')
                    .getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: coord,
                behavior: 'smooth',
            });
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
    computed: {
        ...mapState('mobile', ['isMobile']),
    },
    components: {
        'button-cmp': Button,
        'form-vacancies-cmp': FormVacancies,
        'cursor-cmp': Cursor,
    },
    mounted() {
        this.routeName = this.$route.name;

        setTimeout(() => {
            if (
                this.isMobile &&
                document.querySelector('.js-height').clientHeight >= 300
            ) {
                this.hiddenText = true;
            }

            const vacancies = document.querySelector('.js-vacancies');
            if (vacancies) {
                const countVacancies = vacancies.querySelectorAll(
                    '.t-page-vacancies__item',
                ).length;
                if (countVacancies === 1) {
                    this.idOpenVacancy = 0;
                }
            }
        }, 50);
    },
    ...routerPageHook,
    render(createElement) {
        return Vue.compile(this.template).render.call(this, createElement);
    },
};
