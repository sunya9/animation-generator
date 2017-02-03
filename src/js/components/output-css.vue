<template>
  <output>
    <div v-if="!css">No CSS</div>
    <pre v-else><code>{{css}}</code></pre>
  </output>
</template>

<script>
import { mapGetters } from 'vuex' 
export default {
  computed: {
    ...mapGetters([
      'css'
    ])
  }
}
</script>