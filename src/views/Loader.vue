<script setup lang="ts">
import { shallowRef, watch } from 'vue';

const props = defineProps<{
  componentPath: string
  componentType?: string
}>();

const dynamicComponent = shallowRef();
const loadError = shallowRef<string | null>(null);

// 创建模块映射
const moduleMaps: Record<string, Record<string, () => Promise<any>>> = {
  guide: import.meta.glob('../views/guide/*.vue'),
  components: import.meta.glob('../views/components/*.vue')
};

watch(() => props.componentPath, async (componentName) => {
  try {
    loadError.value = null;
    
    let moduleLoader: (() => Promise<any>) | undefined;
    let targetModuleMap: Record<string, () => Promise<any>> | undefined;
    
    // 根据组件类型选择对应的模块映射
    if (props.componentType && moduleMaps[props.componentType]) {
      targetModuleMap = moduleMaps[props.componentType];
    }
    
    // 如果指定了类型，直接在对应类型中查找
    if (targetModuleMap) {
      for (const [path, loader] of Object.entries(targetModuleMap)) {
        const fileName = path.split('/').pop()?.replace('.vue', '');
        if (fileName === componentName) {
          moduleLoader = loader;
          break;
        }
      }
    }
    
    // 如果没有找到且没有指定类型，或者指定了类型但没找到，则在所有映射中查找
    if (!moduleLoader) {
      for (const modules of Object.values(moduleMaps)) {
        for (const [path, loader] of Object.entries(modules)) {
          const fileName = path.split('/').pop()?.replace('.vue', '');
          if (fileName === componentName) {
            moduleLoader = loader;
            break;
          }
        }
        if (moduleLoader) break;
      }
    }
    
    if (moduleLoader) {
      const module = await moduleLoader();
      dynamicComponent.value = module.default;
    } else {
      throw new Error(`Component '${componentName}' not found`);
    }
  } catch (e: any) {
    console.error('Failed to load component:', e);
    loadError.value = e.message || 'Unknown error occurred';
    dynamicComponent.value = null;
  }
}, { immediate: true });
</script>

<template>
  <component :is="dynamicComponent" v-if="dynamicComponent && !loadError" />
  <div v-else-if="loadError" class="error">组件加载失败: {{ loadError }}</div>
  <div v-else class="loading">组件加载中...</div>
</template>

<style scoped>
.loading,
.error {
  padding: 2rem;
  text-align: center;
}

.loading {
  color: #888;
}

.error {
  color: #f44336;
}
</style>