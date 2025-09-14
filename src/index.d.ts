declare module 'scorchingftui' {
  import type { App, DefineComponent } from 'vue';
  
  export interface ScorchingftInstallationOptions {
    size?: 'large' | 'medium' | 'small' | 'mini';
    zIndex?: number;
  }

  // Props interfaces
  export interface SFInputProps {
    modelValue?: string | number;
    type?: 'text' | 'password' | 'email' | 'number' | 'slider';
    placeholder?: string;
    disabled?: boolean;
    showPassword?: boolean;
    clearable?: boolean;
    min?: number;
    max?: number;
    step?: number;
  }

  export interface SFCardProps {
    size?: number;
  }

  export interface SFIconProps {
    size?: number;
  }

  export interface SFFormProps {
    style?: Record<string, any>;
    model?: Record<string, any>;
    rules?: Record<string, any>;
    labelWidth?: string | number;
    labelPosition?: 'left' | 'top' | 'right';
    size?: 'small' | 'medium' | 'large';
    showSubmit?: boolean;
    showReset?: boolean;
    submitText?: string;
    resetText?: string;
    loading?: boolean;
  }

  export interface SFFormItemProps {
    label?: string;
    prop?: string;
    labelWidth?: string | number;
    labelPosition?: 'left' | 'top' | 'right';
    size?: 'small' | 'medium' | 'large';
  }

  export interface SFButtonProps {
    size?: 'large' | 'default' | 'small';
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
    plain?: boolean;
    text?: boolean;
    bg?: boolean;
    link?: boolean;
    round?: boolean;
    circle?: boolean;
    loading?: boolean;
    loadingIcon?: string;
    disabled?: boolean;
    icon?: string;
    autofocus?: boolean;
    nativeType?: 'button' | 'submit' | 'reset';
    autoInsertSpace?: boolean;
    color?: string;
    dark?: boolean;
    tag?: string;
  }

  export interface SFTextareaProps {
    modelValue?: string;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    clearable?: boolean;
    maxlength?: number | string;
    rows?: number | string;
    cols?: number | string;
    wrap?: 'soft' | 'hard';
    autofocus?: boolean;
    form?: string;
    name?: string;
    required?: boolean;
  }

  export type SFInput = DefineComponent<SFInputProps>;
  export type SFCard = DefineComponent<SFCardProps>;
  export type SFIcon = DefineComponent<SFIconProps>;
  export type SFForm = DefineComponent<SFFormProps>;
  export type SFFormItem = DefineComponent<SFFormItemProps>;
  export type SFButton = DefineComponent<SFButtonProps>;
  export type SFTextarea = DefineComponent<SFTextareaProps>;

  export const SFInput: SFInput;
  export const SFCard: SFCard;
  export const SFIcon: SFIcon;
  export const SFForm: SFForm;
  export const SFFormItem: SFFormItem;
  export const SFButton: SFButton;
  export const SFTextarea: SFTextarea;
  
  export const SFIcons: Record<string, DefineComponent>;

  const ScorchingftUI: {
    install: (app: App, options?: ScorchingftInstallationOptions) => void;
  };

  export default ScorchingftUI;
}