"use client";
import React, { useState, useId } from "react";
import { toast } from "react-toastify";

interface FormSections {
  buildSomething: { projectName: string; description: string; techstack: string };
  collaborate: { repoName: string; pitch: string; projectlink: string };
  hireMe: { company: string; techRole: string; jobposting: string };
  contact: { name: string; email: string; additionalInfo: string };
}

type Section = keyof FormSections;

interface Article {
  heading: string;
  subheading: string;
}

interface ChipProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
}

interface OptionGroupProps {
  legend: string;
  children: React.ReactNode;
}

interface ContactStepProps {
  formId: string;
  formData: FormSections;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, section: Section) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}



const ArrowRight: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5l8 7-8 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowLeft: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 5l-8 7 8 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Accessible chip button ───────────────────────────────────────────────────
function Chip({ label, selected, onToggle }: ChipProps) {
  return (
    <button
      type="button"
      role="button"
      aria-pressed={selected}
      onClick={onToggle}
      onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      className={`cursor-pointer border rounded-md p-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#3ab5fe] ${selected
          ? "bg-[#3ab5fe] text-white border-[#3ab5fe]"
          : "bg-white text-black border-gray-300 hover:bg-gray-100"
        }`}
    >
      {label}
    </button>
  );
}

// ─── Option group with proper fieldset + legend ───────────────────────────────
function OptionGroup({ legend, children }: OptionGroupProps) {
  return (
    <fieldset className="border-0 p-0 m-0">
      <legend className="block font-medium mb-2">{legend}</legend>
      <div className="flex gap-4 flex-wrap">{children}</div>
    </fieldset>
  );
}

