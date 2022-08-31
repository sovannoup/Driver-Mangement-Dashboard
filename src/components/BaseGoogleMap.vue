<template>
  <GoogleMap
  :api-key="apiMapKey"
  style="width: 100%; height: 500px"
  :center="_.head(options).position"
  :zoom="15">
      <Marker v-for="option in options" :key="option.title" :options="option" />
  </GoogleMap>
</template>


<script>
import { GoogleMap, Marker } from 'vue3-google-map'
export default{
  components: { GoogleMap, Marker },
  props: {
    options: { 
       type: Array,
       default: [],
       required: true
    }
  }
}
</script>

<script setup>
    import * as _ from "lodash"
    const apiMapKey = process.env.VUE_APP_MAP_KEY
</script>