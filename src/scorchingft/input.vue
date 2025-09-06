<template>
  <div class="sf-input" :class="{ 'has-icon': shouldShowToggle }">
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
    <span
      class="slider"
      v-if="type === 'slider'"
      ref="sliderRef"
      @mousedown="handleSliderMouseDown"
      @touchstart="handleSliderTouchStart"
    >
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
const sliderPosition = ref(0)
const sliderRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const startX = ref(0)

const shouldShowToggle = computed(() => {
  return props.showPassword && props.type === 'password'
})

const currentType = ref(props.type)

watch(() => props.type, (newType) => {
  currentType.value = newType
  if (newType === 'slider') {
    calculateSliderPosition()
  }
})

const calculateSliderPosition = () => {
  if (props.type === 'slider') {
    const value = Number(props.modelValue) || props.min;
    const validValue = Math.max(props.min, Math.min(props.max, value));
    const percentage = ((validValue - props.min) / (props.max - props.min)) * 100;
    sliderPosition.value = Math.min(100, Math.max(0, percentage));
  }
}

watch(() => props.modelValue, () => {
  if (props.type === 'slider') {
    calculateSliderPosition()
  }
})

onMounted(() => {
  if (props.type === 'slider') {
    calculateSliderPosition()
  }
  document.addEventListener('mousemove', handleSliderMouseMove)
  document.addEventListener('mouseup', handleSliderMouseUp)
  document.addEventListener('touchmove', handleSliderTouchMove)
  document.addEventListener('touchend', handleSliderTouchEnd)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleSliderMouseMove)
  document.removeEventListener('mouseup', handleSliderMouseUp)
  document.removeEventListener('touchmove', handleSliderTouchMove)
  document.removeEventListener('touchend', handleSliderTouchEnd)
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

function initSliderDrag(event: MouseEvent | TouchEvent) {
  if (props.disabled || props.type !== 'slider') return;

  isDragging.value = true;
  startX.value = 'touches' in event ? event.touches[0].clientX : event.clientX;
  calculateSliderPosition();
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

function handleSliderMouseMove(event: MouseEvent) {
  if (!isDragging.value) return;
  updateSliderValue(event.clientX);
}

function handleSliderMouseUp() {
  isDragging.value = false;
}

function handleSliderTouchStart(event: TouchEvent) {
  initSliderDrag(event);
  updateSliderValue(event.touches[0].clientX);
}

function handleThumbTouchStart(event: TouchEvent) {
  initSliderDrag(event);
}

function handleSliderTouchMove(event: TouchEvent) {
  if (!isDragging.value) return;
  updateSliderValue(event.touches[0].clientX);
}

function handleSliderTouchEnd() {
  isDragging.value = false;
}

function updateSliderValue(clientX: number) {
  if (!sliderRef.value) return;
  if (props.disabled) return;

  const sliderRect = sliderRef.value.getBoundingClientRect();
  const offsetX = clientX - sliderRect.left;
  const sliderWidth = sliderRect.width;
  const dragRatio = offsetX / sliderWidth;
  const clampedRatio = Math.min(1, Math.max(0, dragRatio));

  const rawValue = props.min + clampedRatio * (props.max - props.min);
  const steppedValue = Math.round(rawValue / props.step) * props.step;
  const finalValue = Math.min(props.max, Math.max(props.min, steppedValue));

  sliderPosition.value = clampedRatio * 100;
  emit('update:modelValue', finalValue);
}
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

.sf-input input:focus {
  border-color: #ce9bfd;
  outline: none;
}

.sf-input input:disabled {
  background-color: #f5f7fa;
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

.sf-input .slider {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  width: 80px;
  height: 4px;
  background-color: #e0e0e0;
  border-radius: 2px;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  z-index: 10;
  display: block;
}

.sf-input .slider-thumb {
  position: absolute;
  top: 50%;
  width: 16px;
  height: 16px;
  background-color: #ce9bfd;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: grab;
  transition: background-color 0.2s;
  user-select: none;
  -webkit-user-select: none;
  z-index: 11;
  pointer-events: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.sf-input .slider-thumb:hover {
  background-color: #b06bdf;
}

.sf-input .slider-thumb:active {
  cursor: grabbing;
  background-color: #a05fcf;
}
</style>