<template>
    <div class="input">
        <div class="h1-title">
            <span>
                Input 输入框
            </span>
            <p>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                输入框组件用于接收用户输入的文本信息。它支持多种类型的输入，包括文本、密码、数字等，并提供了多种配置选项以满足不同的需求。
            </p>
        </div>
        <div class="content">
            <div class="title">
                <span>基础版</span>
            </div>
            <div class="example" :style="{ height: height + 'px' }">
                <div class="components">
                    <sf-input style="width: 240px" placeholder="请输入内容" />
                </div>
                <div class="function">
                    <span class="cursor" title="复制代码">
                        <img src="/public/copy.svg" alt="">
                    </span>
                    <span class="cursor" title="查看代码" @click="changeHeight">
                        <img src="/public/code.svg" alt="">
                    </span>
                </div>
                <div class="code">
                    <pre>
                    <code class="language-html">
                        {{ codeSnippet }}
                    </code>
                </pre>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Prism from 'prismjs';

import 'prismjs/components/prism-javascript';
import "prism-themes/themes/prism-one-light.css";
import 'prismjs/components/prism-markup';

//默认主题
//import 'prismjs/themes/prism.css';

// 深色主题
// import "prism-themes/themes/prism-dracula.css";          // Dracula 主题
// import "prism-themes/themes/prism-material-dark.css";   // Material 深色
// import "prism-themes/themes/prism-nord.css";            // Nord 主题
// import "prism-themes/themes/prism-one-dark.css";        // One Dark 主题
// import "prism-themes/themes/prism-vsc-dark-plus.css";   // VS Code 深色+

// 浅色主题
// import "prism-themes/themes/prism-ghcolors.css";         // GitHub 风格
// import "prism-themes/themes/prism-material-light.css";  // Material 浅色
// import "prism-themes/themes/prism-one-light.css";       // One Light 主题
// 
// 特殊风格
// import "prism-themes/themes/prism-coldark-cold.css";    // 冷色系
// import "prism-themes/themes/prism-coy-without-shadows.css"; // 无阴影版
// import "prism-themes/themes/prism-holi-theme.css";      // 彩虹主题

const codeSnippet = ref<string>(`
<template>\n
  <sf-input v-model="input" style="width: 240px" placeholder="请输入内容" />\n
</template>\n
<script setup lang="ts">\n
    import { ref } from 'vue';\n

    const input = ref('');\n
</sc` + `ript>\n
`);

const height = ref<number>(106);
const isClicked = ref<boolean>(false);

function changeHeight() {
    if (!isClicked.value) {
        height.value = 380;
        isClicked.value = true;
    } else {
        height.value = 106;
        isClicked.value = false;
    }
}

onMounted(() => {
    Prism.highlightAll();
});
</script>

<style scoped>
.input {
    width: 100%;
    height: 100%;
    overflow-y: auto;
}

.h1-title {
    margin-top: 5%;
}

.h1-title span {
    font-size: 1.6rem;
    font-weight: bolder;
    margin-bottom: 20px;
    color: var(--topic-color-text);
}

.h1-title p {
    font-size: 1.2rem;
    color: var(--topic-color-text);
}

.content {
    width: calc(100% - 2px);
}

.content .title {
    font-size: 1.6rem;
    font-weight: bolder;
    margin-bottom: 20px;
    color: var(--topic-color-text);
}

.example {
    width: 100%;
    border: 1px solid #ce9bfd;
    margin-top: 10px;
    transition: all 0.3s;
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
    width: 100%;
    height: 100%;
}

.example pre[class*="language-"] {
    background: #3c3c4311;
    height: 100%;
    border-left: none;
    box-shadow: none;
    line-height: 0.8;
    font-size: 1.1rem;
    font-weight: 500;
    margin: 0;
    overflow: hidden;
}

.example code[class*="language-"] {
    background: transparent;
    height: 100%;
    font-family: 'Fira Code', monospace;
    font-size: .875em;
    font-weight: 500;
    line-height: 0.8;
    text-shadow: none;
    overflow: hidden;
}
</style>