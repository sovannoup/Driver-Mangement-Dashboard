<template>
  <div class="col d-flex">
    <div class="card radius-10 w-100">
      <div class="card-body">
        <div class="d-flex align-items-center">
          <div>
            <h5 class="mb-1">{{ textData?.title }}</h5>
            <p class="mb-0 font-13 text-secondary">
              <i class="bx bxs-calendar"></i> {{ textData?.description }}
            </p>
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
          height="300"
        ></apexchart>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StoreMetric',
  props:{
        options: {
          type: Object,
          default: null
        },
        textData: {
          type: Object,
          default: null
        }
    }
}
</script>