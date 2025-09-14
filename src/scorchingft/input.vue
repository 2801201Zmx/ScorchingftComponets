<template>
  <div class="sf-input" :class="{ 'has-icon': shouldShowToggle }">
    <input
      :style="style"
      ref="inputRef"
      :type="currentType"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :min="min"
      :max="max"
      :step="step"
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
      <sf-icon v-if="internalShowPassword">
        <Hide />
      </sf-icon>
      <sf-icon v-else>
        <View />
      </sf-icon>
    </span>
    <span
      class="cursor clear-icon"
      v-if="clearable"
      @click="clearInput"
    >
      <sf-icon>
        <Circleclose />
      </sf-icon>
    </span>
    <!-- 滑块组件 -->
    <span 
      class="slider"
      v-if="type === 'slider'"
      ref="sliderRef"
      @mousedown="handleSliderMouseDown"
      @touchstart="handleSliderTouchStart"
    >
      <!-- 滑块轨道背景 -->
      <span class="slider-track"></span>
      <!-- 滑块进度条 -->
      <span class="slider-progress" :style="{ width: sliderPosition + '%' }"></span>
      <!-- 滑块拖拽按钮 -->
      <span 
        class="slider-thumb" 
        :style="{ left: sliderPosition + '%' }"
        @mousedown="handleThumbMouseDown"
        @touchstart="handleThumbTouchStart"
      ></span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch, onMounted, onUnmounted } from 'vue';
import type { StyleValue } from 'vue';

// 添加name属性以便正确注册组件
const name = 'SFInput';

interface Props {
  style?: StyleValue
  modelValue?: string | number
  type?: 'text' | 'password' | 'email' | 'number' | 'slider'
  placeholder?: string
  disabled?: boolean
  showPassword?: boolean
  clearable?: boolean
  min?: number
  max?: number
  step?: number
}

interface Emits {
  (e: 'update:modelValue', value: string | number): void
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
  style: undefined,
  min: 0,
  max: 100,
  step: 1
})

const internalShowPassword = ref(false)
const currentType = ref(props.type)
const sliderPosition = ref(0)
const sliderRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)

watch(() => props.type, (newType) => {
  currentType.value = newType
})

// 计算滑块位置
const calculateSliderPosition = () => {
  if (props.type === 'slider') {
    const value = Number(props.modelValue) || props.min
    const clampedValue = Math.min(props.max, Math.max(props.min, value))
    const range = props.max - props.min
    const percentage = range === 0 ? 0 : ((clampedValue - props.min) / range) * 100
    sliderPosition.value = Math.min(100, Math.max(0, percentage))
  }
}

// 监听 modelValue 变化以更新滑块位置
watch(() => props.modelValue, () => {
  calculateSliderPosition()
}, { immediate: true })

const shouldShowToggle = computed(() => {
  return props.showPassword && props.type === 'password'
})

const emit = defineEmits<Emits>();

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  // 对于数字和滑块类型，确保传递的是数字值
  if (props.type === 'number' || props.type === 'slider') {
    const value = target.value;
    emit('update:modelValue', value === '' ? '' : Number(value));
  } else {
    emit('update:modelValue', target.value);
  }
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

  const start = inputRef.value.selectionStart;
  const end = inputRef.value.selectionEnd;
  const currentValue = inputRef.value.value;

  internalShowPassword.value = !internalShowPassword.value;
  currentType.value = internalShowPassword.value ? 'text' : 'password';

  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.value = currentValue;
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

// 滑块相关函数
function initSliderDrag(event: MouseEvent | TouchEvent) {
  if (props.disabled || props.type !== 'slider') return;
  
  isDragging.value = true;
  event.preventDefault();
  event.stopPropagation();
}

function handleSliderMouseDown(event: MouseEvent) {
  initSliderDrag(event);
  updateSliderValue(event.clientX);
}

function handleThumbMouseDown(event: MouseEvent) {
  initSliderDrag(event);
}

function handleSliderTouchStart(event: TouchEvent) {
  initSliderDrag(event);
  updateSliderValue(event.touches[0].clientX);
}

function handleThumbTouchStart(event: TouchEvent) {
  initSliderDrag(event);
}

function handleSliderMouseMove(event: MouseEvent) {
  if (!isDragging.value || props.disabled || props.type !== 'slider') return;
  event.preventDefault();
  updateSliderValue(event.clientX);
}

function handleSliderTouchMove(event: TouchEvent) {
  if (!isDragging.value) return;
  updateSliderValue(event.touches[0].clientX);
}

function handleSliderMouseUp() {
  isDragging.value = false;
}

