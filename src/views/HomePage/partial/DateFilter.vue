<template>
  <div class="d-flex justify-content-between">
    <div class="col-md-7">
      <h3 class="mb-3 mb-md-0">{{ textData?.title }}</h3>
    </div>
    <div class="col-md-5">
      <DatepickerComp range :multiCalendars="true" :placeholder="$t('Choose Date')"></DatepickerComp>
    </div>
  </div>
</template>

<script>
import { defineEmits, onMounted, reactive, ref } from "vue";
export default {
  name: "DashboardFilter",
  props: {
    textData: {
      type: Object,
      default: null,
    },
  },
};
</script>

<script setup>
const emit = defineEmits(["dateFilterSubmit"]);

const dateValue = ref([]);

// onMounted(() => {
//   const startDate = new Date();
//   const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
//   dateValue.value = [startDate, endDate];
// });
const form = reactive({
  start_date: null,
  end_date: null,
});

const dateForm = () => {
  emit("dateFilterSubmit", form);
};
</script>