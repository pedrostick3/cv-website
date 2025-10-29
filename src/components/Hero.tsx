import React, { useState, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

const Hero: React.FC = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const titles = ['Flutter Fullstack Developer', 'AI Engineer', 'IoT Developer', 'Electronics Innovator'];

  useEffect(() => {
    const handleType = () => {
      const current = titles[loopNum % titles.length];
      const updatedText = isDeleting 
        ? current.substring(0, text.length - 1)
        : current.substring(0, text.length + 1);

      setText(updatedText);

      if (isDeleting) {
        setTypingSpeed(75);
      } else {
        setTypingSpeed(150);
      }

      if (!isDeleting && updatedText === current) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, titles]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 transform animate-fade-in-up">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-700 dark:text-gray-300">JD</span>
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent animate-fade-in-up">
            Pedro Afonso D'Além Dionísio
          </h1>

          <div className="text-2xl md:text-3xl text-gray-300 mb-8 h-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <span className="border-r-2 border-blue-400 pr-1 animate-pulse">
              {text}
            </span>
          </div>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            Passionate developer creating innovative solutions from mobile apps to AI systems and IoT devices. 
            "When I grow up I want to be an inventor scientist and I want to improve people's lives!"
          </p>

          <div className="flex justify-center space-x-6 mb-16 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
            <a href="https://github.com/pedrostick3" className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 transform hover:scale-110 group">
              <Github className="w-6 h-6 text-gray-300 group-hover:text-white" />
            </a>
            <a href="https://linkedin.com/in/pedro-dionisio" className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 transform hover:scale-110 group">
              <Linkedin className="w-6 h-6 text-gray-300 group-hover:text-blue-400" />
            </a>
            <a href="mailto:pedrostick3@gmail.com" className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 transform hover:scale-110 group">
              <Mail className="w-6 h-6 text-gray-300 group-hover:text-green-400" />
            </a>
          </div>

          <div className="animate-bounce">
            <ChevronDown className="w-8 h-8 text-gray-400 mx-auto cursor-pointer hover:text-blue-400 transition-colors duration-300" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;