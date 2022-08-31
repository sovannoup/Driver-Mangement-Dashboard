<template> 
    <router-view></router-view>
</template>
<script>
export default {
    name: 'IndexTrackingT',
    layout: 'admin',
    middleware: ['auth']
}
</script>