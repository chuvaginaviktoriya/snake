<template>
  <div id="app">
     <div class="snake-points">
      {{ points }}
    </div>
    <div class="switcher">
      <img :src="im" @click="click">
    </div>
    <div class="snake-field">
      <div
        class='snake'
        v-for="(coord, index) in snakeBody" 
        :key="index" 
        :style="getStyle(coord)"
        ></div>
        <div class='food' :style="getStyle(food)"></div>
    </div>
   
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'app',
  data: () => ({
    timer: null,
    black: false
  }),
  watch: {
    speed(value) {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.$store.commit('NEXT_STEP')
        this.gameOver && clearInterval(this.timer);
      }, value * 10)
    }
  },
  computed: {
    ...mapGetters([
      'snakeBody',
      'food',
      'speed',
      'height',
      'width',
      'points',
      'gameOver'
    ]),
    im() {
      return (this.black) ? require('./assets/white.png') : require('./assets/dark.png')
    }
  },
  mounted() {
    const field = this.$el.querySelector('.snake-field');
    field && (field.style.width = `${this.width}px`);
    field && (field.style.height = `${this.height}px`);
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
      !this.gameOver && this.$store.commit('SET_KEY', event.code)
    },
    click() {
      this.black = !this.black
      const body = document.querySelector('body')
      const points = document.querySelector('.snake-points')
      body.style.background = (this.black) ? '#000' : '#fff'
      points.style.color = (this.black) ? 'rgba(255, 255, 255, 0.5)' : '#000'
    }
  },
  // eslint-disable-next-line
  created() {
    const self = this
    const myFunction = function() {
        self.$store.commit('NEXT_STEP')
        this.gameOver && clearInterval(self.timer)
        setTimeout(myFunction,  self.speed)
    }
    setTimeout(myFunction,  this.speed)
  },
}
</script>

<style lang="sass">
@keyframes resize
  to
    transform: scale(0.8) 
  from
    transform: scale(1)
#app
  display: flex
  align-items: center
  flex-direction: column
  .switcher
    img
      width: 50px
      height: 50px
      position: absolute
      right: 50px
      background: transparent
    &:hover
      cursor: pointer
  .snake
    &-points
      margin: 20px 0
      font-size: 20px
      color: #000
    &-field
      border: 5px groove #1E90FF
      position: relative
      .snake,
      .food
        position: absolute
        height: 10px
        width: 10px
      .snake
        background: burlywood
      .food
        animation: resize 1s infinite;
        background: green
</style>
