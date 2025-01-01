import { useEffect } from "react"
import { useFloat } from "~/hooks/floating-ui"

export const FloatingBlur = () => {

    const { float, index, toggle } = useFloat()
    useEffect(() => console.log(float), [float])
    return (<div onClick={toggle} className={` ${float ? 'block' : 'hidden'} fixed top-0 left-0 w-full h-full backdrop-blur-lg backdrop-saturate-[1] transition-all duration-500 z-${index}`} aria-hidden="true">
    </div>)
}