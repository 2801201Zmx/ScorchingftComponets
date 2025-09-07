<template>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 2048 2048"
        style="enable-background:new 0 0 2048 2048;" xml:space="preserve">
        <path :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" d="M1512.7,1919.4c-185.2,0-957.9-13.5-957.9-13.5V662.8c0,0,407.6,7.8,446.5,0c39-7.8,64.1-37.7,101.7-69.1
		c37.7-31.4,113-149.1,113-149.1s29.8-51.8,43.9-83.2c14.1-31.4,12.6-25.1,20.4-78.5c7.8-53.4-41.3-204.7,0-213.5
		c87.4-18.5,179.7,42.2,207,94.2c39.1,74.7,44,101,54.8,163.2s6.3,138.1,0,185.2c-6.3,47.1-22,150.7-22,150.7s4.4-6.9,267.6-6.9
		s273,127.7,206.8,339.7c-67.5,215.9-301.9,692.8-342.2,795.1C1608.4,1902.2,1599,1919.4,1512.7,1919.4z" />
        <path :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" d="M426,1905.9c0,0-307.3,4.3-343.8,4.6s-44.8-20.5-44.8-65.5c0-45-2.3-1083.6-2.3-1124.6c0-41,13.2-55.2,54-55.2
		S426,664,426,664V1905.9z" />
    </svg>
</template>

<script setup lang="ts">

const props = defineProps({
    fill: {
        type: String,
        default: '#CE9BFD'
    },
    stroke: {
        type: String,
        default: 'none'
    },
    strokeWidth: {
        type: Number,
        default: '72'
    },
    strokeMiterlimit: {
        type: Number,
        default: 10
    },
})

</script>

<style scoped>
svg {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
}
</style>