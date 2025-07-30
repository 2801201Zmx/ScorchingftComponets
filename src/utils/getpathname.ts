import { useCounterStore } from '@/store/counter'

export default function getPathName(path: string) {
    const count = useCounterStore();
    
    count.isIndex = !(path === '/');
    count.headerLogo = count.isIndex
        ? '/ComponetsICON_.png'
        : '/ComponetsICON_white.png';
}