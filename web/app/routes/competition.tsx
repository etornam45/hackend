import { MetaFunction } from "@remix-run/react";
import { FilterSideBar } from "~/components/competition/filter-sidebar";
import { CompetitionCard } from "~/components/home/competition-card";
import { Section } from "~/components/section";
import { Button } from "~/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "Find a hackathon" },
    { name: "description", content: "Making hacking fun" },
  ];
};


export default function Competition() {
    return (
        <Section>
            <div className="mt-20">
                <div className="w-full rounded-full p-2 border shadow dark:border-[#333]/50 overflow-hidden flex items-center">
                    <div className="i-proicons-search text-2xl ml-2"></div>
                    <input type="text" className="ml-4 outline-none w-full bg-transparent" placeholder="Find your next hackathon" />
                    <Button>
                        Search
                    </Button>
                </div>

                <div className="flex py-5 gap-4">
                    <div className="w-[350px] h-max rounded-2xl shadow">
                        <FilterSideBar />
                    </div>
                    <div className="grid gap-4 w-full">
                        <CompetitionCard />
                        <CompetitionCard />
                        <CompetitionCard />
                        <CompetitionCard />
                        <CompetitionCard />
                        <CompetitionCard />
                    </div>
                </div>
            </div>
        </Section>
    );
}