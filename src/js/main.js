import Vue from 'vue'
import store from './store'
import inputHtml from './components/input-html.vue'
import animations from './components/animations.vue'
import preview from './components/preview.vue'
import outputCss from './components/output-css.vue'

import '../sass/main.scss'

new Vue({
  el: '#app',
  store,
  components: {
    inputHtml,
    animations,
    preview,
    outputCss
  }
})
