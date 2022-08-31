

<template>
  <img v-if="valid && src" :src="src" lazy="loading" :width="width" />
  <img v-else src="@/assets/images/no-image.png" :width="width" alt="" />
</template>

<script>
import { computed, reactive, ref, toRefs } from "@vue/reactivity";
export default {
  name: "BaseImage",
};
</script>

<script setup>
const props = defineProps({
  src: {
    type: String,
  },
  width: {
    type: Number,
  }
});
const { src } = toRefs(props);
const valid = ref(true);

const lifecycle = reactive({
  loading: () => {},
  error: () => {
    valid.value = false;
  },
  loaded: () => {
    valid.value = true;
  },
});
</script>