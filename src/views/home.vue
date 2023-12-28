<template>
  <div>我是home</div>
</template>

<script setup>
  import HomeModel from '@/core/models/home.js'
  import {onMounted, ref} from 'vue'
  
  const ip = ref('')
  
  onMounted(async () => {
    await getIp()
    await getScreenByIp()
  })
  
  async function getIp() {
    const res = await HomeModel.getIp()
    console.log(res)
    ip.value = res
  }
  
  async function getScreenByIp() {
    const res = await HomeModel.getScreenByIp(ip.value)
    console.log(res)
  }
</script>

<style scoped>

</style>
