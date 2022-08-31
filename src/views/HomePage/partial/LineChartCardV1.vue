<template>
    <div class="card radius-10">
        <div class="card-body">
          <div class="d-flex align-items-center">
            <div>
              <p class="mb-0 text-secondary">{{ textData?.title }}</p>
              <h4 class="my-1">{{ textData?.amount }}</h4>
              <p class="mb-0 font-13" 
                :class="{
                  'text-success': textSuccess, 
                  'text-warning': textWarning, 
                  'text-danger': textDanger
                }"
              >
               {{ textData?.description }}
              </p>
            </div>  
            <div class="widgets-icons ms-auto"
                :class="{
                  'bg-light-success text-success': textSuccess,
                  'bg-light-warning text-warning': textWarning, 
                  'bg-light-danger text-danger': textDanger
                }"
                >
              <i class="bx" :class="icon"></i>
            </div>
          </div>
          <div>
        <apexchart v-if="options" :type="options.chart.type" :options="options" :series="options.series" height="65"></apexchart>
    </div>
        </div>
      </div>
</template>

<script>
export default {
  name: 'LineChartCardV1',
  props:{
        options: {
          type: Object,
          default: null
        },
        textSuccess: {
          type: Boolean,
          default: false
        },
        textWarning: {
          type: Boolean,
          default: false
        },
        textDanger: {
          type: Boolean,
          default: false
        },
        icon: {
          type: String,
          default: 'bxs-wallet'
        },
        textData: {
          type: Object,
          default: null
        }

    }
}
</script>