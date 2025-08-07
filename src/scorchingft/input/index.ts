import { withInstall } from '@/utils/install'
import Input from '@/scorchingft/input.vue'

type SFInputType = typeof Input

export const SFInput = withInstall(Input) as SFInputType & { install: () => void }
export default SFInput