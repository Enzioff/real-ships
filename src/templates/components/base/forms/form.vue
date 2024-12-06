<template>
    <form
        class="t-form"
        :class="{_disabled: infoForm.disabledForm}"
        @submit.prevent="submit()"
    >
        <div class="t-form__wrap">
            <div
                v-for="(item, index) in cmpForm" :key="index"
                class="t-form__block"
                :class="[
                    {'_hidden': item.type === 'hidden'},
                    {'_error': item.error, '_valid': item.valid},
                    {'_border-bottom': item.type !== 'dropzone'}
                ]"
            >
                <div
                    v-if="item.label"
                    class="t-form__label"
                    :class="{_opacity: item.focus || item.value !== '', _star: item.required}"
                >
                    {{ item.label }}
                </div>
                <div
                    v-if="item.statusIcon"
                    class="t-form__status-icon"
                >
                    <button>
                        <svg v-if="btn === 'btnText'" width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.48389 1.01331L15.5566 7.08598C16.3376 7.86703 16.3376 9.13336 15.5566 9.91441L9.48389 15.9871" stroke="#022855" stroke-width="2"/>
                            <path d="M16 8.5H0" stroke="#022855" stroke-width="2"/>
                        </svg>
                        <svg v-if="btn === 'btnSuccess'" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_3766_4134)">
                                <path d="M2.19995 9.5L7.1497 14.4497C7.54022 14.8403 8.17339 14.8403 8.56391 14.4497L17.7563 5.25736" stroke="#022855" stroke-width="2"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_3766_4134">
                                    <rect width="20" height="20" fill="white" transform="translate(0 0.5)"/>
                                </clipPath>
                            </defs>
                        </svg>
                        <svg v-if="btn === 'btnError'" width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.42847 1L9.08532 6.65685C9.86637 7.4379 9.86637 8.70423 9.08532 9.48528L3.42847 15.1421" stroke="#022855" stroke-width="2"/>
                            <path d="M16.571 15.1426L10.9142 9.48572C10.1331 8.70468 10.1331 7.43835 10.9142 6.6573L16.571 1.00044" stroke="#022855" stroke-width="2"/>
                        </svg>
                    </button>
                </div>
                <input
                    v-if="item.type === 'text'"
                    class="t-form__input"
                    v-model="item.value"
                    :name="item.name"
                    @input="resetError(index)"
                    @focus="item.focus = true"
                    @blur="item.focus = false"
                    :aria-label="item.label"
                />
                <input
                    v-if="item.type === 'phone'"
                    v-mask="'+7(###)###-##-##'"
                    class="t-form__input"
                    v-model="item.value"
                    :name="item.name"
                    @input="resetError(index)"
                    @focus="item.focus = true"
                    @blur="item.focus = false"
                    :aria-label="item.label"
                />
                <textarea
                    v-if="item.type === 'textarea'"
                    class="t-form__textarea"
                    v-model="item.value"
                    :name="item.name"
                    @input="resetError(index)"
                    @focus="item.focus = true"
                    @blur="item.focus = false"
                >
                </textarea>
                <div
                v-if="item.error"
                    class="t-form__text-error"
                >
                    {{item.errorText}}
                </div>
            </div>
        </div>
        <div v-if="checkboxPersonalData" class="t-personal-data" :class="{_error: infoForm.errorPersonalData}">
            <input
                ref="formcheckbox"
                @change="changePersonalDataFrom()"
                type="checkbox"
                :id="formname ? 'personal-data-' + formname : 'personal-data-feedback'"
                class="t-personal-data__input"
            >
            <label :for="formname ? 'personal-data-' + formname : 'personal-data-feedback'">
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.6667 1L4.50004 10.1667L0.333374 6" stroke="#F5F7FA" stroke-width="0.833333" stroke-linejoin="round"/>
                </svg>
                <span>
                    <a :href="personalLink" target="_blank" v-text="$root.staticText.textPersonalData"></a>
                </span>
            </label>
        </div>
        <div class="t-form__btn">
            <button class="t-button">
                <span v-if="btn === 'btnText'">{{ $root.staticText.formBtnSend }}</span>
                <svg v-if="btn === 'btnSuccess'" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_6679_4600)">
                        <path d="M3.51953 14.4014L11.1563 22.0381C11.9373 22.8192 13.2037 22.8192 13.9847 22.0381L28.4097 7.61314" stroke="#022855" stroke-width="2"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_6679_4600">
                            <rect width="32" height="32" fill="white" transform="translate(0 0.000976562)"/>
                        </clipPath>
                    </defs>
                </svg>
                <svg v-if="btn === 'btnError'" width="32" height="25" viewBox="0 0 32 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.48633 0.800781L15.3858 10.7003C16.1669 11.4813 16.1669 12.7477 15.3858 13.5287L5.48633 23.4282" stroke="#022855" stroke-width="2"/>
                    <path d="M26.5137 23.4287L16.6142 13.5292C15.8331 12.7482 15.8331 11.4818 16.6142 10.7008L26.5137 0.801295" stroke="#022855" stroke-width="2"/>
                </svg>
            </button>
        </div>
    </form>
</template>

