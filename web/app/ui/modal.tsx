import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useModalState } from "~/hooks/modal"


type Props = {
    children: React.ReactNode
    action: React.ReactNode
    title: string
}

export const Modal = ({ children, action, title }: Props) => {
    const {
        open
    } = useModalState()
    
    const id = Math.floor(Math.random() * 100000000000)
    
    function OpenModal() {
        open(children)
    }

    return <div onClick={OpenModal} className="modal">{action}</div>;
};


