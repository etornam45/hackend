import type { MetaFunction } from "@remix-run/node";
import { Float } from "~/ui/float";
import { FloatThemeSwitcher } from "~/ui/theme-switcher";


export const meta: MetaFunction = () => {
  return [
    { title: "Hackend" },
    { name: "description", content: "Making hacking fun" },
  ];
};

export default function Index() {



  return (
    <div className="flex flex-col h-screen items-center justify-start ">
      <FloatThemeSwitcher />
      <Float action={<div>
        <button className="p-3 py-1 bg-yellow rounded-full">
          Click Me
        </button>
      </div>}>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem cumque labore unde repudiandae voluptas minima 
        </div>
      </Float>
    </div>
  );
}