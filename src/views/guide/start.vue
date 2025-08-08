<template>
    <div class="start">
        <div class="h1-title">
            <span>
                安装
            </span>
            <p>
                在这里，您可以了解如何开始使用 Scorchingft 组件库。我们提供了详细的指南和示例，帮助您快速上手。
            </p>
        </div>
        <div class="content">
            <div class="compatibility">
                 <div class="text">
                    开始
                </div>
                <p>
                    ScorchingftComponents是一个全新的，完全基于vue3开发的新一代UI组件库，
                </p>
                <P>
                    由于该组件<a class="cursor" href="https://baike.baidu.com/item/出炉/6252413" target="_blank">刚出炉 <sup>1</sup></a>，现在还处于快速的更新迭代中
                </P>
                <div class="text">
                    兼容性
                </div>
                <p>下边是对于现代化主流浏览器和<a class="cursor" href="https://baike.baidu.com/item/Electron/60878453"  target="_blank">桌面应用程序 <sup>2</sup></a> 近两个版本的兼容性</p>
                <table>
                    <thead>
                        <tr>
                            <th class="browser">
                                浏览器
                            </th>
                            <td class="browser" v-for="(item, index) in compatibility" :key="index">
                                <img :src="item.img" alt="">
                                <span>
                                    {{ item.browser }}
                                </span>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th class="version">
                                版本
                            </th>
                            <td class="version" v-for="(item, index) in compatibility" :key="index">
                                <span>
                                    {{ item.version }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="setup">
                <div class="setup-steps" v-for="(items, index) in setupSteps" :key="index">
                    <span class="text">
                        {{ items.title }}
                    </span>
                    <p>
                        {{ items.subheading }}
                    </p>
                    <div class="method">
                        <div class="title" v-if="items.istitle">
                            <span class="cursor" v-for="item in installMethods"
                                :style="{ borderBottom: borderbottom[item.id - 1] }" @click="changeMethod(item.id)">
                                <sf-icon>
                                    <component :is="item.name"></component>
                                </sf-icon>
                                {{ item.name }}
                            </span>
                        </div>
                        <Code :isShell="items.shell" :code="items.code">
                            <template #codetype>
                                {{ items.codetype }}
                            </template>
                            <template #code>
                                <span class="codecolor" v-if="items.title === '通过包管理器'" v-html="items.code"></span>
                                <span class="codecolor" v-if="items.subheading === '使用unpkg'" v-html="unpkgCodeView"></span>
                                <span class="codecolor" v-if="items.subheading === '使用jsDelivr'" v-html="jsDelivrCodeView"></span>
                                <span class="codecolor" v-if="items.title === '完整引入'" v-html="allCodeView"></span>
                                <span class="codecolor" v-if="items.title === '按需引入'" v-html="codeView"></span>
                            </template>
                        </Code>
                    </div>
                </div>
            </div>
            <div class="bottom">
                至此，您可以在您的项目里使用Scorching组件库里的所有的组件了！
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import Code from '@/views/code.vue';

interface Compatibility {
    browser: string;
    img: string;
    version: string;
}

const compatibility = reactive<Array<Compatibility>>([
    {
        browser: 'IE/Edge',
        img: 'https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png',
        version: 'last 2 versions'
    },
    {
        browser: 'Chrome',
        img: 'https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png',
        version: 'last 2 versions'
    },
    {
        browser: 'Safari',
        img: 'https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png',
        version: 'last 2 versions'
    },
    {
        browser: 'Firefox',
        img: 'https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png',
        version: 'last 2 versions'
    },
    {
        browser: 'Opera',
        img: 'https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png',
        version: 'last 2 versions'
    },
    {
        browser: 'Electron',
        img: 'https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_32x32.png',
        version: 'last 2 versions'
    }
]);

interface InstallMethodsItem {
    id: number,
    name: string
}

const installMethods = reactive<Array<InstallMethodsItem>>([
    {
        "id": 1,
        "name": 'npm'
    },
    {
        "id": 2,
        "name": 'pnpm'
    },
    {
        "id": 3,
        "name": 'yarn'
    }
]);

const id = ref<number>(0);
const borderbottom = ref<Array<string>>([]);

borderbottom.value[0] = '3px solid #ca92ff';

function changeMethod(index: number) {
    setupSteps[0].code = installMethods[index - 1].name + ' install scorchingftui';
    borderbottom.value[index - 1] = '3px solid #ca92ff';

    if (id.value != index - 1) {
        borderbottom.value[id.value] = 'none';
        id.value = index - 1;
    }
}

interface setupStepsItems {
    title: string,
    subheading: string,
    codetype: string,
    code: string,
    shell: boolean,
    istitle: boolean
}

const unpkgCode = ref<string>(`<head>
  <!-- Import style -->
  <link rel="stylesheet" href="//unpkg.com/scorchingftui@latest/dist/style.css" />
  <!-- Import Vue 3 -->
  <script src="//unpkg.com/vue@3"></` + `script>
  <!-- Import component library -->
  <script src="//unpkg.com/scorchingftui@latest/dist/index.js"></` + `script>
</` + `head>`);

const unpkgCodeView = ref<string>(`&lt;head&gt;
    <span style="color:#878787;">&lt;!-- Import style --&gt;</span>
    &lt;link rel="stylesheet" href="//unpkg.com/scorchingftui@latest/dist/style.css" /&gt;
    <span style="color:#878787;">&lt;!-- Import Vue 3 --&gt;</span>
    &lt;script src="//unpkg.com/vue@3"&gt;&lt;/` + `script&gt;
    <span style="color:#878787;">&lt;!-- Import component library --&gt</span>
    &lt;script src="//unpkg.com/scorchingftui@latest/dist/index.js"&gt;&lt;/script&gt;
&lt;/head&gt;`);

const jsDelivrCode = ref<string>(`<head>
  <!-- Import style -->
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/scorchingftui@latest/dist/style.css" />
  <!-- Import Vue 3 -->
  <script src="//unpkg.com/vue@3"></` + `script>
  <!-- Import component library -->
  <script src="//cdn.jsdelivr.net/npm/scorchingftui@latest/dist/index.js"></` + `script>
</` + `head>`);

const jsDelivrCodeView = ref<string>(`&lt;head&gt;
    <span style="color:#878787;">&lt;!-- Import style --&gt;</span>
    &lt;link rel="stylesheet" href="//cdn.jsdelivr.net/npm/scorchingftui@latest/dist/style.css" /&gt;
    <span style="color:#878787;">&lt;!-- Import Vue 3 --&gt;</span>
    &lt;script src="//unpkg.com/vue@3"&gt;&lt;/` + `script&gt;
    <span style="color:#878787;">&lt;!-- Import component library --&gt</span>
    &lt;script src="//cdn.jsdelivr.net/npm/scorchingftui@latest/dist/index.js"&gt;&lt;/script>&gt;
&lt;/head&gt;`);

const allCode = ref<string>(`import { createApp } from 'vue'
import App from './App.vue'
import ScorchingftComponents from 'scorchingftui'
import 'scorchingftui/style.css'

const app = createApp(App)
app.use(ScorchingftComponents)
app.mount('#app')
`)

const allCodeView = ref<string>(`
import { createApp } from 'vue'
<span style="color:green;">[ + ]  import ScorchingftComponents from 'scorchingftui'</span>
<span style="color:green;">[ + ]  import 'scorchingftui/style.css'</span>

const app = createApp(App)
<span style="color:green;">[ + ]  app.use(ScorchingftComponents)</span>
app.mount('#app')
`)

const code = ref<string>(`import { createApp } from 'vue'
import App from './App.vue'
import { SFInput, SFCard } from 'scorchingftui'
import 'scorchingftui/style.css'

const app = createApp(App)
app.component('SFInput', SFInput)
app.component('SFCard', SFCard)
app.mount('#app')
`)

const codeView = ref<string>(`
import { createApp } from 'vue'
<span style="color:green;">[ + ]  import { SFInput, SFCard } from 'scorchingftui'</span>
<span style="color:green;">[ + ]  import 'scorchingftui/style.css'</span>

const app = createApp(App)
<span style="color:green;">[ + ]  app.component('SFInput', SFInput)</span>
<span style="color:green;">[ + ]  app.component('SFCard', SFCard)</span>
app.mount('#app')
`)

const setupSteps = reactive<Array<setupStepsItems>>([
    {
        title: "通过包管理器",
        subheading: "可以通过一下方式将 Scorchingft 组件库安装到您的项目中：",
        codetype: "shell",
        code: installMethods[0].name + ' install scorchingftui',
        shell: true,
        istitle: true
    },
    {
        title: "Scorchingftui提供了两种浏览器使用方式",
        subheading: "使用unpkg",
        codetype: 'javascript',
        code: unpkgCode.value,
        shell: false,
        istitle: false
    },
    {
        title: "",
        subheading: "使用jsDelivr",
        codetype: 'javascript',
        code: jsDelivrCode.value,
        shell: false,
        istitle: false
    },
    {
        title: "完整引入",
        subheading: "在安装完成后您还需要全局注册后才能正常使用，如果不在乎包体积大小，可以使用此方法",
        codetype: "main.ts",
        code: allCode.value,
        shell: false,
        istitle: false
    },
    {
        title: "按需引入",
        subheading: "如果嫌完整引入包体积太大，可以按需引入",
        codetype: "main.ts",
        code: code.value,
        shell: false,
        istitle: false
    }
])

</script>

<style scoped>
.start {
    width: 100%;
    height: 100%;
    overflow-y: auto;
}

p {
    font-size: 1.1rem;
    color: var(--topic-color-text);
    text-indent: 2em;
}

p a {
    text-decoration: none;
    font-size: 1.1rem;
    color: var(--topic-color-text);
    text-indent: 2em;
}

p a:hover {
    border-bottom: 1px solid var(--topic-color-text);
}

.content {
    width: 100%;
    height: 100%;
    padding: 20px;
}

.content .compatibility {
    width: 100%;
}

.text {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--topic-color-text);
    margin-bottom: 10px;
}

