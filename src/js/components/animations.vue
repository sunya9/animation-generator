<template>
  <div>
    <div class="row">
      <div class="column">
        <label>
          Entire duration
          <input type="number" v-model="duration">
        </label>
        <button @click="add">Add</button>
      </div>
      <!--<div class="column">
        <label class="label-inline">
          <input type="checkbox" v-model="loop"> Loop
        </label>
      </div>-->
    </div>
    <animation v-for="animation in animations" :animation="animation">
    </animation>
    <datalist id="suggestSelectors">
      <option v-for="element in suggestEls">
        {{element}}
      </option>
      <option v-for="clazz in suggestClasses">
        {{clazz}}
      </option>
      <option v-for="id in suggestIds">
        {{id}}
      </option>
    </datalist>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import animation from './animation.vue'

export default {
  computed: {
    ...mapState({
      animations: state => state.animations,
      html: state => state.html,
    }),
    ...mapGetters([
      'suggestEls',
      'suggestClasses',
      'suggestIds'
    ]),
    duration: {
      get() {
        return this.$store.state.duration
      },
      set(val) {
        this.$store.commit('updateDuration', val)
      }
    },
    loop: {
      get() {
        return this.$store.state.loop
      },
      set(val) {
        this.$store.commit('toggleLoop')
      }
    }
  },
  methods: {
    add() {
      this.$store.commit('addAnimation')
    },
  },
  components: {
    animation
  }
}
</script>

<style scoped lang="sass">
.select-placeholder {
  display: none;
  color: #888;
}
</style>