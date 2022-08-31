<template>
  <button :type="type" :class="`btn ` + variant" :disabled="isLoading">
    <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
    <slot></slot>
    <span class="sr-only ms-1" v-if="!slots.default && isLoading == false">{{
      text
    }}</span>
  </button>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "submit",
    },
    variant: {
      type: String,
      default: "btn-primary",
    },
    isSmall: {
      type: Boolean,
      default: true,
    },
  },
  name: "Button",
  setup(props, { slots }) {
    return { slots };
  },
};
</script>

<style>
</style>