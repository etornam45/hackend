import { useState } from "react";
import { create } from "zustand";

type FloatState = {
    float: boolean;
    index: number
}

type FloatActions = {
    setFloat: (float: boolean) => void;
    toggle: () => void;
}

export const useFloat = create<FloatState & FloatActions>((set) => ({
    float: false,
    index: 900,
    setFloat: (float) => set({ float }),
    toggle: () => set((state) => ({ float: !state.float }))
}))