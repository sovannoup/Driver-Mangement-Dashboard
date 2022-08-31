<template>  
 <label class="mb-2" v-if="label" :id="name">
      <strong> {{ $t(label) }} </strong> 
      <span v-if="rules?.search('required') > -1" class="required mb-2"><Required/></span>
  </label>
  <VeeField :name="name" :rules="rules" v-model="modelValue"> 
    <Multiselect 
      v-model="modelValue"
      :mode="mode"
      :closeOnSelect="true"
      :searchable="searchable"
      :options="options"
      :loading="loading"
      :hideSelected="false"
      @search-change="onSearchChange"
      @change="onChange"
      :canClear="canClear"
      :single="single"
      :createTag="createTag"
      :placeholder="placeholder"
      @tag="onTag"
      @deselect="onDeselect"
      :object="object"
      
    >

      <template v-for="slotTtitle, index of slotTitles" v-slot:[slotTtitle] :key="index">
        <slot :name="slotTtitle" ></slot> 
      </template>

    </Multiselect>
  </VeeField>
  <VeeErrorMessage style="color: #f41127" :name="name" /> 
</template>

<script>
import { watch, watchEffect } from '@vue/runtime-core';
export default {
  name: "BaseMultiselect",
  inheritAttrs: false,
  props: {
    placeholder: String,
    name: String,
    rules: String,
    modelValue: null,

    object: {
      type:Boolean,
      default:false
    },
   
    value: {
      type: String,
      default: "",
    },
    options: {
      type: Object,
    },

    mode: {
      type : String,
      default: "single"
    },
    loading: {
      type: Boolean,
      default: false,
    },
    canClear: {
      type: Boolean,
      default: false,
    },
    single: {
      type: String,
      default: "single",
    },
    createTag: {
      type: Boolean,
      default: false,
    },
    slotTitles:{
      type: Array,
      default: []
    },
    onDeselect:{
       type: Function,
      default: () => {}
    },
    searchable: {
      type: Boolean,
      default: true,
    },
    label: ""
  },
  emits: ["update:modelValue", "onChange"],
  
  setup(props, { emit }) {     
    const onSearchChange = (v) => {
      if(v)   emit("update:modelValue", props.modelValue);
      if (v.length >= 3) {
        emit("refresh", v);
      }
    };

    const onChange = (value)=>{
      emit("update:modelValue", value);
      emit("onChange", value);
    }

    const onTag = (val)=>
    {
      if(val)
      {
        emit("onTag", val);
      }
    }

    return { 
      onChange,
      onSearchChange,
      onTag
       };
  },
};
</script>

<style>
</style>