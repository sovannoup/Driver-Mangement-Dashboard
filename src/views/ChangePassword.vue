<template>
  <div class="d-flex">
    <h3 class="mb-4">{{ $t("Change Password") }} |</h3>
    <Breadcrumb :breadcrumbList="breadcrumbList" />
  </div>
  <base-row>
    <base-col>
      <VeeForm @submit="onSubmit">
        <div class="card border-top border-0 border-4 border-primary p-3">
          <h4 class="text-primary">{{ $t("Change Password") }}</h4>
          <hr />
          <base-row class="mb-3">
            <label class="col-sm-3 col-form-label">{{
              $t("Old Password")
            }}</label>
            <!-- <BaseField
              name="oldPassword"
              type="password"
              v-model="form.oldPassword"
              rules="required"
              class="col-sm-9"
              :placeholder="t('Old Password')"
            /> -->

           <BaseFieldGroup
                          name="oldPassword"
                          :type="showPassword == true ? 'text' : 'password'"
                          v-model="form.oldPassword"
                          rules="required|min:8"
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
              $t("New Password")
            }}</label>
            <!-- <BaseField
              name="password"
              type="password"
              v-model="form.password"
              rules="required"
              class="col-sm-9"
              :placeholder="$t('New Password')"
            /> -->

             <BaseFieldGroup
                          name="password"
                          :type="showPassword == true ? 'text' : 'password'"
                          v-model="form.password"
                          rules="required|min:8"
                          :placeholder="$t('New Password')"
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
              $t("Confirm New Password")
            }}</label>
            <!-- <BaseField
              name="passwordConfirmation"
              type="password"
              :vModelValue="form.passwordConfirmation"
              rules="required"
              class="col-sm-9"
              :placeholder="$t('Confirm New Password')"
            /> -->


            <BaseFieldGroup
                          name="passwordConfirmation"
                          :type="showPassword == true ? 'text' : 'password'"
                          v-model="form.passwordConfirmation"
                          rules="required|confirmed:@password"
                          :placeholder="$t('Confirm New Password')"
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
          <div class="text-end">
            <Button
              :isLoading="isFormLoading"
              :text="$t('Confirm')"
              class="px-5 mt-3"
            />
          </div>
        </div>
      </VeeForm>
    </base-col>
  </base-row>
</template>

<script>
import { reactive, ref, computed } from "vue";
import { updateUserPassword } from "@/api/profile";
import useNotyf from "../composable/useNotyf";
import BaseRow from "../components/BaseRow.vue";
import Breadcrumb from "../components/Breadcrumb.vue";
import { useI18n } from "vue-i18n";

export default {
  components: { BaseRow, Breadcrumb },
  name: "ChangePassword",
  layout: "admin",
  middleware: ["auth"],
  setup() {
    const showPassword = ref(false);
    const { t } = useI18n({});
    const form = reactive({
      oldPassword: "",
      password: "",
      passwordConfirmation: "",
    });
    const breadcrumbList = computed(() => {
      return [
        {
          title: t("Dashboard"),
          routeName: "dashboard-index",
          isActive: true,
        },
        {
          title: t("Change Password"),
          routeName: "change-password",
          isActive: true,
        },
      ];
    });
    const isFormLoading = ref(false);

    const notyf = useNotyf();

    const onSubmit = async (values, { resetForm }) => {
      isFormLoading.value = true;
      try {
        await updateUserPassword(values);
        isFormLoading.value = false;
        notyf.success(t("Password has been changed."));
        resetForm();
      } catch (error) {
        isFormLoading.value = false;
        notyf.error(t("Something went wrong, please try again later!"));
      }
    };

    return {
      form,
      breadcrumbList,
      isFormLoading,
      onSubmit,
      t,
      showPassword
    };
  },
};
</script>


