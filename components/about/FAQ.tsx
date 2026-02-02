'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const t = useTranslations('components.about.FAQ');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Get FAQ items from translations
  const faqItems: FAQItem[] = [
    {
      question: t('question1'),
      answer: t('answer1'),
    },
    {
      question: t('question2'),
      answer: t('answer2'),
    },
    {
      question: t('question3'),
      answer: t('answer3'),
    },
    {
      question: t('question4'),
      answer: t('answer4'),
    },
    {
      question: t('question5'),
      answer: t('answer5'),
    },
    {
      question: t('question6'),
      answer: t('answer6'),
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 rounded-full mb-4">
            <FaQuestionCircle className="text-white text-2xl" />
          </div>
          <p className="text-amber-500 text-sm uppercase tracking-wider mb-4 font-semibold">
            {t('subtitle')}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-black mb-4">
            {t('title')}
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 overflow-hidden transition-all duration-300 hover:border-amber-500 hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left group"
              >
                <span className="text-lg font-semibold text-black group-hover:text-amber-500 transition-colors pr-4">
                  {item.question}
                </span>
                <FaChevronDown
                  className={`text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180 text-amber-500' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
