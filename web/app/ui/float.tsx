import { useEffect, useRef, useState } from "react";
import { createPopper } from "@popperjs/core";
import { useFloat } from "~/hooks/floating-ui";

type Props = {
    children: React.ReactNode;
    action: React.ReactNode;
};

export const Float = ({ children, action }: Props) => {
    const [active, setActive] = useState(false);
    const actionRef = useRef<HTMLDivElement | null>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);
    const popperInstance = useRef<ReturnType<typeof createPopper> | null>(null);

    const { index, float, toggle } = useFloat()

    useEffect(() => {
        if (float == false) {
            setActive(false)
        }
    }, [float])

    useEffect(() => {
        if (active && actionRef.current && popupRef.current) {
            popperInstance.current = createPopper(actionRef.current, popupRef.current, {
                placement: "bottom-start",
                modifiers: [
                    {
                        name: "preventOverflow",
                        options: {
                            boundary: "viewport",
                            padding: 8, // Padding from the viewport
                        },
                    },
                    {
                        name: "offset",
                        options: {
                            offset: [0, 8], // Add space between the button and popup
                        },
                    },
                ],
            });
        }

        return () => {
            popperInstance.current?.destroy();
            popperInstance.current = null;
        };
    }, [active]);

    function handleClick() {
        setActive((prev) => !prev);
        toggle()
    }

    return (
        <div className="relative" style={{
            zIndex: active ? index * 2000 : 'initial'
        }}>
            <div ref={actionRef} onClick={handleClick} className="cursor-pointer">
                {action}
            </div>
            <div
                ref={popupRef}
                className={`absolute ${active ? "block" : "hidden"}`}
                style={{
                    zIndex: active ? 1000 : "auto",
                }}
            >
                <div className="bg-white/50 dark:bg-slate-700/50 backdrop-blur-2xl backdrop-saturate-[2] rounded-2xl mt-2 shadow-2xl">
                    <div className="context min-w-[200px] border-1.5 dark:border-[#222] rounded-2xl p-2">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};
