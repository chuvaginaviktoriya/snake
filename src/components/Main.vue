<template>
  <div class="main">
    <div 
      v-text="title"
      class="main__title"
      ></div>
    <div
      v-text="titleBtn"
      class="main__start" 
      @click="click">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Main',
    data: () => ({
      titleBtn: 'Начать игру',
      title: 'Snake'
    }),
    methods: {
      click () {
        this.$store.commit('CLEAR')
        this.$router.push('/snake/')
      },
    }
  }
</script>

<style lang="sass">
.main
  height: 98vh
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  &__title
    font-family: Garamond, serif
    line-height: 1em
    color: #1b7545
    font-weight: bold
    font-size: 107px
    margin-bottom: 30px
  &__start
    width: 200px
    height: 20px
    font-weight: 700
    color: white
    text-align: center
    text-decoration: none
    padding: .8em 1em calc(.8em + 3px)
    border-radius: 3px;
    background: rgb(212,75,56)
    transition: 0.2s
    &:hover
      cursor: pointer
</style>