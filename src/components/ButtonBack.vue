<template>
    <router-link :type="type" :to="url" :class="`btn ${isSmall && 'btn-md'} `+variant" :disabled="isLoading">
        <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
        <slot></slot>
        <span class="sr-only ms-1">{{text}}</span>
    </router-link>
</template>

<script>
export default {
    props:{
        isLoading: {
            type: Boolean,
            default: false
        },
        text:{
            type: String,
            default: ""
        },
        url: {
            type: String,
            default: ""
        },
        variant:{
            type: String,
            default: "btn-primary"
        },
        isSmall:{
            type: Boolean,
            default: true
        }
    },
    name: "ButtonBack"
}
</script>

<style>

</style>