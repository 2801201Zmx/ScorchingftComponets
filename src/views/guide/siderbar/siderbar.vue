<template>
  <div class="title" v-for="(item, index) in Components" :key="index">
    {{ item.title }}
    <div class="components" :class="{ componentsactive: isActive[getComponentIndex(item, component)] }"
      v-for="component in item.components" :key="component.path" @click="handleClick(component);">
      <span class="cursor">
        {{ component.title }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Components from '@/JSON/guide.json';

const router = useRouter();
const route = useRoute();
const isActive = ref<boolean[]>([]);

const getComponentIndex = (group: any, comp: any) => {
  let index = 0;
  for (const g of Components) {
    if (g === group) return index + g.components.indexOf(comp);
    index += g.components.length;
  }
  return -1;
};

// 更新激活状态（保留.html后缀）
watchEffect(() => {
  const activeStates: boolean[] = [];
  Components.forEach(group => {
    group.components.forEach(comp => {
      // 直接比较当前路由路径是否包含组件路径.html
      activeStates.push(route.path.includes(`${comp.path}.html`));
    });
  });
  isActive.value = activeStates;
});

// 点击事件处理（保留.html后缀）
const handleClick = (component: any) => {
  router.push(`/components/${component.path}.html`);
};
</script>

<style scoped>
.title {
  width: 100%;
  padding: 20px 0;
  font-size: 1.2rem;
  font-weight: bolder;
  text-align: center;
  color: var(--topic-color-text);
}

.components {
  width: 90%;
  margin: 5px 0 0 5%;
  padding: 7px 0;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 500;
  border-radius: 10px;
}

.components:hover {
  background-color: var(--topic-color-hover);
  color: white;
}

.componentsactive {
  background-color: var(--topic-color-hover);
  color: white;
}
</style>