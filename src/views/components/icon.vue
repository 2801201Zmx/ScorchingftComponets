<template>
    <div class="h1-title">
        <span>
            ICON 图标组件
        </span>
        <p>
            Scorchingft 提供了多种常用图标组件。使用简单，易于集成到您的项目中。
        </p>
    </div>
    <div class="setup">
        <div class="setup-steps" v-for="(items, index) in setupSteps" :key="index">
            <span class="text">
                {{ items.title }}
            </span>
            <p v-if="items.title === '安装'" v-html="items.subheading">
            </p>
            <p v-else>
                {{ items.subheading }}
            </p>
            <div class="method">
                <Code :isShell="items.shell" :code="items.code" v-if="items.iscode">
                    <template #codetype>
                        {{ items.codetype }}
                    </template>
                    <template #code>
                        <span class="codecolor" v-if="items.title === '完整引入'" v-html="allCodeView"></span>
                        <span class="codecolor" v-if="items.title === '按需引入'" v-html="codeView"></span>
                    </template>
                </Code>
            </div>
        </div>
    </div>
    <div class="icon">
        <div class="iconcontent" v-for="item in ICON" :key="item.id">
            <div class="title">
                {{ item.title }}
            </div>
            <div class="allicon">
                <span class="allicon-list" v-for="(icon, index) in item.components" @click="CopyObject('#code', `<sf-icon>
        <${icon} />
    </sf-icon>`)" id="code" :key="index">
                    <sf-icon>
                        <component :is="icon" />
                    </sf-icon>
                    <div>
                        {{ icon }}
                    </div>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import CopyObject from '@/utils/copy';
import Code from '@/views/code.vue';
import ICON from '@/JSON/icon.json';

const router = useRouter();

const allCode = ref<string>(`import { createApp } from 'vue'
import App from './App.vue'
import * as Scorchingftui from 'scorchingftui'
import 'scorchingftui/style.css'

const app = createApp(App)

Object.entries(Scorchingftui).forEach(([name, component]) => {
  app.component(name, component)
})

app.mount('#app')`)

const allCodeView = ref<string>(`import { createApp } from 'vue'
import App from './App.vue'
<span style="color:green;">[ + ]  import * as Scorchingftui from 'scorchingftui'</span>
<span style="color:green;">[ + ]  import 'scorchingftui/style.css'</span>

const app = createApp(App)

<span style="color:green;">[ + ]  Object.entries(Scorchingftui).forEach(([name, component]) => {
<span style="color:green;">[ + ]    app.component(name, component)
<span style="color:green;">[ + ]  })
</span>
app.mount('#app')`)

const code = ref<string>(`import { View, Hide, CircleClose } from 'scorchingftui/icon'

export default {
  components: {
    View,
    Hide,
    CircleClose
  }
}`)

const codeView = ref<string>(`<span style="color:green;">[ + ]  import { View, Hide, CircleClose } from 'scorchingftui/icon'</span>

<span style="color:green;">[ + ]  export default {</span>
<span style="color:green;">[ + ]    components: {</span>
<span style="color:green;">[ + ]       View,</span>
<span style="color:green;">[ + ]       Hide,</span>
<span style="color:green;">[ + ]       CircleClose</span>
<span style="color:green;">[ + ]    }</span>
<span style="color:green;">[ + ]  }</span>`)

interface setupStepsItems {
    title: string,
    subheading: string,
    codetype: string,
    code: string,
    shell: boolean,
    iscode: boolean
}

const setupSteps = reactive<Array<setupStepsItems>>([
    {
        title: "Scorchingftui/icon提供了两种使用方式",
        subheading: "",
        codetype: '',
        code: '',
        shell: false,
        iscode: false
    },
    {
        title: "安装",
        subheading: `对于安装，我们在初始化阶段已经已经安装好，所以无需再次安装，下边直接演示使用方式`,
        codetype: '',
        code: '',
        shell: false,
        iscode: false
    },
    {
        title: "完整引入",
        subheading: "在安装完成后您还需要全局注册后才能正常使用，如果不在乎包体积大小，可以使用此方法",
        codetype: "main.ts",
        code: allCode.value,
        shell: false,
        iscode: true
    },
    {
        title: "按需引入",
        subheading: "如果嫌完整引入包体积太大，可以按需引入",
        codetype: "typescript",
        code: code.value,
        shell: false,
        iscode: true
    },
    {
        title: "下列是一些常用的图标",
        subheading: "",
        codetype: "",
        code: '',
        shell: false,
        iscode: false
    }
])

</script>

<style scoped>
.icon-title {
    margin-top: 5%;
}

.icon {
    width: 100%;
}

.iconcontent {
    width: 100%;
}

.iconcontent:not(:nth-child(1)) {
    margin-top: 20px;
}

.iconcontent .title {
    width: 100%;
    height: 40px;
    font-size: 1.2rem;
    font-weight: bolder;
    color: var(--topic-color-text);
}

.allicon {
    width: 70%;
    display: grid;
    grid-template-columns: repeat(8, minmax(50px, 1fr));
    grid-template-rows: repeat(auto-fill, minmax(110px, 1fr));
    grid-gap: 1px;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
}

.allicon .allicon-list {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--topic-color-text);
}

.allicon span div {
    font-size: 0.8rem;
    color: var(--topic-color-text);
    text-align: center;
    margin-top: 10px;
}

.allicon span:hover {
    background-color: rgb(241, 231, 255);
}

.text {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--topic-color-text);
    margin-bottom: 10px;
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
}

.title span {
    display: inline-block;
    width: 70px;
    padding: 10px;
    text-align: center;
}

.codecolor {
    color: rgb(0, 110, 255)
}
</style>
