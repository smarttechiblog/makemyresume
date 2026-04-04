'use client';

import React, { useState } from 'react';
import { ResumeData, AISummaryBullet, Skill } from '@/types/resume';
import ResumePreview from '@/components/ResumePreview';

interface ResumeTemplateEditorProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

type Section = 'personal' | 'summary' | 'skills' | 'experience' | 'education' | 'certifications' | 'languages';

const defaultSkills: Skill[] = [];

const sections: { key: Section; label: string; icon: string }[] = [
  { key: 'personal', label: 'Personal Info', icon: '👤' },
  { key: 'summary', label: 'Summary', icon: '📝' },
  { key: 'skills', label: 'Technical Skills', icon: '🛠️' },
  { key: 'experience', label: 'Experience', icon: '💼' },
  { key: 'education', label: 'Education', icon: '🎓' },
  { key: 'certifications', label: 'Certifications', icon: '🏆' },
  { key: 'languages', label: 'Languages', icon: '🌐' },
];

export default function ResumeTemplateEditor({ data, onChange }: ResumeTemplateEditorProps) {
  const [activeSection, setActiveSection] = useState<Section>('personal');
  const [skillInputs, setSkillInputs] = useState<Record<number, string>>({});
  const [collapsedSections, setCollapsedSections] = useState<Record<Section, boolean>>({
    personal: false,
    summary: false,
    skills: false,
    experience: false,
    education: false,
    certifications: false,
    languages: false,
  });
  const { personalInfo, aiGenerated, education, certifications, skills, languages, projects } = data;
  const previewRef = React.useRef<HTMLDivElement>(null);
  const tabletPreviewRef = React.useRef<HTMLDivElement>(null);
  const mobilePreviewRef = React.useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = React.useState(1);
  const [tabletPreviewScale, setTabletPreviewScale] = React.useState(1);
  const [mobilePreviewScale, setMobilePreviewScale] = React.useState(1);
  const [showPreview, setShowPreview] = useState(false);

  const toggleSection = (section: Section) => {
    setCollapsedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Auto-scale preview to fit container
  React.useEffect(() => {
    const updateScale = () => {
      if (!previewRef.current) return;
      const containerWidth = previewRef.current.parentElement?.clientWidth || 0;
      const resumeWidthMm = 210;
      const pxPerMm = 96 / 25.4;
      const resumeWidthPx = resumeWidthMm * pxPerMm;
      const padding = 48;
      const scale = containerWidth > 0 ? Math.min(1, (containerWidth - padding) / resumeWidthPx) : 1;
      setPreviewScale(scale);
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (previewRef.current?.parentElement) observer.observe(previewRef.current.parentElement);
    window.addEventListener('resize', updateScale);
    return () => { observer.disconnect(); window.removeEventListener('resize', updateScale); };
  }, []);

  // Auto-scale tablet preview
  React.useEffect(() => {
    const updateScale = () => {
      if (!tabletPreviewRef.current) return;
      const containerWidth = tabletPreviewRef.current.parentElement?.clientWidth || 0;
      const resumeWidthMm = 210;
      const pxPerMm = 96 / 25.4;
      const resumeWidthPx = resumeWidthMm * pxPerMm;
      const padding = 32;
      const scale = containerWidth > 0 ? Math.min(1, (containerWidth - padding) / resumeWidthPx) : 1;
      setTabletPreviewScale(scale);
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (tabletPreviewRef.current?.parentElement) observer.observe(tabletPreviewRef.current.parentElement);
    return () => { observer.disconnect(); };
  }, [showPreview]);

  // Auto-scale mobile preview
  React.useEffect(() => {
    const updateScale = () => {
      if (!mobilePreviewRef.current) return;
      const containerWidth = mobilePreviewRef.current.parentElement?.clientWidth || 0;
      const resumeWidthMm = 210;
      const pxPerMm = 96 / 25.4;
      const resumeWidthPx = resumeWidthMm * pxPerMm;
      const padding = 24;
      const scale = containerWidth > 0 ? Math.min(1, (containerWidth - padding) / resumeWidthPx) : 1;
      setMobilePreviewScale(scale);
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (mobilePreviewRef.current?.parentElement) observer.observe(mobilePreviewRef.current.parentElement);
    return () => { observer.disconnect(); };
  }, [showPreview]);

  const activeSkills = skills.length > 0 ? skills : defaultSkills;

  // ---- Section Editors ----

  const renderPersonal = () => {
    const pi = personalInfo;
    const set = (updates: Partial<typeof pi>) => onChange({ ...data, personalInfo: { ...pi, ...updates } });
    return (
      <div className="space-y-5">
        <FormGrid>
          <Field label="Full Name" value={pi.fullName} onChange={v => set({ fullName: v })} placeholder="John Doe" />
          <Field label="Professional Title" value={pi.title} onChange={v => set({ title: v })} placeholder="Senior Software Engineer" />
          <Field label="Email" value={pi.email} onChange={v => set({ email: v })} placeholder="john.doe@example.com" />
          <Field label="Phone" value={pi.phone} onChange={v => set({ phone: v })} placeholder="+1 000-000-0000" />
          <Field label="Location" value={pi.location} onChange={v => set({ location: v })} placeholder="City, Country" />
          <Field label="LinkedIn" value={pi.linkedin} onChange={v => set({ linkedin: v })} placeholder="linkedin.com/in/..." />
          <Field label="GitHub" value={pi.github} onChange={v => set({ github: v })} placeholder="github.com/..." />
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Photo</label>
            <input type="file" accept="image/*" onChange={e => {
              const file = e.target.files?.[0];
              if (file) { const r = new FileReader(); r.onloadend = () => set({ photo: r.result as string }); r.readAsDataURL(file); }
            }} className="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-gray-100 file:text-sm file:font-medium file:cursor-pointer hover:file:bg-gray-200" />
            {pi.photo && <button onClick={() => set({ photo: '' })} className="mt-1 text-xs text-red-500 hover:text-red-700">Remove photo</button>}
          </div>
        </FormGrid>
      </div>
    );
  };

  const renderSummary = () => (
    <div className="space-y-5">
      <p className="text-sm text-gray-500 -mt-1">Each line becomes a bullet point in your resume.</p>
      <div className="space-y-3">
        {aiGenerated.summaryBullets.map((bullet, i) => (
          <div key={bullet.id} className="flex gap-3 items-start group">
            <span className="mt-3 text-xs font-bold text-gray-400 w-5 flex-shrink-0">{i + 1}</span>
            <textarea
              value={bullet.content}
              onChange={e => {
                const u = [...aiGenerated.summaryBullets];
                u[i] = { ...bullet, content: e.target.value };
                onChange({ ...data, aiGenerated: { ...aiGenerated, summaryBullets: u } });
              }}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none h-16"
              placeholder="Enter a summary point..."
            />
            <button
              onClick={() => onChange({ ...data, aiGenerated: { ...aiGenerated, summaryBullets: aiGenerated.summaryBullets.filter((_, j) => j !== i) } })}
              className="mt-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all"
            >
              <TrashIcon />
            </button>
          </div>
        ))}
        <button
          onClick={() => onChange({ ...data, aiGenerated: { ...aiGenerated, summaryBullets: [...aiGenerated.summaryBullets, { id: Date.now().toString(), label: '', content: '' }] } })}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <PlusIcon /> Add Summary Point
        </button>
      </div>
    </div>
  );

  const renderSkills = () => (
      <div className="space-y-5">
        <div className="flex items-center justify-end">
          <button
            onClick={() => onChange({ ...data, skills: [...(skills.length > 0 ? skills : []), { category: 'New Category', skills: [] }] })}
            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 flex items-center gap-2"
          >
            <PlusIcon /> Category
          </button>
        </div>
        {skills.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">No skills added yet.</p>
            <p className="text-sm mt-1">Click "Category" to add your first skill category.</p>
          </div>
        )}
        <div className="space-y-4">
          {skills.map((cat, ci) => (
            <div key={ci} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <input
                  value={cat.category}
                  onChange={e => {
                    const u = [...skills]; u[ci] = { ...u[ci], category: e.target.value };
                    onChange({ ...data, skills: u });
                  }}
                  className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-semibold bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <button
                  onClick={() => { const u = skills.filter((_, i) => i !== ci); onChange({ ...data, skills: u }); }}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <TrashIcon />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {cat.skills.map((skill, si) => (
                  <span key={si} className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700">
                    {skill}
                    <button
                      onClick={() => {
                        const u = [...skills]; u[ci] = { ...u[ci], skills: u[ci].skills.filter((_, j) => j !== si) };
                        onChange({ ...data, skills: u });
                      }}
                      className="text-gray-400 hover:text-red-500 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Type a skill and press Enter..."
                  value={skillInputs[ci] || ''}
                  onChange={e => setSkillInputs({ ...skillInputs, [ci]: e.target.value })}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const val = (skillInputs[ci] || '').trim();
                      if (!val) return;
                      const u = [...skills]; u[ci] = { ...u[ci], skills: [...u[ci].skills, val] };
                      onChange({ ...data, skills: u });
                      setSkillInputs({ ...skillInputs, [ci]: '' });
                    }
                  }}
                />
                <button
                  onClick={() => {
                    const val = (skillInputs[ci] || '').trim();
                    if (!val) return;
                    const u = [...skills]; u[ci] = { ...u[ci], skills: [...u[ci].skills, val] };
                    onChange({ ...data, skills: u });
                    setSkillInputs({ ...skillInputs, [ci]: '' });
                  }}
                  className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
  );

  const renderExperience = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-end">
        <button
          onClick={() => onChange({ ...data, projects: [...projects, { id: Date.now().toString(), name: '', client: '', duration: '', role: '', technologies: '', description: '', responsibilities: '' }] })}
          className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 flex items-center gap-2"
        >
          <PlusIcon /> Experience
        </button>
      </div>
      <div className="space-y-4">
        {projects.map((p, idx) => (
          <div key={p.id} className="p-5 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-500">Experience #{idx + 1}</span>
              <button
                onClick={() => onChange({ ...data, projects: projects.filter((_, i) => i !== idx) })}
                className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
              >
                Remove
              </button>
            </div>
            <FormGrid>
              <Field label="Company / Client" value={p.client} onChange={v => { const u = [...projects]; u[idx] = { ...p, client: v }; onChange({ ...data, projects: u }); }} placeholder="TechCorp Solutions" />
              <Field label="Duration" value={p.duration} onChange={v => { const u = [...projects]; u[idx] = { ...p, duration: v }; onChange({ ...data, projects: u }); }} placeholder="Jan 2020 - Present" />
              <Field label="Role / Title" value={p.role} onChange={v => { const u = [...projects]; u[idx] = { ...p, role: v }; onChange({ ...data, projects: u }); }} placeholder="Senior Software Engineer" />
              <Field label="Project Name (optional)" value={p.name} onChange={v => { const u = [...projects]; u[idx] = { ...p, name: v }; onChange({ ...data, projects: u }); }} placeholder="Cloud Migration Platform" />
            </FormGrid>
            <FieldBlock label="Project Summary" value={p.description} onChange={v => { const u = [...projects]; u[idx] = { ...p, description: v }; onChange({ ...data, projects: u }); }} rows={3} placeholder="Brief description of the project..." />
            <FieldBlock label="Roles & Responsibilities" value={p.responsibilities} onChange={v => { const u = [...projects]; u[idx] = { ...p, responsibilities: v }; onChange({ ...data, projects: u }); }} rows={6} placeholder="One responsibility per line..." />
          </div>
        ))}
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-end">
        <button
          onClick={() => onChange({ ...data, education: [...education, { id: Date.now().toString(), degree: '', institution: '', year: '' }] })}
          className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 flex items-center gap-2"
        >
          <PlusIcon /> Education
        </button>
      </div>
      {education.map((edu, i) => (
        <div key={edu.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-500">#{i + 1}</span>
            <button onClick={() => onChange({ ...data, education: education.filter((_, j) => j !== i) })} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"><TrashIcon /></button>
          </div>
          <FormGrid>
            <Field label="Degree" value={edu.degree} onChange={v => { const u = [...education]; u[i] = { ...edu, degree: v }; onChange({ ...data, education: u }); }} placeholder="Bachelor of Science in Computer Science" />
            <Field label="Institution" value={edu.institution} onChange={v => { const u = [...education]; u[i] = { ...edu, institution: v }; onChange({ ...data, education: u }); }} placeholder="State University" />
            <Field label="Year" value={edu.year} onChange={v => { const u = [...education]; u[i] = { ...edu, year: v }; onChange({ ...data, education: u }); }} placeholder="2016 - 2020" />
          </FormGrid>
        </div>
      ))}
    </div>
  );

  const renderCertifications = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-end">
        <button
          onClick={() => onChange({ ...data, certifications: [...certifications, { id: Date.now().toString(), name: '', issuer: '', year: '' }] })}
          className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 flex items-center gap-2"
        >
          <PlusIcon /> Certification
        </button>
      </div>
      {certifications.map((cert, i) => (
        <div key={cert.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-500">#{i + 1}</span>
            <button onClick={() => onChange({ ...data, certifications: certifications.filter((_, j) => j !== i) })} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"><TrashIcon /></button>
          </div>
          <FormGrid>
            <Field label="Certification" value={cert.name} onChange={v => { const u = [...certifications]; u[i] = { ...cert, name: v }; onChange({ ...data, certifications: u }); }} placeholder="AWS Solutions Architect" />
            <Field label="Issuer" value={cert.issuer} onChange={v => { const u = [...certifications]; u[i] = { ...cert, issuer: v }; onChange({ ...data, certifications: u }); }} placeholder="Amazon Web Services" />
            <Field label="Year" value={cert.year} onChange={v => { const u = [...certifications]; u[i] = { ...cert, year: v }; onChange({ ...data, certifications: u }); }} placeholder="2024" />
          </FormGrid>
        </div>
      ))}
    </div>
  );

  const renderLanguages = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-end">
        <button
          onClick={() => onChange({ ...data, languages: [...languages, { name: '', proficiency: '' }] })}
          className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 flex items-center gap-2"
        >
          <PlusIcon /> Language
        </button>
      </div>
      {languages.map((lang, i) => (
        <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-500">#{i + 1}</span>
            <button onClick={() => onChange({ ...data, languages: languages.filter((_, j) => j !== i) })} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"><TrashIcon /></button>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Language</label>
              <input
                type="text"
                value={lang.name}
                onChange={e => { const u = [...languages]; u[i] = { ...lang, name: e.target.value }; onChange({ ...data, languages: u }); }}
                placeholder="Spanish"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Proficiency</label>
              <StarRating
                rating={lang.proficiency === 'Native' ? 5 : lang.proficiency === 'Fluent' ? 4 : lang.proficiency === 'Advanced' ? 3 : lang.proficiency === 'Intermediate' ? 2 : lang.proficiency === 'Beginner' ? 1 : 0}
                onChange={rating => {
                  const proficiencyMap: Record<number, string> = {
                    0: '',
                    1: 'Beginner',
                    2: 'Intermediate',
                    3: 'Advanced',
                    4: 'Fluent',
                    5: 'Native'
                  };
                  const u = [...languages];
                  u[i] = { ...lang, proficiency: proficiencyMap[rating] };
                  onChange({ ...data, languages: u });
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    const isCollapsed = collapsedSections[activeSection];
    return (
      <div>
        <CollapsibleSection
          icon={sections.find(s => s.key === activeSection)!.icon}
          title={sections.find(s => s.key === activeSection)!.label}
          isCollapsed={isCollapsed}
          onToggle={() => toggleSection(activeSection)}
        >
          {!isCollapsed && (
            <>
              {activeSection === 'personal' && renderPersonal()}
              {activeSection === 'summary' && renderSummary()}
              {activeSection === 'skills' && renderSkills()}
              {activeSection === 'experience' && renderExperience()}
              {activeSection === 'education' && renderEducation()}
              {activeSection === 'certifications' && renderCertifications()}
              {activeSection === 'languages' && renderLanguages()}
            </>
          )}
        </CollapsibleSection>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Desktop Layout: Sidebar + Editor + Preview (≥1280px) */}
      <div className="hidden xl:flex" style={{ minHeight: 'calc(100vh - 80px)' }}>
        {/* Left Sidebar - Section Navigation */}
        <div className="w-56 bg-white border-r border-gray-200 flex-shrink-0 overflow-y-auto">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Sections</h2>
          </div>
          <nav className="p-2 space-y-0.5">
            {sections.map(s => (
              <div key={s.key} className="group">
                <div className="flex items-center">
                  <button
                    onClick={() => setActiveSection(s.key)}
                    className={`flex-1 flex items-center gap-2.5 px-3 py-2 rounded-l-lg text-sm font-medium transition-all ${
                      activeSection === s.key
                        ? 'bg-blue-50 text-blue-700 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>{s.icon}</span>
                    {s.label}
                  </button>
                  <button
                    onClick={() => toggleSection(s.key)}
                    className={`p-2 rounded-r-lg text-gray-400 hover:text-gray-600 transition-all ${
                      activeSection === s.key ? 'bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <ChevronIcon expanded={!collapsedSections[s.key]} />
                  </button>
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Center - Editor */}
        <div className="w-5/12 overflow-y-auto bg-gray-50 border-r border-gray-200">
          <div className="p-6 max-w-2xl mx-auto">
            {renderContent()}
          </div>
        </div>

        {/* Right - Live Preview */}
        <div ref={previewRef} className="flex-1 overflow-y-auto bg-gray-200 p-6 flex items-start justify-center">
          <div
            className="shadow-2xl rounded overflow-hidden origin-top"
            style={{
              width: '210mm',
              transform: `scale(${previewScale})`,
              transformOrigin: 'top center',
            }}
          >
            <ResumePreview data={data} />
          </div>
        </div>
      </div>

      {/* Tablet Layout: Tabs + Editor (768px - 1279px) */}
      <div className="xl:hidden lg:block">
        {/* Horizontal Scrollable Tabs */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center overflow-x-auto px-2 py-1 gap-1 scrollbar-hide">
            {sections.map(s => (
              <button
                key={s.key}
                onClick={() => setActiveSection(s.key)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeSection === s.key
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>{s.icon}</span>
                <span className="whitespace-nowrap">{s.label}</span>
              </button>
            ))}
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`flex-shrink-0 ml-auto flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                showPreview ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>👁️</span>
              <span>Preview</span>
            </button>
          </div>
        </div>

        {/* Editor + Preview */}
        {showPreview ? (
          <div ref={tabletPreviewRef} className="p-4 bg-gray-200 flex items-start justify-center">
            <div
              className="shadow-2xl rounded overflow-hidden origin-top"
              style={{
                width: '210mm',
                transform: `scale(${tabletPreviewScale})`,
                transformOrigin: 'top center',
              }}
            >
              <ResumePreview data={data} />
            </div>
          </div>
        ) : (
          <div className="p-4 max-w-3xl mx-auto">
            {renderContent()}
          </div>
        )}
      </div>

      {/* Mobile Layout: Compact Tabs + Editor/Preview Toggle (<768px) */}
      <div className="lg:hidden">
        {/* Compact Tab Bar */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center overflow-x-auto px-1 py-1 gap-0.5 scrollbar-hide">
            {sections.map(s => (
              <button
                key={s.key}
                onClick={() => setActiveSection(s.key)}
                className={`flex-shrink-0 flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg text-xs font-medium transition-all min-w-[56px] ${
                  activeSection === s.key
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <span className="text-base">{s.icon}</span>
                <span className="whitespace-nowrap truncate max-w-[56px]">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Editor */}
        {!showPreview ? (
          <div className="p-3">
            {renderContent()}
          </div>
        ) : (
          <div className="p-3 bg-gray-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-gray-700">Resume Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="px-3 py-1 text-xs font-medium text-gray-600 bg-white rounded-lg border hover:bg-gray-50"
              >
                ← Back to Editor
              </button>
            </div>
            <div ref={mobilePreviewRef} className="flex items-start justify-center overflow-x-auto">
              <div
                className="shadow-2xl rounded overflow-hidden bg-white"
                style={{
                  width: '210mm',
                  transform: `scale(${mobilePreviewScale})`,
                  transformOrigin: 'top left',
                }}
              >
                <ResumePreview data={data} />
              </div>
            </div>
          </div>
        )}

        {/* Floating Preview Toggle (Mobile) */}
        {!showPreview && (
          <button
            onClick={() => setShowPreview(true)}
            className="fixed bottom-6 right-6 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

// ---- Reusable UI Components ----

function SectionTitle({ icon, title, subtitle }: { icon: string; title: string; subtitle?: string }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
        <span>{icon}</span> {title}
      </h2>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
}

function FormGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>;
}

function Field({ label, value, onChange, placeholder, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
      />
    </div>
  );
}

function FieldBlock({ label, value, onChange, rows = 4, placeholder }: { label: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none bg-white"
      />
    </div>
  );
}

function PlusIcon() {
  return <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>;
}

function TrashIcon() {
  return <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      className={`w-4 h-4 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function CollapsibleSection({
  icon,
  title,
  isCollapsed,
  onToggle,
  children,
}: {
  icon: string;
  title: string;
  isCollapsed: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
      >
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <span>{icon}</span> {title}
        </h2>
        <ChevronIcon expanded={!isCollapsed} />
      </button>
      {!isCollapsed && (
        <div className="px-5 pb-5 border-t border-gray-100 pt-5">
          {children}
        </div>
      )}
    </div>
  );
}

function StarRating({ rating, onChange }: { rating: number; onChange: (rating: number) => void }) {
  const labels = ['', 'Beginner', 'Intermediate', 'Advanced', 'Fluent', 'Native'];
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            onClick={() => onChange(star)}
            className="transition-all hover:scale-110"
          >
            <svg
              className={`w-7 h-7 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        ))}
      </div>
      <span className="text-sm font-medium text-gray-600 min-w-[90px]">
        {labels[rating] || ''}
      </span>
    </div>
  );
}
