<template>
  <div
    class="
      d-flex ms-2   
      cursor-pointer 
    "
    :class="color"
  >
    <div v-if="icon" class="customized-icon"><i :class="icon"></i></div>
    <div class="mt-1" v-if="text"><span>
        {{ text }} </span></div>
  </div>
</template>
<script>
import { computed } from '@vue/runtime-core';

export default {
  name: "BaseLinkIcon",
  props:{
      text: String,
      icon: String,
      color: String,
      size: {
        type: String,
        default: "22px"
      } 
  },
  setup(props) {
    const size = computed(()=>
      props.size
    )

    return {size}

  },
};
</script>

<style lang="scss">
  .customized-icon {
    font-size: v-bind(size)
  }
</style>
