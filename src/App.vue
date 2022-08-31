<template>
  <component v-if="layout" :is="layout" />
</template>

<script>
import "./assets/scss/main.scss";
import i18n from "@/plugins/i18n"; 

const requireContext = require.context("@/layouts", false, /.*\.vue$/);
const layouts = requireContext
  .keys()
  .map((file) => [file.replace(/(^.\/)|(\.vue$)/g, ""), requireContext(file)])
  .reduce((components, [name, component]) => {
    components[name] = component.default || component;
    return components;
  }, {});

export default {
  name: "App",
};
</script>
<script setup>
import {  loadMessage} from "@/plugins/i18n"; 
import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const store = useStore()
import { onBeforeMount } from '@vue/runtime-core';
const route = useRoute();
const layout = computed(() => {
  let _layout = "default";
  if (route.meta?.layout) _layout = route.meta?.layout;
  return layouts[_layout];
});
onBeforeMount(()=>{
  // console.log(store.getters['i18n/local'])
  loadMessage(store.getters['i18n/local'])
})

</script>


 