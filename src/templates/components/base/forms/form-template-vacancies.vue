<template>
    <form
        class="t-form"
        :class="{_disabled: infoForm.disabledForm}"
        @submit.prevent="submit()"
    >
        <div class="t-form__wrap">
            <div class="t-form__wrap-tab-one" v-if="tabValue === 1">
                <div
                    v-if="item.tabVisible === tabValue"
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
                    <div
                        v-if="item.error"
                        class="t-form__text-error"
                        >
                        {{item.errorText}}
                    </div>
                </div>
                <div class="t-form__wrap-tab-one-btn js-btn-further" v-if="!validPartOneForm" @click="onClickFurther">
                    <button class="t-button">
                        <span>{{ $root.staticText.further }}</span>
                    </button>
                </div>
            </div>
            <div class="t-form__wrap-tab-two" v-else-if="tabValue === 2">
                <div
                    v-if="item.tabVisible === tabValue"
                    v-for="(item, index) in cmpForm" 
                    :key="index"
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
                    <template v-if="item.type === 'select'">
                        <!-- <div v-if="item.fixedValue" class="t-form__select-fixed">{{ item.fixedValue }}</div> -->
                        <div v-if="item.options">
                            <v-select
                                v-model="item.value"
                                :options="item.options"
                                :placeholder="item.placeholder"
                                class="t-form__select t-select"
                                :searchable = "false"
                                @click.native="resetError(index)"
                                @focus="item.focus = true"
                                @blur="item.focus = false"
                                :aria-label="item.label"
                            >
                            </v-select>
                        </div>
                        <div v-else>
                            <input
                                class="t-form__input"
                                v-model="item.value"
                                :name="item.name"
                                @input="resetError(index)"
                                @focus="item.focus = true"
                                @blur="item.focus = false"
                                :aria-label="item.label"
                                
                            />
                        </div>
                    </template>
                    <vue-dropzone
                        v-if="item.type === 'dropzone'"
                        id="dropzone"
                        ref="dropzone"
                        :options="dropzoneOptions"
                        :useCustomSlot="true"
                        @vdropzone-file-added="listenerFile()"
                    >
                        <div class="dropzone-custom-title">{{ item.placeholder }}</div>
                    </vue-dropzone>
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
            
        </div>
        <div class="t-form__btn t-form__btn-vacancy" v-if="validPartOneForm">
            <button class="t-button">
                <span v-if="btnText"> {{$root.staticText.submit}}  </span>
                <svg v-if="btnSuccess" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_6679_4600)">
                <path d="M3.51953 14.4014L11.1563 22.0381C11.9373 22.8192 13.2037 22.8192 13.9847 22.0381L28.4097 7.61314" stroke="#022855" stroke-width="2"/>
                </g>
                <defs>
                <clipPath id="clip0_6679_4600">
                <rect width="32" height="32" fill="white" transform="translate(0 0.000976562)"/>
                </clipPath>
                </defs>
                </svg>
                <svg v-if="btnError" width="32" height="25" viewBox="0 0 32 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.48633 0.800781L15.3858 10.7003C16.1669 11.4813 16.1669 12.7477 15.3858 13.5287L5.48633 23.4282" stroke="#022855" stroke-width="2"/>
                <path d="M26.5137 23.4287L16.6142 13.5292C15.8331 12.7482 15.8331 11.4818 16.6142 10.7008L26.5137 0.801295" stroke="#022855" stroke-width="2"/>
                </svg>
            </button>
        </div>
    </form>
</template>