function handleSliderTouchEnd() {
  isDragging.value = false;
}

function updateSliderValue(clientX: number) {
  if (!sliderRef.value) return;
  
  const sliderRect = sliderRef.value.getBoundingClientRect();
  const offsetX = clientX - sliderRect.left;
  const sliderWidth = sliderRect.width;
  const dragRatio = Math.min(1, Math.max(0, offsetX / sliderWidth));
  
  const rawValue = props.min + dragRatio * (props.max - props.min);
  // 确保 step 不是 0，以防除以零
  const step = props.step > 0 ? props.step : 1;
  const steppedValue = Math.round(rawValue / step) * step;
  const finalValue = Math.min(props.max, Math.max(props.min, steppedValue));
  
  sliderPosition.value = dragRatio * 100;
  emit('update:modelValue', finalValue);
}

// 组件挂载后添加全局事件监听器
onMounted(() => {
  document.addEventListener('mousemove', handleSliderMouseMove);
  document.addEventListener('mouseup', handleSliderMouseUp);
  document.addEventListener('touchmove', handleSliderTouchMove);
  document.addEventListener('touchend', handleSliderTouchEnd);
});

// 组件卸载前移除事件监听器
onUnmounted(() => {
  document.removeEventListener('mousemove', handleSliderMouseMove);
  document.removeEventListener('mouseup', handleSliderMouseUp);
  document.removeEventListener('touchmove', handleSliderTouchMove);
  document.removeEventListener('touchend', handleSliderTouchEnd);
});
</script>

<style scoped>
.sf-input {
  position: relative;
  width: fit-content;
  display: inline-block;
}

.sf-input input {
  padding: 8px 12px;
  border: 1px solid #c0c0c0;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
  box-sizing: border-box;
  width: 100%;
}

.sf-input input[type="range"] {
  padding: 0;
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  outline: none;
  -webkit-appearance: none;
}

.sf-input input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  background-color: #ce9bfd;
  border-radius: 50%;
  cursor: grab;
  transition: background-color 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.sf-input input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background-color: #ce9bfd;
  border-radius: 50%;
  cursor: grab;
  transition: background-color 0.2s;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.sf-input input[type="range"]::-webkit-slider-thumb:hover {
  background-color: #b06bdf;
}

.sf-input input[type="range"]::-moz-range-thumb:hover {
  background-color: #b06bdf;
}

.sf-input input[type="range"]::-webkit-slider-thumb:active {
  cursor: grabbing;
  background-color: #a05fcf;
}

.sf-input input[type="range"]::-moz-range-thumb:active {
  cursor: grabbing;
  background-color: #a05fcf;
}

.sf-input input:focus {
  border-color: #ce9bfd;
  outline: none;
}

.sf-input input:disabled {
  background-color: #f5f7fa;
  cursor: not-allowed;
}

.sf-input input[type="range"]:disabled::-webkit-slider-thumb {
  background-color: #c0c0c0;
  cursor: not-allowed;
}

.sf-input input[type="range"]:disabled::-moz-range-thumb {
  background-color: #c0c0c0;
  cursor: not-allowed;
}

.sf-input span.eye-icon,
.sf-input span.clear-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  width: 20px;
  height: 20px;
  z-index: 5;
}

.sf-input .eye-icon {
  right: 12px;
}

.sf-input .clear-icon {
  right: 12px;
}

.sf-input span.has-icon {
  padding-right: 30px;
}

/* 滑块样式 */
.sf-input .slider {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  width: 80px;
  height: 6px;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  z-index: 10;
  display: block;
}

/* 滑块轨道背景 */
.sf-input .slider-track {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
  height: 4px;
  background-color: #e0e0e0;
  border-radius: 2px;
}

/* 滑块进度条 */
.sf-input .slider-progress {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 4px;
  background-color: #ce9bfd;
  border-radius: 2px;
  transition: width 0.1s ease;
}

/* 滑块拖拽按钮 */
.sf-input .slider-thumb {
  position: absolute;
  top: 50%;
  width: 16px;
  height: 16px;
  background-color: #ffffff;
  border: 2px solid #ce9bfd;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: grab;
  transition: all 0.2s ease;
  user-select: none;
  -webkit-user-select: none;
  z-index: 11;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
}

.sf-input .slider-thumb:hover {
  transform: translate(-50%, -50%) scale(1.1);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.sf-input .slider-thumb:active {
  cursor: grabbing;
  transform: translate(-50%, -50%) scale(1.2);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.4);
}

/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #ce9bfd;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #b06bdf;
}

/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #ce9bfd #f1f1f1;
}
</style>