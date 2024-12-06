<template>
    <div v-if="pagination && pagination.pageCount > pagination.currentPage">
        <div class="t-button" @click="clickLoadMore(pagination.currentPage)">
            <span>{{text}}</span>
        </div>
    </div>
</template>

<script>
    import Button from '@components/ui-components/button/component';
    
    export default {
        name: "load-more",
        data() {
            return {}
        },
        components: {
            'button-cmp': Button,
        },
        props: {
            text: {
                type: String,
                default: ''
            },
            pagination: {
                type: Object,
                default: () => {}
            }
        },
        methods: {
            clickLoadMore(page) {
                this.$router.push({
                    name: this.$route.name, 
                    query: Object.assign({}, this.$route.query, { loadMore: true, currentPage: 1 + parseInt(page) })
                }).catch(err => {});
            }
        }
    }
</script>

<style lang="sass">

</style>