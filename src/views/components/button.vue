<template>
   <span>
     组件开发中，敬请期待 <img src="@/assets/images/loading.gif" alt=""></img>
   </span>
</template>

<script setup lang="ts">
</script>

<style scoped>
span {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bold;
    color:var(--topic-color-text)
}

img {
    width: 100px;
    height: 100px;
    object-fit: contain;
}
</style>
