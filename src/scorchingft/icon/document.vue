<template #default="{ fill, stroke, strokeWidth, strokeMiterlimit }">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 2048 2048"
        style="enable-background:new 0 0 2048 2048;" xml:space="preserve">
        <path :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" d="M737.8,70h572.4c52.7,0,95.4,42.7,95.4,95.4v190.8c0,52.7-42.7,95.4-95.4,95.4H737.8
	        c-52.7,0-95.4-42.7-95.4-95.4V165.4C642.4,112.7,685.1,70,737.8,70z" />
        <path :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" d="M1405.6,260.8h190.8c104.9,0,190.8,85.9,190.8,190.8v1335.6c0,104.9-85.9,190.8-190.8,190.8H451.6
	        c-104.9,0-190.8-85.9-190.8-190.8V451.6c0-104.9,85.9-190.8,190.8-190.8h190.8" />
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
        default: '72'
    },
    strokeMiterlimit: {
        type: Number,
        default: 10
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

.st0 {
    fill: none;
    stroke-width: 72;
    stroke-miterlimit: 10;
}
</style>