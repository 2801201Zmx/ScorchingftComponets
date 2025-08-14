<template>
  <form class="sf-form" :style="style" @submit.prevent="handleSubmit">
    <div class="form-content">
      <template v-if="model && Object.keys(model).length > 0">
        <sf-form-item 
          v-for="(value, key) in model" 
          :key="key"
          :label="getLabel(key)"
          :prop="key"
        >
          <sf-input 
            v-model="formData[key]" 
            :placeholder="getPlaceholder(key)"
            :type="getInputType(key)"
            @blur="validateField(key, 'blur')"
          />
        </sf-form-item>
      </template>
      <slot></slot>
    </div>
    <div v-if="showSubmit" class="form-actions">
      <slot name="actions">
        <sf-button type="submit" :disabled="loading">
          {{ submitText }}
        </sf-button>
        <sf-button v-if="showReset" @click="handleReset">
          {{ resetText }}
        </sf-button>
      </slot>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, provide, reactive, watch } from 'vue'
import type { StyleValue } from 'vue'
import { nextTick } from 'vue'

interface FormRule {
  required?: boolean
  message?: string
  validator?: (value: any) => boolean | string
  trigger?: 'blur' | 'change' | 'submit'
}

interface FormItemRule {
  [key: string]: FormRule[]
}

interface Props {
  style?: StyleValue
  model?: Record<string, any>
  rules?: FormItemRule
  labelWidth?: string | number
  labelPosition?: 'left' | 'top' | 'right'
  size?: 'small' | 'medium' | 'large'
  showSubmit?: boolean
  showReset?: boolean
  submitText?: string
  resetText?: string
  loading?: boolean
}

interface Emits {
  (e: 'submit', values: Record<string, any>): void
  (e: 'reset'): void
  (e: 'validate', valid: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  style: () => ({}),
  model: () => ({}),
  rules: () => ({}),
  labelWidth: 'auto',
  labelPosition: 'left',
  size: 'medium',
  showSubmit: true,
  showReset: false,
  submitText: '提交',
  resetText: '重置',
  loading: false
})

const emit = defineEmits<Emits>()

const formItems = ref<any[]>([])
const formData = reactive({ ...props.model })

// 监听model变化
watch(() => props.model, (newModel) => {
  if (newModel) {
    Object.keys(newModel).forEach(key => {
      formData[key] = newModel[key]
    })
  }
}, { deep: true })

// 提供表单上下文给子组件
provide('form', {
  formData,
  rules: props.rules,
  labelWidth: props.labelWidth,
  labelPosition: props.labelPosition,
  size: props.size,
  addFormItem: (item: any) => {
    formItems.value.push(item)
  },
  removeFormItem: (item: any) => {
    const index = formItems.value.indexOf(item)
    if (index > -1) {
      formItems.value.splice(index, 1)
    }
  }
})

// 获取标签文本
const getLabel = (key: string) => {
  const labelMap: Record<string, string> = {
    name: '姓名',
    email: '邮箱',
    age: '年龄',
    username: '用户名',
    password: '密码',
    title: '标题',
    description: '描述',
    phone: '手机号',
    website: '网址'
  }
  return labelMap[key] || key
}

// 获取占位符
const getPlaceholder = (key: string) => {
  const placeholderMap: Record<string, string> = {
    name: '请输入姓名',
    email: '请输入邮箱',
    age: '请输入年龄',
    username: '请输入用户名',
    password: '请输入密码',
    title: '请输入标题',
    description: '请输入描述',
    phone: '请输入手机号',
    website: '请输入网址'
  }
  return placeholderMap[key] || `请输入${getLabel(key)}`
}

// 获取输入类型
const getInputType = (key: string) => {
  if (key === 'password') return 'password'
  if (key === 'email') return 'email'
  if (key === 'age') return 'number'
  return 'text'
}

// 验证单个字段
const validateField = async (key: string, trigger?: string) => {
	await nextTick()
	const formItem = formItems.value.find(item => item.prop === key)
	if (formItem) {
		formItem.validate(trigger)
	}
}

// 验证表单
const validate = async (): Promise<boolean> => {
  const validations = formItems.value.map(item => item.validate())
  const results = await Promise.all(validations)
  const isValid = results.every(result => result === true)
  emit('validate', isValid)
  return isValid
}

// 重置表单
const resetFields = () => {
  formItems.value.forEach(item => item.resetField())
  Object.keys(formData).forEach(key => {
    formData[key] = props.model?.[key] || ''
  })
}

// 提交表单
const handleSubmit = async () => {
  const isValid = await validate()
  if (isValid) {
    emit('submit', { ...formData })
  }
}

// 重置表单
const handleReset = () => {
  resetFields()
  emit('reset')
}

// 暴露方法
defineExpose({
  validate,
  resetFields,
  formData
})
</script>

<style scoped>
.form-content {
  width: 100%;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
  padding-top: 16px;
}

.submit-btn,
.reset-btn {
  padding: 8px 20px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  background: #fff;
}

.submit-btn {
  background: #ce9bfd;
  border-color: #ce9bfd;
  color: #fff;
}

.submit-btn:hover:not(:disabled) {
  background: #b87de8;
  border-color: #b87de8;
}

.submit-btn:disabled {
  background: #c0c4cc;
  border-color: #c0c4cc;
  cursor: not-allowed;
}

.reset-btn {
  color: #606266;
}

.reset-btn:hover {
  color: #ce9bfd;
  border-color: #ce9bfd;
}

/* 尺寸变体 */
.sf-form.size-small .submit-btn,
.sf-form.size-small .reset-btn {
  padding: 6px 16px;
  font-size: 12px;
}

.sf-form.size-large .submit-btn,
.sf-form.size-large .reset-btn {
  padding: 12px 24px;
  font-size: 16px;
}
</style> 