<template>
      <div class="d-flex">
        <h3 class="mb-4">{{ $t("Driver") }} |</h3>
        <Breadcrumb :breadcrumbList="breadcrumbList"/>
    </div>
  <BaseRow>
    <BaseCard>
      <div class="card-body">
        <div class="d-lg-flex align-items-center mb-4 gap-3">
          <div class="position-relative">
            <input
              type="text"
              class="form-control ps-5"
              style="border-radius: 30px"
              :placeholder="$t('Search Order')"
            />
            <span
              class="position-absolute top-50 product-show translate-middle-y"
              ><i class="bx bx-search"></i
            ></span>
          </div>
          <!-- <div class="ms-auto">
            <a
              @click="$router.push('/create-user')"
              class="btn btn-primary mt-2 mt-lg-0"
              style="border-radius: 30px"
              ><i class="bx bxs-plus-square"></i>{{ $t('Filters') }}</a
            >
          </div> -->
        </div>
        <div class="table-responsive">
          <base-table
            :header="headers"
            :items="orders"
            :isLoading="loading"
            @sort="onSort"
          >
            <template #created_at="{ item }">
              <td>{{ formatDateTime(item.created_at) }}</td>
            </template>
          </base-table>
          <!-- <base-paginate
            @onChangeAmountToShow="onChangeAmountToShow"
            @onChange="getData"
            :pages="meta.last_page"
            v-model="query.page"
          /> -->
        </div>
      </div>
    </BaseCard>
  </BaseRow>
</template>

<script>
import BasePaginate from "../../components/BasePaginate.vue";

export default {
  name: "AssignedOrderListing",
  layout: "admin",
  middleware: ["auth"],
  components: {
    BasePaginate,
  },
};
</script>

<script setup>
import useNotyf from "../../composable/useNotyf";
import { debounce } from "lodash";
import { orderListingByDriver } from "@/api/report";
import { ref, onMounted, computed } from "vue";
import { formatDateTime } from "../../utils/helper";
import { useRoute, useRouter } from "vue-router";
import {useI18n} from "vue-i18n"

const {t} = useI18n({})
const notyf = useNotyf();
const router = useRouter();
const route = useRoute();
const loading = ref(false);
const orders = ref([]);
const showFilter = ref(true);
const meta = ref({
  total: 0,
});
const query = ref({
  driver_id: route.params.id,
  page: 1,
  sort: null,
  direction: null,
  limit: 8,
  search: null,
});
const headers = computed(() => {
  return [
  {
    title: "#",
    key: "id",
    sortable: true,
  },
  {
    title: t("Driver ID"),
    key: "driver_id",
  },
  {
    title: t("Restaurant"),
    key: "type_title",
  },
  {
    title: t("Total Amount"),
    key: "total",
  },
  {
    title: t("Payment Method"),
    key: "payment_method",
  },
  {
    title: t("Date"),
    key: "created_at",
  }
]
})
const breadcrumbList = computed(() => {
  return [
  {
    title: t("Report"),
    routeName: "dashboard-index",
    isActive: true,
  },
  {
    title: t("Order By Driver"),
    routeName: "list-order-by-driver",
    isActive: true,
  },
]
})

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
    const res = await orderListingByDriver(query.value);
    orders.value = res.items;
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

const filterToggle = () => {
  showFilter.value = !showFilter.value;
};
</script>

<style lang="scss" scoped>
@use "@/assets/css/bootstrap.scss" with
  (
    $grid-breakpoints: (
      xs: 0,
      sm: 576px,
      md: 992px,
      lg: 1250px,
    )
  );
.dropdown .dropdown-menu {
  -webkit-transition: all 0.32s;
  -moz-transition: all 0.32s;
  -ms-transition: all 0.32s;
  -o-transition: all 0.32s;
  transition: all 0.32s;

  display: block;
  overflow: hidden;
  opacity: 0;
  transform: translateX(0%) scaleY(0);
  transform-origin: top;
}

.dropdown-menu.show {
  opacity: 1;
  transform: translateX(0%) scaleY(1);
}

@media screen and (max-width: 1024px) {
  .search-control {
    background-color: #fff;
    border: 1px solid #f2efef00;
    padding-left: 2.5rem;
  }
}
</style>