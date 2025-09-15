<template>
    <div class="button">
        <div class="h1-title">
            <span>
                Button 按钮组件
            </span>
            <p>
                Scorchingft 提供了最常用按钮组件。使用简单，易于集成到您的项目中。
            </p>
        </div>
        <div class="content">
            <div class="code" v-for="(item) in buttonView" :key="item.id">
                <div class="title">
                    <span>{{ item.title }}</span>
                </div>
                <div class="example">
                    <div class="components">
                        <component v-for="(components, keys) in item.componentName" :is="components"
                            v-bind="item.props[keys]">
                            {{ item.content }}
                        </component>
                    </div>
                    <div class="function">
                        <sf-icon size="30" @click="CopyObject('#code-' + item.id, count.codeList[item.id - 1])"
                            :id="'code-' + item.id" class="copy-icon">
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
            <div class="props-table">
                <h3>属性</h3>
                <table>
                    <thead>
                        <tr>
                            <th>属性名</th>
                            <th>说明</th>
                            <th>类型</th>
                            <th>可选值</th>
                            <th>默认值</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>size</td>
                            <td>尺寸</td>
                            <td>string</td>
                            <td>large / default / small</td>
                            <td>default</td>
                        </tr>
                        <tr class="even">
                            <td>type</td>
                            <td>类型</td>
                            <td>string</td>
                            <td>primary / success / warning / danger / info</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>plain</td>
                            <td>是否朴素按钮</td>
                            <td>boolean</td>
                            <td>—</td>
                            <td>false</td>
                        </tr>
                        <tr class="even">
                            <td>text</td>
                            <td>是否文字按钮</td>
                            <td>boolean</td>
                            <td>—</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>bg</td>
                            <td>是否显示背景色（仅在 text 为 true 时可用）</td>
                            <td>boolean</td>
                            <td>—</td>
                            <td>false</td>
                        </tr>
                        <tr class="even">
                            <td>link</td>
                            <td>是否链接按钮</td>
                            <td>boolean</td>
                            <td>—</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>round</td>
                            <td>是否圆角按钮</td>
                            <td>boolean</td>
                            <td>—</td>
                            <td>false</td>
                        </tr>
                        <tr class="even">
                            <td>circle</td>
                            <td>是否圆形按钮</td>
                            <td>boolean</td>
                            <td>—</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>loading</td>
                            <td>是否加载中状态</td>
                            <td>boolean</td>
                            <td>—</td>
                            <td>false</td>
                        </tr>
                        <tr class="even">
                            <td>loadingIcon</td>
                            <td>自定义加载中图标</td>
                            <td>string / Component</td>
                            <td>—</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>disabled</td>
                            <td>是否禁用状态</td>
                            <td>boolean</td>
                            <td>—</td>
                            <td>false</td>
                        </tr>
                        <tr class="even">
                            <td>icon</td>
                            <td>图标组件</td>
                            <td>string / Component</td>
                            <td>—</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>autofocus</td>
                            <td>是否自动获取焦点</td>
                            <td>boolean</td>
                            <td>—</td>
                            <td>false</td>
                        </tr>
                        <tr class="even">
                            <td>nativeType</td>
                            <td>原生 type 属性</td>
                            <td>string</td>
                            <td>button / submit / reset</td>
                            <td>button</td>
                        </tr>
                        <tr>
                            <td>autoInsertSpace</td>
                            <td>中文按钮自动添加空格</td>
                            <td>boolean</td>
                            <td>—</td>
                            <td>false</td>
                        </tr>
                        <tr class="even">
                            <td>color</td>
                            <td>自定义按钮颜色</td>
                            <td>string</td>
                            <td>—</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>dark</td>
                            <td>深色模式</td>
                            <td>boolean</td>
                            <td>—</td>
                            <td>false</td>
                        </tr>
                        <tr class="even">
                            <td>tag</td>
                            <td>自定义元素标签</td>
                            <td>string / Component</td>
                            <td>—</td>
                            <td>button</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useCounterStore } from '@/store/counter';
import 'highlight.js/styles/github.css';
import buttonView from '@/JSON/buttonView.json';
import buttonCodeHighlight from '@/utils/codeHigh_button';
import CopyObject from '@/utils/copy';

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
    buttonCodeHighlight(() => {
        maxHeight.value = [];
        for (let i = 0; i < codeBlocks.value.length; i++) {
            maxHeight.value.push(Number(codeBlocks.value[i]!.offsetHeight));
            codeHeight.value[i] = 0;
        }
    });
});
</script>

<style scoped>
.button {
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

.components .sf-button {
    margin-left: 10px;
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