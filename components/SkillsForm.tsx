'use client';

import React from 'react';
import { Skill } from '@/types/resume';

interface SkillsFormProps {
  skills: Skill[];
  onChange: (data: Skill[]) => void;
}

const defaultSkills: Skill[] = [];

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

  const addCategory = () => {
    const newCategory: Skill = { category: 'New Category', skills: [] };
    const updated = [...selectedSkills, newCategory];
    setSelectedSkills(updated);
  };

  const removeCategory = (categoryIndex: number) => {
    const updated = selectedSkills.filter((_, i) => i !== categoryIndex);
    setSelectedSkills(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary border-b-2 border-primary pb-2">Technical Skills</h2>
          <p className="text-sm text-gray-600 mt-2">Add skill categories and your expertise.</p>
        </div>
        <button
          onClick={addCategory}
          className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
        >
          + Add Category
        </button>
      </div>

      {selectedSkills.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg">No skills added yet.</p>
          <p className="text-sm mt-1">Click "Add Category" to create your first skill category.</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {selectedSkills.map((skillCategory, catIndex) => (
          <div key={catIndex} className="p-4 bg-gray-50 rounded-lg border">
            <div className="flex items-center justify-between mb-3">
              <input
                type="text"
                value={skillCategory.category}
                onChange={(e) => {
                  const updated = [...selectedSkills];
                  updated[catIndex] = { ...updated[catIndex], category: e.target.value };
                  setSelectedSkills(updated);
                }}
                className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-semibold bg-white"
                placeholder="Category name"
              />
              <button
                onClick={() => removeCategory(catIndex)}
                className="ml-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"
              >
                ✕
              </button>
            </div>
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
