<template>
  <div class="snake-field">
    <div
      class='snake'
      v-for="(coords, index) in snakeBody"
      :key="index"
      :style="getStyle(coords)"
      ></div>
      <div class='food' :style="getStyle(food)"></div>
  </div>
</template>

<script>
  export default {
    name: 'Snake',
    props: {
      food: Object,
      snakeBody: Array,
    },
    methods: {
      getStyle (coords) {
        return `top: ${coords.x}px; left: ${coords.y}px`
      }
    }
  }
</script>

<style lang="sass">
.snake-field
  margin: auto
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
