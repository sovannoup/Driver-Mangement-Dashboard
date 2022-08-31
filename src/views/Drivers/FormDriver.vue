<template>
  <div class="d-flex">
    <h3 class="mb-4">{{ $t("Driver") }} |</h3>
    <Breadcrumb :breadcrumbList="breadcrumbList" />
  </div>
  <BaseRow>
    <BaseCol sm12>
      <VeeForm ref="form" @submit="onSubmit">
        <div class="card border-top border-0 border-4 border-primary">
          <div class="card-body">
            <h4 class="text-primary">{{ $t(formTitle) }} {{ $t("Driver") }}</h4>
            <hr v-if="!preLoading" />
            <div class="progress mb-3" style="height: 5px" v-if="preLoading">
              <div
                class="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
                style="width: 100%"
              ></div>
            </div>
            <base-row class="mb-3">
              <label class="col-sm-3 col-form-label">{{
                $t("First Name")
              }}</label>
              <base-field
                v-model="driver.firstname"
                name="firstname"
                type="text"
                rules="required"
                class="col-sm-9"
                :placeholder="$t('First Name')"
              ></base-field>
            </base-row>

            <base-row class="mb-3">
              <label class="col-sm-3 col-form-label">{{
                $t("Last Name")
              }}</label>
              <base-field
                v-model="driver.lastname"
                name="lastname"
                type="text"
                :placeholder="$t('Last Name')"
                rules="required"
                class="col-sm-9"
              ></base-field>
            </base-row>
            <base-row class="mb-3">
              <label class="col-sm-3 col-form-label">{{
                $t("Phone Number")
              }}</label>
              <base-field
                v-model="driver.phone_number"
                name="phone_number"
                type="text"
                :placeholder="$t('Phone Number')"
                rules="required"
                class="col-sm-9"
              ></base-field>
            </base-row>
            <base-row class="mb-3">
              <label class="col-sm-3 col-form-label">{{ $t("Email") }}</label>
              <base-field
                v-model="driver.email"
                name="email"
                type="email"
                :placeholder="$t('Email')"
                rules="required"
                class="col-sm-9"
              ></base-field>
            </base-row>
            <base-row class="mb-3">
              <label class="col-sm-3 col-form-label">{{
                $t("Password")
              }}</label>
              <base-field
                v-model="driver.password"
                name="password"
                type="password"
                class="col-sm-9"
                :placeholder="$t('Password')"
                :rules="route.params.id ? '' : 'required|min:8'"
              ></base-field>
            </base-row>
            <base-row class="mb-3">
              <label class="col-sm-3 col-form-label">{{
                $t("Confirm Password")
              }}</label>
              <base-field
                v-model="driver.password_confirmation"
                name="password_confirmation"
                type="password"
                :placeholder="$t('Confirm Password')"
                class="col-sm-9"
                :rules="
                  route.params.id
                    ? 'confirmed:@password'
                    : 'required|confirmed:@password'
                "
              ></base-field>
            </base-row>


            <base-row class="mb-3">
              <label class="col-sm-3 col-form-label" id="Publish?">{{
                $t("Gender")
              }}</label>
              <div class="col-sm-9 align-self-center">
                <BaseRadio v-model="driver.gender" :options="gender" :defaultGender="driver.gender"></BaseRadio>
              </div>
            </base-row>

             <base-row class="mb-3">
              <label class="col-sm-3 col-form-label" id="Status?">{{
                $t("Status")
              }}</label>
              <div class="col-sm-9 align-self-center">
                <BaseRadio v-model="driver.status" :options="status" :defaultGender="driver.status"></BaseRadio>
              </div>
            </base-row>

            <base-row class="mb-3">
              <label class="col-sm-3 col-form-label" id="Publish?">{{
                $t("Publish")
              }}</label>
              <div class="col-sm-9">
                <Toggle
                  name="is_publish"
                  v-model="driver.is_publish"
                  falseValue="UNPUBLISHED"
                  trueValue="PUBLISHED"
                />
              </div>
            </base-row>
            <base-col md12>
              <div class="text-end">
                <Button
                  :isLoading="isFormLoading"
                  type="submit"
                  :text="$t('Save')"
                  class="px-5"
                />
              </div>
            </base-col>
          </div>
        </div>
      </VeeForm>
    </BaseCol>
  </BaseRow>
