<template>
  <div class="" style="position: relative">
    <div id="img-11" class="rounded-circle">
      <img
        :src="imagePreview"
        alt="Admin"
        class="rounded-circle"
        style="border: 2px solid var(--bs-primary)"
        :width="width"
        :height="height"
      />
    </div>
    <div class="mt-3">
      <div
        type="button"
        class="btn-small-upload radius-30 btn-outline-secondary shadow-sm"
        style="width: 35px; height: 35px"
        @click="onChooseFile"
      >
        <i class="bx bx-camera me-0" style="font-size: 22px"></i>
      </div>
      <input
        ref="fileInput"
        @change="onFileSelected"
        type="file"
        class="d-none"
        accept="image/*"
        style="font-size: 22px"
        id="fileInput"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, toRefs } from "@vue/reactivity";
import { updateProfileImage } from "../api/image";
import useNotyf from "../composable/useNotyf";
import { useI18n } from "vue-i18n";
import store from "../store";

const props = defineProps({
  src: {
    type: String,
  },
  width: {
    type: String,
  },
  height: {
    type: String,
  },
  modelValue: {
    type: String,
  },
  imageHolder: {
    type: String,
    default: ''
  },
  function:{
    type: Function
  }
});

const { imageHolder } = toRefs(props)
const selectedFile = ref(null);
const fileInput = ref(null);
const notyf = useNotyf();
const { t } = useI18n({});
const emit = defineEmits()
const file_path = ref()
const form = reactive({
  image: null,
  image_path: null,
});

const onChooseFile = () => {
  return fileInput.value.click();
};
const imagePreview = computed(() => {
  if (file_path.value) return file_path.value;
  return imageHolder.value
    ? imageHolder.value
    : require("@/assets/images/no-image.png");
});

const onFileSelected = async (event) => {
  selectedFile.value = event.target.files[0];
  const data = new FormData();
  data.append("file", selectedFile.value);
  try {
    const res = await props.function(data);
    if (props.function === updateProfileImage){
      file_path.value = res.filename
    }else{
      file_path.value = URL.createObjectURL(selectedFile.value)
    }
    notyf.success(t('Image Upload Successfully!'));
    store.dispatch("profile/getUserProfile");
    emit('update:modelValue', res.filename)
  } catch (error) {
    console.log(error);
    notyf.error(t("Image Upload Failed!"));
  }
};
</script>
