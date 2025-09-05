<template #default="{ fill, stroke, strokeWidth, strokeMiterlimit }">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 2048 2048"
        style="enable-background:new 0 0 2048 2048;" xml:space="preserve">
        <circle :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit"
            cx="1023.5" cy="1023.5" r="979.5" />
        <path :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" d="M1418.4,411.5c0,0,20.5-35.8-1.6-49.4s-46.1,17-46.1,17L624,1481.5c0,0-23.1,37.5-0.8,52.2s48.5-19.9,48.5-19.9
	        L1418.4,411.5z" />
        <path :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" d="M595.2,418.5c0,0-20.1-35.2,2-48.8s45.7,16.5,45.7,16.5l733.6,1083c0,0,22.6,36.9,0.4,51.6
	        s-48.1-19.3-48.1-19.3L595.2,418.5z" />
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

.st0 {
    fill: none;
    stroke: #CE9BFD;
    stroke-width: 72;
    stroke-miterlimit: 10;
}

.st1 {
    fill: #CE9BFD;
}
</style>