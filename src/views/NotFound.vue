<template>
    <div class="title">
        <h1>404 Not Found</h1>
        <h5>页面未找到</h5>
    </div>
    <div class="card">
        <sf-card>
        <p>您访问的页面不存在或已被删除。</p>
        <p>请检查您的链接或返回首页。</p>
        <button @click="$router.push('/')">返回首页</button>
        </sf-card>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.title {
    width: 100%;
    height: 46.5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom, #ff6b6b, white);
    text-decoration: 1.8px underline solid var(--topic-color-text);
}

h1 {
    color: var(--topic-color-text);
    font-size: 3em;
}

h5 {
    color: var(--topic-color-text);
    font-size: 2em;
}

.card {
    width: 100%;
    height: 53.5%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.sf-card {
    width: 80%;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

button {
    padding: 10px 20px;
    background-color: var(--topic-color-text);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style>
