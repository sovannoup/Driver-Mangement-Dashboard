<template>

  <div class="row mb-4">
    <DateFilter :textData="textData100" @dateFilterSubmit="dateFilterSubmit"/>
  </div>

  <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
    <div class="col">
      <LineChartCardV1
        :textData="textData1"
        :options="chartOption1"
        icon="bxs-wallet"
        textSuccess
      />
    </div>
    <div class="col">
      <LineChartCardV1
        :textData="textData2"
        :options="chartOption1"
        icon="bxs-group"
        textWarning
      />
    </div>
    <div class="col">
      <LineChartCardV1
        :textData="textData3"
        :options="chartOption1"
        icon="bxs-binoculars"
        textDanger
      />
    </div>
  </div>
  <div class="row row-cols-1 row-cols-xl-2">
    <div class="col d-flex">
      <StoreMetric :options="chartOption4" :textData="textData4" />
    </div>
    <div class="col d-flex">
      <TopProduct :textData="textData5" :data="data5" />
    </div>
  </div>
  <div class="row row-cols-1 row-cols-lg-3">
    <div class="col d-flex">
      <TopCategory
        :options="chartOption15"
        :textData="textData15"
        :data="data15"
      />
    </div>

    <div class="col d-flex">
      <Visitor :options="chartOption21" :textData="textData21" />
    </div>

    <div class="col d-flex">
      <SaleOverview
        :options="chartOption19"
        :textData="textData19"
        :data="data19"
      />
    </div>
  </div>
  <div class="row">
    <div class="col">
      <div class="card radius-10">
        <div class="card-body">
          <div class="d-flex align-items-center">
            <div>
              <h5 class="mb-0">{{ $t('Orders Summary') }}</h5>
            </div>
            <div class="font-22 ms-auto">
              <i class="bx bx-dots-horizontal-rounded"></i>
            </div>
          </div>
          <hr />
          <div class="table-responsive">
            <BaseTable :header="headers" :items="orders">
              <template #created_at="{ item }">
                <td>{{ formatDateTime(item.created_at) }}</td>
              </template>
              <template #action="{}">
                <td>
                  <base-link-icon
                    icon="fadeIn animated lni lni-eye"
                    color="list-icon"
                  />
                </td>
              </template>
            </BaseTable>
            <base-paginate
              @onChangeAmountToShow="onChangeAmountToShow"
              @onChange="getData"
              :pages="meta?.last_page"
              v-model="query.page"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LineChartCardV1 from "./partial/LineChartCardV1.vue";
import StoreMetric from "./partial/StoreMetric.vue";
import TopProduct from "./partial/TopProduct.vue";
import TopCategory from "./partial/TopCategory.vue";
import Visitor from "./partial/Visitor.vue";
import SaleOverview from "./partial/SaleOverview.vue";
import DateFilter from "./partial/DateFilter.vue";
import BasePaginate from "../../components/BasePaginate.vue";
export default {
  layout: "admin",
  components: {
    LineChartCardV1,
    StoreMetric,
    TopProduct,
    TopCategory,
    Visitor,
    SaleOverview,
    DateFilter,
    BasePaginate,
  },
};
</script>

<script setup>
import { unassignedOrderListing } from "@/api/report";
import { ref, onMounted, computed } from "vue";
import { formatDateTime } from "../../utils/helper";
import {useI18n } from 'vue-i18n'
/////////////////////////////////////////////LineChartCardV1///////////////////////////////////////////

const {t} = useI18n({})

const textData1 = {
  title: t("Total Orders"),
  amount: "4210",
  description: "199 Since last week",
};

const textData2 = {
  title: t("Total Customers"),
  amount: "1680",
  description: "220 Since last week",
};

const textData3 = {
  title: t("Total Revenue"),
  amount: "8.4K",
  description: "$1k Since last week",
};

const chartOption1 = {
  series: [
    {
      name: "Customers",
      data: [240, 160, 671, 414, 240, 257, 901, 613, 727, 414, 240, 1000],
    },
  ],
  chart: {
    type: "line",
    height: 65,
    toolbar: { show: !1 },
    zoom: { enabled: !1 },
    dropShadow: {
      enabled: !0,
      top: 3,
      left: 14,
      blur: 4,
      opacity: 0.12,
      color: "#007bff",
    },
    sparkline: { enabled: !0 },
  },
  markers: {
    size: 0,
    colors: ["#007bff"],
    strokeColors: "#007bff",
    strokeWidth: 2,
    hover: { size: 7 },
  },
  dataLabels: { enabled: !1 },
  stroke: { show: !0, width: 3, curve: "smooth" },
  colors: ["#007bff"],
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
  fill: { opacity: 1 },
  tooltip: {
    theme: "dark",
    fixed: { enabled: !1 },
    x: { show: !1 },
    y: {
      title: {
        formatter: function (e) {
          return "";
        },
      },
    },
    marker: { show: !1 },
  },
};

/////////////////////////////////////////////StoreMetric///////////////////////////////////////////
const textData4 = {
  title: "Store Metric",
  description: "$34 Since last week",
};

