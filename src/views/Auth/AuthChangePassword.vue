<template>
  <VeeForm class="login-wrapper" @submit="handleChangepassword">
    <div class="wrapper" style="background-color: #700e57">
      <div
        class="
          authentication-reset-password
          d-flex
          align-items-center
          justify-content-center
        "
      >
        <div class="row">
          <div class="col-12 col-lg-12 mx-auto">
            <div class="card">
              <div class="row g-0">
                <div class="col-lg-6 border-end">
                  <div class="card-body">
                    <div class="p-5">
                      <h4 class="mt-5 font-weight-bold">
                        {{ $t("Driver App Partner") }}
                      </h4>
                      <p class="text-muted">
                        {{ $t("Please insert your new password!") }}
                      </p>
                      <div class="mb-3 mt-5">
                        <BaseRow>
                          <BaseCol mt3>
                            <BaseFieldGroup
                              label="Confirm Password"
                              name="password"
                              :type="showPassword == true ? 'text' : 'password'"
                              rules="required|min:8"
                              :placeholder="$t('Password')"
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
                                      showPassword == true
                                        ? 'bx-show'
                                        : 'bx-hide',
                                    ]"
                                  ></i>
                                </a>
                              </template>
                            </BaseFieldGroup>
                          </BaseCol>
                          <BaseCol mt3>
                            <BaseFieldGroup
                              label="Confirm Password"
                              name="password_confirmation"
                              :type="showPassword == true ? 'text' : 'password'"
                              rules="required|confirmed:@password"
                              :placeholder="$t('Confirm Password')"
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
                                      showPassword == true
                                        ? 'bx-show'
                                        : 'bx-hide',
                                    ]"
                                  ></i>
                                </a>
                              </template>
                            </BaseFieldGroup>
                          </BaseCol>
                        </BaseRow>
                      </div>
                      <div class="d-grid gap-2">
                        <Button
                          class="btn btn-dark btn-lg px-5"
                          :isLoading="loading"
                          :text="$t('Save')"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <img
                    src="@/assets/images/driverimage.svg"
                    class="card-img login-img h-100"
                  />
                </div>
              </div>
            </div>

            <div class="text-center">
              <p class="text-white">{{ $t("Language") }}</p>
              <ul>
                <li>
                  <a href="#" @click="ChangeLanguage('km')">{{$t('Khmer')}}</a>
                </li>
                <li><a href="#" @click="ChangeLanguage('en')">{{$t('English')}}</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </VeeForm>
</template>
<script>
export default {
  name: "AuthChangePassword",
  middleware: "guest",
};
</script> 
<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
const showPassword = ref(false);
const store = useStore();

const handleChangepassword = async (form) => {
  form.email = store.getters["auth/resetPasswordEmail"];
  form.code = store.getters["auth/resetPasswordCode"];
  store.dispatch("auth/authChangePassword", form);
};
const ChangeLanguage = (val) => {
  store.dispatch("i18n/setLocal", val);
};
const loading = computed(() => store.getters["auth/loading"]);
</script>

<style scoped>
ul {
  padding: 0;
}
ul li {
  display: inline;
  padding: 10px;
}
ul li a {
  color: white;
  text-decoration: none;
}
</style>