import { Form , Field, ErrorMessage, defineRule, configure, FieldArray } from 'vee-validate'
import AllRules from '@vee-validate/rules';
import { localize } from "@vee-validate/i18n";

const registerComponent = (AppInstance) =>{
    AppInstance.component('VeeForm', Form);
    AppInstance.component('VeeField', Field);
    AppInstance.component('VeeErrorMessage', ErrorMessage);
}

Object.keys(AllRules).forEach(rule => {
  defineRule(rule, AllRules[rule]);
});

configure({
  generateMessage: localize({
    en: {
      messages: {
        required: "This field is required.",
        confirmed: "Passwords are not the same.",
        min: "Field requires at least 8 digits."
      },
    },
    kh: {
      messages: {
        required: "ចន្លោះ​នេះ​ត្រូវតែ​បំពេញ",
        confirmed: "ពាក្យសម្ងាត់ត្រូវតែដូចគ្នា",
        min: "ចន្លោះ​ត្រូវការយ៉ាងហោចណាស់ 8 ខ្ទង់"
      },
    },
  }),
});

export default registerComponent;

 