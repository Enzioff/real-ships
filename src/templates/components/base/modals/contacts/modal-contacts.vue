<template>
    <div class="t-form-wrapper">
        <div class="t-form__description">
            <h2 class="t-form__title">{{ title }}</h2>
            <p class="t-form__text">{{ text }}</p>
        </div>
        <template>
            <form-cmp
                :form="form"
                action="contact"
                :checkboxPersonalData="true"
                :referer="routeName"
                formname="Свяжитесь с нами"
            >
            </form-cmp>  
        </template>  
    </div>
    
   
</template>

<script>
    import formCmp from "@components/base/forms/form";

    export default {
        name: "form-feedback-file",
        data() {
            return {
                routeName: '',
            }
        },
        props: ['action', 'title', 'text'],
        computed: {
            form() {
                return [
                    {
                        label: this.$root.staticText.name,
                        name: 'name',
                        type: 'text',
                        value: '',
                        placeholder: '',
                        error: false,
                        valid: false,
                        required: true,
                        focus: false,
                        pattern: /[a-zа-яё ]{2,}/
                    },
                    {
                        label: this.$root.staticText.surname,
                        name: 'surname',
                        type: 'text',
                        value: '',
                        placeholder: '',
                        error: false,
                        valid: false,
                        required: true,
                        focus: false,
                        pattern: /[a-zа-яё ]{2,}/
                    },
                    {
                        label: this.$root.staticText.email,
                        name: 'email',
                        type: 'text',
                        value: '',
                        placeholder: '',
                        error: false,
                        valid: false,
                        required: true,
                        focus: false,
                        pattern: /^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i
                    },
                    {
                        label: this.$root.staticText.phone,
                        name: 'phone',
                        type: 'phone',
                        value: '',
                        placeholder: '',
                        error: false,
                        valid: false,
                        required: true,
                        focus: false,
                        pattern: /^\+[0-9]{1}\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}/i
                    },
                    {
                        label: this.$root.staticText.message,
                        name: 'answer',
                        type: 'textarea',
                        value: '',
                        placeholder: '',
                        error: false,
                        valid: false,
                        required: false,
                        focus: false,
                        pattern: /\S{2,}/i
                    },
                ]
            }
        },
        components: {
            'form-cmp': formCmp
        },
        mounted() {
            this.routeName = this.$route.name;
        },
    }
</script>
