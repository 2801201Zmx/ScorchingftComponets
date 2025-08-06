<template>
    <span class="icon"
        :style="{
            width: size + 'px',
            height: size + 'px'
        }"
    >
        <slot></slot>
    </span>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    size: {
        type: Number,
        default: 32 
    }
})

</script>

<style scoped>
.icon {
    display: inline-block;
    box-sizing: border-box;
    padding:  2px 0;
    width: 100%;
    height: 100%;
    text-align: center;
}
slot {
    width: 100%;
    height: 100%;
}
</style>
