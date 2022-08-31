<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li
        v-for="(item, index) in breadcrumbList"
        :key="index"
        :class="{['breadcrumb-item']: true, active: item.isActive }"
      >
        <router-link v-if="item.routeName" :to="{ name: item.routeName}">
          {{ item.title }}
        </router-link> 
    
        <a v-else >{{ item.title }}</a>

      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: {
    breadcrumbList: Object,
  },
};
</script>

<style lang="scss" scoped>
    li {
        font-size: 16px;
        margin-top: 5px;
    }
    ol {
      margin-bottom: 1.5rem;
      margin-left: 10px;
    }
</style>