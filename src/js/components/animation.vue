<template>
  <div class="animation-wrapper">
    <div>
      <input type="text" v-model="name" size="30">
    </div>
    <input class="inline-form" type="text" v-model="selector" placeholder="Selector..." list="suggestSelectors" autocomplete>
    <select class="inline-form" v-model="preset">
      <option value="" style="display: none">Preset...</option>
      <option v-for="(effect, index) in effects" :value="index">
        {{effect.name}}
      </option>
    </select>
    <input class="inline-form" type="number" v-model="duration" min="0" :max="durationMax" title="duration">
    <input class="inline-form" type="number" v-model="delay" min="0" :max="delayMax" title="delay">
    <div class="range">
    </div>
    <button class="remove fa fa-times" @click="remove">
    </button>
  </div>
</template>

<script>
import effects from '../effects'
import { mapState } from 'vuex'

export default {
  props: ['animation'],
  data() {
    return {
      effects,
      preset: ''
    }
  },
  computed: {
    ...mapState({
      parentDuration: state => state.duration
    }),
    durationMax() {
      return this.parentDuration - this.animation.delay
    },
    delayMax() {
      return this.parentDuration
    },
    name: {
      get() {
        return this.animation.name
      },
      set(name) {
        this.$store.commit('updateAnimation', {
          animation: this.animation,
          value: { name }
        })
      }
    },
    selector: {
      get() {
        return this.animation.selector
      },
      set(selector) {
        this.$store.commit('updateAnimation', {
          animation: this.animation,
          value: { selector }
        })
      },
    },
    duration: {
      get() {
        return this.animation.duration
      },
      set(duration) {
        this.$store.commit('updateAnimation', {
          animation: this.animation,
          value: { duration }
        })
      }
    },
    delay: {
      get() {
        return this.animation.delay
      },
      set(delay) {
        this.$store.commit('updateAnimation', {
          animation: this.animation,
          value: { delay }
        })
      }
    }
  },
  watch: {
    preset(index) {
      console.log('index:', index)
      const { frames } = effects[index]
      this.$store.commit('updateAnimation', {
        animation: this.animation,
        value: {
          frames
        }
      })
    }
  },
  methods: {
    remove() {
      this.$store.commit('removeAnimation', this.animation)
    }
  }
}
</script>

<style scoped lang="sass">

input[type="text"], input[type="number"], select {
  width: auto;
}
.animation-wrapper {
  width: 100%;
  padding: 1rem 40px 1rem 1rem;
  border: 1px solid #ccc;
  position: relative;
  margin-bottom: 1rem;
  background-color: rgba(#fff, .6);
}
.remove {
  background: none;
  border: none;
  border-radius: 50%;
  color: darkred;
  width: 1.6rem;
  height: 1.6rem;
  font-size: 1.6rem;
  text-align: center;
  padding: .2rem;
  margin: 0;
  line-height: 1;
  position: absolute;
  top: 50%;
  right: 10px;
  margin-top: -.8rem;
}
</style>