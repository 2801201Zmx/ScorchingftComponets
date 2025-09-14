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
    <div class="slider-demo">
        <div class="slider-item">
            <sf-input 
                v-model="value1"
                type="slider"
                :min="0"
                :max="100"
            />
            <span class="slider-value">{{ value1 }}</span>
        </div>
        <div class="slider-item">
            <sf-input 
                v-model="value2"
                type="slider"
                :min="10"
                :max="50"
                :step="5"
            />
            <span class="slider-value">{{ value2 }}</span>
        </div>
        <div class="slider-item">
            <sf-input 
                v-model="value3"
                type="slider"
                :min="0"
                :max="100"
                disabled
            />
            <span class="slider-value">{{ value3 }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const value1 = ref(50);
    const value2 = ref(25);
    const value3 = ref(30);
</script>

<style scoped>
.slider-demo {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
}

.slider-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.slider-value {
    font-size: 14px;
    font-weight: bold;
    background-color: #f5f5f5;
    padding: 4px 12px;
    border-radius: 12px;
    min-width: 40px;
    text-align: center;
}
</style>
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