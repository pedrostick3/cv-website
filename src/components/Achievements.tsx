import React from 'react';
import { Trophy, Star, Target, Zap, Award, BookOpen } from 'lucide-react';

const Achievements: React.FC = () => {
  const achievements = [
    {
      icon: Trophy,
      title: 'Contest Winner',
      description: '1st place in "Faqtos" robotics contest, 2nd place in "RoboParty"',
      category: 'Competition',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Star,
      title: 'Academic Excellence',
      description: 'Completed 3-year Computer Engineering degree in just 2 years while working full-time',
      category: 'Education',
      color: 'from-blue-400 to-purple-500'
    },
    {
      icon: BookOpen,
      title: 'Published Author',
      description: 'Published article on Medium: "Integrate UniLinks with Flutter" - comprehensive guide',
      category: 'Publication',
      color: 'from-green-400 to-blue-500'
    },
    {
      icon: Award,
      title: 'Perfect Attendance',
      description: 'Certificates of Attendance and Merit for 3 consecutive years with 0 absences',
      category: 'Recognition',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: Target,
      title: 'Project Portfolio',
      description: '15+ completed projects spanning IoT, mobile apps, AI systems, and electronics',
      category: 'Portfolio',
      color: 'from-cyan-400 to-blue-500'
    },
    {
      icon: Zap,
      title: 'Innovation Leader',
      description: 'Featured in "Robótica Nº 105" magazine for innovative PAP project',
      category: 'Innovation',
      color: 'from-orange-400 to-red-500'
    }
  ];

  const languages = [
    { language: 'Portuguese', level: 'Native', flag: '🇵🇹' },
    { language: 'English', level: 'C1 Proficient', flag: '🇬🇧' },
    { language: 'Italian', level: 'B1 Independent', flag: '🇮🇹' },
    { language: 'Spanish', level: 'B1 Independent', flag: '🇪🇸' }
  ];

  return (
    <section id="achievements" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Achievements & Languages
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          </div>

          {/* Achievements Grid */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Key Achievements</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${achievement.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <achievement.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                      {achievement.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-3">{achievement.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Languages Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Language Proficiency</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {languages.map((lang, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 text-center group"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {lang.flag}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{lang.language}</h4>
                  <p className="text-blue-400 font-medium">{lang.level}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;