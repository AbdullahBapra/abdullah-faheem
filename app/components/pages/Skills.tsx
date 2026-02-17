import React from "react";

export default function Skills() {
  const skillsweb = [
    { src: "/css.png", alt: "CSS" },
    { src: "/html.png", alt: "HTML" },
    { src: "/js.png", alt: "JavaScript" },
    { src: "/nodejs.png", alt: "Node.js" },
    { src: "/mongodb.png", alt: "MongoDB" },
    { src: "/nextjs.svg", alt: "Next.js" },
    { src: "/react.png", alt: "React" },
    { src: "/mysql.png", alt: "MySQL" },
    { src: "/express.png", alt: "Express.js" },
    { src: "/tailwind.png", alt: "Tailwind CSS" },
  ];

  const skillsai = [
    { src: "/cloud.png", alt: "Cloud Code" },
    { src: "/openai.png", alt: "OpenAI Agent SDK" },
    { src: "/n8n.png", alt: "n8n" },
    { src: "/python.png", alt: "Python" },
    { src: "/langchain.png", alt: "LangChain" },
    { src: "/fastapi.svg", alt: "FastAPI" },
    { src: "/nodejs.png", alt: "NodeJS" },
    { src: "/RAG.png", alt: "RAG" },
  ];

  const SkillRow = ({ skills, title }: { skills: typeof skillsweb; title: string }) => (
    <div className="p-6 rounded-2xl mt-8 relative overflow-hidden
                    bg-white/5 dark:bg-primary-bg
                    border border-zinc-200 dark:border-zinc-800">
      {/* Left Gradient */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24
                      bg-gradient-to-r from-black/10 dark:from-black/60 to-transparent" />
      {/* Right Gradient */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24
                      bg-gradient-to-l from-black/10 dark:from-black/60 to-transparent" />

      <div className="overflow-hidden">
        <div className="flex gap-16 skillanimate w-max">
          {[...skills, ...skills].map((skill, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-20 w-20
                         bg-white/10 dark:bg-white/5 backdrop-blur-lg rounded-xl
                         border border-white/20 dark:border-white/10
                         duration-300 hover:bg-white/20 dark:hover:bg-white/10
                         hover:shadow-lg"
            >
              <img
                className="h-12 w-12 object-contain grayscale hover:grayscale-0 transition duration-300"
                src={skill.src}
                alt={skill.alt}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="text-center text-lg font-semibold mt-6 tracking-wide
                      text-zinc-800 dark:text-zinc-200">
        {title}
      </div>
    </div>
  );

  return (
    <section className="py-16">
      <h3 className="rounded-full px-4 py-2 inline-block
                     border border-zinc-200 dark:border-zinc-800
                     bg-white/5 dark:bg-primary-bg text-sm">
        Skills
      </h3>

      <h2 className="text-4xl mt-6 font-bold text-zinc-900 dark:text-zinc-100">
        <span className="opacity-40">My</span> Skills
      </h2>

      <p className="opacity-50 mt-4 text-sm max-w-lg text-zinc-700 dark:text-zinc-400">
        Tools that I have used in the completion of successful projects.
      </p>

      <SkillRow skills={skillsweb} title="Web & App Development" />
      <SkillRow skills={skillsai} title="Agentic AI" />
    </section>
  );
}
