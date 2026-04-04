'use client';

import React, { useState } from 'react';
import { AISummaryBullet } from '@/types/resume';

interface SummaryQuestion {
  key: string;
  label: string;
  placeholder: string;
  helpText: string;
  type: 'input' | 'textarea';
}

const summaryQuestions: SummaryQuestion[] = [
  {
    key: 'primaryRole',
    label: 'What is your primary role/title?',
    placeholder: 'e.g., Senior Full-Stack Architect, Lead .NET Developer',
    helpText: 'Your most representative professional title.',
    type: 'input',
  },
  {
    key: 'yearsOfExperience',
    label: 'How many years of experience?',
    placeholder: 'e.g., 18',
    helpText: 'Total years in software development.',
    type: 'input',
  },
  {
    key: 'coreTech',
    label: 'What are your core technologies?',
    placeholder: 'e.g., ASP.NET Core, SQL Server, Azure',
    helpText: 'Main technologies for the "Expert in" line.',
    type: 'input',
  },
  {
    key: 'specialization',
    label: 'What is your key specialization?',
    placeholder: 'e.g., Modernization Specialist',
    helpText: 'A short title for your specialization.',
    type: 'input',
  },
  {
    key: 'specializationDetail',
    label: 'Describe your specialization.',
    placeholder: 'e.g., Proven track record in digital transformation, leading strategic migration from monolithic architectures to scalable Microservices.',
    helpText: 'The detailed description after the specialization title.',
    type: 'textarea',
  },
  {
    key: 'aiTools',
    label: 'What AI tools do you use?',
    placeholder: 'e.g., GitHub Copilot, Claude, Qwen',
    helpText: 'AI/LLM tools you use in development.',
    type: 'input',
  },
  {
    key: 'aiDetail',
    label: 'How do you use AI in your work?',
    placeholder: 'e.g., Advanced practitioner of AI-assisted development to accelerate development velocity, automate refactoring, and ensure high code reliability.',
    helpText: 'Describe your AI-augmented engineering practice.',
    type: 'textarea',
  },
  {
    key: 'cloudAchievement',
    label: 'Describe a cloud/innovation achievement.',
    placeholder: 'e.g., Engineered custom Azure Function solutions to automate real-time version tracking and deployment visibility across global client environments.',
    helpText: 'A specific cloud/innovation achievement.',
    type: 'textarea',
  },
  {
    key: 'domains',
    label: 'What industry domains have you worked in?',
    placeholder: 'e.g., Healthcare (ICD-10/11 coding), E-commerce (High-concurrency Cart systems), Intellectual Property',
    helpText: 'List domains with specific technical context.',
    type: 'input',
  },
  {
    key: 'frontendTech',
    label: 'What frontend technologies do you use?',
    placeholder: 'e.g., Angular and React',
    helpText: 'Frontend stack for the "Full-Stack Proficiency" line.',
    type: 'input',
  },
  {
    key: 'softSkills',
    label: 'What are your soft skills / leadership style?',
    placeholder: 'e.g., Accomplished in cross-functional leadership, aligning technical roadmaps with business growth objectives to drive long-term ROI.',
    helpText: 'Describe your collaborative/strategic abilities.',
    type: 'textarea',
  },
];

function generateSummaryBullets(answers: Record<string, string>): AISummaryBullet[] {
  const bullets: AISummaryBullet[] = [];

  const { primaryRole, yearsOfExperience, coreTech, specialization, specializationDetail, aiTools, aiDetail, cloudAchievement, domains, frontendTech, softSkills } = answers;

  const years = yearsOfExperience || 'X+';

  bullets.push({
    id: Date.now().toString(),
    label: `${primaryRole || 'Senior Developer'} (${years}+ Years)`,
    content: `Expert in designing and delivering enterprise-grade distributed systems using ${coreTech || 'modern technologies'}.`,
  });

  if (specialization && specializationDetail) {
    bullets.push({
      id: (Date.now() + 1).toString(),
      label: specialization,
      content: specializationDetail,
    });
  }

  if (aiTools) {
    bullets.push({
      id: (Date.now() + 2).toString(),
      label: 'AI-Augmented Engineering',
      content: aiDetail || `Advanced practitioner of AI-assisted development (using ${aiTools}) to accelerate development velocity and ensure high code reliability.`,
    });
  }

  if (cloudAchievement) {
    bullets.push({
      id: (Date.now() + 3).toString(),
      label: 'Cloud-Native Innovation',
      content: cloudAchievement,
    });
  }

  if (domains) {
    bullets.push({
      id: (Date.now() + 4).toString(),
      label: 'Domain Authority',
      content: `Deep technical expertise in complex vertical markets, including ${domains}.`,
    });
  }

  if (frontendTech) {
    bullets.push({
      id: (Date.now() + 5).toString(),
      label: 'Full-Stack Proficiency',
      content: `Bridging the gap between robust backend logic and modern, high-performance frontends built with ${frontendTech}.`,
    });
  }

  if (softSkills) {
    bullets.push({
      id: (Date.now() + 6).toString(),
      label: 'Strategic Collaborator',
      content: softSkills,
    });
  }

  return bullets;
}

