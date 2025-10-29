import React from 'react';
import { GraduationCap, Award, Calendar, MapPin } from 'lucide-react';

const Education: React.FC = () => {
  const education = [
    {
      degree: 'Computer Engineering (Software Branch)',
      institution: 'Polytechnic Institute of Setúbal',
      location: 'Setúbal, Portugal',
      period: '2019 - 2021',
      grade: 'Final Grade: 15/20',
      credits: '180 ECTS',
      description: 'Completed 3-year degree in 2 years while working full-time. Specialized in software development, AI, and web technologies.',
      highlights: [
        'Completed degree in 2 years instead of 3',
        'Worked full-time during studies',
        'Specialized in Object-Oriented Programming',
        'Advanced Web Programming with Node.js and MongoDB'
      ],
      type: 'degree'
    },
    {
      degree: 'Professional Senior Technician in Electronic and Computer Systems',
      institution: 'Polytechnic Institute of Setúbal',
      location: 'Setúbal, Portugal',
      period: '2016 - 2019',
      grade: 'Final Grade: 16/20',
      credits: 'EQF Level 5',
      description: 'Comprehensive program covering electronics, programming, and computer systems with hands-on projects.',
      highlights: [
        'Signal Acquisition and Processing',
        'Microcontrollers (Arduino) Programming',
        'Object Oriented Programming (Java)',
        'Computer Networks and Sensor Networks'
      ],
      type: 'technical'
    },
    {
      degree: 'Electronics, Automation and Command Technician',
      institution: 'INETE',
      location: 'Lisboa, Portugal',
      period: '2013 - 2016',
      grade: 'Final Grade: 17/20',
      credits: 'EQF Level 4',
      description: 'Foundation in electronics, automation, and programming with focus on practical applications.',
      highlights: [
        'Digital and Analog Electronics',
        'Microcontrollers Programming (C/C++)',
        'Industrial and Mobile Robotics',
        'PCB Design and Electronic Circuit Analysis'
      ],
      type: 'technical'
    }
  ];

  const certifications = [
    {
      title: 'Dart - Advanced Course',
      provider: 'Udemy',
      date: '2022',
      topics: ['Async Programming', 'Encryption', 'Socket Programming', 'Database Programming']
    },
    {
      title: 'Flutter Development Course',
      provider: 'Udemy',
      date: '2021',
      topics: ['Flutter Fundamentals', 'State Management', 'Authentication', 'Native Resources']
    },
    {
      title: 'Co-Care Health Apps Development',
      provider: 'Polytechnic Institute of Setúbal',
      date: '2021',
      topics: ['Health ICT', 'Co-creation Methodology', 'Alzheimer\'s Care Apps']
    },
    {
      title: 'Digital Marketing Certificate',
      provider: 'Google',
      date: '2017',
      topics: ['Digital Marketing', 'Analytics', 'SEO', 'Online Advertising']
    }
  ];

  return (
    <section id="education" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Education & Certifications
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          </div>

          {/* Education Timeline */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Academic Background</h3>
            <div className="relative">
              <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-600"></div>

              {education.map((edu, index) => (
                <div
                  key={index}
                  className={`relative mb-12 ${
                    index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
                  }`}
                >
                  <div className="absolute w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full left-5 md:left-1/2 transform md:-translate-x-1/2 border-4 border-slate-900"></div>

                  <div className="ml-16 md:ml-0">
                    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                        <div className="flex items-center space-x-2 text-blue-400">
                          <Calendar className="w-4 h-4" />
                          <span className="font-medium">{edu.period}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{edu.location}</span>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 mb-4">
                        <GraduationCap className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{edu.degree}</h3>
                          <h4 className="text-lg text-purple-400 mb-2">{edu.institution}</h4>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 mb-4 text-sm">
                        <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full border border-green-400/30">
                          {edu.grade}
                        </span>
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full border border-blue-400/30">
                          {edu.credits}
                        </span>
                      </div>

                      <p className="text-gray-300 mb-4 leading-relaxed">{edu.description}</p>

                      <div className="space-y-2">
                        {edu.highlights.map((highlight, i) => (
                          <div key={i} className="flex items-start text-sm text-gray-300">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            {highlight}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Grid */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Professional Certifications</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white mb-1">{cert.title}</h4>
                      <p className="text-purple-400 mb-2">{cert.provider}</p>
                      <p className="text-sm text-gray-400 mb-3">{cert.date}</p>
                      <div className="flex flex-wrap gap-2">
                        {cert.topics.map((topic, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs bg-gray-700/50 text-gray-300 rounded-md"
                          >
                            {topic}
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
      </div>
    </section>
  );
};

export default Education;