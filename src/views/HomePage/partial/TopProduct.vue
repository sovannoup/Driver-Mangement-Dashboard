<template>
  <div class="card radius-10 w-100">
    <div class="card-body">
      <div class="d-flex align-items-center">
        <div>
          <h5 class="mb-1">{{ textData?.title }}</h5>
          <p class="mb-0 font-13 text-secondary">
            <i class="bx bxs-calendar"></i>
            {{ textData?.description }}
          </p>
        </div>
        <div class="font-22 ms-auto">
          <i class="bx bx-dots-horizontal-rounded"></i>
        </div>
      </div>
    </div>
    <div class="product-list p-3 mb-3">
      <div
        v-for="item in data"
        :key="item.title"
        class="d-flex justify-content-between border mx-0 mb-3 p-2 radius-10 cursor-pointer"
      >
        <div class="d-flex align-items-center">
          <div class="product-img">
            <img :src="item.imgSrc" alt="" />
          </div>
          <div class="ms-2">
            <h6 class="mb-1">{{ item.title }}</h6>
            <p class="mb-0">${{ item.retailPrice }}</p>
          </div>
        </div>
        <div class="d-flex flex-column justify-content-evenly">
          <h6 class="mb-1">${{ item.totalSaleAmount }}</h6>
          <p class="mb-0">{{ item.totalSaleQuantity }} Sales</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopProduct",
  props: {
    textData: {
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