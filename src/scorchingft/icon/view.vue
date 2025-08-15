<template>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 2048 2048"
        style="enable-background:new 0 0 2048 2048;" xml:space="preserve">
        <path :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" d="M89.4,986.4c0,0,519.1-558.7,942.3-558.7s929.3,558.7,929.3,558.7s-428.9,582.6-935.8,582.3
    	    S89.4,986.4,89.4,986.4L89.4,986.4z" />
        <circle :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit"
            cx="1040.9" cy="993.4" r="337.2" />
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