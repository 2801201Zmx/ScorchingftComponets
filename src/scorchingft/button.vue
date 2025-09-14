<template>
    <component :is="tag" :class="[
        'sf-button',
        type ? `sf-button--${type}` : '',
        size ? `sf-button--${size}` : '',
        {
            'is-plain': plain,
            'is-text': text,
            'is-bg': bg,
            'is-link': link,
            'is-round': round,
            'is-circle': circle,
            'is-disabled': disabled || loading,
            'is-loading': loading,
            'is-dark': dark
        }
    ]" :disabled="disabled || loading" :autofocus="autofocus" :type="nativeType" :style="buttonStyle"
        @click="handleClick"
        @mousedown="handleMouseDown"
        @mouseup="handleMouseUp"
        @mouseleave="handleMouseLeave"
        @focus="handleFocus"
        @blur="handleBlur">
        <template v-if="loading">
            <slot v-if="$slots.loading" name="loading"></slot>
            <component v-else-if="loadingIcon" :is="loadingIcon" class="sf-button__loading-icon" />
            <span v-else class="sf-button__loading-icon"></span>
        </template>
        <component v-else-if="icon" :is="icon" class="sf-button__icon" />
        <span v-if="autoInsertSpace" ref="innerRef" class="sf-button__text">
            {{ spacedText }}
        </span>
        <span v-else class="sf-button__text">
            <slot></slot>
        </span>
    </component>
</template>

<script setup lang="ts">
import { computed, ref, useSlots, type Component } from 'vue'
import type { CSSProperties } from 'vue'

type ButtonSize = 'large' | 'default' | 'small'
type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
type NativeType = 'button' | 'submit' | 'reset'

interface Props {
    size?: ButtonSize
    type?: ButtonType
    plain?: boolean
    text?: boolean
    bg?: boolean
    link?: boolean
    round?: boolean
    circle?: boolean
    loading?: boolean
    loadingIcon?: string | Component
    disabled?: boolean
    icon?: string | Component
    autofocus?: boolean
    nativeType?: NativeType
    autoInsertSpace?: boolean
    color?: string
    dark?: boolean
    tag?: string | Component
}

const props = withDefaults(defineProps<Props>(), {
    nativeType: 'button',
    tag: 'button'
})

const emit = defineEmits<{
    (e: 'click', event: MouseEvent): void
}>()

const slots = useSlots()
const innerRef = ref<HTMLElement | null>(null)
const isFocused = ref(false)

const spacedText = computed(() => {
    if (!props.autoInsertSpace) return undefined

    const textContent = slots.default?.()[0]?.children?.toString() || ''
    if (textContent.length === 2 && /^[\u4e00-\u9fa5]{2}$/.test(textContent)) {
        return textContent.split('').join(' ')
    }
    return textContent
})

const buttonStyle = computed<CSSProperties>(() => {
    const styles: CSSProperties = {}

    if (props.color) {
        styles.backgroundColor = props.color
        styles.borderColor = props.color
        styles.color = '#fff'
    }

    if (props.dark) {
        styles.color = '#fff'
        if (!props.color) {
            styles.backgroundColor = '#424242'
            styles.borderColor = '#424242'
        }
    }

    return styles
})

const handleClick = (event: MouseEvent) => {
    if (props.disabled || props.loading) {
        event.preventDefault()
        return
    }
    emit('click', event)
}

const handleMouseDown = (event: MouseEvent) => {
    if (props.disabled || props.loading) {
        return
    }
    event.preventDefault()
    isFocused.value = true
}

const handleMouseUp = () => {
    isFocused.value = false
}

const handleMouseLeave = () => {
    isFocused.value = false
}

const handleFocus = () => {
    isFocused.value = true
}

const handleBlur = () => {
    isFocused.value = false
}
</script>

<style scoped>
.sf-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    transition: 0.1s;
    font-weight: 500;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    background-color: #ffffff;
    border: 1px solid #dcdfe6;
    color: #606266;
    padding: 8px 15px;
    font-size: 14px;
    border-radius: 4px;
    height: 32px;
}

.sf-button--primary {
    color: #fff;
    background-color: var(--topic-color);
    border-color: var(--topic-color);
}

.sf-button--success {
    color: #fff;
    background-color: #67c23a;
    border-color: #67c23a;
}

.sf-button--warning {
    color: #fff;
    background-color: #e6a23c;
    border-color: #e6a23c;
}

.sf-button--danger {
    color: #fff;
    background-color: #f56c6c;
    border-color: #f56c6c;
}

.sf-button--info {
    color: #fff;
    background-color: #909399;
    border-color: #909399;
}

/* 朴素按钮样式 */
.sf-button.is-plain {
    background: transparent;
}

.sf-button--primary.is-plain {
    color: var(--topic-color);
    background: var(--topic-color-light);
    border-color: var(--topic-color-border);
}

.sf-button--success.is-plain {
    color: #67c23a;
    background: #f0f9eb;
    border-color: #c2e7b0;
}

.sf-button--warning.is-plain {
    color: #e6a23c;
    background: #fdf6ec;
    border-color: #f5dab1;
}

