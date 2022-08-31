<template>
  <div ref="input">
    <label class="mb-2" v-if="label" :id="name">
      <strong> {{ label }} </strong>
      <span v-if="rules?.search('required') > -1" class="required mb-2"
        ><Required
      /></span>
    </label>
    <VeeField
      :id="name"
      :name="name"
      :type="type"
      :class="[
        'form-control ' + (isSmall && 'custom-height'),
        message ? 'form-has-error' : '',
      ]"
      :rules="rules"
      @input="onInput"
      v-model="modelValue"
      :placeholder="placeholder"
      :value="defaultValue"
      :autofocus="autofocus"
      focus
    >
    </VeeField>
      <div v-if="message" :class="{'invalid-feedback': message}">
          {{ $t(message) }}
      </div>
    <!-- <VeeErrorMessage :name="name" style="color: #f41127" class="has-error" /> -->
  </div>
</template>

<script>
import { useFieldError } from "vee-validate";
// import { onMounted, ref, defineEmits } from "vue";
export default {
  name: "BaseField"
};
</script>

<script setup>
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
    }
  })
  const emit = defineEmits(['onChange', 'update:modelValue'])

  const onInput = ($event) => {
        emit('update:modelValue', $event.target.value),
        emit('onChange', $event.target.value)
  }
  const message = useFieldError(props.name);

</script>

<style scoped>
.custom-height {
  line-height: 1.4 !important;
}
.form-has-error {
  border: 1px solid #dc3545;
}

.invalid-feedback{
  display: block;
}
</style>