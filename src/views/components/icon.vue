<template>
    <div class="h1-title">
        <span>
            ICON 图标组件
        </span>
        <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Scorchingft 提供了多种常用图标组件。使用简单，易于集成到您的项目中。
        </p>
    </div>
    <div class="icon">
        <div class="iconcontent" v-for="item in ICON" :key="item.id">
            <div class="title">
                {{ item.title }}
            </div>
            <div class="allicon">
                <span v-for="(icon, index) in item.components" :key="index">
                    <sf-icon>
                        <component :is="icon" />
                    </sf-icon>
                    <div>
                        {{ icon }}
                    </div>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ICON from '@/JSON/icon.json';

</script>

<style scoped>
.icon-title {
    margin-top: 5%;
}

.icon {
    width: 100%;
}

.iconcontent {
    width: 100%;
}

.iconcontent:not(:nth-child(1)) {
    margin-top: 20px;
}

.iconcontent .title {
    width: 100%;
    height: 40px;
    font-size: 1.2rem;
    font-weight: bolder;
    color: var(--topic-color-text);
}

.allicon {
    width: 70%;
    display: grid;
    grid-template-columns: repeat(8, minmax(50px, 1fr));
    grid-template-rows: repeat(auto-fill, minmax(110px, 1fr));
    grid-gap: 1px;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
}

.allicon span {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--topic-color-text);
}

.allicon span div {
    font-size: 0.8rem;
    color: var(--topic-color-text);
    text-align: center;
    margin-top: 10px;
}

.allicon span:hover {
    background-color: rgb(241, 231, 255);
}
</style>