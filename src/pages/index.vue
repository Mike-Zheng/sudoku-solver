<script setup lang="ts">
  import { useAppStore } from '@/store/modules/app'
  import { framework } from './data'

  const appStore = useAppStore()
  const data = ref(framework)

</script>
<template>
  <div class="relative"
    ><div class="inline-grid absolute pointer-events-none grid-rows-3 grid-cols-3 h-72 w-72">
      <div class="h-full w-full border border-black" />
      <div class="h-full w-full border border-black" />
      <div class="h-full w-full border border-black" />
      <div class="h-full w-full border border-black" />
      <div class="h-full w-full border border-black" />
      <div class="h-full w-full border border-black" />
      <div class="h-full w-full border border-black" />
      <div class="h-full w-full border border-black" />
      <div class="h-full w-full border border-black" />
    </div>
    <div id="userBoard" class="inline-grid grid-rows-9 grid-cols-9">
      <input
        v-for="(item, index) in new Array(81).fill(0)"
        type="number"
        min="1"
        max="9"
        class="h-8 w-8 p-2.5 text-base outline-1 outline outline-gray-400"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .version {
    display: inline-block;
    padding: 6px;
    margin-left: 6px;
    border-radius: 10px;
  }
</style>
