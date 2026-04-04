'use client';

import React, { useState, useRef } from 'react';
import PersonalInfoForm from '@/components/PersonalInfoForm';
import EducationForm from '@/components/EducationForm';
import SkillsForm from '@/components/SkillsForm';
import ProjectsForm from '@/components/ProjectsForm';
import ResumePreview from '@/components/ResumePreview';
import ResumeTemplateEditor from '@/components/ResumeTemplateEditor';
import { ResumeData } from '@/types/resume';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: 'YOUR FULL NAME',
    title: 'Your Professional Title',
    email: 'your.email@example.com',
    phone: '+1 000-000-0000',
    location: 'City, Country',
    linkedin: '',
    github: '',
    summary: 'Brief professional summary highlighting your key experience, skills, and achievements. Focus on what makes you stand out as a professional.',
    photo: ''
  },
  aiGenerated: {
    summaryBullets: [],
    technicalProfile: [],
    notableAchievement: ''
  },
  education: [
    {
      id: '1',
      degree: 'Bachelor of Technology (ECE)',
      institution: 'Saint Theressa of Engineering and Technology (Affiliated to JNTU)',
      year: '2004 - 2008'
    }
  ],
  certifications: [
    { id: '1', name: 'AZ-104', issuer: 'Microsoft', year: '' },
    { id: '2', name: 'AZ-400', issuer: 'Microsoft', year: '' }
  ],
  skills: [],
  languages: [
    { name: 'English', proficiency: 'Conversational' },
    { name: 'Hindi', proficiency: 'Conversational' },
    { name: 'Telugu', proficiency: 'Native' }
  ],
  projects: [
    {
      id: '1',
      name: 'AQX PRODUCT',
      client: 'ANAQUA LLP',
      duration: 'Sep. 2019 - Present',
      role: 'Senior Software Engineer',
      technologies: '.NET Core, C#, Azure, Angular, JavaScript',
      description: 'The system enhances business productivity by providing a comprehensive IP infrastructure integrated with critical systems. Key features include patent planning tools for innovation and budgeting, portfolio management tools for strategic decision-making, and operational reports on costs and performance.',
      responsibilities: 'Worked on client reported issues and enhancements\nQuick adaptability on new processes and implementations of version tools like Git, DevOps, CI & CD pipelines\nBuilding and maintaining client version upgrades by building Azure functions\nParticipated in innovation challenges\nWorked on both front end, backend and databases on new and legacy systems'
    },
    {
      id: '2',
      name: 'GURU ACCOUNT MANAGER',
      client: 'SCHEMAX TECH. PVT. LTD.',
      duration: 'Nov. 2018 - Sep. 2019',
      role: 'Senior DotNet Developer',
      technologies: 'Web API, JavaScript, Angular',
      description: 'Web-based electronic document management system designed to store, manage and access all types of electronic documents, files and records.',
      responsibilities: 'Application module level maintenance\nWorking on new enhancements\nFixing client reported bugs and team collaborations\nWorked on both front end and backend SQL Server on legacy systems\nParticipated in database SQL query optimizations'
    },
    {
      id: '3',
      name: 'CLINICAL DOCUMENT IMPROVEMENT',
      client: 'PENA4 TECH PVT. LTD',
      duration: 'May. 2017 - Nov. 2018',
      role: 'Senior DotNet Developer',
      technologies: '.NET, C#, ML.Net, SQL Server',
      description: 'A CMI-focused application enables facilities to track, target, and forecast financial impacts across various categories. It generates concurrent CMI analysis reports that include trending, distribution, and benchmarking results. Reports cover overall CMI impact, physician report cards, service report cards, ALOS, top DRGs, and utilization analysis.',
      responsibilities: 'Application module level maintenance\nWorking on new enhancements\nFixing client reported bugs and team collaborations\nWorked on both front end and backend SQL Server on legacy systems\nParticipated in database SQL query optimizations'
    },
    {
      id: '4',
      name: 'MARTJACK PLUS',
      client: 'INNVECTRA SOFTTECH PVT. LTD',
      duration: 'May 2012 - March 2016',
      role: 'Senior Software Engineer',
      technologies: '.NET, C#, SQL Server',
      description: 'It provides service to advertise and sell their products online. It provides SAAS to the merchants. It provides end to end transaction information and also tracks the order information. Also, provides easy integration of logistics and payment gateway services provides search engine optimization with faster indexes and optimized queries.',
      responsibilities: 'Application module level maintenance\nWorking on new enhancements\nFixing client reported bugs and team collaborations\nWorked on both front end and backend SQL Server on legacy systems\nParticipated in database SQL query optimizations'
    },
    {
      id: '5',
      name: 'ANAQUA PRODUCT',
      client: 'CAPILLARY TECHNOLOGIES',
      duration: 'Apr. 2016 - Feb. 2017',
      role: 'Senior Software Engineer',
      technologies: '.NET, C#, Azure, SQL Server',
      description: 'The system enhances business productivity by providing a comprehensive IP infrastructure integrated with critical systems. Key features include patent planning tools for innovation and budgeting, portfolio management tools for strategic decision-making, and operational reports on costs and performance.',
      responsibilities: 'Application module level maintenance\nWorking on new enhancements\nFixing client reported bugs and team collaborations\nWorked on both front end and backend SQL Server on legacy systems\nParticipated in database SQL query optimizations'
    },
    {
      id: '6',
      name: 'READINET AND READICOM SERVICES',
      client: 'YANTRA SOFTTECH PVT. LTD',
      duration: 'Sep. 2011 - Apr. 2012',
      role: 'SQL Developer',
      technologies: '.NET, SQL Server',
      description: 'Readinet and ReadiCom Services is a web based CRM and ERP Application. This interacts with the database and generates the reports of payroll for the clients working employees for specified period of time durations mentioned as dates selected in the application. It is a business purpose development application where various clients and their customers would be interacting in a daily basis.',
      responsibilities: 'Application module level maintenance\nWorking on new enhancements\nFixing client reported bugs and team collaborations\nWorked on both front end and backend SQL Server on legacy systems\nParticipated in database SQL query optimizations'
    },
    {
      id: '7',
      name: 'SARVA SHIKSHA ABHIYAN',
      client: 'ECENTRIC SOLUTIONS PVT. LTD',
      duration: 'Feb. 2011 - Aug. 2011',
      role: 'Software Developer',
      technologies: 'ASP.NET, GIS, Oracle Database',
      description: 'Sarva Shiksha Abiyan project is developed for State Government of Andhra Pradesh. It mainly aims to track schools geographically where located in the State of Andhra Pradesh using GIS. The main feature of this project is that the user can able to see where the schools are located and can track the details by Village, Mandal and District. There are reports which the higher officials like the collectors can export and can see the different schools list in different location.',
      responsibilities: 'Application module level maintenance\nWorking on new enhancements\nFixing client reported bugs and team collaborations\nWorked on both front end and backend SQL Server on legacy systems\nParticipated in database SQL query optimizations'
    },
    {
      id: '8',
      name: 'ECHANNEL',
      client: 'ECENTRIC SOLUTIONS PVT. LTD',
      duration: 'Mar. 2009 - Feb. 2011',
      role: 'Software Developer',
      technologies: 'ASP.NET, SQL Server',
      description: 'It is a tool that tracks employee complete information and to maintain data for future purpose. Also, available for employees to access and generate the payslips and to manage their leave requests.',
      responsibilities: 'Design, develop and coordinating among the team members in developing modules using .NET\nInvolved in designing the Database\nUsed Validation Controls in ASP.NET for validating Front-end form\nCreated front end interfaces using ASP.NET\nInvolved in migrating the application from lower version to higher version\nInvolved in Designing Database Tables and Relationships'
    }
  ]
};

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');
  const [activeSection, setActiveSection] = useState(0);
  const resumeRef = useRef<HTMLDivElement>(null);

  const tabs = ['AI Summary', 'Personal Info', 'Education & Certs', 'Skills', 'Projects'];

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
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab('form')}
            className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
              activeTab === 'form'
                ? 'bg-secondary text-white shadow'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            ✏️ Form Editor
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
              activeTab === 'preview'
                ? 'bg-secondary text-white shadow'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            📝 Template Editor
          </button>
          <button
            onClick={exportToPDF}
            className="px-5 py-2.5 rounded-lg font-semibold text-sm bg-green-500 text-white hover:bg-green-600 transition-all"
          >
            📥 Export PDF
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="print:hidden pb-12">
        {activeTab === 'form' ? (
          <div className="max-w-7xl mx-auto mt-6 px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-4 sticky top-6">
                  <h3 className="font-bold text-lg mb-4 text-primary">Sections</h3>
                  {tabs.map((tab, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSection(index)}
                      className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-all ${
                        activeSection === index
                          ? 'bg-secondary text-white font-semibold'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  {activeSection === 0 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-primary border-b-2 border-primary pb-2">🤖 AI Summary Builder</h2>
                      <p className="text-gray-600">Answer a few questions to generate your Professional Summary.</p>
                      <PersonalInfoForm
                        data={resumeData.personalInfo}
                        aiSummaryBullets={resumeData.aiGenerated.summaryBullets}
                        aiTechnicalProfile={resumeData.aiGenerated.technicalProfile}
                        aiNotableAchievement={resumeData.aiGenerated.notableAchievement}
                        onChange={(data) => setResumeData({ ...resumeData, personalInfo: data })}
                        onAIGeneratedChange={(bullets, profile, achievement) =>
                          setResumeData({ ...resumeData, aiGenerated: { summaryBullets: bullets, technicalProfile: profile, notableAchievement: achievement } })
                        }
                      />
                    </div>
                  )}
                  {activeSection === 1 && (
                    <PersonalInfoForm
                      data={resumeData.personalInfo}
                      aiSummaryBullets={resumeData.aiGenerated.summaryBullets}
                      aiTechnicalProfile={resumeData.aiGenerated.technicalProfile}
                      aiNotableAchievement={resumeData.aiGenerated.notableAchievement}
                      onChange={(data) => setResumeData({ ...resumeData, personalInfo: data })}
                      onAIGeneratedChange={(bullets, profile, achievement) =>
                        setResumeData({ ...resumeData, aiGenerated: { summaryBullets: bullets, technicalProfile: profile, notableAchievement: achievement } })
                      }
                    />
                  )}
                  {activeSection === 2 && (
                    <EducationForm
                      education={resumeData.education}
                      certifications={resumeData.certifications}
                      onEducationChange={(data) => setResumeData({ ...resumeData, education: data })}
                      onCertificationsChange={(data) => setResumeData({ ...resumeData, certifications: data })}
                    />
                  )}
                  {activeSection === 3 && (
                    <SkillsForm
                      skills={resumeData.skills}
                      onChange={(data) => setResumeData({ ...resumeData, skills: data })}
                    />
                  )}
                  {activeSection === 4 && (
                    <ProjectsForm
                      projects={resumeData.projects}
                      onChange={(data) => setResumeData({ ...resumeData, projects: data })}
                    />
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8 pt-6 border-t">
                    <button
                      onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
                      disabled={activeSection === 0}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                    >
                      ← Previous
                    </button>
                    <button
                      onClick={() => setActiveSection(Math.min(4, activeSection + 1))}
                      disabled={activeSection === 4}
                      className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ResumeTemplateEditor
            data={resumeData}
            onChange={setResumeData}
          />
        )}
      </div>
    </div>
  );
}
