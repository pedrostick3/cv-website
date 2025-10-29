import React, { useState } from 'react';
import { ExternalLink, Github, Eye } from 'lucide-react';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = [
    {
      title: 'PoC RAG - AI Email Assistant',
      description: 'Question/Answer system for email threads with attachments using Azure OpenAI and LangChain for intelligent document processing.',
      image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Python', 'Azure OpenAI', 'LangChain', 'RAG', 'VectorDB'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      title: 'SmartHome IoT System',
      description: 'Complete smart home solution with electrical panel control, power measurement, and mobile app interface for lights and floor heaters.',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['C/C++', 'Arduino', 'ESP32', 'MIT App Inventor', 'IoT'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      title: 'BluSensor Power Monitor',
      description: 'IoT power consumption sensor with light beam measurement, automatic API integration, email notifications, and battery charging capability.',
      image: 'https://images.pexels.com/photos/159201/circuit-circuit-board-resistor-computer-159201.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['C/C++', 'Arduino', 'MongoDB', 'API Integration', 'PCB Design'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      title: 'DrVidaPocket Medical Device',
      description: 'Compact medical device for PCR testing with automatic result detection, app integration, and National Health System reporting.',
      image: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['C/C++', 'ESP32', 'Medical IoT', 'API Integration', 'Healthcare'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    }
  ];

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 ${
                  project.featured ? 'lg:col-span-2 lg:grid lg:grid-cols-2' : ''
                }`}
                onMouseEnter={() => setSelectedProject(index)}
                onMouseLeave={() => setSelectedProject(null)}
              >
                <div className={`relative overflow-hidden ${project.featured ? 'lg:order-2' : ''}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 lg:h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Overlay on hover */}
                  <div className={`absolute inset-0 bg-blue-600/20 backdrop-blur-sm flex items-center justify-center space-x-4 transition-all duration-300 ${
                    selectedProject === index ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <button className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 transform hover:scale-110">
                      <Eye className="w-6 h-6 text-white" />
                    </button>
                    <a
                      href={project.liveUrl}
                      className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
                    >
                      <ExternalLink className="w-6 h-6 text-white" />
                    </a>
                    <a
                      href={project.githubUrl}
                      className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
                    >
                      <Github className="w-6 h-6 text-white" />
                    </a>
                  </div>
                </div>

                <div className={`p-8 ${project.featured ? 'lg:order-1 lg:flex lg:flex-col lg:justify-center' : ''}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-medium bg-purple-500/20 text-purple-300 rounded-full border border-purple-400/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <a
                      href={project.liveUrl}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm font-medium">Live Demo</span>
                    </a>
                    <a
                      href={project.githubUrl}
                      className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white rounded-lg transition-all duration-300 backdrop-blur-sm"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm font-medium">Code</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;