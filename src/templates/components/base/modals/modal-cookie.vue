<template>
    <transition name="fade">
        <div v-if="visible" class="t-cookie _cookie">
            <div class="t-cookie__content">
                <div class="t-cookie__description">
                    <span>{{ $root.staticText.textCookie }} <a download class="t-cookie__link t-link" :href="linkCookie">{{ $root.staticText.linkTextCookie }}</a></span>
                </div>
                <button class="t-cookie__btn" @click="setCookies()">
                    <span>{{ $root.staticText.btnCookie }}</span>
                </button>
            </div>
        </div>
    </transition>
</template>

<script>
  import Vue from 'vue';

  export default {
    name: "cookie",
    data() {
        return {
            linkCookie: '/uploads/2022/10/14/politika_konfidencialnosti_63491b94d62a1.pdf',
            visible: false
        }
    },
    computed: {
        
    },
    methods: {
        setCookies() {
            Vue.cookie.set('cookie', true)
            this.visible = false
        }
    },
    mounted() {
        setTimeout(() => {
            if (!Vue.cookie.get('cookie')) {
                this.visible = true
            }
            
        }, 600);
    },
  }
</script>

<style lang="sass">

</style>