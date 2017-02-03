<template>
  <textarea cols="40" rows="30" v-model="html"></textarea>
</template>

<script>
export default {
  computed: {
    html: {
      get() {
        return this.$store.state.html
      },
      set(val) {
        this.$store.commit('updateHtml', val)
      }
    }
  }
}
</script>

<style scoped lang="sass">
textarea {
    min-height: 15rem;
    resize: vertical;
}
</style>