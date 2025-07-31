<template>
    <div class="title">
        <h1>Scorchingft Components</h1>
        <h5>基于 Vue3 + TypeScript 的组件库</h5>
    </div>
    <div class="card">
        <sf-card v-for="(item, index) in Components" :key="index">
            <div class="content">
                <h2>{{ item.title }}</h2>
                <span>
                    {{ item.content }}
                </span>
            </div>
            <div class="btn" @click="router.push(item.path)">
                查看详情
            </div>
        </sf-card>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const Components = [
    {
        "title": "使用指南",
        "content": "快速上手和了解 Scorchingft 组件库",
        "path": "/guide/introduction",
    },
    {
        "title": "组件概览",
        "content": "预览和使用 Scorchingft 组件库中的所有组件",
        "path": "/components/overview",
    }
]


</script>

<style scoped>

.title {
    width: 100%;
    height: 46.5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom, #ca92ff, white);
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
    background-color: rgb(255, 255, 255);
    display: flex;
    align-items: center;
    justify-content: center;
}

.card .sf-card {
    margin-left: 50px;
    transition: all 0.3s;
}

.card .sf-card:nth-child(1) {
    margin: 0;
}

.card .sf-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.card .sf-card .content {
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
}

.card .sf-card:nth-child(1) .content {
    background: url('/componets_help.png') no-repeat center center;
    background-size: 100% 100%;
}

.card .sf-card .content span {
    margin-top: 30px;
}

.card .sf-card .content h2 {
    color: var(--topic-color-text);
}

.card .sf-card:nth-child(2) .content {
    background: url('/componets_list.png') no-repeat center center;
    background-size: 100% 100%;
}

.card .sf-card .btn {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--topic-color-text);
    font-size: 1.2em;
    border-top: 1px solid #ce9bfd;
    cursor: pointer;
}

.card .sf-card .btn:hover {
    background-color: #ca92ff;
    color: white;
}
</style>