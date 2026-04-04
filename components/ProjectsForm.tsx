'use client';

import React from 'react';
import { Project } from '@/types/resume';

interface ProjectsFormProps {
  projects: Project[];
  onChange: (data: Project[]) => void;
}

export default function ProjectsForm({ projects, onChange }: ProjectsFormProps) {
  const addProject = () => {
    onChange([...projects, {
      id: Date.now().toString(),
      name: '',
      client: '',
      duration: '',
      role: '',
      technologies: '',
      description: '',
      responsibilities: ''
    }]);
  };

  const removeProject = (id: string) => {
    onChange(projects.filter(p => p.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    onChange(projects.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-primary border-b-2 border-primary pb-2">Projects & Experience</h2>
      <p className="text-sm text-gray-600">Add your projects with roles and responsibilities. The resume will auto-format everything.</p>
      
      {projects.map((project, index) => (
        <div key={project.id} className="p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-primary">Project #{index + 1}</h3>
            <button
              onClick={() => removeProject(project.id)}
              className="text-red-500 hover:text-red-700 font-bold text-xl"
            >
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Project Name *</label>
              <input
                type="text"
                value={project.name}
                onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="E-Commerce Platform"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Client/Company *</label>
              <input
                type="text"
                value={project.client}
                onChange={(e) => updateProject(project.id, 'client', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="ABC Corporation"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Duration *</label>
              <input
                type="text"
                value={project.duration}
                onChange={(e) => updateProject(project.id, 'duration', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Jan 2023 - Present"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Your Role *</label>
              <input
                type="text"
                value={project.role}
                onChange={(e) => updateProject(project.id, 'role', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Lead .NET Developer"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Technologies Used *</label>
            <input
              type="text"
              value={project.technologies}
              onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder=".NET Core, Angular, Azure, SQL Server, Redis"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Project Description</label>
            <textarea
              value={project.description}
              onChange={(e) => updateProject(project.id, 'description', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg h-24"
              placeholder="Brief description of the project and its purpose..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Roles & Responsibilities</label>
            <textarea
              value={project.responsibilities}
              onChange={(e) => updateProject(project.id, 'responsibilities', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg h-32"
              placeholder={"• Led a team of 8 developers...\n• Architected microservices-based solution...\n• Implemented CI/CD pipelines...\n• Mentored junior developers..."}
            />
            <p className="text-xs text-gray-500 mt-1">Use bullet points (•) for each responsibility</p>
          </div>
        </div>
      ))}

      <button
        onClick={addProject}
        className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-blue-600 font-semibold"
      >
        + Add Project
      </button>
    </div>
  );
}
