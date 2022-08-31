<template> 
    <router-view></router-view>
</template>
<script>
export default {
    name: 'IndexOrder',
    layout: 'admin',
    middleware: ['auth']
}
</script>