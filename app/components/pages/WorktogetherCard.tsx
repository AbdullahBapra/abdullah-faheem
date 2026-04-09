"use client";
import Link from "next/link";
import Script from "next/script";

export default function WorktogetherCard() {
    const ctaSchema = {
        "@context": "https://schema.org",
        "@type": "Action",
        name: "Start an AI project",
        description:
            "Hire a freelance developer to build AI-powered products or full-stack web apps. Fast, focused, and personalized service.",
        target: {
            "@type": "EntryPoint",
            urlTemplate: "https://yourdomain.com/contact",
            actionPlatform: [
                "https://schema.org/DesktopWebPlatform",
                "https://schema.org/MobileWebPlatform",
            ],
        },
    };

    return (
        <>

            <Script
                id="cta-jsonld"
                type="application/ld+json"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(ctaSchema) }}
            />

            <section
                className="dark:bg-primary-bg bg-zinc-100 border dark:border-zinc-800 border-zinc-200 rounded-md px-8 py-6 mt-32"
                aria-labelledby="work-together-heading"
            >
                <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
                    {/* Left content */}
                    <div className="flex-1">
                        <h4 className="text-lg font-semibold text-zinc-500 dark:text-zinc-400 mb-1 flex items-center gap-2">
                            <span className="inline-block w-2 h-2 bg-[#35a9ec] rounded-full animate-sparkle"></span>
                            Let's work together
                        </h4>
                        <h2
                            id="work-together-heading"
                            className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-3"
                        >
                            Got a project that needs AI? <br />
                            Tell me what you're building.
                        </h2>
                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                            I take on 2–3 projects at a time, slots are currently open. No agencies, no middlemen.
                            If it's a good fit, we move fast. I specialize in full-stack web apps and AI-powered solutions.
                        </p>
                    </div>

                    {/* Right links */}
                    <div className="flex flex-col gap-6">
                        <Link
                            href="/contact"
                            className="px-4 py-2 rounded dark:bg-[#35a9ec] dark:border-zinc-800 bg-zinc-100 border dark:text-white border-zinc-200 dark:hover:bg-[#2b90caf3]"
                        >
                            Start your AI project today →
                        </Link>
                        <Link
                            href="/blog"
                            className="dark:bg-primary-bg bg-zinc-100 border dark:border-zinc-600 border-zinc-200 rounded-md px-4 py-2 "
                        >
                            Read my blog first →
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}