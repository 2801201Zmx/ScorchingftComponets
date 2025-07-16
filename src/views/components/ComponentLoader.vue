<script setup lang="ts">
import { defineAsyncComponent, shallowRef, watch } from 'vue';

const props = defineProps<{
  componentPath: string
}>();

const dynamicComponent = shallowRef();

watch(() => props.componentPath, async (path) => {
  try {
    // 确保路径正确，去掉.html后缀
      path = path.split('.html')[0] + path.split('.html')[1];
    // 动态加载目标组件（使用物理路径）
    dynamicComponent.value = defineAsyncComponent(() => 
      import(/* @vite-ignore */ `../../${path}`)
    );
  } catch (e) {
    console.error('组件加载失败', e);
    dynamicComponent.value = null;
  }
}, { immediate: true });
</script>

<template>
  <component :is="dynamicComponent" v-if="dynamicComponent" />
  <div v-else class="loading">组件加载中...</div>
</template>

<style scoped>
.loading {
  padding: 2rem;
  text-align: center;
  color: #888;
}
</style>