<template>
    <div class="form">
        <div class="h1-title">
            <span>
                Form 表单
            </span>
            <p>
                表单组件提供了<word>输入框</word>、<word>下拉选择</word>用于收集用户输入的数据，支持表单验证、布局配置等功能。
            </p>
        </div>
        <div class="content">
            <div class="code" v-for="(item) in FormView" :key="item.id">
                <div class="title">
                    <span>{{ item.title }}</span>
                </div>
                <div class="example">
                    <div class="components">
                        <component v-for="(components, keys) in item.componentName" :is="components"
                            v-bind="item.props[keys]"></component>
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
import { ref, onMounted, onBeforeMount } from 'vue';
import 'highlight.js/styles/github.css';
import FormView from '@/JSON/formView.json';

import CopyObject from '@/utils/copy';
import formCodeHighlight from '@/utils/codeHigh_form';

import word from '@/scorchingft/word.vue';

import { useCounterStore } from '@/store/counter';
import { CopyDocument } from '@/scorchingft/icon/icon';

const count = useCounterStore();

const codeBlocks = ref<(HTMLElement | null)[]>([]);
const isClicked = ref<boolean>(true);
let codeHeight = ref<number[]>([]);

const maxHeight = ref<number[]>([]);

function viewCode(id: number) {
    isClicked.value ? codeHeight.value[id] = maxHeight.value[id] : codeHeight.value[id] = 0;
    isClicked.value ? isClicked.value = false : isClicked.value = true;
}

onMounted(async () => {
    formCodeHighlight(() => {
        maxHeight.value = [];
        for (let i = 0; i < codeBlocks.value.length; i++) {
            maxHeight.value.push(Number(codeBlocks.value[i]!.offsetHeight));
            codeHeight.value[i] = 0;
        }
    });
});
</script>

<style scoped>
.form {
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