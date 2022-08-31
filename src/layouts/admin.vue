<template>
  <div class="wrapper">
    <Sidebar />
    <Header @logout="handleLogout" :isLogoutLoading="loading" />

    <div class="page-wrapper">
      <div class="page-content">  
        <router-view/>
        <!-- <BaseChild />  -->
      </div>
    </div>

    <!-- start overlay-->
    <div class="overlay toggle-icon" v-responsive-menu></div>
    <!--end overlay -->

    <Footer />
  </div>
</template> 
<script>
import Sidebar from "./partials/Sidebar";
import Footer from "./partials/Footer.vue";
import Header from "./partials/Header"; 
import { ref, onMounted, computed } from "vue"; 
import { useI18n } from "vue-i18n";
import store from "../store"; 

export default {
  name: "admin",
  middleware: ["auth"],
  components: {
    Sidebar,
    Footer,
    Header, 
  },
  setup() {
    const { t } = useI18n({})
    onMounted(async () => { 
      await  store.dispatch("profile/getUserProfile");
    });

    const handleLogout = async () => {
     await store.dispatch("auth/logout", {sus: t('Logout successfully'), fail: t('Something went wrong while trying to logout')});
    };

    return {
      handleLogout,
      loading: computed(() => store.getters["auth/loading"]),
    };
  },
};
</script> 

<style>

.p-scrollbar {
  height: 100vh;
}
body{
  background-color:  #dee2e6;;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

 