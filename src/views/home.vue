<template>
  <div>我是home</div>
</template>

<script setup>
  import HomeModel from '@/core/models/home.js'
  import {onMounted} from 'vue'
  
  onMounted(() => {
    getIp()
  })
  
  async function getIp() {
    const res = await HomeModel.getIp()
    console.log(res)
  }
</script>

<style scoped>

</style>
