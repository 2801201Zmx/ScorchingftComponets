<template #default="{ fill, stroke, strokeWidth, strokeMiterlimit }">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 2048 2048"
        style="enable-background:new 0 0 2048 2048;" xml:space="preserve">
        <path :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" d="M1825,343.7c40.6,0,78.8,15.8,107.5,44.5c28.7,28.7,44.5,66.9,44.5,107.5V1482c0,40.6-15.8,78.8-44.5,107.5
			c-28.7,28.7-66.9,44.5-107.5,44.5H219c-40.6,0-78.8-15.8-107.5-44.5C82.8,1560.8,67,1522.6,67,1482V495.7
			c0-40.6,15.8-78.8,44.5-107.5c28.7-28.7,66.9-44.5,107.5-44.5H1825 M1825,295.7H219c-110.5,0-200,89.5-200,200V1482
			c0,110.5,89.5,200,200,200h1606c110.5,0,200-89.5,200-200V495.7C2025,385.2,1935.5,295.7,1825,295.7L1825,295.7z" />
        <line :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" x1="299"
            y1="679" x2="1040" y2="679" />
        <line :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" x1="753"
            y1="900" x2="1497" y2="900" />
        <line :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" x1="1009"
            y1="1131" x2="1815" y2="1131" />
        <line :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" x1="454"
            y1="1369" x2="1460" y2="1369" />

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
        default: '48'
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