</template>
    
 <script>
export default {
  components: [{ name: "BaseField" }, { name: "BaseRow" }, { name: "BaseCol" }],
  props: {
    // This prop is for product form
    isMinimalLayout: {
      type: Boolean,
      default: false,
    },
    // This prop is for product form
    useCallback: {
      type: Boolean,
      default: false,
    },
  },
  back: "list-driver",
};
</script> 

 <script setup>
import useNotyf from "../../composable/useNotyf";
import { ref, computed, onMounted, watch, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { create, show, edit } from "../../api/driver";
import { useI18n } from "vue-i18n";

const { t } = useI18n({});
const isFormLoading = ref(false);
const notyf = useNotyf();
const router = useRouter();
const route = useRoute();
const formTitle = ref(route.params.id ? "Edit" : "New");
const preLoading = ref(route.params.id ? true : false);
const form = ref(null);

const model_id = route.params.id;

const gender = computed(() => {
  return [
    {
      value: "Male",
      label: t("Male"),
    },
    {
      value: "Female",
      label: t("Female"),
    },
    {
      value: "Other",
      label: t("Other"),
    },
  ];
});

const status = computed(() => {
  return [
    {
      value: "available",
      label: t("Available"),
    },
    {
      value: "busy",
      label: t("Busy"),
    },
  ];
});

const isEdit = computed(() => {
  return model_id ? true : false;
});

const breadcrumbList = computed(() => {
  return [
    {
      title: t("Dashboard"),
      routeName: "dashboard-index",
      isActive: true,
    },
    {
      title: t("Drivers"),
      routeName: "list-driver",
      isActive: true,
    },
    {
      title: `${isEdit.value ? t("Edit Driver") : t("Add Driver")}`,
      routeName: "create-driver",
      isActive: false,
    },
  ];
});

const defaultDriverValue = {
  id: null,
  firstname: "",
  lastname: "",
  email: "",
  phone_number: "",
  status: "",
  is_publish: false,
  gender: null
};

const driver = ref({
  ...defaultDriverValue,
});

const onSubmit = async (driver) => {
  if (route.params.id) {
    editDriver();
  } else {
    addDriver();
  }
};

watch(route, (to) => {
  if (to.fullPath === "/create-driver") {
    form.value.resetForm();
    formTitle.value = route.params.id ? "Edit" : "New";
  }
});

const addDriver = async () => {
  isFormLoading.value = true;
  try {
    await create(driver.value);
    notyf.success(t("Driver has been added."));
    isFormLoading.value = false;
    router.push({ name: "list-driver" });
  } catch (error) {
    isFormLoading.value = false;
  }
};

const editDriver = async () => {
  isFormLoading.value = true;
  try {
    await edit(driver.value, model_id);
    notyf.success(t("Driver has been updated."));
    isFormLoading.value = false;
    router.push({ name: "list-driver" });
  } catch (error) {
    isFormLoading.value = false;
  }
};

onMounted(async () => {
  formTitle.value = route.params.id ? "Edit" : "New";
  await bindDataModel();
});

const bindDataModel = async () => {
  // Update
  if (route.params.id) {
    try {
      const { data } = await show(model_id);
      driver.value = data;
    } catch (error) {
      notyf.error(
        t(error.message || "Something went wrong, please try agian later!")
      );
    }
    preLoading.value = false;
  }
};

const genderChange = (gender) => {
  driver.value.gender = gender
}
</script>