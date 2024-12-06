import routerPageHook from '@utilities/routerPageHook.js';
import Vue from 'vue';
import { mapState } from 'vuex';

import ButtonLink from '@components/ui-components/button-link/component';
import Cursor from '@components/ui-components/cursor/component';

export default {
    name: 'e404',
    data() {
        return {
            buttonText: null,
            template: '<main></main>',
        };
    },
    components: {
        'button-link-cmp': ButtonLink,
        'cursor-cmp': Cursor,
    },
    computed: {
        ...mapState('mobile', ['isMobile']),
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
    ...routerPageHook,
    render(createElement) {
        return Vue.compile(this.template).render.call(this, createElement);
    },
};
