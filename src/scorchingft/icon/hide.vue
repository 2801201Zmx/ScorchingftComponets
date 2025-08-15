<template>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 2048 2048"
        style="enable-background:new 0 0 2048 2048;" xml:space="preserve">
        <path :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" d="M114.1,985.7c0,0,519.1-558.7,942.3-558.7s929.3,558.7,929.3,558.7S1557,1568.3,1050,1568
	        S114.1,985.7,114.1,985.7L114.1,985.7z" />
        <circle :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit"
            cx="1065.7" cy="992.6" r="337.2" />
        <line :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" x1="1824"
            y1="427" x2="250" y2="1675" />
    </svg>

</template>

<script setup lang="ts">

const props = defineProps({
    fill: {
        type: String,
        default: 'none'
    },
    stroke: {
        type: String,
        default: '#CE9BFD'
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