// eslint-disable-next-line import/no-extraneous-dependencies

import { mapMutations } from 'vuex';

export default {
    data() {
        return {};
    },
    methods: {
        ...mapMutations('menu', ['setOpenMenu']),
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
                this.$refs.header.classList.add('out');
            } else {
                this.$refs.header.classList.remove('out');
            }
            this.scrollPrev = scrollTop;
        },

        closeMenu() {
            this.$root.closeMenu();
        },
    },
};
