<template>
  <div class="card radius-10 w-100">
    <div class="card-body">
      <p class="font-weight-bold mb-1 text-secondary">{{ textData?.title }}</p>
      <div class="d-flex align-items-center">
        <div>
          <h4 class="mb-0">{{ parseFloat(textData?.qty).toLocaleString('en') }}</h4>
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
  </div>
</template>

<script>
export default {
  name: "Visitor",
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
    },
  },
};
</script>