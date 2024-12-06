import Vue from 'vue';

/* eslint import/no-cycle: [2, { maxDepth: 1 }] */

// import { store } from '@src/store/index';

export function beforeRouteEnter(to, from, next) {
    // window.scrollTo({ top: 0 });
    //
    // if (store.state.mobile.mobileMenuVisible) {
    //   store.commit('mobile/toogleMobileMenu');
    // }

    if (
        to.name === '404' ||
        to.name === 'thanks' ||
        to.name === 'thanks-subscription' ||
        to.name === 'thanks-vacancies'
    ) {
        document.getElementById('app').style.minHeight = 'auto';
    } else {
        document.getElementById('app').style.minHeight = '200vh';
    }

    if (window.content) {
        next((vm) => {
            // console.log('window.content=', window.content);
            vm.template = window.content;
            window.content = undefined;
        });
    } else {
        Vue.http.get(`templates${to.path}`, { params: to.query }).then(
            (data) => {
                next((vm) => {
                    // console.log('template=', data.data);
                    /* eslint no-param-reassign: "error" */
                    vm.template = data.data;
                });
            },
            () => next('/404'),
        );
    }
}

export function beforeRouteUpdate(to, from, next) {
    if (document.querySelector('.t-page-main__media-content')) {
        document.querySelector('.t-page-main__media-content').style.opacity =
            '0';
    }
    Vue.http.get(`templates${to.path}`, { params: to.query }).then(
        (data) => {
            next();
            this.template = data.data;
            setTimeout(() => {
                if (document.querySelector('.t-page-main__media-content')) {
                    document.querySelector(
                        '.t-page-main__media-content',
                    ).style.opacity = '1';
                }
            }, 300);
        },
        () => next('/404'),
    );
}

export default { beforeRouteUpdate, beforeRouteEnter };
