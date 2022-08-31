<template>
  <div class="card radius-10 w-100 overflow-hidden">
    <div class="card-body">
      <div class="d-flex align-items-center">
        <div>
          <h5 class="mb-0">{{ textData?.title }}</h5>
        </div>
        <div class="font-22 ms-auto">
          <i class="bx bx-dots-horizontal-rounded"></i>
        </div>
      </div>
         <apexchart
          v-if="options"
          :type="options.chart.type"
          :options="options"
          :series="options.series"
          height="390"
        ></apexchart>
    </div>
    <div class="card-footer bg-transparent border-top-0">
      <div
        class="d-flex align-items-center justify-content-between text-center"
      >
        <div v-for="item in data" :key="item.title">
          <h6 class="mb-1 font-weight-bold">{{ item?.amount }}</h6>
          <p class="mb-0 text-secondary">{{ item?.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SaleOverview",
  props: {
    textData: {
      type: Object,
      default: null,
    },
    options: {
        type: Object,
        default: null,
    },
    data: {
        type: Object,
        default: null,
    }
  },
};
</script>