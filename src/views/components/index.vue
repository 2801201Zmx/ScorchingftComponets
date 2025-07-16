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

const router = useRouter();

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
    height: calc(100% -70px);
    padding: 70px 0 0 0;
    overflow-y:auto;
}

.content {
    width: 100%;
    height: calc(100% -80px);
    background-color: aliceblue;
    padding: 0 40px;
    overflow-y:auto;
}
</style>