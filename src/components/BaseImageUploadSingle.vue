<template>
  <div class="d-flex align-items-start">
    <div
      class=""
      :style="
        isSquareStyle ? 'position: relative; width: 100%' : 'position: relative'
      "
    >
      <div v-if="!isSquareStyle" id="img-11" class="rounded-circle">
        <img
          :src="imagePreview"
          alt="Admin"
          class="rounded-circle p-1 bg-white"
          :width="width"
        />
      </div>

      <div
        v-else
        class="d-flex flex-column justify-content-center align-items-center"
        style="
          border-radius: 7px;
          height: 200px;
          width: 100%;
          background: #f3f3f3;
        "
      >
        <img
          v-if="modelValue"
          :src="imagePreview"
          style="
            border-radius: 7px;
            height: 100%;
            width: 100%;
            object-fit: cover;
          "
        />

        <p
          v-if="!file_page && !modelValue"
          style="font-weight: 600; margin-top: 10px"
        >
          Upload Banner Image
        </p>
        <p
          v-if="!file_page && !modelValue"
          style="color: #b4b4b4; margin-bottom: 10px"
        >
          image ratio 16:8
        </p>
      </div>

      <div
        class="mt-3"
        :style="
          isSquareStyle && 'position: absolute; right: 10px; bottom: -35px'
        "
      >
        <div
          type="button"
          class="btn-small-upload radius-30 btn-outline-secondary shadow-sm"
          @click="clickOpenFile"
        >
          <i class="bx bx-camera me-0"></i>
        </div>
        <!-- <button type="button" class="btn btn-outline-primary" @click="clickOpenFile">
          Select Image
        </button> -->
        <input
          type="file"
          class="d-none"
          @change="changeFile"
          accept="image/*"
          :id="id"
        />
      </div>
      <base-modal
        v-model="isModalVisible"
        @body="bodyChange"
        :title="'Update Profile'"
        animation="rotate"
      >
        <template #body>
          <div>
            <img id="image" crossorigin class="img-fluid img-container" />
          </div>
        </template>
        <template #footer>
          <div
            class="spinner-border spinner-border-sm"
            v-if="loading == true"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
          <button v-else class="btn" type="button" @click="cropImage()">
            Save
          </button>
        </template>
      </base-modal>
    </div>
  </div>
</template>

<script>
import "@/assets/cropper.css";
import { uploadImage } from "@/api/image";
import Cropper from "cropperjs";
import BaseModal from "./BaseModal.vue";
export default {
  components: { BaseModal },
  name: "BaseImageUploadSingle",
  emits: ["update:modelValue", "filePage"],
};
</script>

<script setup>
import {
  defineProps,
  defineEmits,
  ref,
  onMounted,
  getCurrentInstance,
  watchEffect,
  toRefs,
  computed,
} from "vue";

const emit = defineEmits();
const props = defineProps({
  aspectRatioH: {
    type: Number,
    default: 1,
  },
  aspectRatioW: {
    type: Number,
    default: 1,
  },
  cropW: {
    type: Number,
    default: 130,
  },
  cropH: {
    type: Number,
    default: 130,
  },
  modelValue: {
    type: String,
  },
  imagePlaceHolder: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "110",
  },
  id: { type: String, default: "file-input01" },
  buttonSmallUploadSize: {
    type: String,
    default: "22px",
  },
  isSquareStyle: {
    type: Boolean,
    default: false,
  },
});
const {
  aspectRatioW,
  aspectRatioH,
  cropW,
  cropH,
  imagePlaceHolder,
  modelValue,
  id,
} = toRefs(props);

const file_page = ref();

const loading = ref(false);
const isModalVisible = ref(false);
const cropper = ref();
const imgs = ref(null);
const blobUrl = ref(null);

const imagePreview = computed(() => {
  if (file_page.value) return file_page.value;
  return imagePlaceHolder.value
    ? imagePlaceHolder.value
    : require("@/assets/images/no-image.png");
});

const closeModal = (e) => {
  isModalVisible.value = e;
};
const clickOpenFile = () => {
  document.getElementById(id.value).click();
};
const initCropper = (image) => {
  cropper.value = new Cropper(image, {
    aspectRatio: aspectRatioW.value / aspectRatioH.value,
    crop(event) {},
  });
};
const cropImage = async () => {
  const canvas = cropper.value?.getCroppedCanvas({
    width: cropW.value,
    height: cropH.value,
  });
  let blob = await fetch(canvas.toDataURL()).then((res) => res.blob());
  const data = new FormData();
  data.append("file", blob);
  try {
    loading.value = true;
    const res = await uploadImage(data);
    modelValue.value = res.file_name;
    file_page.value = res.file_page;
    loading.value = false;
    emit("update:modelValue", res.file_name);

    closeModal(false);
  } catch (error) {
    loading.value = false;
  }
};
const changeFile = (evt) => {
  var file = evt.target;
  if (file.files) {
    var files = file.files;
    if (FileReader && files && files.length) {
      var fr = new FileReader();
      fr.onload = async function () {
        await fetch(fr.result)
          .then((res) => res.blob())
          .then((res) => {
            blobUrl.value = URL.createObjectURL(res);
            isModalVisible.value = true;
          });
      };
      fr.readAsDataURL(files[0]);
    }
  }
};
const bodyChange = async (event) => {
  const image = document.getElementById("image");
  image.src = blobUrl.value;
  if (!blobUrl.value) return;
  initCropper(image);
};

const buttonSmallUploadSize = computed(() => props.buttonSmallUploadSize);
</script>

<style lang="scss"  >
.img-container {
  width: 640px;
  height: 480px;
  /* float: left; */
}
.img-preview {
  width: 250px;
  height: 200px;
  float: left;
  margin-left: 10px;
}
.btn-small-upload {
  position: absolute;
  bottom: 20px;
  right: 0px;
  padding: 2px 7px 0px 7px;
  font-size: v-bind(buttonSmallUploadSize);
  background: rgb(255, 255, 255);
}
</style>