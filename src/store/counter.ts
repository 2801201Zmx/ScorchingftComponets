import { defineStore } from 'pinia';
import { ref } from 'vue';
import headerLogoImage from '@/assets/images/ComponetsICON_white.png';

export const useCounterStore = defineStore('counter', () => {
  const isIndex = ref<boolean>(false);
  const headerLogo = ref<string>(headerLogoImage);

  const codeHighlight = ref<string[]>([]);

  const codeList = ref<string[]>([]);
  
  return { isIndex, headerLogo, codeHighlight, codeList };
})
