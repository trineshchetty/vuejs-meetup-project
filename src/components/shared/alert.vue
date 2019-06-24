<template>
 <v-alert :value="true" @input="onclose" warning icon="priority_high" dismissible outline>{{errorMsg}}</v-alert>

</template>

<script>
export default {
    name: "alerts",

    methods: {
        onclose () {
            this.$emit('dismissed')
        }
    },

    computed: {
        errorMsg () {
            return this.$store.getters.getErrorMsg
        }
    }

}
</script>

<style>

</style>
