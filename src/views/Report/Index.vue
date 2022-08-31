<template> 
    <router-view></router-view>
</template>
<script>
export default {
    name: 'IndexReport',
    layout: 'admin',
    middleware: ['auth']
}
</script>