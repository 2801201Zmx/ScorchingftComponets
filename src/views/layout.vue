<template>
    <main>
        <div class="header">
            <div class="index_img" v-if="count.isIndex"></div>
            <span class="index" @click="toIndex">
                <img :src="count.headerLogo" alt="">
            </span>
            <a class="githubicon cursor" href="https://github.com/2801201Zmx/ScorchingftComponets" target="_blank">
                <img src="/github-mark.png" alt="">
            </a>
        </div>
        <div class="content">
            <RouterView></RouterView>
        </div>
    </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useCounterStore } from '@/store/counter';
import { getPathName } from '@/utils/getpathname';

const count = useCounterStore();

const router = useRouter();

function toIndex() {
    getPathName('/');
    router.push('/');
}
</script>

<style scoped>
.css {
    width: 100px;
    height: 100px;
}

main {
    width: 100%;
    height: 100%;
}

.header {
    position: fixed;
    width: 100%;
    height: 60px;
    border: 1px solid #dbdbdba9;
    background-color: rgba(255, 255, 255, 0.226);
    backdrop-filter: blur(5px);
    z-index: 99;
}

.index_img {
    width: 100%;
    height: 100%;
    background-image: url('/Alpha.png');
    opacity: 0.1;
}

.header .githubicon {
    position: absolute;
    top: 15px;
    right: 70px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: white;
    overflow: hidden;
}

.header .index {
    display: flex;
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translate(-50%, -50%);
    width: 150px;
}

.index img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.githubicon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.content {
    width: 100%;
    height: 100%;
    overflow: auto;
}
</style>
