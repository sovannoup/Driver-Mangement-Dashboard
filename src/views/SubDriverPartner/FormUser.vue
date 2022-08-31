<template>
  <div class="d-flex">
    <h3 class="mb-4">{{ $t("User") }} |</h3>
    <Breadcrumb :breadcrumbList="breadcrumbList" />
  </div>
  <BaseRow>
    <BaseCol md4>
      <div class="card border-top border-0 border-4 border-primary">
        <div class="card-body">
          <div class="d-flex flex-column align-items-center text-center">
            <base-profile-image
              width="110"
              ref="form"
              height="110"
              v-model="user.image"
              :imageHolder="user.image"
              :function="updateUserImage"
            />
          </div>
        </div>
      </div>
    </BaseCol>
    <BaseCol md8>
      <VeeForm ref="form" @submit="onSubmit">
        <div class="card border-top border-0 border-4 border-primary">
          <div class="card-body">
            <h4 class="text-primary">{{ $t(formTitle) }} {{ $t("User") }}</h4>
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
              <label class="col-sm-3 col-form-label" id="title?">{{
                $t("Title")
              }}</label>
              <div class="col-sm-9 align-self-center">
                <BaseRadio
                  v-model="user.title"
                  :options="title"
                  :defaultGender="user.title"
                ></BaseRadio>
              </div>
            </base-row>

            <base-row class="mb-3">
              <label class="col-sm-3 col-form-label">{{
                $t("First Name")
              }}</label>
              <base-field
                v-model="user.firstname"
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
                v-model="user.lastname"
                name="lastname"
                type="text"
                rules="required"
                class="col-sm-9"
                :placeholder="$t('Last Name')"
              ></base-field>
            </base-row>
            <base-row class="mb-3">
              <label class="col-sm-3 col-form-label">{{ $t("Email") }}</label>
              <base-field
                v-model="user.email"
                name="email"
                type="email"
                class="col-sm-9"
                rules="required"
                :placeholder="$t('Email')"
              ></base-field>
            </base-row>

            <base-row class="mb-3">
              <label class="col-sm-3 col-form-label">{{
                $t("Password")
              }}</label>
              <!-- <base-field
                v-model="user.password"
                name="password"
                type="password"
                class="col-sm-9"
                :rules="route.params.id ? '' : 'required'"
                :placeholder="$t('Password')"
              ></base-field> -->

              <BaseFieldGroup
                v-model="user.password"
                name="password"
                :type="showPassword == true ? 'text' : 'password'"
                :rules="route.params.id ? '' : 'required|min:8'"
                :placeholder="$t('Password')"
                class="col-sm-9"
              >
                <template v-slot:left="">
                  <a
                    @click="showPassword = !showPassword"
                    href="javascript:;"
                    class="input-group-text bg-transparent"
                  >
                    <i
                      :class="[
                        'bx',
                        showPassword == true ? 'bx-show' : 'bx-hide',
                      ]"
                    ></i>
                  </a>
                </template>
              </BaseFieldGroup>
            </base-row>

            <base-row class="mb-3">
              <label class="col-sm-3 col-form-label">{{
                $t("Confirm Password")
              }}</label>
              <!-- <base-field
                v-model="user.password_confirmation"
                name="password_confirmation"
                type="password"
                class="col-sm-9"
                :rules="
                  route.params.id
                    ? 'confirmed:@password'
                    : 'required|confirmed:@password'
                "
                :placeholder="$t('Confirm Password')"
              >
              </base-field> -->

              <BaseFieldGroup
                v-model="user.password_confirmation"
                name="password_confirmation"
                :type="showPassword == true ? 'text' : 'password'"
                :rules="
                  route.params.id
                    ? 'confirmed:@password'
                    : 'required|confirmed:@password'
                "
                :placeholder="$t('Confirm Password')"
                class="col-sm-9"
              >
                <template v-slot:left="">
                  <a
                    @click="showPassword = !showPassword"
                    href="javascript:;"
                    class="input-group-text bg-transparent"
                  >
                    <i
                      :class="[
                        'bx',
                        showPassword == true ? 'bx-show' : 'bx-hide',
                      ]"
                    ></i>
                  </a>
                </template>
              </BaseFieldGroup>
            </base-row>
            <base-row class="mb-3">
              <label class="col-sm-3 col-form-label">{{ $t("Status") }}</label>
              <div class="col-sm-9">
                <Toggle
                  name="status"
                  v-model="user.status"
                  falseValue="disabled"
                  trueValue="enabled"
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
    isMinimalLayout: {
      type: Boolean,
      default: false,
    },
    useCallback: {
      type: Boolean,
      default: false,
    },
  },
  back: "list-user",
};
</script> 

 <script setup>
import useNotyf from "../../composable/useNotyf";
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { addUsers, getById, editUsers } from "../../api/users";
import { updateUserImage } from '../../api/image';
import { useI18n } from "vue-i18n";

const { t } = useI18n({});
const preLoading = ref(true);
const isFormLoading = ref(false);
const notyf = useNotyf();
const router = useRouter();
const route = useRoute();
const formTitle = ref(route.params.id ? "Edit" : "New");
const form = ref(null);
const model_id = route.params.id;
const showPassword = ref(false);

const title = computed(() => {
  return [
    {
      value: "Mr.",
      label: t("Mr."),
    },
    {
      value: "Ms.",
      label: t("Ms."),
    },
    {
      value: "Mrs.",
      label: t("Mrs."),
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
      title: t("Users"),
      routeName: "list-user",
      isActive: true,
    },
    {
      title: `${isEdit.value ? t("Edit User") : t("Add User")}`,
      routeName: "create-user",
      isActive: false,
    },
  ];
});

const defaultUserValue = {
  id: null,
  title: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  password_confirmation: "",
  status: "",
  image: null,
  image_path: null,
};

const user = ref({
  ...defaultUserValue,
});

const onSubmit = async () => {
  if (route.params.id) {
    editUser();
  } else {
    addUser();
  }
};

const addUser = async () => {
  isFormLoading.value = true;
  try {
    await addUsers(user.value);
    notyf.success(t("User has been added."));
    isFormLoading.value = false;
    router.push({ name: "list-user" });
  } catch (error) {
    isFormLoading.value = false;
  }
};

const editUser = async () => {
  isFormLoading.value = true;
  try {
    await editUsers(user.value, model_id);
    notyf.success(t("User has been updated."));
    isFormLoading.value = false;
    router.push({ name: "list-user" });
    console.log(user.value)
  } catch (error) {
    isFormLoading.value = false;
  }
};

onMounted(async () => {
  formTitle.value = route.params.id ? "Edit" : "New";
  await bindDataModel();
  preLoading.value = false;
});

const bindDataModel = async () => {
  // Update
  if (route.params.id) {
    try {
      user.value = await getById(route.params.id);
    } catch (error) {
      notyf.error(
        t(error.message || "Something went wrong, please try again later!")
      );
    }
  }
};

watch(route, (to) => {
  if (to.fullPath === "/create-user") {
    form.value.resetForm();
    formTitle.value = route.params.id ? "Edit" : "New";
  }
});
</script>

<style lang="scss" scoped>
.loading {
  height: 100vh;
  background-image: url("~@/assets/images/loading/pre_loading.gif");
  background-repeat: no-repeat;
  background-position: top;
  /* background-size: ; */
}
</style>