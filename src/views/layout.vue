<template>
    <main>
        <div class="header">
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

const router = useRouter();

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
    background-color: rgba(252, 252, 252, 0.2);
    backdrop-filter: blur(10px);
}

.header .githubicon {
    position: absolute;
    top: 10px;
    right: 70px;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: white;
    overflow: hidden;
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