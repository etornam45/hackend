import type { MetaFunction } from "@remix-run/node";
import { CompetitionCard } from "~/components/home/competition-card";
import { CompetitionsSection } from "~/components/home/competition-section";
import { HeroSection } from "~/components/home/hero-section";
import { Section } from "~/components/section";
import { Float } from "~/ui/float";

export const meta: MetaFunction = () => {
  return [
    { title: "Hackend" },
    { name: "description", content: "Making hacking fun" },
  ];
};

export default function Index() {

  return (
    <div className="flex flex-col h-screen items-center justify-start ">
      <HeroSection />
      <CompetitionsSection />
    </div>
  );
}