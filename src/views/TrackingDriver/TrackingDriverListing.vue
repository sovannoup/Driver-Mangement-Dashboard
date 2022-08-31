<template>
    <div class="d-flex">
        <h3 class="mb-4">{{ $t("Tracking Driver") }} |</h3>
        <Breadcrumb :breadcrumbList="breadcrumbList"/>
    </div>
    <BaseCard>
     <div class="d-lg-flex align-items-center mb-4 gap-3">
        <div class="position-relative">
          <input
            type="text"
            class="form-control ps-5 radius-30"
            :placeholder="$t('Search Driver')"
            v-model="query.search"
            @keyup.enter="getData"
            @input="searchInput"
          />
          <span class="position-absolute top-50 product-show translate-middle-y"
            ><i class="bx bx-search"></i
          ></span>
        </div>
      </div>
      <base-table
        :header="headers"
        :items="drivers"
        :isLoading="loading"
        @sort="onSort"
      >
        <template #firstname="{ item }">
          <td>{{ item.firstname }} {{ item.lastname }}</td>
        </template>
      </base-table>
      <!-- <base-paginate
        @onChangeAmountToShow="onChangeAmountToShow"
        @onChange="getData"
        :pages="meta.last_page"
        v-model="query.page"
      /> -->
    </BaseCard>
</template>

<script>
import BasePaginate from "../../components/BasePaginate.vue";

export default {
  name: "AvailableListing",
  layout: "admin",
  middleware: ["auth"],
  components: {
    BasePaginate,
  },
};
</script>

<script setup>
import { debounce } from "lodash";
import { trackingDriver } from "@/api/driver";
import { ref, onMounted, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
const loading = ref(false);

const {t} = useI18n({})
const drivers = ref([]);
const meta = ref({
  total: 0,
});
const query = ref({
  page: 1,
  sort: null,
  direction: null,
  limit: 8,
  search: null,
});
const headers = computed(()=> [
  {
    title: "#",
    key: "id",
    sortable: true,
  },
  {
    title: t("Name"),
    key: "firstname",
    sortable: true,
  },
  {
    title: t("Gender"),
    key: "gender",
  },
  {
    title: t("Email"),
    key: "email",
    sortable: true
  },
  {
    title: t("Phone"),
    key: "phone_number",
  },
]);

const onSort = ({ sort, direction }) => {
  if (sort) query.value.sort = sort;
  if (direction) query.value.direction = direction;
  getData();
};

const searchInput = debounce(() => {
  if (query.value.search.length >= 3 || query.value.search.length === 0) {
    getData();
  }
}, 500);

const getData = async () => {
  try {
    loading.value = true;
    const res = await trackingDriver(query.value);
    drivers.value = res.data;
    meta.value = res.meta;
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
};

onMounted(getData());

const onChangeAmountToShow = (amount) => {
  query.value.limit = amount;
};

const breadcrumbList = computed(()=> [
  {
    title: t("Dashboard"),
    routeName: "dashboard-index",
    isActive: true,
  },
  {
    title: t("Tracking Driver"),
    routeName: "list-tracking-driver",
    isActive: true,
  },
]);
</script>

<style scoped>
@media screen and (max-width: 1024px) {
  .search-control {
    background-color: #fff;
    border: 1px solid #f2efef00;
    padding-left: 2.5rem;
  }
}
</style>