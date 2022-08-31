<template>
  <Datepicker
    :placeholder="placeholder"
    @cleared="onClear"
    v-model="value"
    @update:modelValue="onChange"
    :enableTimePicker="false"
    range
    multiCalendars
    :presetRanges="presetRanges"
  >
    <template #input-icon>
      <i class="bx bx-calendar-star" style="margin-left: 12px" />
    </template>
  </Datepicker>
</template>

<script>
import { computed, onMounted, ref } from "@vue/runtime-core";
import Datepicker from "vue3-date-time-picker";
import "vue3-date-time-picker/dist/main.css";
import { useI18n } from "vue-i18n";
import {
  endOfMonth,
  endOfYear,
  startOfMonth,
  startOfYear,
  subDays,
  subWeeks,
  subMonths,
} from "date-fns";
export default {
  name: "DatepickerComp",
  props: {
    value: {
      type: String,
    },
    range: {
      type: Boolean,
      default: false,
    },
    lineHeight: {
      type: String,
      default: "1.7",
    },
    placeholder: {
      type: String,
      default: "",
    },
    onClear: {
      type: Function,
      default: () => {},
    },
  },
  components: {
    Datepicker,
  },
  emits: ["update:modelValue", "onChange"],
  setup(props, { emit }) {
    const lineHeight = computed(() => props.lineHeight);
    const { t } = useI18n({})
    const onChange = (value) => {
      emit("update:modelValue", value);
      emit("onChange", value);
    };

    const presetRanges = ref([
      { label: "Today", range: [new Date(), new Date()] },
      { label: "Yesterday", range: [subDays(new Date(), 1), subDays(new Date(), 1)] },
      { label: "Last 7 days", range: [subWeeks(new Date(), 1 ), new Date()]},
      { label: "Last 30 days", range: [subMonths(new Date(), 1 ), new Date()]},
      { label: "This Month", range: [startOfMonth(new Date(), 1 ), new Date()]},
      {
        label: "Last month",
        range: [
          startOfMonth(subMonths(new Date(), 1)),
          endOfMonth(subMonths(new Date(), 1)),
        ],
      },
      
      {
        label: "This year",
        range: [startOfYear(new Date()), new Date()],
      },
    ]);

    return {
      lineHeight,
      onChange,
      presetRanges,
    };
  },
};
</script>


<style lang="scss">
.dp__input_wrap {
  width: 16.25rem;
}

.dp__main {
  display: flex;
  justify-content: flex-end;
}

.dp__menu {
  transform: translateX(-82%) !important;
}

.dp__arrow_top {
  left: 95%;
}
.dp__theme_light {
  --dp-primary-color: #700e57 !important;
  --dp-hover-color: #c0c4cc !important;
}
.dp__action{
  color: #fff;
  background-color: #700e57 !important;
  padding: 8px 15px!important;
  margin-left: 10px;
}
.dp__instance_calendar{
  padding: 5px;
}
.dp__menu_content_wrapper{
  border-bottom: 1px solid #ddd;
}
.dp__selection_preview{
  width: 100%;
  text-align: right;
  font-size: 15px;
}
.dp__preset_ranges{
  padding: 0;
  width: 200px;
}
.dp__preset_range{
  padding: 10px
}
.dp__preset_range:hover{
  background-color: #700e57;
  color: #fff;
  font-weight: 700;
}
</style>
