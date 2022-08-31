import { createApp } from 'vue'
import App from './App.vue'
import router from './router' 
import store from '@/store'  

import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'


// import "./assets/plugins/simplebar/css/simplebar.css";
// import "./assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css";
import "./plugins/metismenu/css/metisMenu.min.css";

import "./assets/css/bootstrap.scss";
import "./assets/css/app.css";
import "./assets/css/icons.css";

import "./assets/css/dark-theme.css";
import "./assets/css/header-colors.css";
import "./assets/js/bootstrap.bundle.min.js";


import "@vueform/toggle/themes/default.css";

import i18n from "@/plugins/i18n"; 

import {registerGlobalComp} from "./registerGlobalComp";
import {globalDirective} from "@/globalDirective"; 
import filters from '@/utils/filters'
const AppInstance = createApp(App) 

AppInstance.use(i18n)
AppInstance.use(store)
AppInstance.use(router)
// AppInstance.use(ElementPlus)
AppInstance.use(PerfectScrollbar)
// AppInstance.use(CKEditor)  
registerGlobalComp(AppInstance) 
globalDirective(AppInstance)
AppInstance.config.globalProperties.app = AppInstance 
AppInstance.config.globalProperties.$filters =  filters
   
if(router.isReady()){ 
  AppInstance.mount('#app')
}

 