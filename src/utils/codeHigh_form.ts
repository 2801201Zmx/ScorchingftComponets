import { ref, nextTick } from "vue";
import { useCounterStore } from "@/store/counter";
import hljs from 'highlight.js';

const count = useCounterStore();

const basicFormCode = ref<string>(`
<template>
  <sf-form :model="formData" :rules="rules" @submit="handleSubmit">
    <sf-form-item label="姓名" prop="name">
      <sf-input v-model="formData.name" placeholder="请输入姓名" />
    </sf-form-item>
    <sf-form-item label="邮箱" prop="email">
      <sf-input v-model="formData.email" placeholder="请输入邮箱" />
    </sf-form-item>
    <sf-form-item label="年龄" prop="age">
      <sf-input v-model="formData.age" placeholder="请输入年龄" />
    </sf-form-item>
  </sf-form>
</template>

<script setup>
import { reactive } from 'vue'

const formData = reactive({
  name: '',
  email: '',
  age: ''
})

const rules = {
  name: [{ required: true, message: '请输入姓名' }],
  email: [
    { required: true, message: '请输入邮箱' },
    { validator: 'email', message: '请输入正确的邮箱格式' }
  ],
  age: [
    { required: true, message: '请输入年龄' },
    { validator: 'number', message: '年龄必须是数字' }
  ]
}

const handleSubmit = (values) => {
  console.log('表单数据:', values)
}
</script>
`);

const labelPositionCode = ref<string>(`
<template>
  <sf-form 
    :model="formData" 
    :rules="rules" 
    label-position="top"
    @submit="handleSubmit"
  >
    <sf-form-item label="用户名" prop="username">
      <sf-input v-model="formData.username" placeholder="请输入用户名" />
    </sf-form-item>
    <sf-form-item label="密码" prop="password">
      <sf-input 
        v-model="formData.password" 
        type="password" 
        placeholder="请输入密码" 
      />
    </sf-form-item>
  </sf-form>
</template>

<script setup>
import { reactive } from 'vue'

const formData = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }]
}

const handleSubmit = (values) => {
  console.log('表单数据:', values)
}
</script>
`);

const sizeFormCode = ref<string>(`
<template>
  <sf-form 
    :model="formData" 
    :rules="rules" 
    size="small"
    @submit="handleSubmit"
  >
    <sf-form-item label="标题" prop="title">
      <sf-input v-model="formData.title" placeholder="请输入标题" />
    </sf-form-item>
    <sf-form-item label="描述" prop="description">
      <sf-input v-model="formData.description" placeholder="请输入描述" />
    </sf-form-item>
  </sf-form>
</template>

<script setup>
import { reactive } from 'vue'

const formData = reactive({
  title: '',
  description: ''
})

const rules = {
  title: [{ required: true, message: '请输入标题' }]
}

const handleSubmit = (values) => {
  console.log('表单数据:', values)
}
</script>
`);

const validationFormCode = ref<string>(`
<template>
  <sf-form 
    :model="formData" 
    :rules="rules" 
    @submit="handleSubmit"
  >
    <sf-form-item label="手机号" prop="phone">
      <sf-input v-model="formData.phone" placeholder="请输入手机号" />
    </sf-form-item>
    <sf-form-item label="网址" prop="website">
      <sf-input v-model="formData.website" placeholder="请输入网址" />
    </sf-form-item>
  </sf-form>
</template>

<script setup>
import { reactive } from 'vue'

const formData = reactive({
  phone: '',
  website: ''
})

const rules = {
  phone: [
    { required: true, message: '请输入手机号' },
    { validator: 'phone', message: '请输入正确的手机号格式' }
  ],
  website: [
    { validator: 'url', message: '请输入正确的网址格式' }
  ]
}

const handleSubmit = (values) => {
  console.log('表单数据:', values)
}
</script>
`);

// 设置代码列表到store
count.codeList = ([
    basicFormCode.value,
    labelPositionCode.value,
    sizeFormCode.value,
    validationFormCode.value
])

export default function formCodeHighlight(callback?: () => void): void {
    const count = useCounterStore();

    count.codeList.forEach((code, index) => {
        const highlightedCode = hljs.highlight(code, { language: 'html' }).value;
        count.codeHighlight[index] = highlightedCode;
    })

    if (callback) {
        nextTick().then(callback);
    }
} 