// ─── Shared contact step ──────────────────────────────────────────────────────
function ContactStep({ formId, formData, handleChange, handleSubmit }: ContactStepProps) {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label htmlFor={`${formId}-name`}>Your name</label>
      <input
        type="text"
        name="name"
        id={`${formId}-name`}
        placeholder="Your Name"
        value={formData.contact.name}
        onChange={(e) => handleChange(e, "contact")}
        className="input"
        required
        autoComplete="name"
      />
      <label htmlFor={`${formId}-email`}>Email</label>
      <input
        type="email"
        name="email"
        id={`${formId}-email`}
        placeholder="Email"
        value={formData.contact.email}
        onChange={(e) => handleChange(e, "contact")}
        className="input"
        required
        autoComplete="email"
      />
      <label htmlFor={`${formId}-info`}>Anything else I should know?</label>
      <textarea
        name="additionalInfo"
        id={`${formId}-info`}
        placeholder="Additional Info"
        value={formData.contact.additionalInfo}
        onChange={(e) => handleChange(e, "contact")}
        className="input"
      />
      <button
        type="submit"
        className="px-4 py-2 mt-2 rounded bg-[#3ab5fe] text-white hover:bg-[#1e75a7]"
      >
        Send it, I will reply within 24h
      </button>
    </form>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function MultiArticleForm() {
  const formId = useId();

  const articles: Article[] = [
    { heading: "I need to build something", subheading: "Startup, product, or web app" },
    { heading: "Let's collaborate", subheading: "Open source, hackathon, or freelance" },
    { heading: "I want to hire you", subheading: "Full-time, part-time, or contract role" },
  ];

  const needsOptions: string[] = ["Full-Stack Dev", "AI Integration", "MVP Build", "UI/Frontend", "API / Backend", "Consulting"];
  const budgetOptions: string[] = ["Under $500", "$500 – $2k", "$2k – $5k", "$5k+", "Not sure yet"];
  const timelineOptions: string[] = ["ASAP", "1–4 weeks", "1–3 months", "No rush"];
  const roleOptions: string[] = ["Developer", "Designer", "Product", "Founder", "Researcher"];
  const techOptions: string[] = ["React / Next.js", "Python", "Node.js", "LangChain", "LLM APIs", "Other"];
  const roleTypeOptions: string[] = ["Full-time", "Part-time", "Contract", "Other"];
  const jobLocationOptions: string[] = ["Fully remote", "Hybrid", "On-site"];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formStep, setFormStep] = useState<number>(1);

  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [selectedTimeline, setSelectedTimeline] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [selectedRoleType, setSelectedRoleType] = useState<string>("");
  const [jobLocation, setJobLocation] = useState<string>("");

  const [formData, setFormData] = useState<FormSections>({
    buildSomething: { projectName: "", description: "", techstack: "" },
    collaborate: { repoName: "", pitch: "", projectlink: "" },
    hireMe: { company: "", techRole: "", jobposting: "" },
    contact: { name: "", email: "", additionalInfo: "" },
  });

  // ── Helpers ───────────────────────────────────────────────────────────────
  const handleContinue = (): void => setShowForm(true);
  const handleNextStep = (): void => setFormStep((s) => s + 1);

  const handleBack = (): void => {
    if (formStep > 1) {
      setFormStep((s) => s - 1);
    } else {
      setShowForm(false);
      setActiveIndex(null);
      setFormStep(1);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: Section
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [name]: value },
    }));
  };

  const toggleNeed = (option: string): void =>
    setSelectedNeeds((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );

  const toggleTech = (option: string): void =>
    setSelectedTech((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );

  const resetForm = (): void => {
    setFormData({
      buildSomething: { projectName: "", description: "", techstack: "" },
      collaborate: { repoName: "", pitch: "", projectlink: "" },
      hireMe: { company: "", techRole: "", jobposting: "" },
      contact: { name: "", email: "", additionalInfo: "" },
    });
    setSelectedNeeds([]);
    setSelectedBudget("");
    setSelectedTimeline("");
    setUserRole("");
    setSelectedTech([]);
    setSelectedRoleType("");
    setJobLocation("");
    setShowForm(false);
    setActiveIndex(null);
    setFormStep(1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const finalData = {
      ...formData,
      buildSomething: {
        ...formData.buildSomething,
        needs: selectedNeeds,
        budget: selectedBudget,
        timeline: selectedTimeline,
      },
      collaborate: {
        ...formData.collaborate,
        role: userRole,
        techStack: selectedTech,
      },
      hireMe: {
        ...formData.hireMe,
        roleType: selectedRoleType,
        jobLocation,
      },
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });
      const data = await response.json();

      if (data.success) {
        toast.success("Form submitted successfully ✅");
        resetForm();
      } else {
        toast.error("Something went wrong ❌");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong ❌");
    }
  };

  const stepLabel: string = !showForm
    ? "Step 1 of 4: Choose an option"
    : `Step ${formStep + 1} of 4`;

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6 lg:mt-32 mt-20">

      {/* Header */}
      <header className="mb-8">
        <p className="text-lg font-semibold">Let&apos;s Work</p>
        <h1 className="text-6xl font-bold">
          What are you <br />
          trying to <span className="dark:text-primary-color">build?</span>
        </h1>
        <p className="text-gray-700 mt-2 w-1/2">
          Hire a developer, freelance, or collaborate — skip the small talk. Tell me what you need,
          I&apos;ll tell you if I can help, how long it&apos;ll take, and what it&apos;ll cost.
        </p>
      </header>

      {/* Step indicators */}
      <div
        role="status"
        aria-live="polite"
        aria-label={stepLabel}
        className="flex gap-2 mb-6"
      >
        {[1, 2, 3, 4].map((dot) => {
          const isActive =
            (!showForm && dot === 1) ||
            (showForm && formStep === 1 && dot === 2) ||
            (showForm && formStep === 2 && dot === 3) ||
            (showForm && formStep === 3 && dot === 4);
          return (
            <div
              key={dot}
              aria-hidden="true"
              className={`rounded-full transition-all duration-300 ${isActive ? "w-8 h-2 bg-[#3ab5fe]" : "w-2 h-2 bg-gray-300"
                }`}
            />
          );
        })}
      </div>

      {/* Step 1: Article selection */}
      {!showForm && (
        <>
          <section
            aria-label="Choose how you'd like to work together"
            className="flex flex-wrap justify-between gap-4 mb-6"
          >
            {articles.map((article, index) => {
              const isActive = index === activeIndex;
              return (
                <article
                  key={index}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveIndex(index);
                    }
                  }}
                  className={`p-6 rounded-lg border cursor-pointer flex-1 min-w-[250px] focus:outline-none focus:ring-2 focus:ring-[#3ab5fe] ${isActive
                      ? "bg-blue-500 text-white border-blue-500 dark:bg-[#3ab5fe] dark:border-blue-500"
                      : "bg-secondary-bg text-black border-zinc-200 dark:bg-primary-bg dark:text-white dark:border-zinc-800"
                    }`}
                >
                  <h2 className="text-4xl font-semibold">{article.heading}</h2>
                  <h3 className="text-xl font-medium text-gray-600">{article.subheading}</h3>
                </article>
              );
            })}
          </section>

          {activeIndex !== null && (
            <div className="flex justify-end">
              <button
                onClick={handleContinue}
                className="px-4 py-2 rounded bg-[#3ab5fe] text-white hover:bg-[#3ab5fe] flex items-center gap-2"
              >
                Continue
                <ArrowRight />
              </button>
            </div>
          )}
        </>
      )}

      {/* Step 2+: Form */}
      {showForm && activeIndex !== null && (
        <section className="mt-4 p-6 rounded-lg bg-secondary-bg text-black border-zinc-200 dark:bg-primary-bg dark:text-white dark:border-zinc-800 flex flex-col gap-4">

          {/* ══ BUILD SOMETHING ══ */}
          {activeIndex === 0 && (
            <>
              {formStep === 1 && (
                <>
                  <h2 className="text-2xl font-bold mb-4">Tell me about the project</h2>

                  <label htmlFor={`${formId}-projectName`} className="block font-medium">
                    Project name or idea
                  </label>
                  <input
                    type="text"
                    id={`${formId}-projectName`}
                    name="projectName"
                    placeholder="Project Name"
                    value={formData.buildSomething.projectName}
                    onChange={(e) => handleChange(e, "buildSomething")}
                    className="input"
                  />

                  <label htmlFor={`${formId}-description`} className="block font-medium">
                    What does it do?
                  </label>
                  <textarea
                    id={`${formId}-description`}
                    name="description"
                    placeholder="Describe your idea"
                    value={formData.buildSomething.description}
                    onChange={(e) => handleChange(e, "buildSomething")}
                    className="input"
                  />

                  <OptionGroup legend="What do you need from me?">
                    {needsOptions.map((option) => (
                      <Chip
                        key={option}
                        label={option}
                        selected={selectedNeeds.includes(option)}
                        onToggle={() => toggleNeed(option)}
                      />
                    ))}
                  </OptionGroup>
                </>
              )}

              {formStep === 2 && (
                <>
                  <h2 className="text-2xl font-bold mb-4">Scope &amp; Timeline</h2>

                  <OptionGroup legend="Estimated Budget">
                    {budgetOptions.map((option) => (
                      <Chip
                        key={option}
                        label={option}
                        selected={selectedBudget === option}
                        onToggle={() => setSelectedBudget(option)}
                      />
                    ))}
                  </OptionGroup>

                  <OptionGroup legend="When do you need this?">
                    {timelineOptions.map((option) => (
                      <Chip
                        key={option}
                        label={option}
                        selected={selectedTimeline === option}
                        onToggle={() => setSelectedTimeline(option)}
                      />
                    ))}
                  </OptionGroup>

                  <label htmlFor={`${formId}-stack`}>Preferred stack? (optional)</label>
                  <input
                    type="text"
                    name="techstack"
                    id={`${formId}-stack`}
                    placeholder="eg: Next.js, Python, LangChain"
                    className="input"
                    value={formData.buildSomething.techstack}
                    onChange={(e) => handleChange(e, "buildSomething")}
                  />
                </>
              )}

              {formStep === 3 && (
                <ContactStep
                  formId={formId}
                  formData={formData}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                />
              )}
            </>
          )}

          {/* ══ COLLABORATE ══ */}
          {activeIndex === 1 && (
            <>
              {formStep === 1 && (
                <>
                  <h2 className="text-2xl font-bold mb-4">What are we building together?</h2>

                  <label htmlFor={`${formId}-repoName`}>Project or Repo</label>
                  <input
                    type="text"
                    name="repoName"
                    id={`${formId}-repoName`}
                    placeholder="eg: Open-source RAG toolkit"
                    value={formData.collaborate.repoName}
                    onChange={(e) => handleChange(e, "collaborate")}
                    className="input"
                  />

                  <OptionGroup legend="Your role">
                    {roleOptions.map((option) => (
                      <Chip
                        key={option}
                        label={option}
                        selected={userRole === option}
                        onToggle={() => setUserRole(option)}
                      />
                    ))}
                  </OptionGroup>

                  <label htmlFor={`${formId}-pitch`}>Quick pitch</label>
                  <textarea
                    name="pitch"
                    id={`${formId}-pitch`}
                    value={formData.collaborate.pitch}
                    onChange={(e) => handleChange(e, "collaborate")}
                    placeholder="What is the vision and why should we collaborate?"
                    className="input"
                  />
                </>
              )}

              {formStep === 2 && (
                <>
                  <h2 className="text-2xl font-bold mb-4">Technical Context</h2>

                  <OptionGroup legend="Tech stack / tools you're working with">
                    {techOptions.map((option) => (
                      <Chip
                        key={option}
                        label={option}
                        selected={selectedTech.includes(option)}
                        onToggle={() => toggleTech(option)}
                      />
                    ))}
                  </OptionGroup>

                  <label htmlFor={`${formId}-repoLink`}>GitHub / project link (optional)</label>
                  <input
                    type="text"
                    name="projectlink"
                    id={`${formId}-repoLink`}
                    value={formData.collaborate.projectlink}
                    onChange={(e) => handleChange(e, "collaborate")}
                    placeholder="https://github.com"
                    className="input"
                  />
                </>
              )}

              {formStep === 3 && (
                <ContactStep
                  formId={formId}
                  formData={formData}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                />
              )}
            </>
          )}

          {/* ══ HIRE ME ══ */}
          {activeIndex === 2 && (
            <>
              {formStep === 1 && (
                <>
                  <h2 className="text-2xl font-bold mb-4">Tell me about the opportunity</h2>

                  <label htmlFor={`${formId}-company`}>Company / Organization</label>
                  <input
                    type="text"
                    name="company"
                    id={`${formId}-company`}
                    placeholder="Acme Corp"
                    value={formData.hireMe.company}
                    onChange={(e) => handleChange(e, "hireMe")}
                    className="input"
                  />

                  <OptionGroup legend="Role Type">
                    {roleTypeOptions.map((option) => (
                      <Chip
                        key={option}
                        label={option}
                        selected={selectedRoleType === option}
                        onToggle={() => setSelectedRoleType(option)}
                      />
                    ))}
                  </OptionGroup>

                  <label htmlFor={`${formId}-techRole`}>What would I be working on?</label>
                  <textarea
                    name="techRole"
                    id={`${formId}-techRole`}
                    value={formData.hireMe.techRole}
                    onChange={(e) => handleChange(e, "hireMe")}
                    placeholder="Describe the role and tech stack"
                    className="input"
                  />
                </>
              )}

              {formStep === 2 && (
                <>
                  <h2 className="text-2xl font-bold mb-4">Logistics</h2>

                  <OptionGroup legend="Remote or on-site?">
                    {jobLocationOptions.map((option) => (
                      <Chip
                        key={option}
                        label={option}
                        selected={jobLocation === option}
                        onToggle={() => setJobLocation(option)}
                      />
                    ))}
                  </OptionGroup>

                  <label htmlFor={`${formId}-jobPosting`}>Job posting / LinkedIn (optional)</label>
                  <input
                    type="text"
                    id={`${formId}-jobPosting`}
                    name="jobposting"
                    placeholder="https://..."
                    className="input"
                    value={formData.hireMe.jobposting}
                    onChange={(e) => handleChange(e, "hireMe")}
                  />
                </>
              )}

              {formStep === 3 && (
                <ContactStep
                  formId={formId}
                  formData={formData}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                />
              )}
            </>
          )}

          {/* Navigation */}
          <div className="flex gap-4 mt-4 justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 rounded border bg-gray-200 dark:bg-gray-700 flex gap-4 items-center"
            >
              <ArrowLeft /> Back
            </button>
            {formStep < 3 && (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-4 py-2 rounded bg-[#3ab5fe] text-white hover:bg-[#1e75a7] flex gap-4 items-center"
              >
                Continue
                <ArrowRight />
              </button>
            )}
          </div>
        </section>
      )}
    </main>
  );
}