.content .compatibility table {
    width: 90%;
    margin: 20px auto;
    border-collapse: collapse;
    text-align: center;
}

.content .compatibility table .browser,
.content .compatibility table .version {
    padding: 10px;
    border: 1px solid #ccc;
}

.content .compatibility table .browser span,
.content .compatibility table .version span {
    display: block;
}

.content .compatibility table .browser {
    background-color: #f9f9f9;
    border-top: none;
}

.content .compatibility table .version {
    border-bottom: none;
}

.setup-steps {
    margin-top: 20px;
}

.setup p {
    font-size: 1.1rem;
    color: var(--topic-color-text);
    text-indent: 2em;
}

.method {
    width: 90%;
    margin: 0 auto;
    background-color: #d4d4d4;
    border-radius: 8px;
    overflow: hidden;
    
}

.method .title {
    padding: 0 20px;
    border-bottom: 1px solid #ccc;
    flex-wrap: nowrap;
}

.title span {
    display: inline-block;
    width: 80px;
    padding: 10px;
    text-align: center;
}

.codecolor {
    color:rgb(0, 110, 255)
}

.bottom {
    margin-top: 20px;
    padding-bottom: 30px;
    font-size: 1.2rem;
    color: var(--topic-color-text);
    text-indent: 2em;
}
</style>
