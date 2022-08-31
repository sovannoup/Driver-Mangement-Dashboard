<template> 
    <div :class="[ 
         md1? 'col-md-1': ''  ,
         md2? 'col-md-2': ''  ,
         md3? 'col-md-3': ''  ,
         md4? 'col-md-4': ''  ,
         md5? 'col-md-5': ''  ,
         md6? 'col-md-6': ''  ,
         md7? 'col-md-7': ''  ,
         md8? 'col-md-8': ''  ,
         md9? 'col-md-9': ''  ,
         md10? 'col-md-10': ''  ,
         lg1? 'col-lg-1': ''  ,
         lg2? 'col-lg-2': ''  ,
         lg3? 'col-lg-3': ''  ,
         lg4? 'col-lg-4': ''  ,
         lg5? 'col-lg-5': ''  ,
         lg6? 'col-lg-6': ''  ,
         lg7? 'col-lg-7': ''  ,
         lg8? 'col-lg-8': ''  ,
         lg10? 'col-lg-10': ''  ,
         sm12? 'col-sm-12': ''  ,
         xl8? 'col-xl-8': ''  ,
         mxauto? 'mx-auto': ''  ,
         mt3? 'mt-3': ''  ,
        col
    ]"><slot/></div>
</template>
<script>
import { computed } from '@vue/reactivity'
export default {
    name: 'BaseCol',
    props: {
        cols: String,
        md1: Boolean,  
        md2: Boolean,
        md3: Boolean,
        md4: Boolean,
        md5: Boolean,
        md6: Boolean,
        md7: Boolean,
        md8: Boolean,
        md9: Boolean,
        md10: Boolean,
        lg1: Boolean,
        lg2: Boolean,
        lg3: Boolean,
        lg4: Boolean,
        lg5: Boolean,
        lg6: Boolean,
        lg7: Boolean,
        lg8: Boolean,
        lg10: Boolean,
        xl8: Boolean,
        sm12: Boolean,
        mxauto: Boolean,
        mt3: Boolean
    },
    setup(props) {  
        return {
            col: computed(()=>{ 
                if(props.cols){
                    return `col-${props.cols}`
                }
            })
        }
    },
}
</script>