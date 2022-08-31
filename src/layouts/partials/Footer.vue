<template>
    <footer class="page-footer">
        <p class="mb-0">
            <span>{{ $t('Copyright') }}</span>
             © 
            <span>{{ new Date().getFullYear() }}</span>
        . {{ $t('All right reserved.') }}</p>
    </footer>
</template>

<script>
import { useI18n } from "vue-i18n";
export default {
    name: "Footer",
    setup(){
        // const {t} = useI18n({})
    }
}
</script>