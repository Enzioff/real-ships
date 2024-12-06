<template>
    <div class="t-form-wrapper"> 
        <div class="t-form__description">
            <h2 class="t-form__title">{{ title }}</h2>
            <p class="t-form__text">{{ text }}</p>
            <div class="t-form__contacts">
                <div class="t-form__contacts-phone">
                    <span class="t-form__contacts-text">{{ $root.staticText.phone }}</span>
                    <a 
                        :href="'tel:' + footerPhone"
                        class="t-form__contacts-link"
                    >
                        <span>{{footerPhone}}</span>
                    </a>
                </div>
                <div class="t-form__contacts-mail">
                    <span class="t-form__contacts-text">{{ $root.staticText.mail }}</span>
                    <a class="t-form__contacts-link" :href="'mailto:' + email"><span>{{email}}</span></a>
                </div>
            </div>
        </div>
        <template>
            <div class="t-form__inner">
                <div class="t-form__tabs">
                    <div 
                        v-for="(item, index) in tabs" 
                        :key="index" class="t-form__tabs-value" 
                        :class="{'active': activeTabs === item.id}"
                    >
                        <span v-if="activeTabs === item.id">
                            {{item.id}}. {{item.value}}
                        </span>
                        <span v-if="!isMobile && activeTabs !== item.id">
                            {{item.id}}. {{ item.value }}
                        </span>
                        <span v-if="isMobile && activeTabs !== item.id">
                            {{item.id}}. {{ $root.staticText.step }}
                        </span>
                    </div>
                </div>
                <form-cmp
                    ref="formCmp"
                    :form="form"
                    :tabValue="activeTabs"
                    :action="action"
                    :referer="referer"
                    :formname="formname"
                    :id="id"
                    @value-active-tab="getValueActiveTab"
                >
                </form-cmp> 
            </div>
            
        </template>  
        
    </div>
</template>

<script>
    import formCmp from "@components/base/forms/form-template-vacancies";
    import { mapState } from "vuex";

    export default {
        name: "form-feedback-file",
        props: {
            action: {
                type: String,
                default: 'callback'
            },
            title: {
                type: String,
                default: ''
            },
            text: {
                type: String,
                default: ''
            },
            tabValue: {
                type: Number,
                default: 1
            },
            position: {
                type: Array,
                default: () => null
            },
            active: {
                type: String,
                default: ''
            },
            id: {
                type: Number,
                default: 0
            },
            referer: {
                type: String,
                default: ''
            },
            formname: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                tabs: [
                    {
                        id: 1,
                        value: this.$root.staticText.feedbackVacancyTab,
                    },
                    {
                        id: 2,
                        value: this.$root.staticText.feedbackVacancyTab2
                    }
                ],
                activeTabs: 1,
                email: email,
                footerPhone: footerPhone
            }
        },
        methods: {
            getValueActiveTab(tab) {
                this.activeTabs = tab;
            }
        },
        computed: {
            ...mapState('mobile', ['isMobile']),
            form() {
                return [
                    {
                        label: this.$root.staticText.name,
                        tabVisible: 1,
                        name: 'name',
                        type: 'text',
                        value: '',
                        placeholder: '',
                        error: false,
                        valid: false,
                        required: true,
                        focus: false,
                        pattern: /[a-zа-яё]{2,256}/,
                        errorText: ''
                    },
                    {
                        label: this.$root.staticText.surname,
                        tabVisible: 1,
                        name: 'surname',
                        type: 'text',
                        value: '',
                        placeholder: '',
                        error: false,
                        valid: false,
                        required: true,
                        focus: false,
                        pattern: /[a-zа-яё]{2,256}/,
                        errorText: this.$root.staticText.errorTextSurname
                    },
                    {
                        label: this.$root.staticText.email,
                        tabVisible: 1,
                        name: 'email',
                        type: 'text',
                        value: '',
                        placeholder: '',
                        error: false,
                        valid: false,
                        required: true,
                        focus: false,
                        pattern: /^[+a-zA-Z0-9._-]{1,50}@[a-zA-Z0-9.-]{4,31}\.[a-zA-Z]{2,4}$/i,
                        errorText: this.$root.staticText.errorTextEmail
                    },
                    {
                        label: this.$root.staticText.phone,
                        tabVisible: 1,
                        name: 'phone',
                        type: 'phone',
                        value: '',
                        placeholder: '',
                        error: false,
                        valid: false,
                        required: true,
                        focus: false,
                        pattern: /^\+[0-9]{1}\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}/i,
                        errorText: this.$root.staticText.errorTextPhone
                    },
                    {
                        label: this.$root.staticText.position,
                        tabVisible: 2,
                        name: 'position',
                        type: 'select',
                        value: '',
                        placeholder: '',
                        error: false,
                        valid: false,
                        required: true,
                        focus: false,
                        pattern: /[a-zа-яё]{2,256}/,
                        options: this.position,
                        errorText: this.$root.staticText.errorTextPosition
                    },
                    {
                        label: this.$root.staticText.messageVacancy,
                        tabVisible: 2,
                        name: 'about',
                        type: 'textarea',
                        value: '',
                        placeholder: '',
                        error: false,
                        valid: false,
                        required: false,
                        focus: false,
                        pattern: /\S{2,}/i
                    },
                    {
                        label: '',
                        tabVisible: 2,
                        name: 'file[]',
                        multiple: true,
                        type: 'dropzone',
                        accept: '',
                        value: '',
                        placeholder: this.$root.staticText.file,
                        error: false,
                        valid: false,
                        required: false,
                        focus: '',
                        pattern: '',
                        errorText: this.$root.staticText.errorTextFile
                    },
                ]
            }
        },
        components: {
            'form-cmp': formCmp
        },
        updated() {
            this.$refs.formCmp.formUpdate(this.active);
        }
    }
</script>

<style>

</style>