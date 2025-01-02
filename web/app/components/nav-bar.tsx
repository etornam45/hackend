import { Float } from "~/ui/float";
import { Logo } from "~/ui/logo";
import { FloatThemeSwitcher, ThemeSwitcher } from "~/ui/theme-switcher";
import { Section } from "./section";
import { Button } from "~/ui/button";
import { Modal } from "~/ui/modal";

export const NavBar = () => {
    return (
        <nav className="mx-auto sticky top-0 z-[66666666]">
            <Section>
                <div className=" border-1.5 shadow-md flex items-center justify-between bg-[#eee]/50 dark:(bg-[#333]/50 border-[#333]) backdrop-blur-md p-3  rounded-full">
                    <Logo />
                    <ul className="flex gap-3 text-lg text-black dark:text-white">
                        {Links.map((link) => (
                            <li key={link.path} className={"flex items-center gap-2 " + link?.style}>
                                {link.icon && <div className={`${link.icon} `}></div>}
                                <a href={link.path}>{link.label}</a>
                            </li>
                        ))}
                    </ul>
                    <Modal
                        title={"Authentication"}
                        action={<Button>
                            Register
                        </Button>}>
                        <div>
                            Hello
                        </div>
                    </Modal>
                </div>
            </Section>
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