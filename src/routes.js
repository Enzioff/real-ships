import Error404 from '@pages/404/index';
import About from '@pages/about/index';
import Contacts from '@pages/contacts/index';
import Index from '@pages/index';
import MediaId from '@pages/media/id/index';
import Media from '@pages/media/index';
import BoatId from '@pages/models/id/index';
import Models from '@pages/models/index';
import Thanks from '@pages/thanks/index';
import ThanksSubscription from '@pages/thanks/subscription/index';
import ThanksVacancies from '@pages/thanks/vacancies/index';
import Vacancies from '@pages/vacancies/index';
import modelList from '@pages/modelList/index';
import Vue from 'vue';
import VueRouter from 'vue-router';

// import Reload from '@components/base/locale/reload.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'main',
        component: Index,
    },
    {
        path: '/media',
        name: 'media',
        component: Media,
    },
    {
        path: '/media/:id',
        name: 'media-id',
        component: MediaId,
    },
    {
        path: '/models',
        name: 'models',
        component: Models,
    },
    {
        path: '/models/:id',
        name: 'boat-id',
        component: BoatId,
    },
    {
        path: '/vacancies',
        name: 'vacancies',
        component: Vacancies,
    },
    {
        path: '/about',
        name: 'about',
        component: About,
    },
    {
        path: '/contacts',
        name: 'contacts',
        component: Contacts,
    },
    {
        path: '/thanks',
        name: 'thanks',
        component: Thanks,
        meta: {
            footerHide: true,
        },
    },
    {
        path: '/thanks-podpiska',
        name: 'thanks-subscription',
        component: ThanksSubscription,
        meta: {
            footerHide: true,
        },
    },
    {
        path: '/thanks-vacancies',
        name: 'thanks-vacancies',
        component: ThanksVacancies,
        meta: {
            footerHide: true,
        },
    },
    {
        path: '/modelList',
        name: 'modelList',
        component: modelList,
        meta: {
            footerHide: false,
        },
    },
    {
        path: '*',
        name: '404',
        component: Error404,
        meta: {
            footerHide: true,
        },
    },
];

export const router = new VueRouter({
    mode: 'history',
    routes,
    // наверх страницы будем прокручивать после перехода на страницу (router.afterEach), а не тут, потому что
    // scrollBehavior срабатывает только после анимации и получается скролл наверх уже после анимации перехода на страницу
    // здесь осталось только прокрутка, если нажали на кнопку назад в браузере
    scrollBehavior(to, from, savedPosition) {
        let position = { x: 0, y: 0 };

        if (savedPosition) {
            position = savedPosition;
        }

        return new Promise((resolve) => {
            if (to.name === from.name) {
                resolve();
            } else {
                // меньше 1000 не ставить (иначе не прокрутится),
                // анимация скролла наверх срабатывает через 800 (в router.afterEach)
                setTimeout(() => {
                    resolve(position);
                }, 1000);
            }
        });
    },
});
