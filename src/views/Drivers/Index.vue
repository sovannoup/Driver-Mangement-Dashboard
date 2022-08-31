<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "IndexDriver",
  layout: "admin",
  middleware: ["auth"],
};
</script>