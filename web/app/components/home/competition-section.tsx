import { Button } from "~/ui/button"
import { Section } from "../section"
import { CompetitionCard } from "./competition-card"

export const CompetitionsSection = () => {
    return (<Section>
        <div className="my-[100px]">

            <h2 className="mb-6 text-2xl font-bold">Hackathons for you</h2>
            <div className="grid gap-5 grid-cols-2 mt-6">
                <CompetitionCard />
                <CompetitionCard />
                <CompetitionCard />
                <CompetitionCard />
                <CompetitionCard />
                <CompetitionCard />
            </div>
            <a href="/competition" className="">
                <Button>
                    View all hackathons
                </Button>
            </a>
        </div>
    </Section>)
}