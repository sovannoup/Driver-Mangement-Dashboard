<template>
  <div class="form-check">
    <label class="wrapper flex items-center">
      {{ label }}
      <input
        class="checkbox form-check-input"
        type="checkbox"
        :checked="isChecked"
        :value="value"
        @change="updateInput"
      />
      <span class="checkmark"></span>
    </label>
  </div>
</template>
<script>
import { computed } from "@vue/reactivity";
export default {
  name: "BaseCheckBox",
  props: {
    value: {},
    modelValue: { default: false },
    label: { type: String, required: false },
    trueValue: { default: true },
    falseValue: { default: false },
  },
  setup(props, { emit }) {
    const isChecked = computed(() => {
      if (props.modelValue instanceof Array) {
        return props.modelValue.includes(props.value);
      } 
      
      return props.modelValue === props.trueValue;
    });

    const updateInput = (event) => {
      let isChecked = event.target.checked; 
       
      if (props.modelValue instanceof Array) {
       
        let newValue = [...props.modelValue];
        if (isChecked) {
          newValue.push(props.value);
        } else {
          newValue.splice(newValue.indexOf(props.value), 1);
        }
        emit("change", newValue);
        emit("update:modelValue", newValue);
      }   
      else if(props.value){
          if (isChecked) {
            emit("change", props.value);
            emit("update:modelValue", props.value);
          }else{
            emit("change", null);
            emit("update:modelValue", null);
          }
      }
      else {
        emit("change", isChecked ? props.trueValue : props.falseValue);
        emit(
          "update:modelValue",
          isChecked ? props.trueValue : props.falseValue
        );
      }
    };
    return {
      isChecked,
      updateInput,
    };
  },
};
</script>