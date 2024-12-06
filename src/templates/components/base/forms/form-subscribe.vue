<template>
    <div class="t-form-wrapper t-form-small">
        <div class="t-form__description">
            <h2 class="t-form__title">{{ title }}</h2>
            <p class="t-form__text">{{ text }}</p>
        </div>
        <template>
            <form-cmp
                :form="form"
                :action="action"
            >
            </form-cmp>  
        </template>  
    </div>
    
   
</template>

<script>
    import formCmp from "@components/base/forms/form";

    export default {
        name: "form-feedback-file",
        props: ['action', 'title', 'text'],
        computed: {
            form() {
                return [
                    {
                        label: this.$root.staticText.email,
                        statusIcon: true,
                        name: 'email',
                        type: 'text',
                        value: '',
                        placeholder: '',
                        error: false,
                        valid: false,
                        focus: false,
                        pattern: /^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i
                    },
                ]
            },
        },
        components: {
            'form-cmp': formCmp
        },
    }
</script>

<style>

</style>