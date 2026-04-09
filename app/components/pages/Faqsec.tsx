"use client";
import React, { useState, useId } from "react";
import Script from "next/script";

interface FaqItem {
  question: string;
  answer:   string;
}

 
const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What kind of projects do you take on?",
    answer:
      "I take on full-stack web apps and AI-powered products — from MVPs for early-stage startups to adding an AI layer onto existing products. My stack is React and Next.js on the frontend, with Python or Node.js on the backend. I also build agentic AI systems using LangChain, RAG pipelines, and LLM APIs.",
  },
  {
    question: "How quickly can you start a new project?",
    answer:
      "Usually within one week of scoping the project. I take on 2–3 projects at a time so you get focused work, not a developer juggling 10 clients simultaneously.",
  },
  {
    question: "Do you work with non-technical founders?",
    answer:
      "Yes. I translate product ideas into technical plans and explain everything in plain language. You don't need to know how it works — you just need to know it's working. I handle the full-stack development and AI integration end-to-end.",
  },
  {
    question: "Are you open to full-time or contract roles?",
    answer:
      "Yes — remote full-time, part-time, or contract engagements. If the role involves building AI-powered products or full-stack applications with a modern stack, I want to hear about it.",
  },
  {
    question: "What is your typical development process?",
    answer:
      "I start with a scoping call to understand requirements, then deliver a technical plan within 48 hours. From there I work in short sprints with regular updates — no disappearing for weeks. You'll see progress from day one.",
  },
  {
    question: "Do you offer post-launch support?",
    answer:
      "Yes. I offer a 30-day support period after launch for bug fixes and small adjustments. For ongoing maintenance, monitoring, or feature development, we can agree on a retainer or per-project basis.",
  },
];


const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};


interface FaqRowProps {
  item:       FaqItem;
  index:      number;
  isOpen:     boolean;
  onToggle:   () => void;
  headingId:  string;
  panelId:    string;
}

function FaqRow({ item, isOpen, onToggle, headingId, panelId }: FaqRowProps) {
  return (
   
    <>
      <dt>
       
        <button
          id={headingId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="w-full cursor-pointer dark:bg-primary-bg bg-zinc-100 border dark:border-zinc-800 border-zinc-200 rounded-md px-4 py-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <div className="flex justify-between items-center gap-4">
            
            <h3 className="font-medium text-xl m-0">{item.question}</h3>

            <span aria-hidden="true" className="text-xl flex-shrink-0 select-none">
              {isOpen ? "−" : "+"}
            </span>
          </div>
        </button>
      </dt>

      <dd
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        hidden={!isOpen}
        className="px-4 pb-4 dark:bg-primary-bg bg-zinc-100 border-x border-b dark:border-zinc-800 border-zinc-200 rounded-b-md -mt-1"
      >
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed pt-2">
          {item.answer}
        </p>
      </dd>
    </>
  );
}


export default function Faqsec() {
  const uid                              = useId();
  const [activeIndex, setActiveIndex]   = useState<number | null>(null);

  const toggleIndex = (index: number): void => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
       
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      
      <section
        className="py-8 mt-32"
        aria-labelledby="faq-heading"
        itemScope
        itemType="https://schema.org/FAQPage"
      >
         
        <p className="text-sm font-semibold text-zinc-500 mb-2" aria-hidden="true">
          Common Questions
        </p>

        
        <h2 id="faq-heading" className="text-3xl font-bold mb-4">
          Frequently Asked Questions
        </h2>
        <p className="mb-6 text-zinc-600 dark:text-zinc-400">
          Questions clients ask before hiring a freelance full-stack or AI developer.
        </p>

        
        <dl className="space-y-2">
          {FAQ_ITEMS.map((item, index) => (
            
            <div
              key={index}
              itemScope
              itemType="https://schema.org/Question"
              itemProp="mainEntity"
            >
              <FaqRow
                item={item}
                index={index}
                isOpen={activeIndex === index}
                onToggle={() => toggleIndex(index)}
                headingId={`${uid}-q-${index}`}
                panelId={`${uid}-a-${index}`}
              />
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}