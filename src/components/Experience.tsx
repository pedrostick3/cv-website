import React from 'react';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

const Experience: React.FC = () => {
  const experiences = [
    {
      title: 'Flutter Fullstack Software Developer',
      company: 'InspireIT',
      location: 'Caparica, Portugal',
      period: 'July 2021 - Present',
      description: 'Mobile applications development with Flutter, server-level development with .NET Core, C#, WebAPI, SQL Server and Docker. Firmware level development for IoT with C/C++.',
      achievements: [
        'Developed layered architectures and support tasks',
        'Implemented Agile methodologies (Kanban and Scrum)',
        'Version control with Git and Bitbucket, documentation with Confluence'
      ],
      technologies: ['Flutter', 'Dart', '.NET Core', 'C#', 'SQL Server', 'Docker', 'C/C++']
    },
    {
      title: 'AI Projects Developer',
      company: 'InspireIT',
      location: 'Caparica, Portugal',
      period: 'July 2024 - Present',
      description: 'Leading AI initiatives including RAG systems, data extraction, and automation solutions using Azure AI and OpenAI technologies.',
      achievements: [
        'PoC RAG - Q&A system for email threads with attachments',
        'AI data extraction from Excel and CSV files',
        'UiPath Communications Mining + Task Mining integration'
      ],
      technologies: ['Python', 'Azure OpenAI', 'LangChain', 'UiPath', 'Computer Vision']
    },
    {
      title: 'Developer of Programmable Electronic Devices',
      company: 'Bluenergy',
      location: 'Lisboa, Portugal',
      period: 'August 2019 - August 2021',
      description: 'Independent part-time work developing consumption monitoring systems, electrical circuits, and IoT devices while completing my degree.',
      achievements: [
        'Developed SmartHome and BluSensor systems',
        'Created PCB designs and SMD component welding',
        'Implemented C/C++ programming for Arduino platforms'
      ],
      technologies: ['C/C++', 'Arduino', 'PCB Design', 'IoT', 'Electronics']
    }
  ];

  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Experience
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-600"></div>

            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative mb-16 ${
                  index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full left-5 md:left-1/2 transform md:-translate-x-1/2 border-4 border-slate-900"></div>

                <div className="ml-16 md:ml-0 group">
                  <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2 text-blue-400">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">{exp.period}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{exp.location}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                    <h4 className="text-xl text-purple-400 mb-4 flex items-center">
                      {exp.company}
                      <ExternalLink className="w-4 h-4 ml-2 opacity-60" />
                    </h4>

                    <p className="text-gray-300 mb-6 leading-relaxed">{exp.description}</p>

                    <div className="mb-6">
                      <h5 className="text-sm font-semibold text-blue-400 mb-3">Key Achievements:</h5>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="text-gray-300 text-sm flex items-start">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs font-medium bg-blue-500/20 text-blue-300 rounded-full border border-blue-400/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
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

export default Experience;