<template>
  <router-view></router-view>
</template>
<script>
export default {
  name: "IndexAuth",
  middleware: ["guest"],
  layout: "default",
};
</script>

<style scoped>
ul {
  padding: 0;
}
ul li {
  display: inline;
  /* padding: 10px; */
}
ul li a {
  color: white;
  text-decoration: none;
}
</style>