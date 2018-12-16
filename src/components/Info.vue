<template>
  <div class='info'>
    <div class="info__player">
      <img :src="player" @click="paused">
    </div>
    <div class="info__points">{{ points }}</div>
    <div class="info__switcher">
      <img :src="switcher" @click="click">
    </div>
    <div class="info__end-game" @click="goHome">
      <div class="info__end-game-cross"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Info',
    props: {
      black: Boolean,
      pause: Boolean,
      points: Number,
    },
    computed: {
      switcher () {
        return (this.black) ? require('../assets/white.png') : require('../assets/dark.png')
      },
      player () {
        return (this.pause) ? require('../assets/play.png') : require('../assets/pause.png')
      },
    },
    methods: {
      click () {
        this.$emit('click')
      },
      paused () {
        this.$emit('paused')
      },
      goHome () {
       this.$emit('goHome')
      }
    }
  }
</script>

<style lang="sass">
.info
  display: flex
  align-items: center
  justify-content: space-around
  width: 400px
  margin: auto
  &__switcher,
  &__player,
  &__end-game
    img
      width: 50px
      height: 50px
    &:hover
      cursor: pointer
  &__points
    font-size: 20px
    color: #000
  &__end-game
    width: 50px
    &-cross
      background: #CD6D45
      height: 50px 
      width: 10px
      position: relative
      left: 20px
      transform: rotate(45deg)
      &:after 
        content: ""
        height: 10px; 
        width: 50px
        background: #CD6D45
        position: absolute
        left: -20px
        top: 20px
</style>