<template>
  <div class="row">
    <div class="col-md-10" v-if="pages > 1">
      <ul class="pagination">
        <li
          v-if="!hideFirstButton && isPrevControlsActive"
          class="page-item d-none d-md-block d-lg-block"
        >
          <a
            href="javascript:;"
            class="page-link"
            :class="{ 'Control-active': isPrevControlsActive }"
            @click="goToFirst"
          >
            {{ $t("First") }}
          </a>
        </li>
        <li
          class="page-item d-none d-md-block d-lg-block"
          v-if="isPrevControlsActive"
        >
          <a
            href="javascript:;"
            class="page-link"
            @click="goToPrev"
            :class="{ 'Control-active': isPrevControlsActive }"
          >
            {{ $t("Previous") }}
          </a>
        </li>
        <Item
          v-for="page in pagination"
          :key="`pagination-page-${page}`"
          :page="page"
          :current="modelValue"
          :active-color="activeColor"
          @update="updatePageHandler"
        />
        <li
          class="page-item d-none d-md-block d-lg-block"
          v-if="isNextControlsActive"
        >
          <a
            href="javascript:;"
            class="page-link"
            :class="{ 'Control-active': isNextControlsActive }"
            @click="goToNext"
          >
            {{ $t("Next") }}
          </a>
        </li>
        <li
          v-if="!hideLastButton && isNextControlsActive"
          class="page-item d-none d-md-block d-lg-block"
        >
          <a
            href="javascript:;"
            class="page-link"
            :class="{ 'Control-active': isNextControlsActive }"
            @click="goToLast"
          >
            {{ $t("Last") }}
          </a>
        </li>
      </ul>
    </div>
    <div 
      style= "display: flex; justify-content: end;" 
      :class="pages <= 1 ? 'col-sm-2 col-md-2 offset-md-10' : '' +' col-sm-2 col-md-2' " 
    > 
      <div style="width: 78px">
        <BaseMultiselect
          name="show_amount"
          :placeholder="$t('Size')"
          :options="showAmount"
          :searchable="false"
          @onChange="changeAmountToShow"
        />
      </div>

    </div>
  </div>
</template>

<script >
import { computed, onMounted, onUnmounted, ref } from "vue";
import Item from "./partials/ItemPaginate.vue";
export default {
  name: "BasePagination",
  components: { Item },
  props: {
    pages: {
      type: Number,
      default: 0,
    },
    rangeSize: {
      type: Number,
      default: 1,
    },
    modelValue: {
      type: Number,
      default: 0,
    },
    activeColor: {
      type: String,
      default: "#DCEDFF",
    },
    hideFirstButton: {
      type: Boolean,
      default: false,
    },
    hideLastButton: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "onChange", 'onChangeAmountToShow'],

  setup(props, { emit }) {

    const showAmount = ref([5,10,15,20,25,30,40,50,60]);

    // pagination
    const pagination = computed(() => {
      const res = [];
      const minPaginationElems = 5 + resizeLength.value * 2;

      let rangeStart =
        props.pages <= minPaginationElems
          ? 1
          : props.modelValue - resizeLength.value;
      let rangeEnd =
        props.pages <= minPaginationElems
          ? props.pages
          : props.modelValue + resizeLength.value;

      rangeEnd = rangeEnd > props.pages ? props.pages : rangeEnd;
      rangeStart = rangeStart < 1 ? 1 : rangeStart;

      if (props.pages > minPaginationElems) {
        const isStartBoundaryReached = rangeStart - 1 < 3;
        const isEndBoundaryReached = props.pages - rangeEnd < 3;

        if (isStartBoundaryReached) {
          rangeEnd = minPaginationElems - 2;
          for (let i = 1; i < rangeStart; i++) {
            res.push(i);
          }
        } else {
          res.push(1);
          res.push(null);
        }

        if (isEndBoundaryReached) {
          rangeStart = props.pages - (minPaginationElems - 3);
          for (let i = rangeStart; i <= props.pages; i++) {
            res.push(i);
          }
        } else {
          for (let i = rangeStart; i <= rangeEnd; i++) {
            res.push(i);
          }
          res.push(null);
          res.push(props.pages);
        }
      } else {
        for (let i = rangeStart; i <= rangeEnd; i++) {
          res.push(i);
        }
      }

      return res;
    });

    function updatePageHandler(params) {
      emit("update:modelValue", params);
      emit("onChange", params);
    }

    // controls
    const isPrevControlsActive = computed(() => {
      return props.modelValue > 1;
    });
    const isNextControlsActive = computed(() => {
      return props.modelValue < props.pages;
    });

    function goToFirst() {
      if (isPrevControlsActive.value) {
        emit("update:modelValue", 1);
        emit("onChange", 1);
      }
    }
    function goToPrev() {
      if (isPrevControlsActive.value) {
        emit("update:modelValue", props.modelValue - 1);
        emit("onChange", props.modelValue - 1);
      }
    }

    function goToLast() {
      if (isNextControlsActive.value) {
        emit("update:modelValue", props.pages);
        emit("onChange", props.pages);
      }
    }
    function goToNext() {
      if (isNextControlsActive.value) {
        emit("update:modelValue", props.modelValue + 1);
        emit("onChange", props.modelValue + 1);
      }
    }

    const screenHight = ref(0);
    const screenwidth = ref(0);

    const handleResize = () => {
      screenwidth.value = window.innerWidth;
      screenHight.value = window.innerHeight;
    };

    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });
    onMounted(() => {
      window.addEventListener("resize", handleResize);
      handleResize();
    });

    const resizeLength = computed(() => {
      if (screenwidth.value < 501) {
        return 1;
      }
      if (screenwidth.value < 801) {
        return 1;
      }
      if (screenwidth.value < 1200) {
        return 2;
      }
      return 7;
    });

    const changeAmountToShow = (amountToShow) => {
      emit("onChangeAmountToShow", amountToShow);
      // emit("onChange");
    }

    return {
      pagination,
      updatePageHandler,
      isPrevControlsActive,
      isNextControlsActive,
      goToFirst,
      goToLast,
      goToPrev,
      goToNext,
      screenHight,
      screenwidth,
      resizeLength,
      showAmount,
      changeAmountToShow
    };
  },
};
</script>
 