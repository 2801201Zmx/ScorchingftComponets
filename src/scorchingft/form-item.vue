<template>
  <div class="sf-form-item" :class="[
    `label-${labelPosition}`,
    `size-${size}`,
    { 'is-error': validateState === 'error' }
  ]">
    <label v-if="label" class="form-label" :style="{ width: labelWidth }">
      <span v-if="isRequired" class="required">*</span>
      <span class="label">
        {{ label }}
      </span>
    </label>
    <div class="form-content">
      <slot></slot>
      <div v-if="validateState === 'error'" class="form-error">
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, onBeforeUnmount, computed } from 'vue'

interface FormRule {
  required?: boolean
  message?: string
  validator?: ((value: any) => boolean | string) | 'email' | 'number' | 'phone' | 'url'
  trigger?: 'blur' | 'change' | 'submit'
}

interface Props {
  label?: string
  prop?: string
  labelWidth?: string | number
  labelPosition?: 'left' | 'top' | 'right'
  size?: 'small' | 'medium' | 'large'
}

interface FormContext {
  formData: Record<string, any>
  rules: Record<string, FormRule[]>
  labelWidth: string | number
  labelPosition: 'left' | 'top' | 'right'
  size: 'small' | 'medium' | 'large'
  addFormItem: (item: any) => void
  removeFormItem: (item: any) => void
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  prop: '',
  labelWidth: undefined,
  labelPosition: 'left',
  size: 'medium'
})

const form = inject<FormContext>('form')
const validateState = ref<'success' | 'error' | ''>('')
const validateMessage = ref('')

const computedLabelWidth = computed(() => {
  if (props.labelWidth !== undefined) return props.labelWidth
  return form?.labelWidth || 'auto'
})

const computedLabelPosition = computed(() => {
  return props.labelPosition || form?.labelPosition || 'left'
})

const computedSize = computed(() => {
  return props.size || form?.size || 'medium'
})

const isRequired = computed(() => {
  if (!props.prop || !form) return false
  const rules = form.rules[props.prop] || []
  return rules.some(rule => rule.required)
})

function getBuiltinValidator(validator: FormRule['validator']): ((value: any) => boolean | string) | null {
	if (typeof validator === 'function') return validator
	switch (validator) {
		case 'email':
			return (val: any) => /^(?:[a-zA-Z0-9_\-\.]+)@(?:[a-zA-Z0-9_\-]+\.)+[a-zA-Z]{2,}$/.test(String(val)) || false
		case 'number':
			return (val: any) => /^-?\d+(?:\.\d+)?$/.test(String(val)) || false
		case 'phone':
			return (val: any) => /^(?:\+?86)?1[3-9]\d{9}$/.test(String(val)) || false
		case 'url':
			return (val: any) => {
				try {
					new URL(String(val))
					return true
				} catch {
					return false
				}
			}
		default:
			return null
	}
}

const validate = async (trigger?: string): Promise<boolean> => {
	if (!props.prop || !form) return true

	const rules = form.rules[props.prop] || []
	if (rules.length === 0) return true

	const value = form.formData[props.prop]
	
	const effectiveRules = rules.filter(rule => !trigger || !rule.trigger || rule.trigger === trigger)
	if (effectiveRules.length === 0) {
		if (validateState.value === 'error') {
			if (value !== '' && value !== undefined && value !== null) {
				validateState.value = 'success'
				validateMessage.value = ''
			}
		}
		return validateState.value !== 'error'
	}

	if ((value === '' || value === undefined || value === null) && !effectiveRules.some(r => r.required)) {
		validateState.value = ''
		validateMessage.value = ''
		return true
	}
	
	if ((value === '' || value === undefined || value === null) && effectiveRules.some(r => r.required)) {
		const requiredRule = effectiveRules.find(r => r.required)
		validateState.value = 'error'
		validateMessage.value = requiredRule?.message || `${props.label}是必填项`
		return false
	}

	let hasError = false
	let errorMessage = ''
	
	for (const rule of effectiveRules) {
		const validatorFn = getBuiltinValidator(rule.validator)
		if (validatorFn) {
			const result = validatorFn(value)
			if (typeof result === 'string') {
				hasError = true
				errorMessage = result
				break
			} else if (!result) {
				hasError = true
				errorMessage = rule.message || `${props.label}验证失败`
				break
			}
		}
	}
	
	if (hasError) {
		validateState.value = 'error'
		validateMessage.value = errorMessage
		return false
	}
	
	validateState.value = 'success'
	validateMessage.value = ''
	return true
}

const resetField = () => {
  validateState.value = ''
  validateMessage.value = ''
  if (props.prop && form) {
    form.formData[props.prop] = ''
  }
}

const clearValidate = () => {
  validateState.value = ''
  validateMessage.value = ''
}

onMounted(() => {
  if (form) {
    form.addFormItem({
      validate,
      resetField,
      clearValidate,
      prop: props.prop
    })
  }
})

onBeforeUnmount(() => {
  if (form) {
    form.removeFormItem({
      validate,
      resetField,
      clearValidate,
      prop: props.prop
    })
  }
})

defineExpose({
  validate,
  resetField,
  clearValidate
})
</script>

<style scoped>
.sf-form-item {
  display: flex;
  margin-bottom: 18px;
  align-items: flex-start;
  width: 100%;
}

.sf-form-item.label-left {
  flex-direction: row;
}

.sf-form-item.label-top {
  flex-direction: column;
}

.sf-form-item.label-right {
  flex-direction: row-reverse;
}

label {
  display: inline-block;
  width: 80px;
}

.form-label {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 12px;
  font-size: 14px;
  color: #606266;
  line-height: 32px;
  box-sizing: border-box;
}

.label-top .form-label {
  justify-content: flex-start;
  padding-right: 0;
  padding-bottom: 8px;
}

.label-right .form-label {
  justify-content: flex-start;
  padding-right: 0;
  padding-left: 12px;
}

.required {
  color: #f56c6c;
  margin-right: 4px;
}

.form-content {
  flex: 1;
  min-width: 0;
}

.form-error {
  font-size: 12px;
  color: #f56c6c;
  line-height: 1;
  padding-top: 4px;
}

/* 尺寸变体 */
.sf-form-item.size-small .form-label {
  font-size: 12px;
  line-height: 28px;
}

.sf-form-item.size-small .form-error {
  font-size: 11px;
}

.sf-form-item.size-large .form-label {
  font-size: 16px;
  line-height: 36px;
}

.sf-form-item.size-large .form-error {
  font-size: 13px;
}

/* 状态样式 */
.sf-form-item.is-error .form-label {
  /* 移除label变红的样式，保持原有颜色 */
}
</style> 