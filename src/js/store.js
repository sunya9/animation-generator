import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

import { generateAnimation, generateKeyframe } from './css-template'

Vue.use(Vuex)

const html = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270.32 312.13"><defs><style>.a,.b{fill:none;stroke-miterlimit:10;stroke-width:15px;}.a{stroke:#fff;}.b{stroke:#c0392b;}</style></defs><title>logo</title><polygon class="a" points="135.16 303.48 7.5 229.77 7.5 82.36 135.16 8.66 262.82 82.36 262.82 229.77 135.16 303.48"/><polyline class="a" points="212.22 111.81 212.22 200.54 135.13 245.05"/><polyline class="a" points="57.87 200.54 57.87 111.43 135.13 66.82"/><line class="b" x1="185.21" y1="127.17" x2="84.99" y2="185.03"/></svg>'

const ignoreElements = [
  'style',
  'defs',
  'title'
]

function getSelectorStrings(dom, selector) {
  return Array.from(dom.querySelectorAll(selector))
}


function createAnimation() {
  return {
    selector: null,
    delay: 0,
    duration: 0,
    frames: [],
    name: `keyframe-${Date.now()}`
  }
}

export default new Vuex.Store({
  state: {
    html,
    animations: [createAnimation()],
    duration: 5
  },
  mutations: {
    updateHtml(state, html) {
      state.html = html
    },
    updateDuration(state, duration) {
      state.duration = duration
    },
    addAnimation(state) {
      state.animations.push(Object.assign({}, createAnimation()))
    },
    toggleLoop(state) {
      state.loop = !state.loop
    },
    updateAnimation(state, payload) {
      const index = state.animations.indexOf(payload.animation)
      const value = Object.assign({}, payload.animation, payload.value)
      Vue.set(state.animations, index, value)
    },
    removeAnimation(state, animation) {
      const index = state.animations.indexOf(animation)
      state.animations.splice(index, 1)
    }
  },
  getters: {
    css: state => {
      const animations = state.animations.map(generateAnimation)
      const keyframes = state.animations.map(generateKeyframe)
      return `${animations}

${keyframes}`
    },   
    dom: state => {
      const root = document.createElement('div')
      root.innerHTML = state.html
      return root
    },
    suggestEls: (state, getters) => {
      return _.chain(getSelectorStrings(getters.dom, '*'))
        .map(e => e.nodeName)
        .without(...ignoreElements)
        .uniq()
        .value()
    },
    suggestClasses: (state, getters) => {
      return _.chain(getSelectorStrings(getters.dom, '[class]'))
        .map(e => Array.from(e.classList))
        .flatten()
        .uniq()
        .map(clazz => `.${clazz}`)
        .value()
    },
    suggestIds: (state, getters) => {
      return getSelectorStrings(getters.dom, '[id]').map(id => `#${id}`)
    },

  },
  
})
