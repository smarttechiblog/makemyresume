'use client';

import React, { useState } from 'react';
import ResumeTemplateEditor from '@/components/ResumeTemplateEditor';
import ResumePreview from '@/components/ResumePreview';
import { ResumeData } from '@/types/resume';

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    summary: '',
    photo: ''
  },
  aiGenerated: {
    summaryBullets: [],
    technicalProfile: [],
    notableAchievement: ''
  },
  education: [],
  certifications: [],
  skills: [],
  languages: [],
  projects: []
};

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);

  const exportToPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Hidden print-only resume */}
      <div className="hidden print:block print:w-full print:m-0 print:p-0">
        <ResumePreview data={resumeData} />
      </div>

      {/* Header */}
      <header className="print:hidden bg-primary text-white p-4 shadow-lg flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">📄 Professional Resume Builder</h1>
          <p className="text-blue-200 text-sm mt-1">Create your professional resume</p>
        </div>
        <button
          onClick={exportToPDF}
          className="px-5 py-2.5 rounded-lg font-semibold text-sm bg-green-500 text-white hover:bg-green-600 transition-all"
        >
          📥 Export PDF
        </button>
      </header>

      {/* Main Content - Template Editor Only */}
      <div className="print:hidden">
        <ResumeTemplateEditor
          data={resumeData}
          onChange={setResumeData}
        />
      </div>
    </div>
  );
}
