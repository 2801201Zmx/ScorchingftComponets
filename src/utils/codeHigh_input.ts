import { ref, nextTick } from "vue";
import { useCounterStore } from "@/store/counter";
import hljs from 'highlight.js';

const count = useCounterStore();

const basicCodeSnippet = ref<string>(`
<template>
    <sf-input v-model="input" style="width: 240px" placeholder="请输入内容" />
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const input = ref('');
</sc` + `ript>
`);

const disabledCodeSnippet = ref<string>(`
<template>
    <sf-input 
        v-model="input"
        style="width: 240px"
        placeholder="请输入内容"
        disabled
    />
</template>
<script setup lang="ts">
    import { ref } from 'vue';

    const input = ref('');
</script>
`);

const clearCodeSnippet = ref<string>(`
<template>
    <sf-input 
        v-model="input"
        style="width: 240px"
        placeholder="请输入内容"
        clearable
    />
</template>
<script setup lang="ts">
    import { ref } from 'vue';

    const input = ref('');
</script>
`);

const passCodeSnippet = ref<string>(`
<template>
    <sf-input 
        v-model="input"
        style="width: 240px"
        placeholder="请输入密码"
        type="password" 
        show-password
    />
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const input = ref('');
</sc` + `ript>
`);

count.codeList = ([
    basicCodeSnippet.value,
    disabledCodeSnippet.value,
    clearCodeSnippet.value,
    passCodeSnippet.value
])

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
