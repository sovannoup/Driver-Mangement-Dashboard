<template>
    <div class="card shadow-sm">
        <div class="card-body"> 
            <slot/>
        </div>
    </div>
</template>
<script>
import { onMounted } from '@vue/runtime-core'
export default {
    name: 'BaseCard',
    props:{
        isPublished: Boolean
    },
    setup(props) {
         
    },
}
</script>