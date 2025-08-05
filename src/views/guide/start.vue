<template>
    <div class="start">
        <div class="h1-title">
            <span>
                开始
            </span>
            <p>
                在这里，您可以了解如何开始使用 Scorchingft 组件库。我们提供了详细的指南和示例，帮助您快速上手。
            </p>
        </div>
        <div class="content">
            <div class="compatibility">
                <div class="text">
                    兼容性
                </div>
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
                                <img :src="item.img" alt="">{{ item.name }}
                            </span>
                        </div>
                        <Code :isShell="items.shell" :code="items.code">
                            <template #codetype>
                                {{ items.codetype }}
                            </template>
                            <template #code>
                                <span class="codecolor" v-if="items.title == '注册'" v-html="codeView"></span>
                                <span class="codecolor" v-else v-html="items.code"></span>
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
    img: string,
    name: string
}

const installMethods = reactive<Array<InstallMethodsItem>>([
    {
        "id": 1,
        "img": '/npm.svg',
        "name": 'npm'
    },
    {
        "id": 2,
        "img": '/yarn.svg',
        "name": 'yarn'
    },
    {
        "id": 3,
        "img": '/pnpm.svg',
        "name": 'pnpm'
    }
]);

const id = ref<number>(0);
const borderbottom = ref<Array<string>>([]);

borderbottom.value[0] = '3px solid #ca92ff';

function changeMethod(index: number) {
    setupSteps[0].code = installMethods[index - 1].name + ' install scorchingft-components';
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

const code = ref<string>(`import { createApp } from 'vue'
import ScorchingftComponents from 'scorchingft-components'</span>
import 'scorchingft-components/dist/style.css'</span>

const app = createApp(App)
app.use(ScorchingftComponents)</span>
app.mount('#app')
`)

const codeView = ref<string>(`
import { createApp } from 'vue'
<span style="color:green;">[ + ]  import ScorchingftComponents from 'scorchingft-components'</span>
<span style="color:green;">[ + ]  import 'scorchingft-components/dist/style.css'</span>

const app = createApp(App)
<span style="color:green;">[ + ]  app.use(ScorchingftComponents)</span>
app.mount('#app')
`)

const setupSteps = reactive<Array<setupStepsItems>>([
    {
        title: "安装",
        subheading: "可以通过一下方式将 Scorchingft 组件库安装到您的项目中：",
        codetype: "shell",
        code: installMethods[0].name + ' install scorchingft-components',
        shell: true,
        istitle: true
    },
    {
        title: "注册",
        subheading: "在安装完成后您还需要全局注册后才能正常使用",
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

.setup {
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
}

.title span {
    display: inline-block;
    width: 70px;
    padding: 10px;
    text-align: center;
}

.codecolor {
    color:rgb(0, 110, 255)
}

.bottom {
    margin-top: 20px;
    font-size: 1.2rem;
    color: var(--topic-color-text);
    text-indent: 2em;
}
</style>