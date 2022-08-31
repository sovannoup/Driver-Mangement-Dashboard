<template>
  <div
    v-if="isDrawerVisible"
    class="modal fade"
    id="ModalSlide"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel2"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-slideout" role="document">
      <div class="modal-content">
        <div v-if="isHead" class="modal-header">
          <div class="d-flex align-items-center">
            <h6
              class="modal-title align-right md-4"
              id="exampleModalLabel"
            >
              {{ title }}
            </h6>
            <button
              v-if="isCloseBtn"
              type="button"
              @click="closeModal()"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
        </div>
        <div class="modal-body" ref="body">
          <slot name="body" />
        </div>
        <div v-if="isFooter" class="modal-footer" ref="footer">
          <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button> -->
          <slot name="footer" />
          <!-- <div class="ms-auto" data-bs-dismiss="modal">
            <a class="btn btn-primary mt-2 mt-lg-0"
              ><i class="bx bxs-plus-square"></i>Find</a
            >
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, ref, watchEffect } from "@vue/runtime-core";
export default {
  name: "BaseDrawer",
  props: {
    isDrawerVisible: Boolean,
    title: String,
    isHead: Boolean,
    isFooter: Boolean,
    isCloseBtn: Boolean,
  },
  setup(props, { emit }) {
    const body = ref();
    const closeModal = () => {
      emit("body", null);
      emit("update:modelValue", false);
    };
    watchEffect(() => {
      if (body.value) emit("body", body);
    });
    return {
      closeModal,
      body,
    };
  },
};
</script>

<style scoped>
.modal-dialog {
  max-width: 20%;
}
.modal-dialog-slideout {
  min-height: 100%;
  margin: 0 0 0 auto;
  background: #fff;
}
.modal.fade .modal-dialog.modal-dialog-slideout {
  -webkit-transform: translate(100%, 0) scale(1);
  transform: translate(100%, 0) scale(1);
}
.modal.fade.show .modal-dialog.modal-dialog-slideout {
  -webkit-transform: translate(0, 0);
  transform: translate(0, 0);
  display: flex;
  align-items: stretch;
  -webkit-box-align: stretch;
  height: 100%;
  width: 20%;
}
.modal.fade.show .modal-dialog.modal-dialog-slideout .modal-body {
  overflow-y: auto;
  overflow-x: hidden;
}
.modal-dialog-slideout .modal-content {
  border: 0;
}
.modal-dialog-slideout .modal-header,
.modal-dialog-slideout .modal-footer {
  height: 4rem;
  display: block;
}
</style>