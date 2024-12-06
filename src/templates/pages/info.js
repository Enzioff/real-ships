/* eslint-disable no-unused-vars */
const data = {
    title: 'Настоящие Корабли',
    description: 'Российские яхты голландского качества',
    media: {
        mark: 'video' /* image || video */,
        type: 'file' /* video -> file || image -> '' */,
        src:
            '/uploads/video/landscape_757_61fb9d4b3acd6_620099638f50e_1_622afc7daf1ef.mp4',
    },
    models: [
        {
            id: 1,
            name: 'ЧАСТНЫЕ СУДА',
            thesis:
                'Индивидуальный подход к каждому клиенту c возможностью создания уникальной яхты своей мечты',
            items: [
                {
                    title: 'Название 1',
                    img: '/uploads/img/commercial-boat.png',
                    text:
                        'Это прогулочная яхта с открытым кокпитом спроектирована для длительного нахождения на борту от 4-х до 8 человек. Прогулка выходного дня с друзьями, увлекательное путешествие с семьей, сложный морской переход – все эти возможности дарит яхта RESPECT ОК.',
                    icon: '/uploads/img/available-boat.png',
                    link: '/models/id',
                },
                {
                    title: 'Название 1',
                    img: '/uploads/img/available-boat.png',
                    text: 'Краткое описание',
                    icon: '/uploads/img/commercial-boat.png',
                    link: '/models/test3',
                },
            ],
        },
        {
            id: 2,
            name: 'коммерческие суда',
            thesis:
                'Возможна реализовация любого подобного типового проека или строительство судна по индивидуальному проекту заказчика',
            items: [
                {
                    title: 'Название один два три',
                    img: '/uploads/img/commercial-boat.png',
                    text: 'Краткое описание',
                    param: 'Характеристика',
                    link: '/models/nazvaniye_odin_dva_tri',
                },
                {
                    title: 'Название 2',
                    img: null,
                    text: null,
                    param: null,
                    link: '/models/_id',
                },
            ],
        },
    ],
    production: {
        shipyard: {
            thesis: 'о нашей верфи',
            media: {
                mark: 'video' /* image || video */,
                type: 'youtube' /* video -> youtube/file || image -> '' */,
                src: 'https://www.youtube.com/watch?v=E0hnI4_egl8',
            },
        },
        approach: {
            thesis: 'наш подход',
            description:
                'квалифицированная команда специалистов с ответственным отношением к любимому делу',
        },
        about: {
            thesis: 'о нас',
            slider: [
                {
                    title: 'Современное производство',
                    description:
                        'Построенно по всем правилам и канонам голландского яхтостроения в 2012 году на территории Калининградской области',
                },
                {
                    title: 'Гарантия качества',
                    description:
                        'В процессе судостроения используется только самое передовое оборудование и проектные решения. Специалисты верфи прошли полное обучение и стажировки в Голландии, что гарантирует качество исполнения наших яхт',
                },
                {
                    title: 'Полная кастомизация',
                    description:
                        'Благодаря нашим проектным и конструкторским компетенциям мы имеем уникальную возможность строить не только модели базовой комплектации, но и воплощать в жизнь желания самых требовательных клиентов',
                },
            ],
        },
    },
    benefits: [
        {
            title: 'Современный дизайн',
            description:
                'Современный голландский дизайн линейки, продуманная планировка',
            img: '/uploads/img/benefits-slider.jpg',
        },
        {
            title: 'сталь марки KRUPP',
            description:
                'Современный голландский дизайн линейки, продуманная планировка',
            img: '/uploads/img/benefits-slider.jpg',
        },
        {
            title: 'Полный контроль процесса производства',
            description:
                'Современный голландский дизайн линейки, продуманная планировка',
            img: '/uploads/img/benefits-slider.jpg',
        },
        {
            title: 'Full Custom',
            description:
                'Современный голландский дизайн линейки, продуманная планировка',
            img: '/uploads/img/benefits-slider.jpg',
        },
        {
            title: 'Привлекательная стоимость',
            description:
                'Современный голландский дизайн линейки, продуманная планировка',
            img: '/uploads/img/benefits-slider.jpg',
        },
        {
            title: 'суда класса люкс',
            description:
                'Современный голландский дизайн линейки, продуманная планировка',
            img: '/uploads/img/benefits-slider.jpg',
        },
        {
            title: 'сертификат СЕ и номер СIN',
            description:
                'Современный голландский дизайн линейки, продуманная планировка',
            img: '/uploads/img/benefits-slider.jpg',
        },
    ],
    medias: {
        tabs: [
            {
                id: 9,
                name: 'Пресса',
            },
            {
                id: 10,
                name: 'Кейсы',
            },
            {
                id: 12,
                name: 'Пресса о нас',
            },
        ],
        media: [
            {
                id: 30,
                link: '/media/zagolovok_3',
                tag: 'Кейсы',
                img: '/uploads/img/media-item.jpg',
                title: 'Кейс1',
                text:
                    'Все все все все все проекты каждой торговой линейки &mdash; Courage, Respect, Tridente и Rubicon &mdash; были созданы с нуля и, что называется, вышли &laquo;из-под одного карандаша&raquo;, поэтому полных аналогов вы нигде не найдете.',
                date: '27 января 2022',
            },
            {
                id: 29,
                link: '/media/456',
                tag: 'Кейсы',
                img: '/uploads/img/media-item.jpg',
                title: 'кейс2',
                text: '123123123',
                date: '27 января 2022',
            },
            {
                id: 27,
                link: '/media/456',
                tag: 'Кейсы',
                img: '/uploads/img/benefits-slider.jpg',
                title: 'кейс3',
                text: null,
                date: '27 января 2022',
            },
            {
                id: 26,
                link: '/media/zagolovok_3',
                tag: 'Пресса',
                img: '/uploads/img/benefits-slider.jpg',
                title: 'Пресса1',
                text:
                    'Все все все все все проекты каждой торговой линейки &mdash; Courage, Respect, Tridente и Rubicon &mdash; были созданы с нуля и, что называется, вышли &laquo;из-под одного карандаша&raquo;, поэтому полных аналогов вы нигде не найдете.',
                date: '27 января 2022',
            },
            {
                id: 8,
                link: '/media/456',
                tag: 'Пресса',
                img: '/uploads/img/benefits-slider.jpg',
                title: 'Пресса2',
                text: null,
                date: '27 января 2022',
            },
            {
                id: 7,
                link: '/media/456',
                tag: 'Пресса',
                img: '/uploads/img/benefits-slider.jpg',
                title: 'Пресса3',
                text: null,
                date: '27 января 2022',
            },
            {
                id: 6,
                link: '/media/zagolovok_3',
                tag: 'Пресса о нас',
                img: '/uploads/img/media-item.jpg',
                title: '111',
                text:
                    'Все все все все все проекты каждой торговой линейки &mdash; Courage, Respect, Tridente и Rubicon &mdash; были созданы с нуля и, что называется, вышли &laquo;из-под одного карандаша&raquo;, поэтому полных аналогов вы нигде не найдете.',
                date: '27 января 2022',
            },
            {
                id: 5,
                link: '/media/456',
                tag: 'Пресса о нас',
                img: '/uploads/img/media-item.jpg',
                title: '222',
                text: '222',
                date: '27 января 2022',
            },
            {
                id: 4,
                link: '/media/456',
                tag: 'Пресса о нас',
                img: '/uploads/img/benefits-slider.jpg',
                title: '333',
                text: null,
                date: '27 января 2022',
            },
        ],
    },
};
