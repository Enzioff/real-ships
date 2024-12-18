import { yandexMap, ymapMarker } from 'vue-yandex-maps';

export default {
    data() {
        return {
            // myMap: undefined,
            // myPlacemark: undefined,
            settings: {
                apiKey: '30f94a34-0c98-4e2b-b89a-2e27c0173380',
                lang: 'ru_RU',
                coordorder: 'latlong',
                version: '2.1',
            },
        };
    },
    props: ['coords'],
    components: { yandexMap, ymapMarker },
    methods: {
        /* eslint no-undef: 'off' */
        // initMap() {
        //     ymaps.ready(this.init);
        // },
        // init() {
        //     this.myMap = new ymaps.Map('map', {
        //         center: this.coords,
        //         zoom: 16,
        //         controls: ['zoomControl'],
        //     });
        //     this.myPlacemark = new ymaps.Placemark(
        //         this.coords,
        //         {
        //             hintContent: '',
        //             balloonContent: 'ТВ2',
        //         },
        //         {
        //             iconLayout: 'default#image',
        //             iconImageHref: '/assets/img/map_icon.png',
        //             iconImageSize: [64, 80],
        //             // Смещение левого верхнего угла иконки относительно
        //             // её "ножки" (точки привязки).
        //             iconImageOffset: [-30, -80],
        //         },
        //     );
        //     this.myMap.geoObjects.add(this.myPlacemark);
        //     this.myMap.behaviors.disable('scrollZoom');
        // },
    },
    mounted() {
        // setTimeout(() => {
        //     const mapScript = document.querySelector(
        //         'script[src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"]',
        //     );
        //     if (!mapScript) {
        //         const script = document.createElement('script');
        //         script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
        //         document.body.appendChild(script);
        //         script.onload = () => {
        //             this.initMap();
        //         };
        //     } else {
        //         this.initMap();
        //     }
        // }, 300);
    },
};
