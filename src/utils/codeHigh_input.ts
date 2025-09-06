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
</script>
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
</script>
`);

const sliderCodeSnippet = ref<string>(`
<template>
    <div style="display: flex; gap: 20px;">
        <sf-input 
            v-model="value1"
            type="slider"
            :min="0"
            :max="100"
        />
        <sf-input 
            v-model="value2"
            type="slider"
            :min="10"
            :max="50"
            :step="5"
        />
        <sf-input 
            v-model="value3"
            type="slider"
            :min="0"
            :max="100"
            disabled
        />
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const value1 = ref(50);
    const value2 = ref(25);
    const value3 = ref(30);
</script>
`);

const textareaCodeSnippet = ref<string>(`
<template>
    <sf-textarea 
        v-model="textarea"
        placeholder="请输入内容"
    />
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const textarea = ref('');
</script>
`);

const textareaDefaultCodeSnippet = ref<string>(`
<template>
    <sf-textarea 
        v-model="textarea"
        style="width: 240px"
        placeholder="请输入内容"
        :rows="4"
    />
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const textarea = ref('');
</script>
`);

const textareaFixedSizeCodeSnippet = ref<string>(`
<template>
    <sf-textarea 
        v-model="textarea"
        style="width: 240px; resize: none;"
        placeholder="请输入内容"
        :rows="4"
        :cols="30"
    />
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const textarea = ref('');
</script>
`);

count.codeList = ([
    basicCodeSnippet.value,
    disabledCodeSnippet.value,
    clearCodeSnippet.value,
    passCodeSnippet.value,
    sliderCodeSnippet.value,
    textareaCodeSnippet.value,
    textareaDefaultCodeSnippet.value,
    textareaFixedSizeCodeSnippet.value
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