.sf-button--danger.is-plain {
    color: #f56c6c;
    background: #fef0f0;
    border-color: #fbc4c4;
}

.sf-button--info.is-plain {
    color: #909399;
    background: #f4f4f5;
    border-color: #d3d4d6;
}

.sf-button--large {
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    height: 40px;
}

.sf-button--small {
    padding: 5px 12px;
    font-size: 12px;
    border-radius: 3px;
    height: 24px;
}

.sf-button.is-round {
    border-radius: 20px;
    padding: 12px 23px;
}

.sf-button.is-circle {
    border-radius: 50%;
    padding: 12px;
    width: 32px;
    height: 32px;
}

.sf-button.is-text {
    border-color: transparent;
    color: var(--topic-color);
    background: transparent;
    padding-left: 0;
    padding-right: 0;
}

.sf-button.is-text:hover,
.sf-button.is-text:focus {
    color: var(--topic-color-hover);
    border-color: transparent;
    background-color: transparent;
}

.sf-button.is-text:active {
    color: var(--topic-color-active);
    background-color: transparent;
}

.sf-button.is-text.is-bg {
    background-color: var(--topic-color-light);
}

.sf-button.is-text.is-bg:hover,
.sf-button.is-text.is-bg:focus {
    background-color: var(--topic-color-hover);
    color: white;
}

.sf-button.is-link {
    border-color: transparent;
    color: var(--topic-color);
    background: transparent;
    padding-left: 0;
    padding-right: 0;
}

.sf-button.is-link:hover,
.sf-button.is-link:focus {
    color: var(--topic-color-hover);
    border-color: transparent;
    background-color: transparent;
}

.sf-button.is-link:active {
    color: var(--topic-color-active);
    background-color: transparent;
}

/* 禁用状态 */
.sf-button.is-disabled,
.sf-button.is-disabled:hover,
.sf-button.is-disabled:focus {
    color: #c0c4cc;
    cursor: not-allowed;
    background-image: none;
    background-color: #fff;
    border-color: #ebeef5;
}

.sf-button.is-text.is-disabled,
.sf-button.is-text.is-disabled:hover,
.sf-button.is-text.is-disabled:focus {
    border-color: transparent;
}

.sf-button.is-link.is-disabled,
.sf-button.is-link.is-disabled:hover,
.sf-button.is-link.is-disabled:focus {
    border-color: transparent;
}

/* 加载状态 */
.sf-button.is-loading {
    position: relative;
    pointer-events: none;
}

.sf-button.is-loading .sf-button__text {
    opacity: 0;
}

.sf-button__loading-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
    border: 2px solid;
    border-color: transparent;
    border-top-color: currentColor;
    border-radius: 50%;
    animation: rotating 1s linear infinite;
}

@keyframes rotating {
    0% {
        transform: translate(-50%, -50%) rotate(0deg);
    }

    100% {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}

.sf-button__icon {
    width: 1em;
    height: 1em;
    margin-right: 6px;
}

.sf-button.is-circle .sf-button__icon {
    margin-right: 0;
}

.sf-button.is-dark {
    background-color: #424242;
    border-color: #424242;
    color: #fff;
}

.sf-button:focus,
.sf-button:hover {
    color: var(--topic-color-hover);
    border-color: var(--topic-color-border-hover);
    background-color: #c98fff3b;
}

.sf-button--primary:focus,
.sf-button--primary:hover {
    background: var(--topic-color-hover);
    border-color: var(--topic-color-hover);
    color: #fff;
}

.sf-button--primary:active {
    background: var(--topic-color-active);
    border-color: var(--topic-color-active);
    color: #fff;
    outline: none;
}

/* 添加按下状态样式 */
.sf-button:active:not(.is-disabled):not(.is-loading),
.sf-button.is-focused:not(.is-disabled):not(.is-loading) {
    transform: translateY(1px);
}

.sf-button--primary:active:not(.is-disabled):not(.is-loading),
.sf-button--primary.is-focused:not(.is-disabled):not(.is-loading) {
    background: var(--topic-color-active);
    border-color: var(--topic-color-active);
    color: #fff;
    outline: none;
}

.sf-button--success:active:not(.is-disabled):not(.is-loading),
.sf-button--success.is-focused:not(.is-disabled):not(.is-loading) {
    background: #5daf34;
    border-color: #5daf34;
    color: #fff;
    outline: none;
}

.sf-button--warning:active:not(.is-disabled):not(.is-loading),
.sf-button--warning.is-focused:not(.is-disabled):not(.is-loading) {
    background: #cf9236;
    border-color: #cf9236;
    color: #fff;
    outline: none;
}

.sf-button--danger:active:not(.is-disabled):not(.is-loading),
.sf-button--danger.is-focused:not(.is-disabled):not(.is-loading) {
    background: #dd6161;
    border-color: #dd6161;
    color: #fff;
    outline: none;
}

.sf-button--info:active:not(.is-disabled):not(.is-loading),
.sf-button--info.is-focused:not(.is-disabled):not(.is-loading) {
    background: #82848a;
    border-color: #82848a;
    color: #fff;
    outline: none;
}
</style>