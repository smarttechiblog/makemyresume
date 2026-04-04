export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  summary: string;
  photo: string;
}

export interface AISummaryBullet {
  id: string;
  label: string;
  content: string;
}

export interface TechnicalProfileSkill {
  category: string;
  skills: string;
}

export interface AIGeneratedSection {
  summaryBullets: AISummaryBullet[];
  technicalProfile: TechnicalProfileSkill[];
  notableAchievement: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface Skill {
  category: string;
  skills: string[];
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  duration: string;
  role: string;
  technologies: string;
  description: string;
  responsibilities: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  aiGenerated: AIGeneratedSection;
  education: Education[];
  certifications: Certification[];
  skills: Skill[];
  languages: Language[];
  projects: Project[];
}
