<template> 
    <router-view></router-view>
</template>
<script>
export default {
    name: 'IndexUser',
    layout: 'admin',
    middleware: ['auth']
}
</script>