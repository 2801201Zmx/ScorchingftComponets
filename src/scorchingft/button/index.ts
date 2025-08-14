import { withInstall } from '@/utils/install'
import button from '@/scorchingft/button.vue'

type SFbuttonType = typeof button

export const SFbutton = withInstall(button) as SFbuttonType & { install: () => void }

export default SFbutton 