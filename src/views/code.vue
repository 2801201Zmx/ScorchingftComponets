<template>
    <div class="frame">
        <div class="language">
            <slot name="codetype"></slot>
        </div>
        <div class="grammar" @mouseenter="hideCode(1)" @mouseleave="hideCode(0)">
            <span v-if="isShell">
                $&nbsp;&nbsp;&nbsp;
            </span>
            <span class="code">
                <slot name="code"></slot>
            </span>
            <span class="btn">
                <Copybtn v-if="isHide" />
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Copybtn from '@/views/Copy.vue';

const props = defineProps({
    isShell: {
        type: Boolean,
        default: true
    }
})

const isHide = ref<boolean>(false);

function hideCode(id: number) {
    id ? isHide.value = true : isHide.value = false;
}
</script>

<style scoped>
.language {
    font-size: 0.9rem;
    margin-top: 10px;
    padding: 0 20px;
    text-align: right;
}

.grammar {
    padding: 20px 20px;
    position: relative;
}

.code {
    display: inline-block;
    width: 96%;
    white-space: pre-wrap;
    line-height: 30px;
}

.btn {
    position: absolute;
    top: 10%;
    right: 0;
}
</style>