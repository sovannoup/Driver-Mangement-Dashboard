<template> 
    <li class="page-item " v-if="page === null">
        <a href="javascript:;" class="page-link">
         ...
        </a>
    </li>
    <li class="page-item " v-else  @click="clickHandler" :class="{ 'active': isActive }">
        <a href="javascript:;" class="page-link">
            {{ page }}
        </a>
    </li>   
</template>

<script>
import { defineComponent, computed } from "vue"; 
import BasePaginate from '../BasePaginate.vue';

export default {
  components: { BasePaginate },
  name: "VPage", 
  props: {
    page: {
      type: Number,
      default: null,
    },
    current: {
      type: Number,
      default: 0,
    },
    activeColor: {
      type: String,
      default: "#DCEDFF",
    },
  },
  emits: ["update"],

  setup(props, { emit }) {
    const isActive = computed(() => {
      return props.page === props.current;
    });

    function clickHandler() {
      emit("update", props.page);
    }

    return { isActive, clickHandler };
  },
};
</script>

<style scoped lang="scss"> 

.Page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  margin: 0 2px;
  //   color: $black_02;
  background-color: transparent;
  font-size: 14px;
  border-radius: 3px;
  box-sizing: border-box;
  border-color: transparent;
  cursor: pointer;
  outline: 0;
  user-select: none;

  &:hover {
    // border: 1px solid $grey_02;
  }

  &-active {
    // color: $black_01;
    // border: 1px solid $grey_02;
  }
}

 
</style>