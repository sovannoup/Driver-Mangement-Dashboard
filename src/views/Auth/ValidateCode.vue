<template>
  <VeeForm class="login-wrapper" @submit="handleValidateCode">
    <div class="wrapper" style="background-color: #700e57">
      <div
        class="
          authentication-reset-password
          d-flex
          align-items-center
          justify-content-center
        "
      >
        <div class="row col-md-8 col-xl-6 mx-auto">
          <div class="card">
            <div class="row g-0">
              <div class="col-lg-6 border-end">
                <div class="card-body">
                  <div class="p-5">
                    <h4 class="mt-5 font-weight-bold">{{$t('Driver App Partner')}}</h4>
                    <p class="text-muted">
                      {{$t('Please insert your otp to reset your password!')}}
                    </p>
                    <div class="mb-3 mt-5">
                      <BaseField
                        name="code"
                        type="number"
                        rules="required"
                        :placeholder="$t('OTP')"
                      />
                    </div>
                    <div class="d-grid gap-2">
                      <Button
                        class="btn btn-dark btn-lg px-5"
                        :isLoading="loading"
                        :text="$t('Verify OTP')"
                      />
                      <!-- router.push({name: 'list-driver'}) -->
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
            <p class="text-white">{{$t('Language')}}</p>
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
  </VeeForm>
</template>
<script>
export default {
  middleware: "guest",
};
</script> 
<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
const store = useStore();

const handleValidateCode = async (form) => {
  form.email = store.getters["auth/resetPasswordEmail"];
  store.dispatch("auth/authValidateCode", form);
};
const ChangeLanguage=(val)=>{
  store.dispatch('i18n/setLocal',val);
}

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