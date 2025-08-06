<template>
    <div class="introduction">
        <div class="title">
            <h1>欢迎来到 Scorchingft 组件库！</h1>
        </div>
        <div class="content">
            <sf-card size="46" v-for="(item, index) in State" :key="index">
                <div class="title" v-if="item.istitle">
                    {{ item.title }}
                </div>
                <div class="content">
                    {{ item.content }}
                </div>
            </sf-card>
            <sf-card size="46" @click="$router.push('/guide/start.html')">
                    <span class="cursor">
                        <div>→</div>
                    </span>
                    <p>
                        现在，点击开始使用 Scorchingft 组件库
                    </p>
            </sf-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

interface StateItem {
    istitle?: boolean;
    title?: string;
    content: string;
}

const State = reactive<Array<StateItem>>([
    {
        "istitle": true,
        "title": "提供更丰富的组件资源",
        "content": "Scorchingft组件库为用户提供了丰富的组件资源，旨在帮助开发者更高效地构建现代化的Web应用。无论是基础组件还是复杂的UI元素，我们都力求提供最佳的使用体验和灵活性。"
    },
    {
        "istitle": true,
        "title": "拥有更舒服的使用体验",
        "content": "Scorchingft组件库注重用户体验，提供直观的API和易于使用的组件设计。我们致力于让开发者能够快速上手，减少学习曲线，同时享受流畅的交互体验。"
    },
    {
        "istitle": true,
        "title": "用更流畅的动画组件",
        "content": "Scorchingft组件库包含多种流畅的动画组件，旨在提升用户界面的动态效果。通过精心设计的动画，我们希望为用户带来更生动、更吸引人的视觉体验。"
    },
    {
        "istitle": true,
        "title": "提供更丰富的主题样式",
        "content": "Scorchingft组件库支持多种主题样式，允许用户根据项目需求自定义外观。我们提供了灵活的主题配置选项，使得组件能够轻松适应不同的设计风格和品牌形象。"
    },
    {
        "istitle": true,
        "title": "更多用户做出的使用选择",
        "content": "有越来越多的用户选择使用Scorchingft组件库，我们的目标是为开发者提供一个可靠、高效的工具，帮助他们在项目中实现更好的效果和性能。我们欢迎更多用户加入我们的社区，共同探索和分享使用经验。"  
    },
    {
        "istitle": true,
        "title": "更多用户的选择和反馈",
        "content": "Scorchingft组件库欢迎用户的选择和反馈，我们鼓励社区参与，共同完善和优化组件库。用户的意见和建议是我们不断改进的重要动力，我们期待与您一起打造更好的开发工具。"
    },
    {
        "istitle": false,
        "content": "准备好开始使用Scorchingft组件库了吗？让我们一起探索更多可能性！"
    }
]);

</script>

<style scoped>
.introduction {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-top: 5%;
}

.title {
    text-align: center;
    color: var(--topic-color-text);
}

.content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 5%;
}

.sf-card {
    border-radius: 5px;
    font-weight: bold;
    background-color: #f8f0ff;
    margin-left: 40px;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.sf-card:not(:nth-last-child(1)):hover {
    animation: animation 3s infinite;
    box-shadow: 0 0 10px rgba(206, 155, 253, 0.5);
}

.sf-card .title {
    width: 80%;
    padding: 8px 0;
    text-align: center;
    border-bottom: 1px solid #ce9bfd;
}

.sf-card .content {
    box-sizing: border-box;
    padding: 10px;
    font-size: 0.9rem;
    line-height: 30px;
    text-indent: 2em;
}

.sf-card:nth-last-child(2) .content {
    color: #ce9bfd;
}

.sf-card:nth-last-child(1) span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background-color: #ce9bfd;
    border-radius: 50%;
    color: white;
    font-size: 1.7rem;
    margin-bottom: 10px;
    overflow: hidden;
}

.sf-card:nth-last-child(1):hover span div {
    animation: arrowhead 2s infinite;
}

@keyframes arrowhead {
    0% {
        transform: translateX(-40px);
    }
    25% {
        transform: translateX(0);
    }
    75% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(40px);
    }

}

@keyframes animation {
    0% {
        opacity: 1;
        transform: translateY(0);
    }
    25% {
        opacity: 0.5;
        transform: translateY(-20px);
    }
    50% {
        opacity: 1;
        transform: translateY(0);
    }
    75% {
        opacity: 0.5;
        transform: translateY(-20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
