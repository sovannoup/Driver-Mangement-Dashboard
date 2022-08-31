<template>
  <div class="sidebar-wrapper" data-simplebar>
    <div class="sidebar-header">
      <!-- <div>
        <img src="@/assets/images/icon.svg" class="logo-icon" alt="logo icon" />
      </div> -->
      <div>
        <h4 class="logo-text">{{ $t("Drivers") }}</h4>
      </div>
      <div class="toggle-icon ms-auto" v-responsive-menu>
        <i class="bx bx-toggle-right"></i>
      </div>
    </div>
    <perfect-scrollbar class="p-scrollbar">
      <ul class="metismenu" id="menu">
        <menu-item
          :Menu="menu"
          v-for="(menu, index) in menuList"
          :key="index"
          :toggleIndex="`${index}`"
        />
      </ul>
    </perfect-scrollbar>
  </div>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import MenuItem from "./MenuItem.vue";
import menuList from "@/sidebarMenu";
import MetisMenu from "metismenujs";
import "metismenujs/scss/metismenujs.scss";
import { useI18n } from "vue-i18n";

export default {
  name: "Sidebar",
  components: {
    MenuItem,
  },
  setup() {
    const { t } = useI18n({});
    const store = useStore();
    const profile = computed(() => store.getters["profile/user"]);

    onMounted(() => {
      try {
        new MetisMenu("#menu");
      } catch (err) {
        console.log(err);
      }
    });
    return {
      profile,
      menuList,
    };
  },
};
</script>
