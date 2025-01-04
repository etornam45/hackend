import { useEffect } from "react"
import { useModalState } from "~/hooks/modal"

export const ModalFloat = () => {
    const { isOpen, open, close, elements } = useModalState()

    useEffect(() => {
        console.log(isOpen)
    }, [elements])

    return (<div>
        <div className={` ${isOpen ? 'block' : '!hidden'} 
            fixed top-0 left-0 w-full h-full backdrop-blur-lg
            backdrop-saturate-[1] transition-all duration-500 z-100000000
            flex flex-col items-center justify-center
            `}
            aria-hidden="true">
                <div onClick={close} className="absolute top-0 left-0 right-0 bottom-0"></div>
            <div className="relative">

                {elements && <ModalDisplay
                // title={element.title}
                >
                    {elements}
                </ModalDisplay>}
            </div>
        </div>
    </div>)
}

type ModalDisplayProps = {
    children: React.ReactNode
}
const ModalDisplay = ({ children }: ModalDisplayProps) => {
    const { close } = useModalState()

    return (<div
        onClick={(e) => e.preventDefault()}
        className={`absolute translate-x-[-50%] translate-y-[-50%] bg-white dark:(bg-black border-[#333]/50) p-3 rounded-2xl shadow-2xl border max-w-xl`}>
        <div onClick={close} className="absolute top-[-10px] right-[-10px] w-[24px] flex items-center justify-between aspect-square rounded bg-white/50 backdrop-blur-3xl border cursor-pointer active:bg-slate-2/50">
        <div className="i-proicons-cancel flex-1"></div>
        </div>
        <div>
            {children}
        </div>
    </div>)
}