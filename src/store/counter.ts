import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCounterStore = defineStore('counter', () => {
  const isIndex = ref<boolean>(false);
  const headerLogo = ref<string>('https://images.scorchingft.cn/assets/images/ComponetsICON_white.png');

  const codeHighlight = ref<string[]>([]);
  
  return { isIndex, headerLogo, codeHighlight };
})