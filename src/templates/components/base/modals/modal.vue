<template>
    <transition name="fade">
        <div v-if="modalComponent" :key="modalComponent" class="t-modal t-dfc" @click="Close()">
            <div class="t-modal__content" :class="modalClassContent" @click.stop="">
                <div class="t-modal__close" @click="Close()">
                    <span v-if="modalProps.close" v-text="modalProps.close"></span>
                </div>
                <component :is="modalComponent" :props="modalProps">
                </component>
            </div>
        </div>
    </transition>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex';

    import ModalContacts from '@components/base/modals/contacts/modal-contacts.vue'
    import ModalBoat from '@components/base/modals/boat/modal-boat.vue'

    export default {
        data() {
            return {}
        },
        components: {
            'modal-contacts-cmp': ModalContacts,
            'modal-boat-cmp': ModalBoat,
        },
        computed: {
            ...mapGetters('modal', ['modalComponent', 'modalProps', 'modalClassContent']),
        },
        methods: {
            ...mapMutations('modal', ['Close', 'Open']),
        },
        mounted() {

        }
    }
</script>

<style lang="sass">

</style>