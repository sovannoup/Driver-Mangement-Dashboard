<template>
  <VeeField
    :name="name"
    :rules="rules"
    v-model="modelValue"
    v-slot="{ field }"
    @input="$emit('update:modelValue', $event.target.value)"
  >
    <textarea :rows="rows" class="form-control" :placeholder="placeholder" v-bind="field"></textarea>
  </VeeField>
  <VeeErrorMessage style="color: #f41127" :name="name" />
</template>

<script>
export default {
    name: "BaseTextarea",
    props:{
        name: String,
        rules: String,
        modelValue: {
        type : String
        },
        rows: {
            type: Number,
            default: 4
        },
        placeholder: {
          type:String,
          default: ''
        }
    }
};
</script>

<style>
</style>