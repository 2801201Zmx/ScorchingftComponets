// src/utils/codeHigh_button.ts
import { ref, nextTick } from "vue";
import { useCounterStore } from "@/store/counter";
import hljs from 'highlight.js';

const count = useCounterStore();

const basicCodeSnippet = `
<template>
  <sf-button>默认按钮</sf-button>
  <sf-button type="primary">主要按钮</sf-button>
  <sf-button type="success">成功按钮</sf-button>
  <sf-button type="warning">警告按钮</sf-button>
  <sf-button type="danger">危险按钮</sf-button>
  <sf-button type="info">信息按钮</sf-button>
</template>

<script setup lang="ts">
// 按钮类型通过 type 属性设置
</script>`;

const plainCodeSnippet = `
<template>
  <sf-button plain>朴素按钮</sf-button>
  <sf-button type="primary" plain>主要按钮</sf-button>
  <sf-button type="success" plain>成功按钮</sf-button>
  <sf-button type="warning" plain>警告按钮</sf-button>
  <sf-button type="danger" plain>危险按钮</sf-button>
  <sf-button type="info" plain>信息按钮</sf-button>
</template>`;

const sizeCodeSnippet = `
<template>
  <sf-button size="large">大型按钮</sf-button>
  <sf-button>默认按钮</sf-button>
  <sf-button size="small">小型按钮</sf-button>
  
  <sf-button type="primary" size="large">大型按钮</sf-button>
  <sf-button type="primary">默认按钮</sf-button>
  <sf-button type="primary" size="small">小型按钮</sf-button>
</template>`;

const disabledCodeSnippet = `
<template>
  <sf-button disabled>禁用按钮</sf-button>
  <sf-button type="primary" disabled>禁用按钮</sf-button>
  <sf-button type="success" disabled>禁用按钮</sf-button>
</template>`;

const textCodeSnippet = `<
template>
  <sf-button text>文字按钮</sf-button>
  <sf-button text disabled>文字按钮</sf-button>
</template>`;

const roundCodeSnippet = `
<template>
  <sf-button round>圆角按钮</sf-button>
  <sf-button type="primary" round>主要按钮</sf-button>
  <sf-button type="success" round>成功按钮</sf-button>
</template>`;

const circleCodeSnippet = `
<template>
  <sf-button circle>C</sf-button>
  <sf-button type="primary" circle>P</sf-button>
  <sf-button type="success" circle>S</sf-button>
</template>`;

// 将代码片段添加到store
count.codeList = [
    basicCodeSnippet,
    plainCodeSnippet,
    sizeCodeSnippet,
    disabledCodeSnippet,
    textCodeSnippet,
    roundCodeSnippet,
    circleCodeSnippet
];

export default function inputCodeHighlight(callback?: () => void): void {
    const count = useCounterStore();

    count.codeList.forEach((code, index) => {
        const highlightedCode = hljs.highlight(code, { language: 'html' }).value;
        count.codeHighlight[index] = highlightedCode;
    })

    if (callback) {
        nextTick().then(callback);
    }
}