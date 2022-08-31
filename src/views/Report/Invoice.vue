<template>
  <div class="d-flex">
    <h3 class="mb-4">{{ $t("Report") }} |</h3>
    <Breadcrumb :breadcrumbList="breadcrumbList" />
  </div>
  <base-card>
    <div class="toolbar">
      <!-- <div class="text-end">
        <Button :text="$t('Print')" class="btn btn-dark ms-0 mx-1 px-3 py-2" />
        <Button :text="$t('Export as PDF')" class="btn btn-danger ms-0 px-3 py-2" />
      </div>
      <hr /> -->
    </div>
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
    <div class="invoice overflow-auto">
      <base-row>
        <base-col md6>
          <BaseImage
            class="rounded-circle"
            style="border: 2px solid var(--bs-primary)"
            :src="item.restaurant_main_image"
            :width="110"
            :height="110"
          ></BaseImage>
        </base-col>
        <base-col md6 style="text-align: right">
          <h2 class="text-primary">{{ item.type_title }}</h2>
          <div class="">{{ item.restaurant_address }}</div>
          <div>{{ item.restaurant_phone }}</div>
          <div>{{}}</div>
        </base-col>
      </base-row>
      <hr />
      <base-row class="mb-3 mt-4">
        <base-col md6>
          <div class="text-gray-light">{{ $t("INVOICE TO") }}:</div>
          <h2>{{ item.customer_name }}</h2>
          <a href="#">{{ item.customer_email }}</a>
        </base-col>
        <base-col md6 style="text-align: right">
          <h2 class="text-primary">{{ $t("INVOICE") }} #{{ model_id }}</h2>
          <div>{{ $t("Date of Invoice") }} : {{ date }}</div>
          <!-- <div class="red">{{$t('Due Date')}}: 31/12/2099</div> -->
        </base-col>
      </base-row>
      <base-row class="py-3" style="background-color: #eee; font-size: 15px">
        <base-col md1>{{ $t("N0") }}</base-col>
        <base-col md6>{{ $t("Name") }}</base-col>
        <base-col md1>{{ $t("Price") }}</base-col>
        <base-col md1>{{ $t("Qty") }}</base-col>
        <base-col md1>{{ $t("Sub-Total") }}</base-col>
        <base-col md1>{{ $t("Discount") }}</base-col>
        <base-col md1 class="tr">{{ $t("TOTAL") }}</base-col>
      </base-row>
      <div v-for="item in item.sale_details" :key="item.id">
        <base-row class="py-3">
          <base-col md1>{{ item.sale_id }}</base-col>
          <base-col md6>{{ item.venueitem_name }}</base-col>
          <base-col md1>{{ item.price }}</base-col>
          <base-col md1>{{ item.qty }}</base-col>
          <base-col md1>{{ item.price * item.qty }}</base-col>
          <base-col md1>{{ item.discount }}</base-col>
          <base-col md1 class="tr">{{ item.total }}</base-col>
        </base-row>
      </div>
      <base-row style="font-size: 16px">
        <base-col md7 />
        <base-col md3 class="border-b">{{ $t("SUBTOTAL") }}</base-col>
        <base-col md2 class="border-b">${{ item.sub_total }}</base-col>
      </base-row>
      <base-row style="font-size: 16px">
        <base-col md7 style="font-size: 25px">{{ $t("Thank you") }}!</base-col>
        <base-col md3 class="border-b"
          >{{ $t("TAX") }} {{ item.tax_percentage }}%</base-col
        >
        <base-col md2 class="border-b">${{ item.tax_amount }}</base-col>
      </base-row>
      <base-row style="font-size: 20px">
        <base-col md7 />
        <base-col
          md3
          class="text-primary"
          style="padding: 10px 20px; text-align: center"
          >{{ $t("GRAND TOTAL") }}</base-col
        >
        <base-col
          md2
          class="text primary"
          style="padding: 10px 20px; text-align: center"
          >${{ item.total }}</base-col
        >
      </base-row>
      <div class="notices mb-5">
        <div>{{ $t("NOTICE") }}:</div>
        <div class="notice">
          {{
            $t(
              "A finance charge of 1.5% will be made on unpaid balances after 30 days."
            )
          }}
        </div>
      </div>
      <footer>
        {{
          $t(
            "Invoice was created on a computer and is valid without the signature and seal."
          )
        }}
      </footer>
    </div>
  </base-card>
</template>

<script setup>
import { computed, ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { show } from "../../api/report";
import useNotyf from "../../composable/useNotyf";
import { formatDateMonth } from "../../utils/helper";
import { useI18n } from "vue-i18n";
import { onMounted } from "@vue/runtime-core";

const router = useRouter();
const route = useRoute();
const Notyf = useNotyf();
const { t } = useI18n({});
const model_id = route.params.id;
const item = ref({});
const date = ref();
const isLoading = ref(true);

onMounted(async () => {
  if (route.params.id) {
    try {
      const { data } = await show(model_id);
      item.value = data;
      date.value = formatDateMonth(data.created_at);
      isLoading.value = false;
    } catch (error) {
      Notyf.error(
        t(error.message || "Something went wrong, please try agian later!")
      );
    }
  }
});

const breadcrumbList = computed(() => [
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
  {
    title: t("Invoice"),
    routeName: "invoice",
    isActive: true,
  },
]);
</script>

<style scoped>
.border-b {
  border-bottom: 1px solid #eee;
  padding: 10px 20px;
  text-align: center;
}
.tr {
  text-align: right;
}
.notices {
  padding-left: 6px;
  border-left: 6px solid #9d0175;
  background: #e7f2ff;
  padding: 15px;
}

.red {
  color: red;
}
</style>