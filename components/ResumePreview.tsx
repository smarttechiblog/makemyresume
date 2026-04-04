'use client';

import React from 'react';
import { ResumeData } from '@/types/resume';

interface ResumePreviewProps {
  data: ResumeData;
}

export default function ResumePreview({ data }: ResumePreviewProps) {
  const { personalInfo, aiGenerated, education, certifications, skills, languages, projects } = data;

  const bullets = aiGenerated.summaryBullets.length > 0
    ? aiGenerated.summaryBullets.map(b => b.content)
    : personalInfo.summary.split('\n').filter(l => l.trim());

  const skillsWithItems = skills.filter(s => s.skills.length > 0);

  return (
    <div
      id="resume-content"
      style={{
        fontFamily: '"Garet", "Segoe UI", Calibri, sans-serif',
        fontSize: '9pt',
        color: '#3D3D3D',
        width: '210mm',
        margin: '0 auto',
        display: 'flex',
        backgroundColor: '#fff',
        lineHeight: '1.4',
        padding: '10mm 0',
        boxSizing: 'border-box',
      }}
    >
      {/* ===== LEFT SIDEBAR ===== */}
      <div
        style={{
          width: '32%',
          backgroundColor: '#F0F8FF',
          color: '#3D3D3D',
          padding: '10mm 5mm',
          boxSizing: 'border-box',
          alignSelf: 'flex-start',
        }}
        className="print-sidebar"
      >
        {/* Photo */}
        {personalInfo.photo && (
          <div style={{ textAlign: 'center', marginBottom: '12px' }}>
            <img
              src={personalInfo.photo}
              alt={personalInfo.fullName}
              style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid rgba(45,95,95,0.3)',
              }}
            />
          </div>
        )}

        {/* Contact */}
        <SectionIconHeading icon="contact" size={14}>CONTACT</SectionIconHeading>
        <div style={{ fontSize: '8pt', lineHeight: '1.8', marginBottom: '12px', color: '#3D3D3D' }}>
          {personalInfo.phone && (
            <ContactItem icon="phone" text={personalInfo.phone} />
          )}
          {personalInfo.email && (
            <ContactItem icon="email" text={personalInfo.email} breakWord />
          )}
          {personalInfo.location && (
            <ContactItem icon="location" text={personalInfo.location} small />
          )}
          {personalInfo.linkedin && (
            <ContactItem icon="linkedin" text={personalInfo.linkedin} small breakWord />
          )}
          {personalInfo.github && (
            <ContactItem icon="github" text={personalInfo.github} small breakWord />
          )}
        </div>

        {/* Skills */}
        {skillsWithItems.length > 0 && (
          <>
            <SectionIconHeading icon="wrench" size={14}>SKILLS</SectionIconHeading>
            <div style={{ marginBottom: '12px' }}>
              {skillsWithItems.map((skillCategory, idx) => (
                <div key={idx} style={{ marginBottom: '7px' }}>
                  <div style={skillCategoryTitle}>{skillCategory.category}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                    {skillCategory.skills.map((skill, i) => (
                      <span key={i} style={skillTag}>{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <>
            <SectionIconHeading icon="award" size={14}>CERTIFICATIONS</SectionIconHeading>
            <div style={{ marginBottom: '10px' }}>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '5px' }}>
                  <div style={certName}>{cert.name}</div>
                  {cert.issuer && <div style={certIssuer}>{cert.issuer}</div>}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Education */}
        {education.length > 0 && (
          <>
            <SectionIconHeading icon="graduation-cap" size={14}>EDUCATION</SectionIconHeading>
            <div style={{ marginBottom: '10px' }}>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '6px' }}>
                  <div style={eduInstitution}>{edu.institution}</div>
                  <div style={eduDegree}>{edu.degree}</div>
                  {edu.year && <div style={eduYear}>{edu.year}</div>}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <>
            <SectionIconHeading icon="globe" size={14}>LANGUAGES</SectionIconHeading>
            <div style={{ fontSize: '9pt', color: '#3D3D3D' }}>
              {languages.map((lang, i) => (
                <div key={i} style={{ marginBottom: '6px' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>{lang.name}</div>
                  <div style={{ fontSize: '10pt', letterSpacing: '2px', color: '#2D5F5F' }}>
                    {renderStars(lang.proficiency)}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ===== RIGHT MAIN CONTENT ===== */}
      <div style={{ width: '68%', padding: '10mm 8mm', boxSizing: 'border-box' }}>
        {/* Name & Title */}
        <h1 style={mainHeading}>{personalInfo.fullName || 'Your Name'}</h1>
        <div style={subHeading}>{personalInfo.title || 'Your Professional Title'}</div>

        {/* Professional Summary */}
        {bullets.length > 0 && (
          <div style={{ marginBottom: '10px' }}>
            <SectionIconHeading icon="pen" size={16}>PROFESSIONAL SUMMARY</SectionIconHeading>
            <ul style={bulletList}>
              {bullets.map((line, i) => (
                <li key={i} style={bulletItem}>{line.trim()}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Work Experience */}
        {projects.length > 0 && (
          <>
            <SectionIconHeading icon="briefcase" size={16}>WORK EXPERIENCE</SectionIconHeading>
            {projects.map((project) => (
              <div key={project.id} style={expBlock}>
                <div style={expCompany}>{project.client} {project.duration && `| ${project.duration}`}</div>
                <div style={expRole}>{project.role}</div>
                {project.description && (
                  <div style={{ marginBottom: '4px' }}>
                    <div style={expProjectName}>{project.name ? `PROJECT: ${project.name}` : 'SUMMARY:'}</div>
                    {project.name && <div style={expProjectName}>SUMMARY:</div>}
                    <p style={expDesc}>{project.description}</p>
                  </div>
                )}
                {project.responsibilities && (
                  <div>
                    {project.responsibilities.split('\n').map((line, i) =>
                      line.trim() ? (
                        <p key={i} style={expResp}>{line.replace(/^[-•]\s*/, '')}</p>
                      ) : null
                    )}
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

// ===== STAR COMPONENT =====
const StarIcon: React.FC<{ filled: boolean; size?: number }> = ({ filled, size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? '#2D5F5F' : 'none'} stroke="#2D5F5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const renderStars = (proficiency: string) => {
  const prof = proficiency.toLowerCase();
  let filled: number;
  
  // Map proficiency text to star count (out of 5)
  if (prof.includes('native') || prof.includes('mother')) {
    filled = 5;
  } else if (prof.includes('fluent') || prof.includes('advanced')) {
    filled = 4;
  } else if (prof.includes('intermediate') || prof.includes('conversational') || prof.includes('professional')) {
    filled = 3;
  } else if (prof.includes('basic') || prof.includes('elementary') || prof.includes('beginner')) {
    filled = 2;
  } else if (prof.includes('familiar')) {
    filled = 1;
  } else {
    filled = 3; // Default
  }

  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(<StarIcon key={i} filled={i < filled} size={12} />);
  }
  return <>{stars}</>;
};

// ===== ICON COMPONENT =====
const SectionIcon: React.FC<{ icon: string; size?: number }> = ({ icon, size = 16 }) => {
  const icons: Record<string, React.ReactNode> = {
    'contact': (
      <><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>
    ),
    'pen': (
      <><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-2.895-2.895L16.376 3.622z"/><path d="m14 7 3 3"/></>
    ),
    'briefcase': (
      <><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>
    ),
    'wrench': (
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    ),
    'award': (
      <><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></>
    ),
    'graduation-cap': (
      <><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></>
    ),
    'globe': (
      <><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></>
    ),
    'phone': (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    ),
    'email': (
      <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></>
    ),
    'location': (
      <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></>
    ),
    'linkedin': (
      <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>
    ),
    'github': (
      <><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></>
    ),
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#2D5F5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      {icons[icon]}
    </svg>
  );
};

// ===== SECTION HEADING WITH ICON =====
const SectionIconHeading: React.FC<{ icon: string; size?: number; children: React.ReactNode }> = ({ icon, size, children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '5px' }}>
    <SectionIcon icon={icon} size={size} />
    <h2 style={sidebarHeading}>{children}</h2>
  </div>
);

// ===== CONTACT ITEM =====
const ContactItem: React.FC<{ icon: string; text: string; small?: boolean; breakWord?: boolean }> = ({ icon, text, small, breakWord }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
    <SectionIcon icon={icon} size={12} />
    <span style={small ? { fontSize: '7.5pt', fontFamily: 'Calibri, sans-serif' } : {}}>{breakWord ? <span style={{ wordBreak: 'break-all' }}>{text}</span> : text}</span>
  </div>
);

// ===== STYLES =====
const sidebarHeading: React.CSSProperties = {
  fontSize: '12pt',
  fontWeight: 'bold',
  color: '#2D5F5F',
  margin: 0,
  letterSpacing: '0.5px',
};

const skillCategoryTitle: React.CSSProperties = {
  fontSize: '8pt',
  fontWeight: 'bold',
  color: '#2D5F5F',
  marginBottom: '3px',
};

const skillTag: React.CSSProperties = {
  fontSize: '7pt',
  color: '#3D3D3D',
  padding: '1px 6px',
  borderRadius: '2px',
  lineHeight: '1.3',
};

const certName: React.CSSProperties = {
  fontSize: '9pt',
  color: '#2D5F5F',
  fontWeight: 'bold',
};

const certIssuer: React.CSSProperties = {
  fontSize: '7.5pt',
  color: '#555',
};

const eduInstitution: React.CSSProperties = {
  fontSize: '6.8pt',
  lineHeight: '1.3',
  color: '#555',
};

const eduDegree: React.CSSProperties = {
  fontSize: '10pt',
  fontWeight: 'bold',
  color: '#2D5F5F',
  margin: '2px 0 1px 0',
};

const eduYear: React.CSSProperties = {
  fontSize: '8pt',
  color: '#555',
};

const mainHeading: React.CSSProperties = {
  fontFamily: 'Calibri, "Segoe UI", sans-serif',
  fontSize: '30pt',
  fontWeight: 'bold',
  color: '#000000',
  margin: '0 0 2px 0',
  lineHeight: '1.1',
};

const subHeading: React.CSSProperties = {
  fontFamily: '"Garet", "Segoe UI", sans-serif',
  fontSize: '14pt',
  color: '#000000',
  marginBottom: '8px',
};

const bulletList: React.CSSProperties = {
  margin: 0,
  paddingLeft: '16px',
  listStyleType: 'disc',
};

const bulletItem: React.CSSProperties = {
  fontSize: '9pt',
  color: '#3D3D3D',
  marginBottom: '3px',
  lineHeight: '1.5',
  fontFamily: 'Georgia, "Times New Roman", serif',
};

const expBlock: React.CSSProperties = {
  marginBottom: '10px',
};

const expCompany: React.CSSProperties = {
  fontSize: '9.5pt',
  fontWeight: 'bold',
  color: '#3D3D3D',
  marginBottom: '1px',
};

const expRole: React.CSSProperties = {
  fontSize: '9.5pt',
  fontWeight: 'bold',
  color: '#3D3D3D',
  marginBottom: '4px',
};

const expProjectName: React.CSSProperties = {
  fontSize: '9pt',
  fontWeight: 'bold',
  color: '#2D5F5F',
  marginBottom: '2px',
};

const expDesc: React.CSSProperties = {
  fontFamily: '"Poppins", "Segoe UI", sans-serif',
  fontWeight: 300,
  fontSize: '7.5pt',
  color: '#737383',
  margin: '0 0 3px 0',
  lineHeight: '1.45',
};

const expResp: React.CSSProperties = {
  fontFamily: '"Poppins", "Segoe UI", sans-serif',
  fontWeight: 300,
  fontSize: '7.5pt',
  color: '#737383',
  margin: '0 0 1px 0',
  lineHeight: '1.4',
};
