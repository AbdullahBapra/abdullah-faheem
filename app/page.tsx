import { profileQuery } from "@/lib/sanity.query";
import type { ProfileType } from "@/types";
import HeroSvg from "./assets/icons/HeroSvg";
import Job from "./components/pages/Job";
import Social from "./components/shared/Social";
import { Slide } from "./animation/Slide";
import { sanityFetch } from "@/lib/sanity.client";
import ContributionGraph from "./components/pages/GithubCalendarComponent";
import Skills from "./components/pages/Skills";
import Link from "next/link";
import Faqsec from "./components/pages/Faqsec";
import WorktogetherCard from "./components/pages/WorktogetherCard";


export default async function Home() {
  const profile: ProfileType = await sanityFetch({
    query: profileQuery,
    tags: ["profile"],
  });

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6 lg:mt-32 mt-20">
      <section className="flex xl:flex-row flex-col xl:items-center items-start xl:justify-center justify-between gap-x-12 mb-16">
        <div key={profile?._id} className="lg:max-w-2xl max-w-2xl">
          <Slide>
            <h1 className="font-incognito font-semibold tracking-tight text-3xl sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight lg:min-w-[700px] min-w-full">
              {profile?.headline ?? "Job Title"}
            </h1>
            <p className="text-base dark:text-zinc-400 text-zinc-600 leading-relaxed">
              {profile?.shortBio ?? "Short bio description"}
            </p>
          </Slide>
          <Slide>
            <div className="flex gap-4 mt-4">
              <Link
                href={"/contact"}
                aria-label="Contact me to build your project"
                className="px-4 py-2 rounded dark:bg-[#35a9ec] dark:border-zinc-800 bg-zinc-100 border dark:text-white border-zinc-200 dark:hover:bg-[#2b90caf3]"
              >
                Let's build something →
              </Link>
              <Link
                href={"/projects"}
                aria-label="View my web development and AI projects"
                className="dark:bg-primary-bg bg-zinc-100 border dark:border-zinc-800 border-zinc-200 rounded-md px-4 py-2"
              >
                View my projects
              </Link>
            </div>
          </Slide>
          <Slide delay={0.1}>
            <Social type="social" />
          </Slide>
        </div>
        <Slide delay={0.14}>
          <HeroSvg />
        </Slide>
      </section>
      <Slide delay={0.16}>
        <Skills />
      </Slide>
      <Job />
      <Slide delay={0.16}>
        <Faqsec />
      </Slide>
      <Slide delay={0.16}>
        <WorktogetherCard />
      </Slide>
    </main>
  );
}
