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
                <span>
                    <div class="text">
                        安装
                    </div>
                    <p>
                        可以通过一下方式将 Scorchingft 组件库安装到您的项目中：
                    </p>
                </span>
                <div class="method">
                    <div class="title">
                        <span class="cursor" v-for="item in installMethods" :style="{borderBottom:borderbottom[item.id - 1]}" @click="changeMethod(item.id)">
                            <img :src="item.img" alt="">{{ item.name }}
                        </span>
                    </div>
                    <div class="grammar">
                        $&nbsp;&nbsp;&nbsp;{{ installMethod }} install Scorchingft
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

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
    id:number,
    img:string,
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
const borderbottom= ref<Array<string>>([]);

const installMethod = ref<string>(installMethods[0].name);

borderbottom.value[0] = '3px solid #ca92ff';

function changeMethod(index:number) {

    installMethod.value = installMethods[index - 1].name;
    borderbottom.value[index - 1] = '3px solid #ca92ff';

    if( id.value != index - 1 ) {
        borderbottom.value[id.value] = 'none';
        id.value = index -1;
    }
}

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

.setup span p {
    font-size: 1.1rem;
    color:var(--topic-color-text);
    text-indent: 2em;
}

.method {
    width:90%;
    margin: 0 auto;
    background-color: #e6e6e6;
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

.method .grammar {
    padding: 20px 20px;
}
</style>