<template>
  <div class="custom-input" :class="{ 'has-icon': showToggle }">
    <input
      ref="inputRef"
      :type="props.type === 'password' ? (showPassword ? 'text' : 'password') : props.type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="inputClass"
      :style="inputStyle"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    
    <div 
      v-if="showToggle" 
      class="eye-icon"
      :class="[props.iconPosition, { 'custom-icon': $slots.icon }]"
      @click="togglePasswordVisibility"
    >
      <!-- 自定义图标插槽 -->
      <slot v-if="$slots.icon" name="icon" :visible="showPassword"></slot>
      
      <!-- 默认图标 -->
      <template v-else>
        <svg v-if="showPassword" viewBox="0 0 24 24" class="default-icon">
          <path d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" class="default-icon">
          <path d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3L2,4.27Z"/>
        </svg>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, defineEmits, defineProps } from 'vue'
import type { StyleValue } from 'vue'

interface Props {
  modelValue?: string | number
  type?: 'text' | 'password' | 'email' | 'number'
  placeholder?: string
  disabled?: boolean
  showToggle?: boolean
  iconPosition?: 'left' | 'right'
  inputClass?: string | object | Array<any> | undefined
  inputStyle?: StyleValue
}

// 修复：显式声明 props 并使用 withDefaults 设置默认值
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  disabled: false,
  showToggle: false,
  iconPosition: 'right',
  inputClass: undefined,
  inputStyle: undefined,
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const inputRef = ref<HTMLInputElement | null>(null)
const showPassword = ref(false)

// 计算是否显示切换按钮（仅当props.showToggle为true且类型为password）
const showToggleComputed = computed(() => {
  return props.showToggle && props.type === 'password'
})

// 处理输入事件
function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

// 切换密码可见性
function togglePasswordVisibility() {
  if (!inputRef.value) return
  
  // 保存光标位置
  const start = inputRef.value.selectionStart
  const end = inputRef.value.selectionEnd
  
  showPassword.value = !showPassword.value
  
  // 恢复光标位置
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.setSelectionRange(start as number, end as number)
      inputRef.value.focus()
    }
  })
}

// 处理焦点事件
function handleFocus(event: FocusEvent) {
  emit('focus', event)
}

// 处理失焦事件
function handleBlur(event: FocusEvent) {
  emit('blur', event)
}
</script>

<style scoped>
.custom-input {
  position: relative;
  display: inline-block;
  width: 100%;
}

.custom-input input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

/* 聚焦样式 */
.custom-input input:focus {
  border-color: #409eff;
  outline: none;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

/* 禁用样式 */
.custom-input input:disabled {
  background-color: #f5f7fa;
  cursor: not-allowed;
}

/* 有图标的输入样式 */
.has-icon input {
  padding-right: 40px;
}

.eye-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #606266;
  transition: color 0.2s;
  z-index: 2;
}

.eye-icon:hover {
  color: #409eff;
}

.eye-icon.right {
  right: 10px;
}

.eye-icon.left {
  left: 10px;
}

.custom-icon {
  width: auto;
  height: auto;
}

.default-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}
</style>