<template>
  <div>我是home</div>
</template>

<script setup>
  import HomeModel from '@/core/models/home.js'
  import {onMounted} from 'vue'

  onMounted(() => {
    login()
  })
  
  async function login() {
    const res = await HomeModel.login({
      username: 'admin',
      password: '11111'
    })
    console.log(res)
  }
</script>

<style scoped>

</style>
