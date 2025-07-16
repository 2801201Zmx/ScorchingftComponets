<template>
<div class="input-container">
    <input :style="style"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
    />
</div>
</template>

<script setup lang="ts">
import {onMounted } from 'vue'

interface Props {
  style?: string
  modelValue?: string | number
  type?: 'text' | 'password' | 'email' | 'number'
  placeholder?: string
  disabled?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  disabled: false
})

const emit = defineEmits<Emits>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

onMounted(() => {
  localStorage.setItem('components-path', '/components/input.vue');
})
</script>

<style scoped>
.input-container input {
  padding: 8px 12px;
  border: 1px solid #ce9bfd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.input-container input:focus {
  border-color: #ce9bfd;
  outline: none;
}

.input-container input:disabled {
  background-color: #f5f7fa;
  cursor: not-allowed;
}
</style>