const chartOption4 = {
  series: [
    { name: "Total Sales", data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
    { name: "Customers", data: [76, 85, 101, 98, 87, 105, 91, 114, 94] },
    { name: "Store Visitores", data: [35, 41, 36, 26, 45, 48, 52, 53, 41] },
  ],
  chart: {
    foreColor: "#9ba7b2",
    type: "bar",
    height: 300,
    toolbar: { show: !1 },
  },
  plotOptions: {
    bar: { horizontal: !1, columnWidth: "55%", endingShape: "rounded" },
  },
  dataLabels: { enabled: !1 },
  stroke: { show: !0, width: 2, colors: ["transparent"] },
  colors: ["#0dcaf0", "#0d6efd", "#e5e7e8"],
  xaxis: {
    categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
  },
  fill: { opacity: 1 },
  tooltip: {
    y: {
      formatter: function (e) {
        return "$ " + e + " thousands";
      },
    },
  },
};

/////////////////////////////////////////////TopProducts///////////////////////////////////////////
const textData5 = {
  title: "Top Product",
  description: "$34 Since last week",
};

const data5 = [
  {
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/commons/6/64/Android_logo_2019_%28stacked%29.svg",
    title: "Light Blue Chair",
    retailPrice: 240,
    totalSaleAmount: 24000,
    totalSaleQuantity: 100,
  },
  {
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/commons/6/64/Android_logo_2019_%28stacked%29.svg",
    title: "Light Blue Chair",
    retailPrice: 240,
    totalSaleAmount: 24000,
    totalSaleQuantity: 100,
  },
  {
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/commons/6/64/Android_logo_2019_%28stacked%29.svg",
    title: "Light Blue Chair",
    retailPrice: 240,
    totalSaleAmount: 24000,
    totalSaleQuantity: 100,
  },
];

/////////////////////////////////////////////TopProducts///////////////////////////////////////////
const chartOption15 = {
  series: [25, 65, 10, 14],
  chart: { height: 240, type: "donut" },
  legend: { position: "bottom", show: !1 },
  plotOptions: { pie: { donut: { size: "80%" } } },
  colors: ["#17a00e", "#0d6efd", "#f41127", "#ffc107"],
  dataLabels: { enabled: !1 },
  labels: ["Kids", "Men", "Women", "Furniture"],
  responsive: [
    {
      breakpoint: 480,
      options: { chart: { height: 200 }, legend: { position: "bottom" } },
    },
  ],
};

const textData15 = {
  title: "Top Category",
};

const data15 = [
  {
    title: "Kids",
    quantity: 25,
    type: "success",
  },
  {
    title: "Woman",
    quantity: 10,
    type: "danger",
  },
  {
    title: "Men",
    quantity: 65,
    type: "primary",
  },
  {
    title: "Furniture",
    quantity: 14,
    type: "warning",
  },
];

/////////////////////////////////////////////Visitor///////////////////////////////////////////
const textData21 = {
  title: "Visitors",
  qty: 43540,
};

const chartOption21 = {
  series: [
    { name: "Visitors", data: [427, 613, 801, 457, 605, 414, 671, 360, 540] },
  ],
  chart: {
    foreColor: "#6c757d",
    type: "bar",
    height: 350,
    toolbar: { show: !1 },
    zoom: { enabled: !1 },
    dropShadow: {
      enabled: !1,
      top: 3,
      left: 10,
      blur: 3,
      opacity: 0.1,
      color: "#0d6efd",
    },
    sparkline: { enabled: !1 },
  },
  plotOptions: {
    radialBar: { hollow: { size: "70%" } },
    bar: { horizontal: !1, columnWidth: "35%", endingShape: "rounded" },
  },
  markers: {
    size: 0,
    colors: ["#0d6efd"],
    strokeColors: "#fff",
    strokeWidth: 2,
    hover: { size: 7 },
  },
  dataLabels: { enabled: !1 },
  stroke: { show: !0, width: 3, curve: "smooth" },
  colors: ["#0d6efd"],
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  },
  fill: { opacity: 1 },
};

/////////////////////////////////////////////SalesOveriew///////////////////////////////////////////

const chartOption19 = {
  series: [87],
  chart: { height: 310, type: "radialBar", offsetY: -10 },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      hollow: { margin: 0, size: "70%", background: "transparent" },
      track: {
        strokeWidth: "100%",
        dropShadow: { enabled: !1, top: -3, left: 0, blur: 4, opacity: 0.12 },
      },
      dataLabels: {
        name: { fontSize: "16px", color: "#212529", offsetY: 5 },
        value: {
          offsetY: 20,
          fontSize: "30px",
          color: "#212529",
          formatter: function (e) {
            return e + "%";
          },
        },
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      shadeIntensity: 0.15,
      inverseColors: !1,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 65, 91],
    },
  },
  colors: ["#17a00e"],
  stroke: { dashArray: 4 },
  labels: ["Total Sales"],
  responsive: [{ breakpoint: 480, options: { chart: { height: 300 } } }],
};

const textData19 = {
  title: "Sales Overiew",
};

const data19 = [
  {
    title: "Last Week",
    amount: 289.42,
  },
  {
    title: "Last Month",
    amount: 856.14,
  },
  {
    title: "Last Year",
    amount: 987.25,
  },
];

/////////////////////////////////////////////OrderSummary///////////////////////////////////////////
const headers = computed(() =>{
  return [
  {
    title: "#",
    key: "id",
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
  },
  {
    title: t("Action"),
    key: "action",
  },
]
})

const query = ref({
  page: 1,
  sort: null,
  direction: null,
  limit: 8,
  search: null,
});

const meta = ref({
  total: 0,
});
const loading = ref(false);
const orders = ref([]);

const getData = async () => {
  try {
    loading.value = true;
    const res = await unassignedOrderListing(query.value);
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


/////////////////////////////////////////////DateFilter///////////////////////////////////////////
const textData100 = computed(() => {
  return {
  title: t('Dashboard'),
  from: t("From"),
  to: t("To")
}
});


const dateFilterSubmit = (dates) => {
    console.log(dates, 'date-range');
}
</script>
