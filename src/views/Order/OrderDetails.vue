<template>
  <Breadcrumb :breadcrumbList="breadcrumbList" />
  <div class="d-flex align-items-center">
    <h3 class="m-0">{{ $t("Order") }} #{{ model_id }}</h3>
    <div
      class="badge rounded-pill p-2 text-uppercase px-3 mx-2 text-center"
      :class="
        item.is_paid
          ? 'bg-light-danger text-danger'
          : 'bg-light-success text-success'
      "
    >
      <i class="bx bxs-circle me-1"></i
      >{{ item.is_paid ? $t("Unpaid") : $t("Paid") }}
    </div>
    <div
      class="
        badge
        rounded-pill
        p-2
        text-uppercase
        px-3
        mx-2
        text-success
        bg-light-success
        text-center
      "
      :class="
        item.status === 'Done'
          ? 'bg-light-success text-success'
          : 'bg-light-danger text-danger'
      "
    >
      <i class="bx bxs-circle me-1"></i>{{ $t("Confirmed") }}
    </div>
    <div class="d-flex align-items-center mx-2">
      <base-link-icon
        color="list-icon mx-2"
        icon="fadeIn animated bx bx-calendar-star"
      />
      {{ date }}
    </div>
  </div>
  <div class="my-3">
    <Button
      class="btn btn-primary btn btn-primary px-3"
      :text="$t('Show location on map')"
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#showLocationModal"
    />
  </div>
  <base-row>
    <base-col md8>
      <base-card>
        <h6>{{ $t("Order Details") }}</h6>
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
        <hr />
        <div class="d-flex justify-content-between">
          <p class="text-secondary">{{ $t("Order Note") }} :</p>
          <div>
            <p class="text-secondary">
              {{ $t("Payment Method") }}: {{ item.payment_method }}
            </p>
            <p class="text-secondary red">
              {{ $t("Reference Code") }}: {{ item.sale_reference }}
            </p>
            <p class="text-secondary">
              {{ $t("Order Type") }}: {{ item.order_type }}
            </p>
          </div>
        </div>
        <hr />
        <div v-for="item in item.sale_details" :key="item.id">
          <div class="row">
            <div class="d-flex col-md-7 align-self-center">
              <BaseImage :src="item.venueitem.image" :width="60"></BaseImage>
              <div class="d-flex justify-content-center flex-column mx-2">
                <p class="text-secondary m-0">{{ item.venueitem_name }}</p>
                <p class="text-secondary m-0">{{ item.category_name }}</p>
                <p class="text-small m-0">{{ item.description }}</p>
              </div>
            </div>
            <div
              class="d-flex col-md-2 align-self-center justify-content-center"
            >
              <h6>$ {{ item.price }}</h6>
            </div>
            <div
              class="d-flex col-md-1 align-self-center justify-content-center"
            >
              <h6>{{ item.qty }}</h6>
            </div>
            <div
              class="d-flex col-md-2 align-self-center justify-content-center"
            >
              <h6>$ {{ item.total }}</h6>
            </div>
          </div>
          <hr />
        </div>
        <div class="row justify-content-md-end">
          <div class="col-md-9 col-lg-8">
            <dl class="row text-end">
              <dt class="col-md-6">{{ $t("Subtotal") }}</dt>
              <dd class="col-md-6">$ {{ item.sub_total }}</dd>
              <dt class="col-md-6">{{ $t("Discount") }}:</dt>
              <dd class="col-md-6">-$ {{ item.discount }}</dd>
              <dt class="col-md-6">{{ $t("Coupon Discount") }}</dt>
              <dd class="col-md-6">-$ {{ item.coupon }}</dd>
              <dt class="col-md-6">{{ $t("VAT 10%") }}</dt>
              <dd class="col-md-6">+$ {{ item.tax_amount }}</dd>
              <dt class="col-md-6">{{ $t("Delivery Fee") }}</dt>
              <dd class="col-md-6">+$ {{ item.delivery_fee }}</dd>
              <dt class="col-md-6">{{ $t("Total") }}</dt>
              <dd class="col-md-6">$ {{ item.total }}</dd>
            </dl>
          </div>
        </div>
      </base-card>
    </base-col>
    <base-col md4>
      <base-row>
        <base-col>
          <base-card>
            <div class="d-flex justify-content-between">
              <h6 class="m-0 d-flex align-items-center">
                {{ $t("Delivery Man") }}
              </h6>
              <Button
                v-if="driverExist"
                type="button"
                :text="$t('Change')"
                class="align-items-center px-2 py-1"
                style="font-size: 13px"
                data-bs-toggle="modal"
                data-bs-target="#assignDeliveryModal"
              ></Button>
            </div>
            <hr />
            <div class="">
               <div class="d-flex justify-content-center">
                 <Button
                v-if="!driverExist"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#assignDeliveryModal"
                class="btn btn-primary px-3"
                @click="assignLoading = true"
                :text="$t('Assign delivery')"
              />
               </div>
              <div v-if="driverExist">
                <h6 class="py-1">{{ $t("Contact Info") }}</h6>
                <ul class="list-unstyled list-unstyled-py-2">
                  <li>
                    {{ t('Name') }}: {{ chooseDriver?.firstname +' '+ chooseDriver?.lastname }}
                  </li>
                  <li>
                    {{ $t('Phone Number') }}: {{ chooseDriver?.phone_number }}
                  </li>
                  <li>
                    {{ $t('Email') }}: {{ chooseDriver?.email }}
                  </li>
                </ul>
              </div>

            </div>
          </base-card>
        </base-col>
        <base-col>
          <base-card>
            <h6>{{ $t("Customer") }}</h6>
            <hr />
            <div class="d-flex">
              <!-- <BaseImage :src="item" :width="60"></BaseImage> -->
              <div class="d-flex justify-content-center flex-column mx-2">
                <h6 class="text-secondary m-0">{{ item.customer_name }}</h6>
                <p class="text-small m-0">
                  {{ item.all_order_by_customer }} {{ $t("Orders") }}
                </p>
              </div>
            </div>
            <hr />
            <div>
              <h6 class="py-1">{{ $t("Contact Info") }}</h6>
              <ul class="list-unstyled list-unstyled-py-2">
                <li>
                  <i class="fadeIn animated bx bx-mail-send mx-2"></i>
                  {{ item.customer?.email }}
                </li>
                <li>
                  <i class="fadeIn animated bx bx-phone-call mx-2"></i>
                  {{ item.customer?.phone }}
                </li>
              </ul>
            </div>
            <hr />
            <div>
              <h6 class="py-2">{{ $t("Delivery Info") }}</h6>
              <p class="mb-0 red">{{ $t("Name") }}: Sultan 0 Mahamud 1</p>
              <p class="mb-0 red">{{ $t("Contact") }}: +85513491743</p>
              <div class="d-flex mt-2">
                <i class="fadeIn animated bx bx-map-alt red" />
                <p class="mx-2 mb-0 red">{{ item.delivery_company_address }}</p>
              </div>
            </div>
          </base-card>
        </base-col>
        <base-col>
          <base-card>
            {{ item.restaurants }}
            <h6>{{ $t("Restaurant") }}</h6>
            <hr />
            <div class="d-flex">
              <BaseImage
                :src="item.restaurant_main_image"
                :width="60"
              ></BaseImage>
              <div class="d-flex justify-content-center flex-column mx-2">
                <h6 class="text-secondary m-0">{{ item.type_title }}</h6>
                <p class="text-small m-0 red">10 {{ $t("orders served") }}</p>
              </div>
            </div>
            <hr />
            <div>
              <h6 class="py-1">{{ $t("Contact Info") }}</h6>
              <ul class="list-unstyled list-unstyled-py-2">
                <li>
                  <i class="fadeIn animated bx bx-mail-send mx-2"></i>
                  {{ item.restaurant_email }}
                </li>
                <li>
                  <i class="fadeIn animated bx bx-phone-call mx-2"></i>
                  {{ item.restaurant_phone }}
                </li>
              </ul>
            </div>
          </base-card>
        </base-col>
      </base-row>
    </base-col>
  </base-row>

  <!-- Modal -->
  <!-- Assign Driver Modal -->
  <div
    ref="assignDeliveryModal"
    class="modal fade"
    id="assignDeliveryModal"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-scrollable modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Assign Delivery Man</h5>
          <button
            type="button"
            ref="btn_close"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="progress mb-3" style="height: 5px" v-if="assignLoading">
            <div
              class="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              aria-valuenow="75"
              aria-valuemin="0"
              aria-valuemax="100"
              style="width: 100%"
            ></div>
          </div>
          <div class="">
            <base-col>
              <base-card>
                <ul class="list-group p-3">
                  <li
                    v-for="item in availableDriverData?.data"
                    :key="item?.id"
                    class="list-group-item"
                  >
                    <div
                      class="d-flex align-items-center justify-content-between"
                    >
                      <div class="">
                          <BaseImage
                          :src="item.image"
                          :width="40"
                          :height="40"
                        ></BaseImage>
                        <span class="ms-1">{{ item.firstname }} {{ item.lastname }}</span>
                      </div>
                      <div>
                        <Button
                        @click="assignDriverToSale(item.id)"
                        type="button"
                        text="Assign"
                        class="align-items-center px-2 py-1"
                        style="font-size: 13px"
                      ></Button>
                      </div>
                    </div>
                  </li>
                </ul>
              </base-card>
            </base-col>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- show map location -->
  <div
    ref="showLocationModal"
    class="modal fade"
    id="showLocationModal"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-scrollable modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ $t("Location") }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
            <BaseGoogleMap :options="allOptions"></BaseGoogleMap>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { formatDateMonth } from "../../utils/helper";
