import routerPageHook from '@utilities/routerPageHook.js';
import Vue from 'vue';
import { mapMutations, mapState } from 'vuex';

import Modal from '@components/base/modals/modal.vue';
import ButtonLink from '@components/ui-components/button-link/component';
import Cursor from '@components/ui-components/cursor/component';
import SocialNetworks from '@components/ui-components/social-networks/component';
import Video from '@components/ui-components/video/video.vue';

export default {
    name: 'index',
    data() {
        return {
            template: '<main></main>',
        };
    },
    computed: {
        ...mapState('mobile', ['isMobile']),
    },
    methods: {
        ...mapMutations('modal', ['Open']),
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
    components: {
        'social-networks-cmp': SocialNetworks,
        'button-link-cmp': ButtonLink,
        'modal-cmp': Modal,
        'video-cmp': Video,
        'cursor-cmp': Cursor,
    },
    ...routerPageHook,
    render(createElement) {
        return Vue.compile(this.template).render.call(this, createElement);
    },
};
