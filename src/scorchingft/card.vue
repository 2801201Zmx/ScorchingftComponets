<template>
  <div class="sf-card" :style="{ width: `${cardSizes.cardWidth}px`, height: `${cardSizes.cardHeight}px` }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: ''
  }
})

interface cardSizesItem {
  cardWidth: number,
  cardHeight: number
}

const cardSizes = reactive<cardSizesItem>({
  cardWidth: 370,
  cardHeight: 250
})

watchEffect(() => {
  if(props.size == '') {
    cardSizes.cardWidth = 370
    cardSizes.cardHeight = 250
  } else {
    cardSizes.cardWidth = 370 + parseInt(props.size)
    cardSizes.cardHeight = 250 + parseInt(props.size)
  }
})

</script>

<style scoped>
.sf-card {
  border: 1px solid #ce9bfd;
  border-radius: 2px;
}

</style>