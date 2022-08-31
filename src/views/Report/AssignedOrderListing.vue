<template>
  <BaseDrawer isHead title="Filter" isFooter isDrawerVisible isCloseBtn>
    <template #body>
      <BaseRow>
        <BaseCol class="mb-3">
          <BaseField
            :label="$t('Order ID')"
            name="id"
            :placeholder="$t('Order ID')"
            v-model="query.id"
            :value="query.id"
            type="text"
          />
        </BaseCol>
        <BaseCol class="mb-3">
          <BaseField
            :label="$t('Invoice Number')"
            :placeholder="$t('Invoice Number')"
            name="invoice_number"
            v-model="query.invoice_number"
            :value="query.invoice_number"
            type="text"
          />
        </BaseCol>
        <BaseCol class="mb-3">
          <label class="col mb-2">
            <strong>{{ $t("Payment Method") }}</strong>
          </label>
          <BaseMultiselect
            name="payment_method"
            :placeholder="$t('Payment Method')"
            :options="paymentMethods"
            v-model="query.payment_method"
          >
          </BaseMultiselect>
        </BaseCol>
      </BaseRow>
    </template>
    <template #footer>
      <div class="d-flex align-items-center justify-content-between">
        <div>
          <button
            @click="reset"
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
          >
            {{ $t("Reset") }}
          </button>
        </div>
        <div>
          <button
            @click="filter"
            type="button"
            class="btn btn-primary ms-2"
            data-bs-dismiss="modal"
          >
            {{ $t("Filter") }}
          </button>
        </div>
      </div>
    </template>
  </BaseDrawer>
  <div class="d-flex">
    <h3 class="mb-4">{{ $t("Report") }} |</h3>
    <Breadcrumb :breadcrumbList="breadcrumbList" />
  </div>
  <BaseCard>
    <div class="d-lg-flex align-items-center mb-4 gap-3">
      <div class="position-relative">
        <input
          type="text"
          class="form-control ps-5"
          style="border-radius: 30px"
          :placeholder="$t('Search Order')"
          v-model="query.search"
          @keyup.enter="getData"
          @input="searchInput"
        />
        <span class="position-absolute top-50 product-show translate-middle-y"
          ><i class="bx bx-search"></i
        ></span>
      </div>
      <div class="ms-auto">
        <a
          class="btn btn-primary mt-2 mt-lg-0"
          data-bs-toggle="modal"
          data-bs-target="#ModalSlide"
          ><i class="bx bxs-plus-square"></i>{{ $t("Filters") }}</a
        >
      </div>
    </div>
    <div class="table-responsive">
      <base-table
        :header="headers"
        :items="orders"
        :isLoading="loading"
        @sort="onSort"
      >
        <template #created_at="{ item }">
          <td>{{ item.created_at }}</td>
        </template>
        <template #action="{ item }">
          <td>
            <base-link-icon
              @click="
                $router.push({
                  name: 'invoice',
                  params: { id: item.id },
                })
              "
              icon="fadeIn animated lni lni-keyboard"
              color="list-icon"
            />
          </td>
        </template>
      </base-table>
      <!-- <base-paginate
        @onChangeAmountToShow="onChangeAmountToShow"
        @onChange="getData"
        :pages="meta.last_page"
        v-model="query.page"
      /> -->
    </div>
  </BaseCard>
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
import { debounce } from "lodash";
import { assignedOrderListing } from "@/api/report";
import { ref, onMounted, reactive, computed } from "vue";
import { useI18n } from "vue-i18n";
import { formatDateTime } from "@/utils/helper";
const loading = ref(false);
const orders = ref([]);
const meta = ref({
  total: 0,
});

const { t } = useI18n({});
const form = reactive({
  email: null,
});
const query = ref({
  page: 1,
  sort: null,
  direction: null,
  limit: 8,
  search: null,
  id: null,
  invoice_number: null,
  payment_method: null,
  driver_id: null,
});

const paymentMethods = ref([
  {
    value: null,
    label: "All",
  },
  {
    value: "CASH_ON_DELIVERY",
    label: "CASH_ON_DELIVERY",
  },
  {
    value: "VISA_CARD",
    label: "VISA_CARD",
  },
  {
    value: "BCEL_ONE",
    label: "BCEL_ONE",
  },
]);

const headers = computed(() => [
  {
    title: "#",
    key: "id",
    sortable: true,
  },
  {
    title: t("Invoice Number"),
    key: "invoice_number",
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
    key: "amount_to_be_paid",
  },
  {
    title: t("Payment Method"),
    key: "payment_method",
  },
  {
    title: t("Order Date"),
    key: "created_at",
  },
  {
    title: t("Action"),
    key: "action",
  },
]);
const breadcrumbList = computed(() => {
  return [
    {
      title: t("Dashboard"),
      routeName: "dashboard-index",
      isActive: true,
    },
    {
      title: t("Assigned Order"),
      routeName: "assigned-order-listing",
      isActive: true,
    },
  ];
});

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
    const res = await assignedOrderListing(query.value);
    orders.value = res.data;
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

const filter = debounce(() => {
  getData();
}, 250);

const reset = debounce(() => {
  query.value.id = null;
  query.value.invoice_number = null;
  query.value.payment_method = null;
  query.value.driver_id = null;
  query.value.search = null;
  getData();
}, 250);
</script>