<script>
  import Vue from 'vue';
  import { mapMutations, mapState } from "vuex";
  import vue2Dropzone from 'vue2-dropzone';

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
        tabValue: {
            type: Number,
            default: null
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
        referer: {
            type: String,
            default: ''
        },
        id: {
            type: Number,
            default: null
        },
    },
    data() {
        return {
            dropzoneOptions: {
                url: this.action,
                autoProcessQueue: false,
                thumbnailWidth: 80,
                thumbnailHeight: 80,
                maxFiles: 3, // максимальное количество файлов
                maxFilesize: 10, // максимальный вес одного файла, MB
                addRemoveLinks: true,
                dictRemoveFile: "×",
                acceptedFiles: '.doc,.pdf,.jpeg,.png,.docx,.tif',
                dictFileTooBig: 'Файл слишком большой. Максимальный размер файла: {{maxFilesize}} MB.',
                dictInvalidFileType: "Вы не можете загружать файлы этого типа.",
                dictMaxFilesExceeded: "Вы не можете больше загружать файлы.",
            },
            infoForm: {
                disabledForm: false,
                isPersonalData: false,
                errorPersonalData: false,
            },
            cmpForm: this.form,
            validPartOneForm: false,
            btnText: true,
            btnSuccess: false,
            btnError: false,
            
        }
    },
    components: {
        vueDropzone: vue2Dropzone
    },
    computed: {
        ...mapState('mobile', ['isMobile']),
    },
    methods: {
        ...mapMutations('modal', ['openModalRequests', 'closeModal']),
        
        listenerFile() {
            setTimeout(() => {
                const fileErrorMessage = document.querySelectorAll('.dz-error');
                for (const item of fileErrorMessage) {
                    console.log(item);
                    item.style.display = 'none';
                }
            }, 50);
            
            if (!this.isMobile) {
                // console.log(123);
                const activeClass = document.querySelectorAll('.dz-details');
                const hover = document.querySelector('.js-hover')
                /* eslint-disable-next-line */
                for (const item of activeClass) {
                    const mouseMove = (e) => {
                        const text = e.srcElement.children[1].querySelector('span').innerHTML
                        document.querySelector('.js-hover span').innerHTML = text

                        // const x = item.getBoundingClientRect().left - (item.clientWidth / 2)
                        const x = e.pageX - (hover.clientWidth / 2)
                        const y = item.getBoundingClientRect().top + window.pageYOffset + 48;
                        hover.style.visibility = 'visible';
                        hover.style.left = `${x}px`;
                        hover.style.top = `${y}px`;
                    }
                    const mouseLeave = (e) => {
                        hover.style.visibility = 'hidden';
                    }
                    item.addEventListener('mouseenter', mouseMove);
                    item.addEventListener('mouseleave', mouseLeave);
                    
                }
            }
        },

        formUpdate(text) {
            this.cmpForm[4].value = text
        },

        submit() {
            let is_valid = true;

            for (let i = 0; i < this.cmpForm.length; i++) {
                this.cmpForm[i].error = false;
                if (this.cmpForm[i].pattern !== '' && (!this.cmpForm[i].required ? this.cmpForm[i].value !== '' : true)) {
                    this.cmpForm[i].valid = true;
                    if (this.cmpForm[i].pattern) {
                        if (!this.cmpForm[i].pattern.test(this.cmpForm[i].name === 'position' && this.cmpForm[i].value.label ?  this.cmpForm[i].value.label.trimEnd() : this.cmpForm[i].value.trimEnd())) {
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

                                case 'position':  
                                    this.cmpForm[i].errorText = this.$root.staticText.errorTextPosition
                                break

                                case 'file':  
                                    this.cmpForm[i].errorText = this.$root.staticText.errorTextFile
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
                        // console.log(this.$refs.dropzone);
                        if(this.$refs.dropzone[0].dropzone.files.length) {
                            for (let j = 0; j < this.$refs.dropzone[0].dropzone.files.length; j++) {
                                const file = this.$refs.dropzone[0].getAcceptedFiles()[j]
                                if (file) {
                                    fd.append(this.cmpForm[i].name, file);
                                }
                            }
                        }
                    } else if (this.cmpForm[i].name === 'position' && this.cmpForm[i].value.label) {
                        fd.append(this.cmpForm[i].name,  this.cmpForm[i].value.label.trimEnd());
                        fd.append('vacancyId',  this.cmpForm[i].value.id);
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
                    fd.append('vacancyId', this.id);
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
                        this.btnText = false
                        this.btnSuccess = true     
                        this.btnError = false                   
                        this.clearFrom();

                        setTimeout(() => {
                            this.disabledBtn = false
                            this.$router.push({
                                name: 'thanks-vacancies'
                            }).catch(err => {});
                        }, 500)

                    } else {
                        this.btnError = true;
                        this.btnText = false
                        this.btnSuccess = false                   

                        setTimeout(() => {
                        this.disabledBtn = false
                        }, 500)
                    }
                    })
                    .catch(() => {
                    this.infoForm.disabledForm = false;
                    this.btnText = false
                    this.btnSuccess = false     
                    this.btnError = true                   
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
        },
        onClickFurther() {
            let is_valid = true;

            for (let i = 0; i < this.cmpForm.length; i++) {
                if (this.cmpForm[i].tabVisible === this.tabValue) {
                    this.cmpForm[i].error = false;
                    if (this.cmpForm[i].pattern !== '' && (!this.cmpForm[i].required ? this.cmpForm[i].value !== '' : true)) {
                        this.cmpForm[i].valid = true;
                        if (this.cmpForm[i].pattern) {
                            if (!this.cmpForm[i].pattern.test(this.cmpForm[i].value.trimEnd())) {
                                this.cmpForm[i].error = true;
                                this.cmpForm[i].valid = false;
                                is_valid = false;
                            }
                        }
                    }
                    if (this.cmpForm[i].required && this.cmpForm[i].value === '') {
                        this.cmpForm[i].error = true;
                        this.cmpForm[i].valid = false;
                        is_valid = false;
                    }
                }
            }

            if (is_valid) {
                this.validPartOneForm = true;
                this.$emit('value-active-tab', 2);
            }
           
        }
    },
    mounted() {
    }
  }
</script>

<style lang="sass">

</style>