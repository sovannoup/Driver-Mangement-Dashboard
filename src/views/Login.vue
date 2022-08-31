<template>
  <div class="container mt-5">
    <base-row class="mt-5">
      <base-col cols="lg-7">
        <h2>ECOS</h2>
        <h4>
          <small>ecommerce online shop standard </small>
        </h4>

        <p>Sell online with ECOS</p>
        <p>
          Ecwid is a full-featured and affordable ecommerce solution that
          includes web, mobile and social stores
        </p>
        <img
          src="@/assets/images/login-image.svg"
          class="img-fluid d-lg-block d-none"
          alt=""
        />
      </base-col>
      <base-col cols="lg-5">
        <div class="card">
          <div class="card-body">
            <VeeForm class="login-wrapper" @submit="handleLogin">
              <h4 class="mt-3">Sign in to your ECOS account</h4>
              <div class="row gy-3 mt-3">
                <div class="col-md-12">
                  <BaseField
                    name="email"
                    type="text"
                    rules="required|email"
                    :placeholder="$t('Email')"
                  />
                </div>
                <div class="col-md-12">
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
              </div>
              <base-col cols="12">
                <div class="d-grid mt-3">
                  <Button
                    class="btn btn-dark btn-lg px-5"
                    :isLoading="loading"
                    text="Login"
                  />
                </div>
              </base-col>
            </VeeForm>
          </div>
        </div>
      </base-col>
    </base-row>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  layout: "default",
  middleware: "guest",
  setup() {
    const showPassword = ref(false);
    const store = useStore();
    const handleLogin = async (values) => {
      store.dispatch("auth/login", values);
    };
    const loading = computed(() => store.getters["auth/loading"]);

    return { handleLogin, loading, showPassword };
  },
};
</script>

<style lang="scss" scoped>
.logo {
  width: 250px;
  display: block;
  margin: 0 auto;
  margin-bottom: 25px;
}

@media (min-width: 800px) {
  .container-sm {
    max-width: 650px !important;
  }
}
</style>
