<template>
  <div class="overview">
    <div class="header">
      <h1>Scorchingft UI 组件库</h1>
      <p>一套为开发者、设计师准备的 Vue 3 组件库，提供了丰富的组件以满足日常开发需求。</p>
    </div>
    
    <div class="components-grid" v-for="(group, index) in components" :key="index">
      <div class="component-list">
        <div 
          class="component-card" 
          v-for="(component, compIndex) in group.components" 
          :key="compIndex"
          @click="goToComponent(component.path)"
        >
          <div class="component-preview">
            <img v-if="component.issrc" :src="`/src${component.src}`" alt="">
            <div v-else class="preview-placeholder">
              {{ component.title.split(' ')[0] }}
            </div>
          </div>
          <div class="component-info">
            <h3>{{ component.title }}</h3>
            <p class="component-description">点击查看 {{ component.title }} 组件的详细文档和使用示例</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import components from '@/JSON/overview.json';

const router = useRouter();

const goToComponent = (path: string) => {
  router.push(`/components/${path}`);
};
</script>

<style scoped>
.overview {
  width: 100%;
  padding: 20px;
  margin-top: 40px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px;
  background: linear-gradient(155deg, var(--topic-color) 0%, var(--topic-color-night) 100%);
  border-radius: 10px;
  color: white;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.header p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.group-title {
  font-size: 1.8rem;
  margin: 30px 0 20px 0;
  color: var(--topic-color-text);
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
}

.component-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.component-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  background: white;
}

.component-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  border-color: #667eea;
}

.component-preview {
  height: 150px;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.component-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-placeholder {
  font-size: 3rem;
  color: #667eea;
  font-weight: bold;
  opacity: 0.7;
}

.component-info {
  padding: 15px;
}

.component-info h3 {
  margin: 0 0 10px 0;
  font-size: 1.3rem;
  color: var(--topic-color-text);
}

.component-description {
  margin: 0;
  color: #666;
  font-size: 0.95rem;
  line-height: 1.4;
}
</style>