import React from 'react';
import { Code2, Lightbulb, Target, Zap } from 'lucide-react';

const About: React.FC = () => {
  const highlights = [
    {
      icon: Code2,
      title: 'Full Stack Mastery',
      description: 'Flutter, .NET Core, AI, and IoT development expertise'
    },
    {
      icon: Lightbulb,
      title: 'AI Innovation',
      description: 'Azure AI, OpenAI, LangChain, and custom AI solutions'
    },
    {
      icon: Target,
      title: 'IoT Solutions',
      description: 'Smart devices, sensors, and embedded systems development'
    },
    {
      icon: Zap,
      title: 'Electronics Design',
      description: 'PCB design, circuit development, and hardware integration'
    }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="text-lg text-gray-300 leading-relaxed space-y-4">
                <p>
                  I'm a passionate Flutter Fullstack Developer at InspireIT with expertise spanning mobile 
                  development, AI systems, and IoT devices. From Portugal, I bring ideas to life through 
                  innovative solutions that bridge software and hardware.
                </p>
                <p>
                  My journey includes developing smart home systems, AI-powered applications, and complex 
                  IoT devices. I've completed my Computer Engineering degree in just 2 years while working 
                  full-time, demonstrating my commitment to continuous learning and excellence.
                </p>
                <p>
                  With experience in everything from PCB design to AI model fine-tuning, I create 
                  comprehensive solutions that improve people's lives. My motto remains the same since 
                  childhood: "I want to be an inventor scientist and improve people's lives!"
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <highlight.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{highlight.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;