<script>
  import Vue from 'vue';
  import { mapMutations } from "vuex";
  // import vue2Dropzone from 'vue2-dropzone';

  export default {
    props: {
        form: {
            type: Array,
            default: []
        },
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
        formname: {
            type: String,
            default: ''
        },
        checkboxPersonalData: {
            type: Boolean,
        },
        referer: {
            type: String,
            default: ''
        },
        id: {
            type: Number,
        },
        
    },
    data() {
      return {
        personalLink: 'page/personalData',
        infoForm: {
          disabledForm: false,
          isPersonalData: false,
          errorPersonalData: false,
        },
        cmpForm: this.form,
        btn: 'btnText',
      }
    },
    methods: {
        ...mapMutations('modal', ['openModalRequests', 'closeModal']),

        submit() {
            let is_valid = true;

            for (let i = 0; i < this.cmpForm.length; i++) {
                this.cmpForm[i].error = false;
                if (this.cmpForm[i].pattern !== '' && (!this.cmpForm[i].required ? this.cmpForm[i].value !== '' : true)) {
                    this.cmpForm[i].valid = true;
                    if (this.cmpForm[i].pattern) {
                        if (!this.cmpForm[i].pattern.test(this.cmpForm[i].value.trimEnd())) {
                            this.cmpForm[i].error = true;

                            switch(this.cmpForm[i].name) {
                                case 'name': 
                                    this.cmpForm[i].errorText = this.$root.staticText.errorTextName
                                break
                                case 'surname':
                                    this.cmpForm[i].errorText = this.$root.staticText.errorTextSurname
                                break

                                case 'phone':
                                    this.cmpForm[i].errorText = this.$root.staticText.errorTextPhone

                                break
                                case 'email':
                                    this.cmpForm[i].errorText = this.$root.staticText.errorTextEmail

                                break
                            }
                            this.cmpForm[i].valid = false;
                            is_valid = false;
                        }
                    }
                }
                if (this.cmpForm[i].required && this.cmpForm[i].value === '') {
                    this.cmpForm[i].error = true;
                    this.cmpForm[i].valid = false;
                    is_valid = false;
                    this.cmpForm[i].errorText = this.$root.staticText.formTextError
                }
            }

            if (is_valid) {
                this.infoForm.disabledForm = true;
                let fd = new FormData();
                for (let i = 0; i < this.cmpForm.length; i++) {

                    if (this.cmpForm[i].name === 'file[]') {

                        for (let j = 0; j < this.files.length; j++) {
                            fd.append(this.cmpForm[i].name, this.files[j].file);
                        }
                        for (let j = 0; j < this.filesMoreArr.length; j++) {
                            fd.append(this.cmpForm[i].name, this.filesMoreArr[j].file);
                        }

                    } else {
                        fd.append(this.cmpForm[i].name, this.cmpForm[i].value.trimEnd());
                    }

                    // fd.append('regionId', this.optionsCity.filter((item) => item.name === this.cmpForm[i].value)[0].id);

                    // getAcceptedFiles - только файлы удовлетворяющие ограничениям
                    // for (let j = 0; j < this.$refs.dropzone[0].getAcceptedFiles().length; j++) {
                    //     fd.append(this.cmpForm[i].name, this.$refs.dropzone[0].getAcceptedFiles()[j]);
                    // }

                }

                if (this.id) {
                    fd.append('modelId', this.id);
                }

                if (this.referer) {
                    fd.append('referer', this.referer);
                }

                if (this.formname) {
                    fd.append('nameForm', this.formname);
                }

                this.disabledBtn = true

                Vue.http.post(this.action, fd)
                    .then(response => response.json())
                    .then(data => {
                    this.infoForm.disabledForm = false;
                    if (data.success) {
                        this.closeModal();
                        this.openModalRequests('success');
                        this.clearFrom();
                        this.btn = 'btnSuccess'

                        setTimeout(() => {
                            this.disabledBtn = false
                            this.$router.push({
                                name: this.action === "subscribe" ? 'thanks-subscription' : 'thanks'
                            }).catch(err => {});
                        }, 500)

                    } else {
                        this.openModalRequests('error');
                        this.btn = 'btnError'
                        setTimeout(() => {
                            this.disabledBtn = false
                        }, 500)
                    }
                    })
                    .catch(() => {
                        this.infoForm.disabledForm = false;
                        this.openModalRequests('error');
                        this.btn = 'btnError'
                        setTimeout(() => {
                            this.disabledBtn = false
                        }, 500)
                    });
            }
        },


        resetError(index) {
            this.cmpForm[index].error = false;
            this.cmpForm[index].valid = false;
        },
        resetErrorEn(index, value) {
            if (value === '') {
            this.arrChar = [];
            this.arrKeyInputTel = [];
            }
            this.cmpForm[index].error = false;
            this.cmpForm[index].valid = false;
        },
        changePersonalDataFrom() {
            this.infoForm.isPersonalData = !this.infoForm.isPersonalData;
            this.infoForm.errorPersonalData = !this.infoForm.isPersonalData;
        },
        clearFrom() {
            for (let i = 0; i < this.cmpForm.length; i++) {
            this.cmpForm[i].error = false;
            this.cmpForm[i].valid = false;
            this.cmpForm[i].value = '';

            if (this.cmpForm[i].name === 'tab_id') {
                this.cmpForm[i].value = 'present';
            }
            }

            const checkbox = document.querySelectorAll('input[type="checkbox"]');
            checkbox.forEach(check => {
            check.checked = false
            })

            this.infoForm.isPersonalData = false;
            this.infoForm.errorPersonalData = false;
            this.files = []
            this.filesMoreArr = []
        }
    },
    mounted() {
    }
  }
</script>

<style lang="sass">

</style>