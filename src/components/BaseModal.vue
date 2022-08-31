

<template>

  <transition name="vodal-fade"  v-if="modelValue">
    <div>
    <div
      class="modal fade show"
      id="examplePrimaryModal"
      tabindex="-1"
      aria-modal="true"
      role="dialog"
      style="display: block"
    > 
      <div class="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ title }}
              <slot name="title"/>
            </h5>
            <button
              type="button"
              @click="closeModal()"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body " ref="body" :style="{background: backgroundColor}">
             <slot name="body" />
          </div>
          <div class="modal-footer">
               <slot name="footer"/>
          </div>
        </div>
      </div>
    </div>
       <div class="modal-backdrop fade show" v-if="modelValue"></div>
   </div>
   </transition>

</template>

 <style>
  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }
    

  /* -- fade -- */
  @-webkit-keyframes vodal-fade-enter {
      from {
          opacity: 0;
      }
  }

  @keyframes vodal-fade-enter {
      from {
          opacity: 0;
      }
  }

  .vodal-fade-enter-active {
      -webkit-animation: vodal-fade-enter both ease-in;
      animation: vodal-fade-enter both ease-in;
  }

  @-webkit-keyframes vodal-fade-leave {
      to {
          opacity: 0
      }
  }

  @keyframes vodal-fade-leave {
      to {
          opacity: 0
      }
  }

  .vodal-fade-leave-active {
      -webkit-animation: vodal-fade-leave both ease-out;
      animation: vodal-fade-leave both ease-out;
  }


  /* -- zoom -- */
  @-webkit-keyframes vodal-zoom-enter {
      from {
          -webkit-transform: scale3d(.3, .3, .3);
          transform: scale3d(.3, .3, .3);
      }
  }

  @keyframes vodal-zoom-enter {
      from {
          -webkit-transform: scale3d(.3, .3, .3);
          transform: scale3d(.3, .3, .3);
      }
  }

  .vodal-zoom-enter-active {
      -webkit-animation: vodal-zoom-enter both cubic-bezier(0.4, 0, 0, 1.5);
      animation: vodal-zoom-enter both cubic-bezier(0.4, 0, 0, 1.5);
  }

  @-webkit-keyframes vodal-zoom-leave {
      to {
          -webkit-transform: scale3d(.3, .3, .3);
          transform: scale3d(.3, .3, .3);
      }
  }

  @keyframes vodal-zoom-leave {
      to {
          -webkit-transform: scale3d(.3, .3, .3);
          transform: scale3d(.3, .3, .3);
      }
  }

  .vodal-zoom-leave-active {
      -webkit-animation: vodal-zoom-leave both;
      animation: vodal-zoom-leave both;
  }
</style>
<script>
import { onUnmounted, ref, watchEffect } from '@vue/runtime-core';
export default {
  name: "BaseModal",
  props: {
    modelValue: {
      type: Boolean,
    },
    title: String,
    backgroundColor: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue","body"],
  setup(props, { emit }) {
    const body = ref()
    const closeModal = () => {
      emit("body", null);
      emit("update:modelValue", false);
    };
    watchEffect(()=>{
      if(body.value)
      emit("body", body);
    })
    onUnmounted(()=>{
      
    
    })
    return {
      closeModal,
      body
    };
  },
};
</script>
 
 