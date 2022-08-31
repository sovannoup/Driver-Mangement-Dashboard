<template>
  <div class="card radius-10 w-100">
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
          height="300"
        ></apexchart>
    </div>
    <ul class="list-group list-group-flush">
      <li v-for="item in data" :key="item.title"
        class="
          list-group-item
          d-flex
          bg-transparent
          justify-content-between
          align-items-center
        "
      >
        {{ item?.title }} 
      <span 
        class="badge rounded-pill"
        :class="{
          'bg-success': item?.type === 'success',
          'bg-danger': item?.type === 'danger',
          'bg-primary': item?.type === 'primary',
          'bg-warning': item?.type === 'warning',
          }"
        
      >{{ item?.quantity }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TopCategory",
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