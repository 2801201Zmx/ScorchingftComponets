import { useCounterStore } from '@/store/counter'

export default function getPathName(path: string) {
    const count = useCounterStore();
    
    count.isIndex = !(path === '/');
    count.headerLogo = count.isIndex
        ? 'https://images.scorchingft.cn/assets/images/ComponetsICON_.png'
        : 'https://images.scorchingft.cn/assets/images/ComponetsICON_white.png';
}