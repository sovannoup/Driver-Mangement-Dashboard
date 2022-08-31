<template>
  <div>
    <div class="input-group" id="show_hide_password">
      <VeeField
        :name="name"
        :type="type"
        :class="[
          'form-control ' + (isSmall && 'custom-height'),
          message ? 'form-has-error' : '',
        ]"
        :rules="rules"
        @input="$emit('update:modelValue', $event.target.value)"
        v-model="modelValue"
        :value="defaultValue"
        :placeholder="placeholder"
      />

      <slot name="left" />
    </div>
    <div v-if="message" :class="{ 'invalid-feedback': message }">
      {{ $t(message) }}
    </div>
    <!-- <VeeErrorMessage :name="name" style="color: #f41127" class="has-error" /> -->
  </div>
</template>

<script>
export default {
  name: "BaseFieldGroup",
};
</script>

<script setup>
import { useFieldError } from "vee-validate";

const props = defineProps({
  modelValue: null,
  name: String,
  type: String,
  value: null,
  modelValue: null,
  rules: String,
  placeholder: "",
  defaultValue: {
    type: String,
    default: "",
  },
  label: "",
  isSmall: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["onChange", "update:modelValue"]);

const onInput = ($event) => {
  emit("update:modelValue", $event.target.value),
    emit("onChange", $event.target.value);
};
const message = useFieldError(props.name);
</script>

<style scoped>
.custom-height {
  line-height: 1.4 !important;
}
.form-has-error {
  border: 1px solid #dc3545;
}

.invalid-feedback {
  display: block;
}
</style>