interface AIGeneratedBuilderProps {
  currentBullets: AISummaryBullet[];
  currentProfile: any[];
  currentAchievement: string;
  onChange: (bullets: AISummaryBullet[], profile: any[], achievement: string) => void;
}

export default function SummaryBuilder({ currentBullets, currentProfile, currentAchievement, onChange }: AIGeneratedBuilderProps) {
  const [showBuilder, setShowBuilder] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [generatedBullets, setGeneratedBullets] = useState<AISummaryBullet[]>([]);
  const [notableAchievement, setNotableAchievement] = useState(currentAchievement);

  const handleNext = () => {
    if (currentStep < summaryQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const bullets = generateSummaryBullets(answers);
      setGeneratedBullets(bullets);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleApply = () => {
    onChange(generatedBullets, currentProfile, notableAchievement);
    setShowBuilder(false);
    setCurrentStep(0);
    setAnswers({});
    setGeneratedBullets([]);
  };

  const handleCancel = () => {
    setShowBuilder(false);
    setCurrentStep(0);
    setAnswers({});
    setGeneratedBullets([]);
  };

  const handleAnswer = (key: string, value: string) => {
    setAnswers({ ...answers, [key]: value });
  };

  if (!showBuilder) {
    return (
      <div className="mb-4">
        <button
          type="button"
          onClick={() => setShowBuilder(true)}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 font-semibold text-sm transition-all shadow"
        >
          🤖 AI Summary Builder
        </button>
      </div>
    );
  }

  if (generatedBullets.length > 0) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-6 border-2 border-purple-400 space-y-6">
        <h3 className="text-xl font-bold text-primary">🎉 AI Generated Summary</h3>

        {/* Summary Bullets Preview */}
        <div>
          <h4 className="font-bold text-gray-800 mb-2">Professional Summary:</h4>
          <div className="bg-white p-4 rounded-lg border space-y-2">
            {generatedBullets.map((bullet, i) => (
              <p key={i} className="text-sm text-gray-700">
                <span className="font-bold text-gray-900">{bullet.label}:</span> {bullet.content}
              </p>
            ))}
          </div>
        </div>

        {/* Notable Achievement Editor */}
        <div>
          <h4 className="font-bold text-gray-800 mb-2">Notable Achievement:</h4>
          <textarea
            value={notableAchievement}
            onChange={(e) => setNotableAchievement(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg h-20 text-sm"
            placeholder={'"Architected and deployed a serverless tracking engine using Azure Functions..."'}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleApply}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold"
          >
            ✅ Apply All to Resume
          </button>
          <button
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  const question = summaryQuestions[currentStep];
  const progress = ((currentStep + 1) / summaryQuestions.length) * 100;

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-6 border-2 border-purple-400">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Question {currentStep + 1} of {summaryQuestions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h3 className="text-lg font-bold text-primary mb-2">{question.label}</h3>
      <p className="text-sm text-gray-600 mb-4">{question.helpText}</p>

      {question.type === 'textarea' ? (
        <textarea
          value={answers[question.key] || ''}
          onChange={(e) => handleAnswer(question.key, e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 h-24"
          placeholder={question.placeholder}
        />
      ) : (
        <input
          type="text"
          value={answers[question.key] || ''}
          onChange={(e) => handleAnswer(question.key, e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
          placeholder={question.placeholder}
        />
      )}

      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 font-semibold"
        >
          {currentStep === summaryQuestions.length - 1 ? '🤖 Generate Summary' : 'Next →'}
        </button>
      </div>
    </div>
  );
}
