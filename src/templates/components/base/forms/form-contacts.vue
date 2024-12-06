<template>
    <div class="t-form-wrapper">
        <div class="t-form__description">
            <div class="t-form__contacts t-form__contacts-not-mt">
                <div v-for="(item, index) in phones" :key="index"  class="t-form__contacts-phone">
                    <span v-if="!isMobile" class="t-form__contacts-text">{{ item.department }}</span>
                    <a 
                        v-for="(phone, index) in item.phones" :key="index"
                        :href="'tel:' + phone"
                        class="t-form__contacts-link _border"
                    >
                        <span v-if="!isMobile">{{phone}}</span>
                        <span v-if="isMobile" class="t-form__contacts-text">{{ item.department }}</span>
                        <div v-if="isMobile" class="t-form__contacts-icon">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.799805 2.39883C0.799805 1.97448 0.968376 1.56752 1.26843 1.26746C1.56849 0.967399 1.97546 0.798828 2.3998 0.798828H5.0238C5.19164 0.798956 5.35518 0.851865 5.49129 0.950068C5.6274 1.04827 5.72917 1.18679 5.7822 1.34603L6.9806 4.94043C7.04133 5.1231 7.03414 5.32154 6.96038 5.49934C6.88661 5.67715 6.75121 5.82239 6.579 5.90843L4.7734 6.81243C5.65846 8.77126 7.22737 10.3402 9.1862 11.2252L10.0902 9.41963C10.1762 9.24743 10.3215 9.11202 10.4993 9.03825C10.6771 8.96449 10.8755 8.95731 11.0582 9.01803L14.6526 10.2164C14.812 10.2695 14.9506 10.3714 15.0488 10.5077C15.147 10.6439 15.1998 10.8077 15.1998 10.9756V13.5988C15.1998 14.0232 15.0312 14.4301 14.7312 14.7302C14.4311 15.0303 14.0242 15.1988 13.5998 15.1988H12.7998C6.1726 15.1988 0.799805 9.82603 0.799805 3.19883V2.39883Z" stroke="#022855" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="bevel"/>
                            </svg>
                        </div>
                    </a>
                </div>

                <div class="t-form__contacts-mail">
                    <span v-if="!isMobile" class="t-form__contacts-text">{{ $root.staticText.mail }}</span>
                    <a class="t-form__contacts-link _border" :href="'mailto:' + email">
                        <span v-if="!isMobile">{{email}}</span>
                        <span v-if="isMobile">{{ $root.staticText.mail }}</span>
                        <div v-if="isMobile" class="t-form__contacts-icon">
                            <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.949805" y="1.05039" width="13.1" height="9.9" rx="1.35" stroke="#022855" stroke-width="1.3" stroke-linejoin="round"/>
                                <path d="M1.09961 1.59961L6.0854 6.5854C6.86644 7.36644 8.13277 7.36644 8.91382 6.5854L13.8996 1.59961" stroke="#022855" stroke-width="1.3"/>
                            </svg>
                        </div>
                    </a>
                </div>
                <div class="t-form__contacts-address">
                    <span class="t-form__contacts-text">{{ $root.staticText.address }}</span>
                    <span class="t-form__contacts-link">{{address}}</span>
                </div>
            </div>
        </div>
        <template>
            <form-cmp
                :form="form"
                :action="action"
                :referer="referer"
                :formname="formname"
                :id="id"
            >
            </form-cmp>  
        </template>  
    </div>
    
</template>

<script>
    import formCmp from "@components/base/forms/form";
    import { mapState } from 'vuex';

    export default {
        name: "form-feedback-file",
        props: ['action', 'title', 'text', 'referer', 'formname', 'id'],
        data() {
            return {
                phones: phones,
                email: email,
                address: address
            }
        },
        computed: {
            ...mapState('mobile', ['isMobile']),
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
                        pattern: /[a-zа-яё ]{2,}/,
                        errorText: this.$root.staticText.errorTextName
                    },
                    {
                        label: this.$root.staticText.surname,
                        name: 'surname',
                        type: 'text',
                        value: '',
                        placeholder: '',
                        error: false,
                        valid: false,
                        required: false,
                        focus: false,
                        pattern: /[a-zа-яё ]{2,}/,
                        errorText: this.$root.staticText.errorTextSurname
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
                        pattern: /^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                        errorText: this.$root.staticText.errorTextEmail
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
                        pattern: /^\+[0-9]{1}\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}/i,
                        errorText: this.$root.staticText.errorTextPhone
                    },
                ]
            }
        },
        components: {
            'form-cmp': formCmp
        },
    }
</script>

<style>

</style>