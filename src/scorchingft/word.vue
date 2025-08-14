<template>
    <code>
        <slot></slot>
    </code>
</template>

<script setup lang="ts">

</script>

<style scoped>
:not(pre)>code {
    border-radius: 4px;
    padding: .15rem .5rem;
    background-color: #e7f4ff;
    transition: color .25s, background-color .5s;
    font-size: 14px;
    color:#3a3a3a;
}
</style>