<template>
  <li
    v-if="isHasChild == true"
    :class="[parentActive && 'mm-active']"
    style="cursor: pointer"
  >
    <a
      @click="openUrl"
      :class="[Menu.items && Menu.items.length > 0 && 'has-arrow']"
    >
      <i class="bx bx-right-arrow-alt" v-if="isChild == true"></i>
      <div class="parent-icon" v-if="Menu.iconClass">
        <i :class="Menu.iconClass"></i>
      </div>
      <div class="menu-title">
        {{ $t(Menu.title) }}
      </div>
    </a>
    <ul
      :class="['mm-collapse', (parentActive) && 'mm-show']"
      v-if="Menu.items && Menu.items.length > 0"
    >
      <MenuItem
        :Menu="menu"
        v-for="(menu, index) in Menu.items"
        :key="index"
        :toggleIndex="`${index},${toggleIndex}`"
        :isChild="true"
      />
    </ul>
  </li>

  <!-- none child -->
  <router-link
    v-if="isHasChild == false  && Menu.title"
    :to="menuUrl"
    v-slot="{ isExactActive }"
    custom
  >
    <li
      :class="[(isExactActive || parentActive) && 'mm-active']"
      style="cursor: pointer"
    >
      <a
        @click="openUrl"
        :class="[Menu.items && Menu.items.length > 0 && 'has-arrow']"
      >
        <i class="bx bx-right-arrow-alt" v-if="isChild == true"></i>
        <div class="parent-icon" v-if="Menu.iconClass">
          <i :class="Menu.iconClass"></i>
        </div>
        <div class="menu-title">
          {{ $t(Menu.title) }}
        </div>
      </a>
    </li>
  </router-link>
</template>

<script>
import MenuItem from "@/layouts/partials/MenuItem";
import { ref, computed, onMounted, watchEffect } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { find } from "lodash";
import store from "@/store";
import { useI18n } from "vue-i18n";

export default {
  components: {
    MenuItem,
  },
  props: {
    Menu: Object,
    toggleIndex: String,
    isChild: Boolean,
  },
  setup(props) {

    const { t } = useI18n({});
    const router = useRouter();
    const toggle = ref(false);
    const current_router = ref("");
    const isHasChild = computed(() => {
      return props.Menu.items ? props.Menu.items.length > 0 : false;
    });
    const openUrl = () => {
      if (isHasChild.value == false) {
        router.push({ name: props.Menu.routeName });
      }
      if (isToggle.value == false) {
        store.dispatch("layout/setToggle", props.toggleIndex);
      }
    };
    const menuUrl = computed(() => {
      if (isHasChild.value == false && router.hasRoute(props.Menu.routeName))
        return { name: props.Menu.routeName };
      else return "";
    });
    watchEffect(() => {
      if (router.currentRoute.value.name) {
        current_router.value = router.currentRoute.value.name;
      }
    });
    const parentActive = computed(() => {
      if (isHasChild.value) {
        if (find(props.Menu.items, { routeName: current_router.value })) {
          return true;
        }
      }
      return false;
    });

    const isToggle = computed(() => {
      return store.getters["layout/toggle"] == props.toggleIndex;
    });

    const profile = computed(() => store.getters["profile/user"]);


    return {
      toggle,
      isToggle,
      openUrl,
      menuUrl,
      parentActive,
      current_router,
      profile,
      isHasChild,
    };
  },
};
</script>