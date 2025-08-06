import Clipboard from 'clipboard'

export default function CopyObject(ClassName: string, binding: string) {
    const clipboard = new Clipboard(ClassName, {
        text: () => {
            return binding
        }
    });
    clipboard.on('success', () => {
    });

    clipboard.on('error', () => {
    });
}
