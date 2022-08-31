import baseComponents from './components' 
import veeValidationRegisterComponent from "./plugins/vee-validation";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

import { initApexCharts } from './plugins/apexcharts';

export function registerGlobalComp (AppInstance) {
    baseComponents.register(AppInstance)
    veeValidationRegisterComponent(AppInstance)
    initApexCharts(AppInstance)
    AppInstance.component('Multiselect', Multiselect);
}