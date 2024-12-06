/* eslint-disable no-unused-vars */
const data = {
    head:
        '<link href="/dist/main.min.css" rel="stylesheet">' +
        '<title>Real Ships</title>' +
        '<meta name="description" content="test description">' +
        '<meta name="keywords" content="keywords">',
    body:
        '<script type="text/javascript" src="/dist/main.min.js"></script>' +
        '<script type="text/javascript" src="/dist/vendors.min.js"></script>' +
        '<script type="text/javascript" src="/dist/runtime.min.js"></script>',
    menu: [
        {
            id: 1,
            link: '/models',
            title: 'Модельный ряд',
        },
        {
            id: 2,
            link: '/about',
            title: 'О компании',
        },
        {
            id: 3,
            link: '/media',
            title: 'Медиа',
        },
        {
            id: 4,
            link: '/contacts',
            title: 'Контакты',
        },
        {
            id: 5,
            link: '/vacancies',
            title: 'Вакансии',
        },
    ],
    footerPhone: '+7 906 219-50-00',
    phones: [
        {
            department: 'Отдел продаж',
            phones: ['+7 906 219-50-00'],
        },
        {
            department: 'Отдел логистики',
            phones: ['+7 927 155-84-06'],
        },
    ],
    address:
        'Россия, 238322, Калининградская область посёлок Ушаково, переулок Портовый, строение 1',
    email: 'lider@real-ships.ru',
    privateBoats: [
        {
            link: '/models/id',
            icon: '/uploads/img/model.png',
            title: 'Courage',
        },
        {
            link: '/models/id',
            icon: '/uploads/img/model.png',
            title: 'Respect OK',
        },
        {
            link: '/models/id',
            icon: '/uploads/img/model.png',
            title: 'Respect AK',
        },
        {
            link: '/models/id',
            icon: '/uploads/img/model.png',
            title: 'Respect FLY',
        },
        {
            link: '/models/id',
            icon: '/uploads/img/model.png',
            title: 'Rubicon',
        },
        {
            link: '/models/id',
            icon: '/uploads/img/model.png',
            title: 'Tridente',
        },
        {
            link: '/models/id',
            icon: '/uploads/img/model.png',
            title: 'Voyage',
        },
    ],
    social: [
        {
            id: 1,
            link: '#',
            icon: '/uploads/img/footer-social.svg',
        },
        {
            id: 2,
            link: '#',
            icon: '/uploads/img/footer-social.svg',
        },
        {
            id: 3,
            link: '#',
            icon: '/uploads/img/footer-social.svg',
        },
        {
            id: 4,
            link: '#',
            icon: '/uploads/img/footer-social.svg',
        },
    ],
    privacyPolicy: '/personalLink',
    useTerms: '/personalLink',
    year: '2021',
    locale: [
        {
            label: 'Ru',
            value: '',
            current: true,
        },
        {
            label: 'En',
            value: 'en',
            current: false,
        },
        {
            label: 'De',
            value: 'de',
            current: false,
        },
    ],
    staticText: {
        name: 'Имя',
        surname: 'Фамилия',
        email: 'E-mail',
        phone: 'Телефон',
        message: 'Задайте свой вопрос',
        position: 'Желаемая должность',
        file:
            'Нажмите на поле для загрузки или просто перетащите файл (3 файла max)',
        messageVacancy: 'Расскажите нам о своем опыте',
        submit: 'Отправить',
        further: 'Далее',

        mail: 'Почта',
        feedbackVacancyTab: 'Персональные данные',
        feedbackVacancyTab2: 'Информация о вакансии',

        address: 'Адрес',

        textCookie: 'Мы используем файлы',
        linkTextCookie: 'Cookie',
        btnCookie: 'Принять',

        step: 'Шаг',
        formBtnSend: 'Отправить',
        formTextError: 'Поле обязательно к заполнению',
        modalClose: 'Закрыть',
        textPersonalData: 'Я даю согласие на обработку персональных данных',

        errorTextName: 'Имя введено некорректно',
        errorTextSurname: 'Фамилия введена некорректно',
        errorTextEmail: 'E-mail введен некорректно',
        errorTextPhone: 'Номер введен некорректно',
        errorTextPosition: 'Должность введена некорректно',
        errorTextFile: 'Некорректные файлы',
    },
};
