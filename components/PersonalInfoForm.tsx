'use client';

import React from 'react';
import { PersonalInfo, AISummaryBullet, TechnicalProfileSkill } from '@/types/resume';
import SummaryBuilder from '@/components/SummaryBuilder';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  aiSummaryBullets: AISummaryBullet[];
  aiTechnicalProfile: TechnicalProfileSkill[];
  aiNotableAchievement: string;
  onChange: (data: PersonalInfo) => void;
  onAIGeneratedChange: (bullets: AISummaryBullet[], profile: TechnicalProfileSkill[], achievement: string) => void;
}

export default function PersonalInfoForm({ data, aiSummaryBullets, aiTechnicalProfile, aiNotableAchievement, onChange, onAIGeneratedChange }: PersonalInfoFormProps) {
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-primary border-b-2 border-primary pb-2">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Full Name *</label>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => onChange({ ...data, fullName: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Professional Title *</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary"
            placeholder="Senior .NET Developer"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Email *</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Phone *</label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary"
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Location</label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => onChange({ ...data, location: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary"
            placeholder="City, State, Country"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">LinkedIn</label>
          <input
            type="text"
            value={data.linkedin}
            onChange={(e) => onChange({ ...data, linkedin: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary"
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">GitHub</label>
          <input
            type="text"
            value={data.github}
            onChange={(e) => onChange({ ...data, github: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary"
            placeholder="github.com/johndoe"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Professional Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-semibold">Professional Summary</label>
        </div>
        <SummaryBuilder
          currentBullets={aiSummaryBullets}
          currentProfile={aiTechnicalProfile}
          currentAchievement={aiNotableAchievement}
          onChange={onAIGeneratedChange}
        />
        <textarea
          value={data.summary}
          onChange={(e) => onChange({ ...data, summary: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary h-32 mt-2"
          placeholder="Brief summary of your professional background and key strengths..."
        />
      </div>
    </div>
  );
}
