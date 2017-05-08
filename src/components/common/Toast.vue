<template>
  <transition name="fade">
  <div class="toast-component">{{ text }}</div>
  </transition>
</template>
<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
  .toast-component {
    position: fixed;
    bottom: 20%;
    left: 50%;
    margin-left: -100px;
    padding: 0.25rem;
    width: 200px;
    color: #fff;
    text-align: center;
    background-color: rgba(0, 0, 0, .7);
    border-radius: 20px; /*  20px  */
  }
</style>
<script>
  export default{
    props: {
      text: String
    }
  }
</script>
