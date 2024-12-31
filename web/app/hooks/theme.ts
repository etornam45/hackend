import { useEffect, useState } from "react"

export const useTheme = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>()

    useEffect(() => {
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark')
            setTheme('dark')
        } else {
            document.documentElement.classList.remove('dark')
            setTheme('light')
        } 
    }, [])

    function toggle(change: 'light' | 'dark' | null = null) {
        if (change != null ) {
            document.documentElement.classList.replace(change == "light"? "dark" : "light", change)
            localStorage.setItem('theme', change)
            setTheme(change)
            return
        }

        if (theme === 'light') {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
            setTheme('dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
            setTheme('light')
        }
    }
    
    return {
        theme,
        toggle,
        setTheme
    }
}