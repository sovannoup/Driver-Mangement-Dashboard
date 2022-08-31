<template>
    <Popper
        hover
        arrow
        disableClickAway
        :content="text"
        placement="top"
    >
        <slot></slot>

    </Popper>
</template>

<script>
import Popper from "vue3-popper";

export default {
    props: {
        text: String,
        default: ""
    },
    components: {
        Popper,
    },
}
</script>

<style lang="scss" scoped>

:deep(.popper) {
  background: #000;
  padding: 10px;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
}

:deep(.popper #arrow::before) {
  background: #000;
}

:deep(.popper:hover),
:deep(.popper:hover > #arrow::before) {
  background: #000;
}
</style>