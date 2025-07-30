<template>
    <div class="icon"
        :style="{
            width: size + 'px',
            height: size + 'px'
        }"
    >
        <slot></slot>
    </div>
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
    display: flex;
    align-items: center;
    justify-content: center;
}
slot {
    width: 100%;
    height: 100%;
}
</style>