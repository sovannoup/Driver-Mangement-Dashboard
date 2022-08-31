<template>
  <div class="table-responsive">
    <div class="progress" style="height: 5px" v-if="isLoading">
      <div
        class="progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar"
        aria-valuenow="75"
        aria-valuemin="0"
        aria-valuemax="100"
        style="width: 100%"
      ></div>
    </div>

    <div v-else style="height: 5px"></div>

    <table class="table" :class="customClass">
      <thead>
        <tr>
          <td v-if="checkable">
            <base-check-box @change="headerCheck" v-model="headerCheckValue" />
          </td>
          <th
            v-for="(head, header_index) of header"
            :key="header_index"
            scope="col"
            @click="onSort(head.key, head.sortable)"
            :class="['pointer' && head.sortable == true, head.alignment]"
            :style="'position: relative; ' +head.additionalStyle"
          >
              <i
              v-if="head.sortable && head.sortable == true"
              class="font-18 fadeIn animated " 
              :class="classOnSort(head)"
            ></i>

          

            <a href="javascript:;" style="color: #1e1e1e">
              {{ head.title }}
            </a>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, item_index) of items" :key="item_index" ref="">
          <td v-if="checkable">
            <base-check-box v-model="selected" :value="item['id']" />
          </td>
          <template v-for="(head, header_index) of header" :key="header_index">
            <slot :name="head.key" :item="item"></slot>
            <template v-if="!isUsedSlot(head.key)">
              <td>
                {{ item[head.key] }}
              </td>
            </template>
          </template>
        </tr>
      </tbody>

      <tfoot v-if="items.length == 0">
        <td :colspan="12">
          <p class="text-center">
            <i class="font-30 fadeIn animated bx bx-message-square-error"></i>
            <br />
            {{ $t("No data available!") }}
          </p>
        </td>
      </tfoot>
    </table>
  </div>
</template>
<script>
import { onMounted, ref, watch } from "@vue/runtime-core";
import BaseCheckBox from "./BaseCheckBox.vue";
export default {
  components: { BaseCheckBox },
  name: "BaseTable",
  props: {
    header: {
      type: Array,
    },
    items: {
      type: Array,
      default: []
    },
    checkable: Boolean,
    isLoading: {
      type: Boolean,
      default: false,
    },
    customClass: null,
    passTheWholeObject: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots, emit }) {
    const currentSort = ref("");
    const currentSortDir = ref("");
    const isUsedSlot = (name) => !!slots[name];
    const selected = ref([]);
    const headerCheckValue = ref(false);
    onMounted(() => {});
    const onSort = async (col, sortable) => {
      if (sortable !== true) return null;
      currentSort.value = col;
      if (col === currentSort.value) {
        currentSortDir.value = currentSortDir.value === "asc" ? "desc" : "asc";
      }
      emit("sort", {
        sort: currentSort.value,
        direction: currentSortDir.value,
      });
    };
    const classOnSort = (col) => {
      var sortClass = "";
      if (col.sortable) sortClass = "bx bx-sort";
      if (currentSort.value == col.key && currentSortDir.value == "asc")
        sortClass = "bx bx-sort-down";

      if (currentSort.value == col.key && currentSortDir.value == "desc")
        sortClass = "bx bx-sort-up";
      return sortClass;
    };

    watch([selected], () => {
      emit("onSelected", selected);
    });

    const headerCheck = (e) => {
      selected.value = [];
      if (headerCheckValue.value == true) {
        const data = JSON.parse(JSON.stringify(props.items));
        data.forEach((item) => {
          selected.value.push(item['id']);
        });
      }
    };

    return {
      isUsedSlot,
      onSort,
      classOnSort,
      sortDir: currentSortDir,
      selected,
      headerCheck,
      headerCheckValue,
    };
  },
};
</script>