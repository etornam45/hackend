import { Float } from "~/ui/float";
import { Logo } from "~/ui/logo";
import { FloatThemeSwitcher, ThemeSwitcher } from "~/ui/theme-switcher";

export const NavBar = () => {
    return (
        <nav className="z-[66666666] border-1.5 mx-auto flex items-center justify-between max-w-7xl bg-[#ddd]/50 dark:(bg-[#333]/50 border-[#333]) backdrop-blur-lg p-3 sticky top-2 rounded-full">
            <Logo />
            <ul className="flex gap-3 text-lg text-black dark:text-white">
                {Links.map((link) => (
                    <li key={link.path} className={"flex items-center gap-2 " + link?.style}>
                        {link.icon && <div className={`${link.icon} `}></div>}
                        <a href={link.path}>{link.label}</a>
                    </li>
                ))}
            </ul>
            <FloatThemeSwitcher />
        </nav>

    )
}

type Link = {
    label: string;
    path: string;
    icon?: string;
    style?: string
}

const Links: Link[] = [
    {
        label: "Home",
        path: '/',
        // icon: "i-proicons-home"
    },
    {
        label: "About",
        path: "/about",
    },
    {
        label: "Contact",
        path: "/contact",
        // icon: <div className=""></div>
    },
    {
        label: "Competition",
        path: "/competition"
    },
    {
        label: "Sponsor",
        path: "/sponsor",
        icon: "i-proicons-coffee-hot",
        style: "text-[crimson] font-bold"
    }
] 