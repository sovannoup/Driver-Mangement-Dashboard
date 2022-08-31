<template>
  <div
    :class="isVerticalTab && 'tab-container'"
  >
    <ul :class="isVerticalTab? 'nav flex-lg-column nav-underline my-3' : 'nav nav-underline my-3'" :style="isVerticalTab && 'margin-right: 55px'" role="tablist">
      <template v-for="(head, index) of header" :key="index">
        <li class="nav-item" role="presentation">
          <a
            :class="'nav-link ' + (head?.isActive ? 'active' : '')"
            data-bs-toggle="tab"
            :href="'#'+head.id"
            role="tab"
            aria-selected="true"
          >
            <div class="d-flex align-items-center">
              <!-- <div class="tab-icon">
                <i class="bx bx-home font-18 me-1"></i>
              </div> -->
              <div class="tab-title" :style="isVerticalTab && 'white-space: nowrap'">{{head.title}}</div>
            </div>
          </a>
        </li>
      </template>
    </ul>

    <div class="tab-content" id="nav-tabContent">
        <template v-for="(head, index) of header" :key="index">
          <div :class="'tab-pane fade ' + (head?.isActive ? 'show active' : '')" :id="head.id">
            <slot :name="head.id"></slot>
          </div>
        </template>
    </div>

  </div>
</template>

<script>
export default {
  name: "BaseTabs",
  props: {
    header: {
      type: Array,
    },
    isVerticalTab: {
      type: Boolean,
      default: false
    }
  },
};
</script>
<style lang="scss" scoped>
  .nav-underline .nav-link {
  color: #495057;
  padding: 9px 0px;
  margin: 0 10px;
  font-size: 17px;
}
.nav-underline .nav-link.active {
  color: #495057;
  border-bottom: solid 2px #495057;
}

.tab-container{
  display: block;
  align-items: start;

  @media only screen and(min-width: 1025px) {
    display: flex !important;

  }

}
</style>