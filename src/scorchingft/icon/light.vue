<template #default="{ fill, stroke, strokeWidth, strokeMiterlimit }">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 2048 2048"
        style="enable-background:new 0 0 2048 2048;" xml:space="preserve">
        <circle :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" cx="1024.1" cy="1024" r="588"/>
        <line :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" x1="1431" y1="496.2" x2="1624.9" y2="280.8" />
        <line :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" x1="1618.4" y1="689" x2="1865" y2="547.9" />
        <line :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" x1="1701.4" y1="917.3" x2="1969.5" y2="861.3" />
        <line :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" x1="1733.1" y1="1157.9" x2="2011.5" y2="1238" />
        <line :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" x1="1641.7" y1="1410.7" x2="1876.4" y2="1570.8" />
        <line :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" x1="1472.6" y1="1585.2" x2="1640.3" y2="1801.8" />
        <line :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" x1="1209.8" y1="1684.5" x2="1267.3" y2="1968.5" />
        <line :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" x1="943.3" y1="1720.1" x2="909.7" y2="2002.2" />
        <line :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" x1="710.6" y1="1650.6" x2="595.7" y2="1899.3" />
        <line :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" x1="498.5" y1="1532.7" x2="268.2" y2="1708.6" />
        <line :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" x1="349.9" y1="1308.6" x2="81.5" y2="1401.8" />
        <line :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" x1="310.6" y1="1068.9" x2="36.7" y2="1074.5" />
        <line :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" x1="345.5" y1="840.9" x2="77.7" y2="730.4" />
        <line :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" x1="464.4" y1="599.8" x2="248.9" y2="414.6" />
        <line :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" x1="689.3" y1="384.5" x2="546.7" y2="150.6" />
        <line :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" x1="936.9" y1="335.1" x2="919.1" y2="45.9" />
        <line :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" x1="1203.9" y1="360.6" x2="1276.1" y2="85.8" />
        <path :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" d="M1518.7,188.3" />
        <path :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :stroke-miterlimit="strokeMiterlimit" d="M1370.8,418.8" />
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