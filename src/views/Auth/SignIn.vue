<template>
  <VeeForm class="login-wrapper" @submit="handleLogin">
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
                        {{ $t("let's sign in to get manage your driver team!") }}
                      </p>
                      <div class="mb-3 mt-5">
                        <BaseField
                          name="email"
                          type="text"
                          rules="required|email"
                          :placeholder="$t('Email')"
                        />
                      </div>
                      <div class="mb-3">
                        <BaseFieldGroup
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
                                  showPassword == true ? 'bx-show' : 'bx-hide',
                                ]"
                              ></i>
                            </a>
                          </template>
                        </BaseFieldGroup>
                      </div>
                      <div class="d-grid gap-2">
                        <Button
                          class="btn btn-dark btn-lg px-5"
                          :isLoading="loading"
                          :text="$t('Sign In')"
                        />
                        <BaseRow :isTextCenter="true">
                            <p role="button" style="color: #700e57" @click="resetPassword">{{$t('Forget Password')}}</p>
                        </BaseRow>
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
  export default{
    name: "SignIn"
  }
</script>

<script setup>
import { computed, ref } from "@vue/reactivity";
import{ useRouter } from "vue-router"
import { useStore } from "vuex";
import {useI18n} from "vue-i18n"
const showPassword = ref(false);
const store = useStore();
const router = useRouter()
const {t} = useI18n({})

const resetPassword = () => {
    router.push({name: 'forget-password'})
}

const handleLogin = async (values) => {
  values.success = t('Login successfully');
  store.dispatch("auth/login", values);
};

const loading = computed(() => store.getters["auth/loading"]);
const swicth = (value)=>{ 
  store.dispatch('i18n/setLocal',value)
}

const ChangeLanguage = (val) =>{
  store.dispatch('i18n/setLocal',val);
}


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