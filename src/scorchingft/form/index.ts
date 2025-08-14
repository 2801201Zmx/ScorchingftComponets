import { withInstall } from '@/utils/install'
import Form from '@/scorchingft/form.vue'
import FormItem from '@/scorchingft/form-item.vue'

type SFFormType = typeof Form
type SFFormItemType = typeof FormItem

export const SFForm = withInstall(Form) as SFFormType & { install: () => void }
export const SFFormItem = withInstall(FormItem) as SFFormItemType & { install: () => void }

export default SFForm 