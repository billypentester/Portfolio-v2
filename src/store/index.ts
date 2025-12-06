import { create } from 'zustand';

interface DialogState {
    isOpen: boolean;
    handleDialog: (open: boolean) => void;
    content: {
        title: string;
        message: string;
    }
    setContent: (title: string, message: string) => void;
}

export const useDialogStore = create<DialogState>((set) => ({
    isOpen: false,
    content: {
        title: '',
        message: ''
    },
    handleDialog: (open: boolean) => set({ isOpen: open }),
    setContent: (title: string, message: string) => set({ content: { title, message } }),
}));