<template>
    <div v-if=" type === 'button' ">
        <button 
            @click="Open({newState: 'modal-contacts-cmp', props: {close: $root.staticText.modalClose}, modalContent: 't-max-width'})" 
            class="t-button-link" 
            :class="{'t-button-link_border': border}"
        >
            <div class="t-button-link__content">
                <div class="t-button-link__text">
                    <span>{{text}}</span>
                    <span>{{text}}</span>
                </div>
            </div>
            <div class="t-button-link__icon">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.41211 1L11.0002 0.999999C12.1047 0.999999 13.0002 1.89543 13.0002 3L13.0002 11.5881" stroke="#022855" stroke-width="2"/>
                    <path d="M12.3137 1.68629L1 13" stroke="#022855" stroke-width="2"/>
                </svg>
            </div>
        </button>
    </div>

    <div v-else-if=" type === 'link' ">
        <a v-link :href="link" class="t-button-link" :class="{'t-button-link_border': border}">
            <div class="t-button-link__content">
                <div class="t-button-link__text">
                    <span>{{text}}</span>
                    <span>{{text}}</span>
                </div>
            </div>
            <div class="t-button-link__icon">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.41211 1L11.0002 0.999999C12.1047 0.999999 13.0002 1.89543 13.0002 3L13.0002 11.5881" stroke="#022855" stroke-width="2"/>
                    <path d="M12.3137 1.68629L1 13" stroke="#022855" stroke-width="2"/>
                </svg>
            </div>
        </a>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex';

    export default {
        data() {
            return {}
        },
        props: ['type', 'border', 'link', 'text'],
        methods: {
            ...mapMutations('modal', ['Open']),
        },
    }
</script>

<style lang="sass">
    
</style>