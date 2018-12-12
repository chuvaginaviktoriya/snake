<template>
  <div id="app">
    <info
      :points="points"
      :black="black"
      :pause="pause"
      @paused="paused"
      @click="click"
    ></info>
    <snake
      :food="food"
      :snake-body="snakeBody"
    ></snake>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Info from './components/Info.vue'
import Snake from './components/Snake.vue'

export default {
  name: 'app',
  data: () => ({
    pause: false,
    black: false,
    key: null
  }),
  components: {
    Info,
    Snake
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
  },
  mounted () {
    const field = this.$el.querySelector('.snake-field');
    field && (field.style.width = `${this.width}px`);
    field && (field.style.height = `${this.height}px`);
    window.addEventListener('keydown', (event) => this.down(event))
    setTimeout(this.step,  this.speed)
  },
  beforeDestroy () {
  	window.removeEventListener('keydown', (event) => this.down(event))
  },
  methods: {
    down (event) {
      !this.pause && (this.key = event.code)
    },
    paused () {
      this.pause = !this.pause
      !this.pause && setTimeout(this.step, this.speed)
    },
    click () {
      this.black = !this.black
      const body = document.querySelector('body')
      const points = document.querySelector('.info__points')
      body.style.background = (this.black) ? '#000' : '#fff'
      points.style.color = (this.black) ? 'rgba(255, 255, 255, 0.5)' : '#000'
    },
    step () {
      if (this.gameOver) {
        return
      }
      this.$store.commit('SET_KEY', this.key)
      this.$store.commit('NEXT_STEP')
      !this.pause && setTimeout(this.step, this.speed)
    }
  }
}
</script>

<style lang="sass">
@keyframes resize
  from
    transform: scale(0.5)
  to
    transform: scale(1)
#app
  padding-top: 50px
</style>
