<template>
  <div class="row">
    <div :class="`col col-${columnAmount} mx-auto`">
      <div class="card">
        <div class="card-body">
          <div class="p-4">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props:{
    columnAmount:{
      type: String,
      default: "md-9"
    },
  },
};
</script>

<style>
</style>