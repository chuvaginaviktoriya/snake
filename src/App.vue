<template>
  <div id="app">
    <div
      class='test'
      v-for="(coord, index) in snakeBody" 
      :key="index" 
      :style="getStyle(coord)"
      ></div>
      <div class='test2' :style="getStyle(food)"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { setTimeout } from 'timers';

export default {
  name: 'app',
  computed: {
    ...mapGetters([
      'snakeBody',
      'food',
      'speed'
    ])
  },
  mounted() {
    window.addEventListener('keydown', (event) => this.down(event))
  },
  beforeDestroy() {
  	window.removeEventListener('keydown', (event) => this.down(event))
  },
  methods: {
    getStyle(coord) {
      return `top: ${coord.x}px; left: ${coord.y}px`
    },
    down(event) {
      this.$store.commit('SET_KEY', event.code)
    }
  },
  // eslint-disable-next-line
  created() {
    setInterval(() => {
      this.$store.commit('NEXT_STEP')
    }, this.speed)
  }
}
</script>

<style lang="sass">
.test,
.test2
  position: absolute
  height: 10px
  width: 10px
.test
  background: burlywood
.test2
  background: green
</style>
