<template>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 2048 2048"
        style="enable-background:new 0 0 2048 2048;" xml:space="preserve">
        <path :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit"
            d="M1981,66v1315H666V66H1981 M2029,18H618v1411h1411V18L2029,18z" />
        <path :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit"
            d="M1379,665v1315H64V665H1379 M1427,617H16v1411h1411V617L1427,617z" />
    </svg>
</template>

<script setup lang="ts">

const props = defineProps({
    fill: {
        type: String,
        default: 'none'
    },
    strokeWidth: {
        type: Number,
        default: '48'
    },
    strokeMiterlimit: {
        type: Number,
        default: 0
    },
    stroke: {
        type: String,
        default: '#CE9BFD'
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