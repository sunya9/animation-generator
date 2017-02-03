<template>
  <div class="preview-wrapper">
    <ul class="palette row row-no-padding">
      <li class="column color" v-for="color in colors">
        <button :style="{
          'background-color': color
        }"
        :class="{
          checkered: color === 'transparent'
        }"
        @click="changeColor(color)"></button>
      </li>
    </ul>
    <div v-html="html" class="preview" :style="{
    'background-color': bgColor === 'transparent'
      ? '#fff'
      : bgColor
    }"
    :class="{
      checkered: bgColor === 'transparent'
    }">
    </div>
    <div class="row">
      <div class="column">
        <button @click="toggleState" class="fa" :class="{
          'fa-play': !playing,
          'fa-stop': playing
        }"></button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      colors: [
        'transparent',
        '#000',
        '#333',
        '#fff',
        '#eaffd5',
        '#aff3db',
        '#68e5dd',
        '#d3929d',
        '#ac8191'
      ],
      playing: true,
      bgColor: 'transparent',
      style: null
    }
  },
  computed: {
    ...mapState({
      html: state => state.html
    }),
    ...mapGetters([
      'css'
    ])
  },
  mounted() {
    const style = document.createElement('style')
    style.id = 'animationStyle'
    const [head] = document.getElementsByTagName('head')
    head.appendChild(style)
    this.style = style
  },
  watch: {
    css(css) {
      console.log(css)
      this.style.innerHTML = css
    }
  },
  methods: {
    changeColor(color) {
      this.bgColor = color
    },
    toggleState() {
      this.playing = !this.playing
    }
  }
}
</script>

<style lang="sass">
.preview {
  > * {
    max-height: 300px !important;
  }
}
</style>

<style scoped lang="sass">
.preview {
  margin-bottom: 1rem;
  padding: 10px 0;
}
.checkered {
  background-color: #ffffff;
  background-size: 30px 30px;
  background-position: 0 0, 15px 15px;
  background-image: linear-gradient(45deg, #ccc 25%, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc 75%),
    linear-gradient(-135deg, #ccc 25%, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc 75%);
}
.palette {
  margin: 0;
  width: 100%;
  .color {
    box-sizing: content-box;
    button {
      padding: 0;
      border: none;
      margin: 0;
      width: 100%;
      border-radius: 0;
      /*height: 100%;*/
      /*width: 20px;*/
      height: 20px;
      display: block;
      /*width: 20px;*/
    }
  }
}

</style>