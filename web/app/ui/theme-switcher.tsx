import { useTheme } from "~/hooks/theme";
import { Float } from "./float";


export const ThemeSwitcher = () => {
    const { theme, toggle } = useTheme()
    return (
        <div className="theme-switcher rounded-full border p-0 flex justify-between items-center relative border-[#ccc] dark:border-[#555]">
            <div className={`absolute h-full transition-all  aspect-square rounded-full bg-amber ${theme == 'dark' ? 'right-0' : 'left-0'} `}></div>
            <div onClick={() => toggle()} className="h-[24px] aspect-square flex justify-center items-center flex-1">
                <div className="i-proicons-brightness bg-gray-7 dark:bg-gray-2"></div>
            </div>
            <div onClick={() => toggle()} className="h-[24px] aspect-square flex justify-center items-center flex-1">
                <div className="i-proicons-moon bg-gray-7"></div>
            </div>
        </div>
    )
}

export const FloatThemeSwitcher = () => {
    const { theme, toggle } = useTheme()

    return (<Float
        action={
            <button className="flex items-center  gap-1 p-1 px-3 bg-blue/90 rounded-full text-white">
                <div className="i-proicons-dark-theme"></div> Theme
            </button>
        }
    >
        <div className="flex flex-col ">
            <div onClick={() => toggle("light")} className="flex first:(rounded-bl-0 rounded-br-0) last:(rounded-tl-0 rounded-tr-0) gap-1.5 items-center p-1.5 cursor-pointer rounded-xl hover:(bg-black/5) dark:hover:(bg-white/5) w-full box-border">
                <div className="i-proicons-brightness bg-gray-7 dark:bg-gray-2"></div> Light
            </div>
            <div onClick={() => toggle("dark")} className="flex first:(rounded-bl-0 rounded-br-0) last:(rounded-tl-0 rounded-tr-0) gap-1.5 items-center p-1.5 cursor-pointer rounded-0 hover:(bg-black/5) dark:hover:(bg-white/5) w-full box-border">
                <div className="i-proicons-moon bg-gray-7 dark:bg-gray-2"></div> Dark
            </div>
            <div onClick={() => toggle("dark")} className="flex first:(rounded-bl-0 rounded-br-0) last:(rounded-tl-0 rounded-tr-0) gap-1.5 items-center p-1.5 cursor-pointer rounded-xl hover:(bg-black/5) dark:hover:(bg-white/5) w-full box-border">
                <div className="i-proicons-computer bg-gray-7 dark:bg-gray-2"></div> System
            </div>
        </div>
    </Float>)
}