import { onMounted } from "@vue/runtime-core";
import { show } from "../../api/report";
import { Notyf } from "notyf";
import { useI18n } from "vue-i18n";
import { availableDriver, assignDriver } from "@/api/driver";
import useNotyf from "../../composable/useNotyf";
import * as _ from "lodash"

const notyf = useNotyf();
const router = useRouter();
const route = useRoute();
const { t } = useI18n({});
const model_id = route.params.id;
const date = ref(null);
const item = ref({});
const isLoading = ref(true);
const assignLoading = ref(true);
const btnLoading = ref(false);
const assignDeliveryModal = ref(null);
const btn_close = ref(null);
const availableDriverData = ref(null);
const chooseDriver = ref(null);
const driverExist = ref(false);
const assignDriverData = ref({
  sale_id: null,
  driver_id: null,
});

const getAvailableDriverData = async () => {
  try {
    availableDriverData.value = await availableDriver();
    assignLoading.value = false;
  } catch (error) {
    notyf.error(t("Something went wrong, please try again later!"));
  }
};

const assignDriverToSale = async (driver_id) => {
  btnLoading.value = true;
  assignDriverData.value.sale_id = route.params.id;
  assignDriverData.value.driver_id = driver_id;
  try {
    btn_close.value.click();
    await assignDriver(assignDriverData.value);
    notyf.success(t("Driver Assigned Successfully"));
    driverExist.value = true;
    chooseDriver.value = _.find(availableDriverData.value.data, (x) => x.id === driver_id)
  } catch (error) {
    console.log(error);
    notyf.error(t("Something went wrong, please try again later!"));
  }
};

