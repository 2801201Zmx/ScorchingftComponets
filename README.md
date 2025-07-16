<p align="center">
  <img width="300px" src="https://images.scorchingft.cn/assets/images/logo_scorchingft.png">
</p>
# Scorchingft Components

一个基于 Vue 3 的现代化组件库，使用 TypeScript 开发。

## 安装

```bash
# 使用 npm
npm install scorchingft-components

# 使用 pnpm
pnpm add scorchingft-components

# 使用 yarn
yarn add scorchingft-components
```

## 使用

### 全局注册

```typescript
import { createApp } from 'vue'
import ScorchingftComponents from 'scorchingft-components'
import 'scorchingft-components/dist/style.css'

const app = createApp(App)
app.use(ScorchingftComponents)
app.mount('#app')
```

### 按需导入

```vue
<template>
  <div>
    <SFInput 
      v-model="inputValue" 
      placeholder="请输入内容"
      @focus="handleFocus"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SFInput } from 'scorchingft-components'

const inputValue = ref('')

const handleFocus = (event: FocusEvent) => {
  console.log('输入框获得焦点', event)
}
</script>
```

## 组件

### SFInput

输入框组件，支持 v-model 双向绑定。

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | string \| number | '' | 输入框的值 |
| type | 'text' \| 'password' \| 'email' \| 'number' | 'text' | 输入框类型 |
| placeholder | string | '' | 占位符文本 |
| disabled | boolean | false | 是否禁用 |

#### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | (value: string) | 值更新时触发 |
| focus | (event: FocusEvent) | 获得焦点时触发 |
| blur | (event: FocusEvent) | 失去焦点时触发 |

## 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建组件库
pnpm build

# 类型检查
pnpm type-check
```

## 许可证

MIT
