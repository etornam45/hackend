import { Button } from "~/ui/button"
import { Section } from "../section"
import { Float } from "~/ui/float"

export const HeroSection = () => {
    return <Section>
        <div className="py-[50px] flex w-full" >
            <div className=" max-w-[50%]">
                <div className="flex flex-col gap-10">
                    {/* <h1 className="font-bold text-5xl">HACKEND</h1> */}
                    <h2 className="font-bold text-3xl">The Ultimate Hackathon Management Platform</h2>
                    <p className="font-medium text-xl">Empower your hackathon events with a platform built to manage everything</p>
                    <Float action={<Button>
                        <div className='i-proicons-terminal'></div>
                        Start The Hack
                    </Button>}>
                        <div className="flex flex-col list-hover">
                            <div className="flex items-center gap-2 px-1 p-0.5 cursor-pointer hover:(bg-black/5)">
                                <div className="i-proicons-person-multiple"></div>
                                <span>For Organizers</span>
                            </div>
                            <div className="flex items-center gap-2 px-1 p-0.5 cursor-pointer hover:(bg-black/5)">
                                <div className="i-proicons-terminal"></div>
                                <span>For Participants</span>
                            </div>
                        </div>
                    </Float>
                </div>
            </div>
            <div className="w-full flex items-center justify-center">
                <img src="/hack.png" alt="" className="aspect-square h-[200px]" />
            </div>
        </div>
        <div className="w-full rounded-full p-2 border shadow dark:border-[#333]/50 overflow-hidden flex items-center">
            <div className="i-proicons-search text-2xl ml-2"></div>
            <input type="text" className="ml-4 outline-none w-full bg-transparent" placeholder="Find your next hackathon" />
            <Button>
                Search
            </Button>
        </div>
    </Section>
}