onMounted(async () => {

  try {
    const { data } = await show(model_id);
    availableDriverData.value = await availableDriver();
    item.value = data;
    date.value = data.created_at;
    isLoading.value = false;
    driverExist.value = item.value.driver_id;
    if (driverExist.value){
        chooseDriver.value = _.find(availableDriverData.value.data, (x) => x.id === driverExist.value)
    }
  } catch (error) {
    notyf.error(
      t(error.message || "Something went wrong, please try again later!")
    );
  }

  assignDeliveryModal.value.addEventListener("show.bs.modal", function (event) {
    getAvailableDriverData();
  });
});

const breadcrumbList = computed(() => [
  {
    title: t("Dashboard"),
    routeName: "dashboard-index",
    isActive: true,
  },
  {
    title: t("Unassign Order"),
    routeName: "unassigned-order",
    isActive: true,
  },
  {
    title: t("Order Details"),
    routeName: "order-details",
    isActive: true,
  },
]);

const image = require('@/assets/images/google-map/customer_location.png');

const restaurantOptions = { position: { lat: 11.579597470179364, lng: 104.82314560336615 },  title: 'Driver',icon: image }
const customerOptions = { position: { lat: 11.574539446653324, lng: 104.82733180399665 }, title: 'Customer' }
const driverOptions = { position: { lat: 11.572126786184445, lng: 104.82341087738282 }, title: 'Driver' }

const allOptions = [
    restaurantOptions, customerOptions, driverOptions
]

</script>

<style scoped>
.red {
  color: red;
}
</style>