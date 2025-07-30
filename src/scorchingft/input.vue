<template>
  <div class="input-container" :class="{ 'has-icon': shouldShowToggle }">
    <input 
      :style="style" 
      ref="inputRef"
      :type="currentType"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <span 
      class="cursor eye-icon"
      :class="{ 'right': true }"
      v-if="shouldShowToggle" 
      @click="changeView"
    >
      <img :src="passwordVisibilityIcon" alt="">
    </span>
    <span
      class="cursor clear-icon"
      v-if="clearable"
      @click="clearInput"
    >
      <img src="/circleclose.svg" alt="">
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import type { StyleValue } from 'vue';

interface Props {
  style?: StyleValue
  modelValue?: string | number
  type?: 'text' | 'password' | 'email' | 'number'
  placeholder?: string
  disabled?: boolean
  showPassword?: boolean
  clearable?: boolean
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
  disabled: false,
  showPassword: false,
  clearable: false,
  style: undefined
})

const showPassword = ref(false)

const shouldShowToggle = computed(() => {
  return props.showPassword && props.type === 'password'
})

const passwordVisibilityIcon = computed(() => {
  return showPassword.value ? '/View.svg' : '/Hide.svg'
})

// 使用一个响应式的 currentType 而不是 computed
const currentType = ref(props.type)

// 监听 props.type 的变化
watch(() => props.type, (newType) => {
  currentType.value = newType
})

const emit = defineEmits<Emits>();

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}

function handleFocus(event: FocusEvent) {
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  emit('blur', event)
}

const inputRef = ref<HTMLInputElement | null>(null);

function changeView() {
  if (!inputRef.value) return;
  
  // 保存当前光标位置
  const start = inputRef.value.selectionStart;
  const end = inputRef.value.selectionEnd;
  const currentValue = inputRef.value.value;
  
  // 切换显示状态并更新类型
  showPassword.value = !showPassword.value;
  currentType.value = showPassword.value ? 'text' : 'password';
  
  // 恢复光标位置和值
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.value = currentValue; // 恢复值
      inputRef.value.setSelectionRange(start, end);
      inputRef.value.focus();
    }
  });
}

function clearInput() {
  if (inputRef.value) {
    inputRef.value.value = '';
    emit('update:modelValue', '');
    inputRef.value.focus();
  }
}


</script>

<style scoped>
.input-container {
  position: relative;
  width: fit-content;
}

.input-container input {
  padding: 8px 12px;
  border: 1px solid #c0c0c0;
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

.input-container span {
  display: flex;
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
}

.input-container span img {
  width: 100%;
  height: 100%;
}

.input-container .clear-icon {
  width: 15px;
  height: 15px;
}
</style>
