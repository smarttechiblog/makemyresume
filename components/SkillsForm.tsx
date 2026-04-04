'use client';

import React from 'react';
import { Skill } from '@/types/resume';

interface SkillsFormProps {
  skills: Skill[];
  onChange: (data: Skill[]) => void;
}

const defaultSkills: Skill[] = [
  {
    category: 'Programming Languages & Frameworks',
    skills: ['.NET Framework', '.NET Core', 'ASP.NET MVC', 'ASP.NET Web API', 'ASP.NET Core', 'C#', 'VB.NET', 'Entity Framework', 'Entity Framework Core', 'LINQ', 'ADO.NET']
  },
  {
    category: 'Frontend Technologies',
    skills: ['Angular', 'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Blazor', 'Razor Pages', 'jQuery', 'Bootstrap', 'Tailwind CSS', 'Next.js']
  },
  {
    category: 'Cloud & DevOps',
    skills: ['Microsoft Azure', 'Google Cloud Platform (GCP)', 'AWS', 'Azure DevOps', 'Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions', 'Terraform', 'ARM Templates']
  },
  {
    category: 'AI & Machine Learning',
    skills: ['Azure AI Services', 'OpenAI API', 'ML.NET', 'Azure Machine Learning', 'TensorFlow', 'LangChain', 'Semantic Kernel', 'AI Prompt Engineering', 'RAG (Retrieval Augmented Generation)', 'Vector Databases']
  },
  {
    category: 'Databases',
    skills: ['SQL Server', 'Azure SQL Database', 'PostgreSQL', 'MySQL', 'Cosmos DB', 'Redis', 'MongoDB', 'Elasticsearch']
  },
  {
    category: 'Architecture & Patterns',
    skills: ['Microservices', 'RESTful APIs', 'GraphQL', 'gRPC', 'Event-Driven Architecture', 'CQRS', 'Domain-Driven Design', 'SOLID Principles', 'Design Patterns', 'Clean Architecture']
  },
  {
    category: 'Messaging & Integration',
    skills: ['Azure Service Bus', 'Azure Event Grid', 'Azure Event Hubs', 'RabbitMQ', 'Kafka', 'SignalR', 'Azure Logic Apps', 'Azure Functions']
  },
  {
    category: 'Testing & Quality',
    skills: ['xUnit', 'NUnit', 'MSTest', 'Moq', 'SpecFlow', 'Playwright', 'Selenium', 'Postman', 'SonarQube']
  },
  {
    category: 'Tools & Methodologies',
    skills: ['Visual Studio', 'VS Code', 'Git', 'Azure Boards', 'Jira', 'Agile/Scrum', 'SAFe', 'OAuth 2.0', 'JWT', 'OpenID Connect']
  }
];

export default function SkillsForm({ skills, onChange }: SkillsFormProps) {
  const [selectedSkills, setSelectedSkills] = React.useState<Skill[]>(skills.length > 0 ? skills : defaultSkills);
  const [newSkillInput, setNewSkillInput] = React.useState<Record<number, string>>({});

  React.useEffect(() => {
    onChange(selectedSkills);
  }, [selectedSkills, onChange]);

  const toggleSkill = (categoryIndex: number, skill: string) => {
    const updated = [...selectedSkills];
    const categorySkills = updated[categoryIndex].skills;
    const index = categorySkills.indexOf(skill);
    if (index > -1) {
      updated[categoryIndex] = { ...updated[categoryIndex], skills: categorySkills.filter(s => s !== skill) };
    } else {
      updated[categoryIndex] = { ...updated[categoryIndex], skills: [...categorySkills, skill] };
    }
    setSelectedSkills(updated);
  };

  const addCustomSkill = (categoryIndex: number) => {
    const skill = newSkillInput[categoryIndex]?.trim();
    if (!skill) return;
    const updated = [...selectedSkills];
    updated[categoryIndex] = { ...updated[categoryIndex], skills: [...updated[categoryIndex].skills, skill] };
    setSelectedSkills(updated);
    setNewSkillInput({ ...newSkillInput, [categoryIndex]: '' });
  };

  const removeSkill = (categoryIndex: number, skill: string) => {
    const updated = [...selectedSkills];
    updated[categoryIndex] = { ...updated[categoryIndex], skills: updated[categoryIndex].skills.filter(s => s !== skill) };
    setSelectedSkills(updated);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-primary border-b-2 border-primary pb-2">Technical Skills</h2>
      <p className="text-sm text-gray-600">Select or add skills you have experience with. Click on skills to toggle.</p>
      
      <div className="grid grid-cols-1 gap-4">
        {selectedSkills.map((skillCategory, catIndex) => (
          <div key={catIndex} className="p-4 bg-gray-50 rounded-lg border">
            <h3 className="font-bold text-primary mb-3">{skillCategory.category}</h3>
            <div className="flex flex-wrap gap-2">
              {skillCategory.skills.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  onClick={() => toggleSkill(catIndex, skill)}
                  className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-all ${
                    skillCategory.skills.includes(skill)
                      ? 'bg-secondary text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {skill} ✕
                </span>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={newSkillInput[catIndex] || ''}
                onChange={(e) => setNewSkillInput({ ...newSkillInput, [catIndex]: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && addCustomSkill(catIndex)}
                className="flex-1 px-3 py-1 border rounded-lg text-sm"
                placeholder="Add custom skill..."
              />
              <button
                onClick={() => addCustomSkill(catIndex)}
                className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
