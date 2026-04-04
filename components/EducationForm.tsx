'use client';

import React from 'react';
import { Education, Certification } from '@/types/resume';

interface EducationFormProps {
  education: Education[];
  certifications: Certification[];
  onEducationChange: (data: Education[]) => void;
  onCertificationsChange: (data: Certification[]) => void;
}

export default function EducationForm({ 
  education, 
  certifications, 
  onEducationChange, 
  onCertificationsChange 
}: EducationFormProps) {
  const addEducation = () => {
    onEducationChange([...education, { id: Date.now().toString(), degree: '', institution: '', year: '' }]);
  };

  const removeEducation = (id: string) => {
    onEducationChange(education.filter(e => e.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onEducationChange(education.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const addCertification = () => {
    onCertificationsChange([...certifications, { id: Date.now().toString(), name: '', issuer: '', year: '' }]);
  };

  const removeCertification = (id: string) => {
    onCertificationsChange(certifications.filter(c => c.id !== id));
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    onCertificationsChange(certifications.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary border-b-2 border-primary pb-2 mb-4">Education</h2>
        {education.map((edu, index) => (
          <div key={edu.id} className="mb-4 p-4 bg-gray-50 rounded-lg border">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Education #{index + 1}</h3>
              <button
                onClick={() => removeEducation(edu.id)}
                className="text-red-500 hover:text-red-700 font-bold"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                className="px-3 py-2 border rounded-lg"
                placeholder="Degree (e.g., B.Tech Computer Science)"
              />
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                className="px-3 py-2 border rounded-lg"
                placeholder="Institution Name"
              />
              <input
                type="text"
                value={edu.year}
                onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                className="px-3 py-2 border rounded-lg"
                placeholder="Year of Passing"
              />
            </div>
          </div>
        ))}
        <button
          onClick={addEducation}
          className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-blue-600"
        >
          + Add Education
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-primary border-b-2 border-primary pb-2 mb-4">Certifications</h2>
        {certifications.map((cert, index) => (
          <div key={cert.id} className="mb-4 p-4 bg-gray-50 rounded-lg border">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Certification #{index + 1}</h3>
              <button
                onClick={() => removeCertification(cert.id)}
                className="text-red-500 hover:text-red-700 font-bold"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                value={cert.name}
                onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                className="px-3 py-2 border rounded-lg"
                placeholder="Certification Name"
              />
              <input
                type="text"
                value={cert.issuer}
                onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                className="px-3 py-2 border rounded-lg"
                placeholder="Issuing Organization"
              />
              <input
                type="text"
                value={cert.year}
                onChange={(e) => updateCertification(cert.id, 'year', e.target.value)}
                className="px-3 py-2 border rounded-lg"
                placeholder="Year"
              />
            </div>
          </div>
        ))}
        <button
          onClick={addCertification}
          className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-blue-600"
        >
          + Add Certification
        </button>
      </div>
    </div>
  );
}
