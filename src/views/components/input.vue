<template>
    <div class="input">
        <div class="h1-title">
            <span>
                Input 输入框
            </span>
            <p>
                输入框组件用于接收用户输入的文本信息。它支持多种类型的输入，包括文本、密码、数字等，并提供了多种配置选项以满足不同的需求。
            </p>
        </div>
        <div class="content">
            <div class="code" v-for="(item) in InputView" :key="item.id">
                <div class="title">
                    <span>{{ item.title }}</span>
                </div>
                <div class="example">
                    <div class="components">
                        <!-- 特殊处理滑块组件，不显示当前值 -->
                        <template v-if="item.id === 5">
                            <div v-for="(components, keys) in item.componentName" :key="keys" class="slider-item">
                                <sf-input
                                    v-model.number="sliderValues[keys]"
                                    v-bind="item.props[keys]"
                                />
                            </div>
                        </template>
                        <!-- 其他组件保持原有逻辑 -->
                        <component 
                            v-else
                            v-for="(components, keys) in item.componentName" 
                            :is="components"
                            :key="keys"
                            v-bind="item.props[keys]"
                        ></component>
                    </div>
                    <div class="function">
                        <sf-icon size="30" @click="CopyObject('#code', count.codeList[item.id - 1])" id="code">
                            <CopyDocument />
                        </sf-icon>
                        <span class="cursor" title="查看代码" @click="viewCode(item.id - 1)">
                            <sf-icon>
                                <Code />
                            </sf-icon>
                        </span>
                    </div>
                    <div class="code" :style="{ height: codeHeight[item.id - 1] + 'px' }" ref="codeBlocks">
                        <pre>
                            <code v-html="count.codeHighlight[item.id - 1]"></code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import 'highlight.js/styles/github.css';
import InputView from '@/JSON/inputView.json';

import CopyObject from '@/utils/copy';

import inputCodeHighlight from '@/utils/codeHigh_input';

import { useCounterStore } from '@/store/counter';
import { CopyDocument } from '@/scorchingft/icon/icon';

const count = useCounterStore();

// 滑块组件的响应式数据
const sliderValues = reactive([50, 25, 30]);

const codeBlocks = ref<(HTMLElement | null)[]>([]);
const isClicked = ref<boolean>(true);
let codeHeight = ref<number[]>([]);

const maxHeight = ref<number[]>([]);

function viewCode(id: number) {
    isClicked.value ? codeHeight.value[id] = maxHeight.value[id] : codeHeight.value[id] = 0;
    isClicked.value ? isClicked.value = false : isClicked.value = true;
}

onMounted(async () => {
    inputCodeHighlight(() => {
        maxHeight.value = [];
        for (let i = 0; i < codeBlocks.value.length; i++) {
            maxHeight.value.push(Number(codeBlocks.value[i]!.offsetHeight));
            codeHeight.value[i] = 0;
        }
    });
});
</script>

<style scoped>
.input {
    width: 100%;
    height: 100%;
    overflow-y: auto;
}

.content {
    width: calc(100% - 2px);
}

.content .title {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 40px 0 20px 0;
    color: var(--topic-color-text);
}

.example {
    width: 100%;
    border: 1px solid #ce9bfd;
    margin-top: 10px;
    overflow: hidden;
}

.example .components {
    width: 100%;
    padding: 20px 50px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
}

.slider-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.example .components .sf-input:not(:nth-child(1)) {
    margin-left: 20px;
}

.example .function {
    width: 100%;
    text-align: right;
    border-top: 1px solid #ce9bfd;
    color: #888;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.example .function span {
    display: inline-block;
    height: 100%;
    margin-right: 10px;

    overflow: hidden;
}

.example .function span:nth-child(1) img {
    width: 20px;
    height: 20px;
    vertical-align: middle;
}

.example .function span img {
    width: 30px;
    height: 30px;
    vertical-align: middle;
}

.example .function span:nth-last-child(1) {
    margin-right: 40px;
}

.example .code {
    display: flex;
    width: 100%;
    height: fit-content;
    font-weight: 500;
    font-size: 1rem;
    margin-top: 5px;
    transition: all 0.3s ease;
    background-color: rgba(226, 233, 240, 0.418);
}

.example .code pre {
    width: 100%;
    height: fit-content;
    padding: 10px 0 0 20px;
    line-height: 20px;
}
</style>