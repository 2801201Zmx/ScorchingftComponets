import { useCounterStore } from '@/store/counter'
import headerLogoImage_ from '@/assets/images/ComponetsICON_.png';
import headerLogoImage from '@/assets/images/ComponetsICON_white.png';

function getPathName(path: string) {
    const count = useCounterStore();
    
    count.isIndex = !(path === '/');
    count.headerLogo = count.isIndex
        ? headerLogoImage_
        : headerLogoImage
}

export { 
    getPathName
}
