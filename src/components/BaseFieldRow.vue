<template>
  <div>
    <label class="mb-2" v-if="label">
      {{ $t(label) }}
      <span v-if="rules.search('required') > -1" class="required mb-2">*</span>
    </label>
    <VeeField
      :name="name"
      :type="type"
      class="form-control"
      :rules="rules"
      @input="$emit('update:modelValue', $event.target.value)"
      v-model="value"
      :value="defaultValue"
      :placeholder="placeholder"
    />
    <VeeErrorMessage :name="name" style="color: #f41127" />
  </div>
</template>

<script>
export default {
  name: "BaseFieldRow",
  props: {
    name: String,
    type: String,
    value: null,
    rules: String,
    placeholder: "",
    defaultValue: {
      type: String,
      default: "",
    },
    label: "",
  },
};
</script>

<style  scoped>
.form-control {
  line-height: 2.3;
}
</style>