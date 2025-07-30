<template>
    <main>
        <div class="siderbar">
            <Siderbar/>
        </div>
        <div class="content">
            <RouterView></RouterView>
        </div>
    </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Siderbar from './siderbar/siderbar.vue';
import { getPathName } from '@/utils/getpathname';

const router = useRouter();

onMounted(() => {
    getPathName(window.location.pathname);
})
</script>

<style scoped>
main {
    width: 100%;
    height: 100%;
    display: flex;
    background-color: white;
}

.siderbar {
    width: 16%;
    height: calc(100% - var(--input-label-padding));
    padding: var(--input-label-padding);
    overflow-y:auto;
}

.content {
    width: 100%;
    height: calc(100% -80px);
    padding: 0 40px 20px 40px;
    overflow-y:auto;
}
</style>