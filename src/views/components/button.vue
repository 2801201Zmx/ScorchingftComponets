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
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useCounterStore } from '@/store/counter';

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
