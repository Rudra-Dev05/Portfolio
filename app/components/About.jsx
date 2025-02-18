'use client'
import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { HiCode, HiDatabase, HiCloud, HiChartBar, HiSparkles } from 'react-icons/hi';

const About = () => {
  const { isDarkMode } = useTheme();
  const { scrollY } = useScroll();
  const backgroundY = useSpring(useTransform(scrollY, [0, 500], [0, 150]));

  // Enhanced skills with additional details
  const skillCategories = [
    {
      title: "Data Science",
      icon: <HiDatabase className="w-6 h-6" />,
      skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn"],
      color: "from-blue-500 to-cyan-500",
      description: "Turning data chaos into insights",
      strength: 90
    },
    {
      title: "Development",
      icon: <HiCode className="w-6 h-6" />,
      skills: ["React", "Next.js", "Node.js", "TypeScript"],
      color: "from-purple-500 to-pink-500",
      description: "Building modern web applications",
      strength: 85
    },
    {
      title: "Cloud & DevOps",
      icon: <HiCloud className="w-6 h-6" />,
      skills: ["AWS", "Docker", "CI/CD", "Kubernetes"],
      color: "from-orange-500 to-red-500",
      description: "Deploying scalable cloud solutions",
      strength: 80
    },
    {
      title: "Analytics",
      icon: <HiChartBar className="w-6 h-6" />,
      skills: ["Power BI", "Tableau", "SQL", "Big Data"],
      color: "from-green-500 to-emerald-500",
      description: "Analyzing and visualizing data",
      strength: 75
    }
  ];

  const SkillCard = ({ category, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, rotate: 1 }}
      className="group relative"
    >
      {/* Glowing background effect */}
      <div className="absolute -inset-2 bg-gradient-to-r opacity-0 group-hover:opacity-100 
        blur-xl transition-all duration-500 group-hover:duration-200"
        style={{
          backgroundImage: `linear-gradient(45deg, 
            ${isDarkMode ? 'rgba(124, 58, 237, 0.1)' : 'rgba(124, 58, 237, 0.2)'} 0%,
            ${isDarkMode ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.2)'} 100%)`
        }}
      />

      {/* Main card content */}
      <div className={`relative p-6 rounded-2xl backdrop-blur-sm h-full
        ${isDarkMode ? 'bg-white/5' : 'bg-white/80'}
        border ${isDarkMode ? 'border-white/10' : 'border-black/5'}
        transition-all duration-300`}
      >
        {/* Card header */}
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className={`p-2 rounded-lg bg-gradient-to-br ${category.color}
              ${isDarkMode ? 'bg-opacity-20' : 'bg-opacity-10'}`}
          >
            {category.icon}
          </motion.div>
          <div>
            <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {category.title}
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {category.description}
            </p>
          </div>
        </div>

        {/* Skills list with hover effects */}
        <div className="space-y-2">
          {category.skills.map((skill, idx) => (
            <motion.div
              key={skill}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ x: 4 }}
              className={`py-2 px-3 rounded-lg text-sm font-medium
                ${isDarkMode 
                  ? 'bg-black/20 text-gray-300 hover:text-white' 
                  : 'bg-black/5 text-gray-600 hover:text-black'}
                transition-all duration-300 flex items-center justify-between`}
            >
              <span>{skill}</span>
              <HiSparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        {/* Strength indicator */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Proficiency</span>
            <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{category.strength}%</span>
          </div>
          <div className="h-1 rounded-full bg-gray-200/20">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${category.strength}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className={`min-h-screen py-20 relative overflow-hidden
      ${isDarkMode ? 'bg-black' : 'bg-white'}`} id="about">
      {/* Enhanced background effects */}
      <motion.div className="absolute inset-0">
        <div className={`absolute inset-0 bg-gradient-to-br 
          ${isDarkMode 
            ? 'from-violet-500/10 via-purple-500/10 to-blue-500/10' 
            : 'from-violet-100/50 via-purple-50/50 to-blue-50/50'}`}
        />
        {/* Add dynamic particles and other background effects */}
      </motion.div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header with enhanced animations */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-6
            ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Crafting Digital Magic ✨
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            With a blend of data science wizardry and full-stack sorcery, 
            I turn complex challenges into elegant solutions.
          </p>
        </motion.div>

        {/* Skills grid with enhanced card component */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
