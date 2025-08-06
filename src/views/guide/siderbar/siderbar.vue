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

watchEffect(() => {
  const activeStates: boolean[] = [];
  Components.forEach(group => {
    group.components.forEach(comp => {
      activeStates.push(route.path.includes(`${comp.path}`));
    });
  });
  isActive.value = activeStates;
});

const handleClick = (component: any) => {
  router.push(`/guide/${component.path}`);
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
