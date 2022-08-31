<template>
  <div class="d-flex flex-wrap">
    <div
      v-for="(file, index_image) of images"
      :key="file[keyName]"
      class="image-box m-1"
    >
      <div class="image">
        <img :src="file[keyPath]" alt="" class="img-fluid" />
      </div>
      <div class="action">
        <a
          href="javascript:;"
          style="font-size: 18px; color: red"
          @click="remove(index_image)"
        >
          <i class="fadeIn animated bx bx-trash-alt"></i>
        </a>
      </div>
      <div class="feature_action">
        <input
          type="radio"
          :id="file[keyName]"
          @change="resetIndex(index_image)"
          value="true"
          name="main"
          v-model="file.main"
        />
        <label :for="file[keyName]" class="ms-2">Feature Image</label>
      </div>
    </div>
    <div class="btn-image-box m-1" @click="clickOpenFile">
      <div class="plus-icon">
        <button class="btn btn-cricle" type="button">
          <i class="fadeIn animated bx bx-plus" style="font-size: 42px"></i>
        </button>
      </div>
      <div
        style="position: absolute; bottom: 0px; text-align: center; width: 100%"
      >
        <p>Upload Image</p>
      </div>
    </div>
    {{ inputFile?.value }}
    <input
      type="file"
      class="d-none"
      @change="changeFile"
      ref="inputFile"
      accept="image/*"
      id="file-input"
    />
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
        <button class="btn" type="button" @click="cropImage()">Save</button>
      </template>
    </base-modal>
  </div>
</template>

<script>
// import "@/assets/cropper.css";
import { uploadImage } from "@/api/image";
import Cropper from "cropperjs";
import BaseModal from "./BaseModal.vue";
export default {
  components: { BaseModal },
  name: "BaseImageUploadSingleArray",
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
  watch,
  computed,
  onUnmounted,
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
    default: 150,
  },
  cropH: {
    type: Number,
    default: 150,
  },
  modelValue: {
    type: null,
  },
  keyName: {
    type: String,
    default: "image",
  },
  keyPath: {
    type: String,
    default: "image_path",
  },
});
const {
  aspectRatioW,
  aspectRatioH,
  cropW,
  cropH,
  modelValue,
  keyName,
  keyPath,
} = toRefs(props);

const images = ref([]);
const index_default_main = ref(0);
const isModalVisible = ref(false);
const cropper = ref();
const imgs = ref(null);
const blobUrl = ref(null);
const loading = true;
const inputFile = ref(null);

const closeModal = (e) => {
  isModalVisible.value = e;
};
const clickOpenFile = () => {
  document.getElementById("file-input").click();
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
    const res = await uploadImage(data);
    const map = {};
    map[keyPath.value] = res.file_page;
    map[keyName.value] = res.file_name;
    images.value.push({
      ...map,
      main: 0,
    });
    console.log(images.value);
    closeModal(false);
    emit("update:modelValue", images.value);
  } catch (error) {
    console.log(error);
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
    file.value = null;
  }
};
const bodyChange = async (event) => {
  const image = document.getElementById("image");
  image.src = blobUrl.value;
  if (!blobUrl.value) return;
  initCropper(image);
};
const remove = (index) => {
  images.value.splice(index, 1);
  emit("update:modelValue", images.value);
};
const resetIndex = (index) => {
  images.value.forEach((element) => {
    element.main = false;
  });
  images.value[index].main = true;
  emit("update:modelValue", images.value);
};
watchEffect(() => {
  if (modelValue.value.length > 0) {
    images.value = modelValue.value;
  }
});
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

.image-box {
  width: 125px;
  position: relative;
  height: 125px;
  border: 1px solid grey;
}
.image-box:hover > .feature_action {
  // display: block;
}
.image-box:hover > .action {
  display: block;
}
.image-box > .action {
  display: none;
  position: absolute;
  top: 5px;
  right: 6px;
  background: #ffffff91;
  padding: 0px 5px;
  border-radius: 38px;
}
.btn-image-box {
  width: 125px;
  position: relative;
  height: 125px;
  border-radius: 10px;
  border: 2px dotted;
}
.feature_action {
  position: absolute;
  bottom: 0;
  text-align: center;
  width: 100%;
  background: #17171759;
  padding: 4px 0;
  color: white;
}

.image-box > .image:after {
  content: "";
  color: #fff;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}
.image-box > .image:hover:after {
  opacity: 1;
}

.plus-icon {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>