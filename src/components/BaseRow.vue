<template>
    <div class="row" :class="{'text-center' : isTextCenter}"
    ><slot/>
    </div>
</template>
<script>
export default {
    name: 'BaseRow',
    props: {
        isTextCenter: {
            type: Boolean,
            default: false
        }
    } 
}
</script>