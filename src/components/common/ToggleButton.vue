<template>
  <label  class="vue-js-switch" v-bind:class="{ 'toggled': toggled }" @click.stop="toggleClass($event)">
    <input  type="checkbox" class="v-switch-input">
      <span  class="v-switch-core" ></span>
    </label>
</template>
<script>
  export default{
      data(){
          return{
            toggled:false
          }
      },
    methods:{
          toggleClass($event){
            $event.preventDefault();
            $event.stopPropagation();
              //console.log($event)
              this.toggled=!this.toggled;
          }
    }
  }

</script>
<style scoped>
  .vue-js-switch{

    overflow: hidden;
    vertical-align: middle;
    cursor: pointer;
    line-height: 22px;height: 22px;
  }
  .v-switch-input{
      display: none;
  }
  input[type="checkbox" i]{
        margin: 3px 3px 3px 4px;
      -webkit-appearance: checkbox;
     box-sizing: border-box;
  border-color:initial;
    margin: 3px .5px;padding:initial;border:initial;
    -webkit-rtl-ordering: logical;
  user-select: text;cursor: auto;
  }
  .vue-js-switch .v-switch-core{
    margin:0 ;
    display: inline-block;
    position: relative;
    border:1px solid #bfcbd9;
    outline: 0;
    border-radius: 12px;box-sizing: border-box;
    transiton:border-color .3s,background-color .3s;
    border-color: rgb(191, 203, 217);
    --toggle-width:50px;
    --toggle-transform-distance:30px;
width:50px;width:var(--toggle-width);
    height: 22px;
    background-color: #bfcbd9;
  }
  .vue-js-switch .v-switch-core:before{
    display: block;
    content:"";overflow: hidden;transform: translate(2px,2px);
    top:0;left: 0;position: absolute;border-radius: 100%;
    transition:transform .3s ;
    width: 16px;height: 16px;z-index: 20;background: #fff;
  }
  .vue-js-switch.toggled .v-switch-core:before{
    transform: translate(30px,2px);
    transform: translate(var(--toggle-transform-distance),2px);
  }
  .vue-js-switch.toggled .v-switch-core{
     background-color: #d81e06 ;
  }
</style>
