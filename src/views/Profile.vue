<template>
  <div class="d-flex">
    <h3 class="mb-4">{{ $t("Profile") }} |</h3>
    <Breadcrumb :breadcrumbList="breadcrumbList" />
  </div>
  <base-row>
    <div class="col-md-4">
      <div class="card border-top border-0 border-4 border-primary">
        <div class="card-body">
          <div class="d-flex flex-column align-items-center text-center">
            <!-- <base-image-upload-single
              v-model="form.image"
              :imagePlaceHolder="form.image"
            /> -->


            <BaseProfileImage width="110" height="110" v-model="form.image" :imageHolder="form.image" :function="updateProfileImage" />
            <!-- <div class="" style="position: relative">
              <div id="img-11" class="rounded-circle">
                <img
                  :src="form.image"
                  alt="Admin"
                  class="rounded-circle p-1 bg-white"
                  width="110"
                  height="110"
                />
              </div>
              <div class="mt-3">
                <div
                  type="button"
                  class="
                    btn-small-upload
                    radius-30
                    btn-outline-secondary
                    shadow-sm
                  "
                  style="width: 35px; height: 35px"
                  @click="onChooseFile"
                >
                  <i class="bx bx-camera me-0" style="font-size: 22px;"></i>
                </div>
                <input
                  ref="fileInput"
                  @change="onFileSelected"
                  type="file"
                  class="d-none"
                  accept="image/*"
                  style="font-size: 22px;"
                  id="fileInput"
                />
              </div>
            </div> -->

            <!-- <BaseImage :src="form.image" :width="120"></BaseImage> -->

            <div class="mt-3">
              <h4>{{ form.firstName }} {{ form.lastName }}</h4>
              <p class="text-secondary mb-1">{{ $t("Admin") }}</p>
            </div>
          </div>

          <hr class="my-4" />
          <ul class="list-group list-group-flush">
            <li
              class="
                list-group-item
                d-flex
                justify-content-between
                align-items-center
                flex-wrap
                py-3
              "
            >
              <h6 class="mb-0">{{ $t("Email") }}</h6>
              <span class="text-secondary">{{ form.email }}</span>
            </li>
            <li
              class="
                list-group-item
                d-flex
                justify-content-between
                align-items-center
                flex-wrap
                py-3
              "
            >
              <h6 class="mb-0">{{ $t("Phone Number") }}</h6>
              <span class="text-secondary">{{ form.phone_number || '+855 964 794 954' }}</span>
            </li>
            <li
              class="
                list-group-item
                d-flex
                justify-content-between
                align-items-center
                flex-wrap
                py-3
              "
            >
              <h6 class="mb-0">{{ $t("Address") }}</h6>
              <span class="text-secondary">{{ form.address || '#24, Toul Kouk' }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <base-col md8>
      <VeeForm @submit="onSubmit">
        <div class="card border-top border-0 border-4 border-primary p-3">
          <h3 class="text-primary">{{ $t("Profile") }}</h3>
          <p>{{ $t("Update your profile information") }}</p>
          <hr />
          <base-row class="mb-3">
            <label class="col-sm-3 col-form-label">{{ $t("Email") }}</label>
            <BaseField
              name="email"
              v-model="form.email"
              :value="form.email"
              type="text"
              rules="required"
              class="col-sm-9"
            />
          </base-row>
          <base-row class="mb-3">
            <label class="col-sm-3 col-form-label">{{
              $t("First Name")
            }}</label>
            <BaseField
              name="fist_name"
              v-model="form.firstName"
              :value="form.firstName"
              type="text"
              rules="required"
              class="col-sm-9"
            />
          </base-row>
          <base-row class="mb-3">
            <label class="col-sm-3 col-form-label">{{ $t("Last Name") }}</label>
            <BaseField
              name="lastName"
              v-model="form.lastName"
              :value="form.lastName"
              type="text"
              rules="required"
              class="col-sm-9"
            />
          </base-row>
          <base-col md12>
            <div class="text-end">
              <Button
                :isLoading="isFormLoading"
                :text="$t('Save Changes')"
                class="px-5"
              />
            </div>
          </base-col>
        </div>
      </VeeForm>
    </base-col>
  </base-row>
</template>

<script>
import { computed, reactive, watchEffect, ref } from "vue";
import { updateUserProfile } from "../api/profile";
import useNotyf from "../composable/useNotyf";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { updateProfileImage } from "@/api/image";
import BaseProfileImage from "../components/BaseProfileImage.vue";

export default {
    name: "Profile",
    layout: "admin",
    middleware: ["auth"],
    back: "dashboard-index",
    setup() {
        const { t } = useI18n({});
        const form = reactive({
            email: "",
            firstName: "",
            lastName: "",
            image: null,
            image_path: null,
        });
        const breadcrumbList = computed(() => {
            return [
                {
                    title: t("Dashboard"),
                    routeName: "dashboard-index",
                    isActive: true,
                },
                {
                    title: t("Profile"),
                    routeName: "profile",
                    isActive: true,
                },
            ];
        });
        const isFormLoading = ref(false);
        const notyf = useNotyf();
        const store = useStore();
        const fileInput = ref(null);
        const selectedFile = ref(null);
        const profile = computed(() => store.getters["profile/user"]);
        watchEffect(() => {
            if (profile?.value || profile?.value?.image_name) {
                form.id = profile.value.id;
                form.email = profile.value.email;
                form.lastName = profile.value.lastname;
                form.firstName = profile.value.firstname;
                form.image = profile.value.image;
                form.image_path = profile.value.image_path;
            }
        });
        const messages = computed(() => {
            return {
                success: t("Profile has been updated."),
                error: t("Something went wrong while trying to update user profile."),
            };
        });
        const onSubmit = async (values) => {
            isFormLoading.value = true;
            try {
                await updateUserProfile(form);
                isFormLoading.value = false;
                store.dispatch("profile/getUserProfile");
                notyf.success(t(messages.value.success));
            }
            catch (error) {
                isFormLoading.value = false;
                notyf.error(t(messages.value.error));
            }
        };
        const updateImageForm = (data) => {
            form.image = data.file_name;
        };
        // const onChooseFile = () => {
        //     fileInput.value.click();
        // };
        // const onFileSelected = async (event) => {
        //     selectedFile.value = event.target.files[0];
        //     const data = new FormData();
        //     data.append("file", selectedFile.value);
        //     try {
        //         const res = await updateProfileImage(data);
        //         form.image = res.filename;
        //         notyf.success(t(res.message));
        //         store.dispatch("profile/getUserProfile");
        //     }
        //     catch (error) {
        //         notyf.success(t("Image Upload Failed!"));
        //     }
        // };
        return {
            form,
            isFormLoading,
            onSubmit,
            breadcrumbList,
            profile,
            updateImageForm,
            t,
            // onChooseFile,
            // onFileSelected,
            updateProfileImage,
            fileInput,
        };
    },
    components: { BaseProfileImage }
};
</script>

<style lang="scss" scoped>
@use "@/assets/css/bootstrap.scss" with
  (
    $grid-breakpoints: (
      xs: 0,
      sm: 576px,
      md: 992px,
      lg: 1280px,
      xl: 1440px,
    )
  );
</style>