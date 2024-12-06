export const phone = {
    title: 'Номер телефона *',
    value: '',
    placeholder: '+7 999 567 89 03',
    name: 'phone',
    error: false,
    mustBe: true,
    type: 'input',
    class: 't-form__block_w-50-30px',
    pattern: /^[+][\d]{1}[(][\d]{3}[)][\d]{3}[-][\d]{4}/,
};
export const input = {
    title: 'Имя Фамилия / Название компании *',
    value: '',
    placeholder: 'Константин Константинопольский',
    name: 'name',
    error: false,
    mustBe: true,
    type: 'input',
    class: '',
    pattern: /^[а-яА-Яa-zA-Z ]{2,30}$/,
};

export const email = {
    title: 'Email *',
    value: '',
    placeholder: 'Konstantinopolsky@yandex.ru',
    name: 'email',
    error: false,
    mustBe: true,
    type: 'input',
    class: 't-form__block_w-50',
    pattern: /^[A-Za-z0-9-_]+@[A-Za-z0-9-.]+\.[A-Za-z0-9]+$/,
};
export const textarea = {
    title: 'Может у вас остались вопросы?',
    value: '',
    placeholder: 'Напишите свой вопрос или предложение',
    name: 'message',
    error: false,
    mustBe: false,
    type: 'text',
    class: '',
    rows: 2,
    pattern: '',
};
export const document = {
    title: 'ПРИКРЕПИТЬ РЕЗЮМЕ',
    name: 'document',
    error: false,
    mustBe: false,
    type: 'files',
    class: '',
    value: '',
};
export const checkbox = {
    title:
        'Я согласен на <a href="#" target="_blank">обработку персональных данных</a>',
    name: 'agree',
    error: false,
    mustBe: true,
    type: 'checkbox',
    class: '',
    value: false,
};

export const hidden = {
    title: '',
    value: '',
    placeholder: '',
    name: '',
    error: false,
    mustBe: true,
    type: 'hidden',
    class: '',
};
