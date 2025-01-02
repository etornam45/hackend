import { create } from "zustand"


type ModalState = {
    isOpen: boolean;
    elements: React.ReactNode | null
}

type ModalActions = { 
    close: () => void // Remove the element
    open: (element:React.ReactNode) => void
    togle: () => void
}

export const useModalState = create<ModalState & ModalActions>((set) => ({
    isOpen: false,
    index: 100,
    elements: null,
    close: () => set({ isOpen: false, elements: null }), // Remove the element
    open: (element:React.ReactNode) => set({ isOpen: true, elements: element }),
    togle: () => set((state) => ({ isOpen: !state.isOpen }))
}))