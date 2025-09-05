<template>
  <div class="sf-textarea" :class="{ 'has-clear': clearable }">
    <textarea
      :style="style"
      ref="textareaRef"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :rows="rows"
      :cols="cols"
      :wrap="wrap"
      :autofocus="autofocus"
      :form="form"
      :name="name"
      :required="required"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    ></textarea>
    <span
      class="cursor clear-icon"
      v-if="clearable && modelValue"
      @click="clearTextarea"
    >
      <sf-icon>
        <Circleclose />
      </sf-icon>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { StyleValue } from 'vue'
import Circleclose from './icon/circleclose.vue'
import sfIcon from './icon.vue'

interface Props {
  style?: StyleValue
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  maxlength?: number | string
  rows?: number | string
  cols?: number | string
  wrap?: 'soft' | 'hard'
  autofocus?: boolean
  form?: string
  name?: string
  required?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
  disabled: false,
  readonly: false,
  clearable: false,
  rows: 3,
  cols: undefined,
  wrap: 'soft',
  autofocus: false,
  required: false
})

const emit = defineEmits<Emits>()

const textareaRef = ref<HTMLTextAreaElement | null>(null)

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}

function handleFocus(event: FocusEvent) {
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  emit('blur', event)
}

function clearTextarea() {
  if (textareaRef.value) {
    textareaRef.value.value = ''
    emit('update:modelValue', '')
    textareaRef.value.focus()
  }
}
</script>

<style scoped>
.sf-textarea {
  position: relative;
  width: fit-content;
}

.sf-textarea textarea {
  padding: 8px 12px;
  border: 1px solid #c0c0c0;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
  min-width: 200px;
  min-height: 60px;
  resize: vertical;
}

.sf-textarea textarea:focus {
  border-color: #ce9bfd;
  outline: none;
}

.sf-textarea textarea:disabled {
  background-color: #f5f7fa;
  cursor: not-allowed;
}

.sf-textarea textarea:read-only {
  background-color: #f5f7fa;
}

.sf-textarea span.clear-icon {
  display: flex;
  position: absolute;
  top: 8px;
  right: 8px;
  width: 15px;
  height: 15px;
  cursor: pointer;
}
</style>