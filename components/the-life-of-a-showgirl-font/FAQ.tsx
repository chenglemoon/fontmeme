"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

export default function FAQ() {
  const t = useTranslations("TheLifeOfAShowgirlFont.faq");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(["q1"]));

  const faqs = [
    { id: "q1", questionKey: "q1.question", answerKey: "q1.answer" },
    { id: "q2", questionKey: "q2.question", answerKey: "q2.answer" },
    { id: "q3", questionKey: "q3.question", answerKey: "q3.answer" },
    { id: "q4", questionKey: "q4.question", answerKey: "q4.answer" },
    { id: "q5", questionKey: "q5.question", answerKey: "q5.answer" },
    { id: "q6", questionKey: "q6.question", answerKey: "q6.answer" },
  ];

  const handleToggle = (id: string, isOpen: boolean) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (isOpen) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  };

  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-20 md:grid-cols-[2fr_3fr] md:px-8 md:py-40 bg-black">
      <h2 className="text-center text-4xl font-bold tracking-tight text-white md:text-left md:text-6xl md:self-center">
        {t("title")}
      </h2>
      <div className="divide-y divide-neutral-800">
        {faqs.map((faq, index) => {
          const isOpen = openItems.has(faq.id);
          return (
            <details
              key={faq.id}
              className="group py-4"
              open={isOpen}
              onToggle={(e) => {
                const details = e.target as HTMLDetailsElement;
                handleToggle(faq.id, details.open);
              }}
            >
              <summary className="flex cursor-pointer items-start list-none">
                <div className="relative mr-4 mt-1 h-6 w-6 flex-shrink-0">
                  {isOpen ? (
                    <svg
                      className="absolute inset-0 h-6 w-6 text-[var(--brand-success)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="absolute inset-0 h-6 w-6 text-[var(--brand-success)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  )}
                </div>
                <h3 className="flex-1 text-lg font-medium text-white/90">
                  {t(faq.questionKey)}
                </h3>
              </summary>
              <div className="pl-10 pt-2">
                <p className="text-white/70">
                  {t(faq.answerKey)}
                </p>
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}

