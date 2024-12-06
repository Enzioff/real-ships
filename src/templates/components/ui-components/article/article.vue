<template>
    <a v-link :href="article.link" class="t-article">
        <div class="t-article__img" :class="{'_cursor-none': !isMobile}">
            <transition name="fade" mode="out-in">
                <img v-if="article.img" :src="article.img" alt="" />
            </transition>
        </div>
        <div class="t-article__content">
            <div class="t-article__content-data">
                <span class="t-article__content-tag">{{ article.tag }}</span>
                <span class="t-article__content-date">{{ article.date }}</span>
            </div>
            <div class="t-article__content-description">
                <h5 class="t-article__content-title">{{ article.title }}</h5>
                <p class="t-article__content-text">{{ article.text }}</p>
            </div>
        </div>
    </a>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name: "article",
        data() {
            return {}
        },
        props: {
            article: {
                type: Object,
                default: () => {}
            },
        },
        computed: {
            ...mapState('mobile', ['isMobile']),
        },
    }
</script>

<style lang="sass">
    
</style>