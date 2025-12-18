import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Terminal, Cpu, BrainCircuit } from 'lucide-react';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('home');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const projects = [
    {
      title: "sEMG Motor Intention Recognition",
      year: "2025",
      description: "Applying signal-processing and feature-engineering methods to preprocess sEMG data for post-stroke motor intention recognition. Designing deep learning models (CNN, LSTM, GNN) for neurorehabilitation integration with real-time embedded deployment.",
      tags: ["PyTorch", "CNN", "LSTM", "GNN", "TinyML"],
      github: "#",
      paper: "#"
    },
    {
      title: "Full-Day Sleep Stage Classifier",
      year: "2025",
      description: "Trained a CNN-LSTM in PyTorch to classify five sleep stages from brainwave and muscle activity data of 153 subjects. Built an MNE preprocessing pipeline for 8.1 GB of data and achieved 73.6% accuracy with 12% improvement over baseline.",
      tags: ["PyTorch", "CNN-LSTM", "MNE", "Streamlit"],
      github: "#",
      writeup: "#"
    },
    {
      title: "NEOFFI Personality Trait Regressor",
      year: "2025",
      description: "Led a 3-member team to build a CNN pipeline predicting Big Five personality traits from resting-state fMRI data of 1,200 subjects. Applied Yeo-17 parcellation and PCA, achieving 41.9 MSE with 11.8% improvement over Random Forest baseline.",
      tags: ["PyTorch", "CNN", "fMRI", "scikit-learn"],
      github: "#",
      writeup: "#"
    },
    {
      title: "Verbatim - Live Text-to-Speech Tool",
      year: "2025",
      description: "Developed a Python tool that converts live camera text to speech using computer vision. Built functional prototype in 24 hours with a 4-member team. Won 2nd place at Hack Without Borders UofT hackathon.",
      tags: ["Python", "OpenCV", "EasyOCR", "pyttsx3"],
      github: "#",
      writeup: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white py-16 relative overflow-hidden">
      {/* Animated mesh gradient background with parallax */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(100, 150, 200, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            transform: `translate(${mousePos.x * 0.01}px, ${mousePos.y * 0.01}px)`
          }}
        />
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(120, 160, 200, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(120, 160, 200, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            transform: `translate(${mousePos.x * -0.015}px, ${mousePos.y * -0.015}px)`
          }}
        />
      </div>

      {/* Organic floating elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-xl transition-all duration-700 ease-out"
            style={{
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              background: `radial-gradient(circle, rgba(${100 + i * 15}, ${140 + i * 10}, ${180 + i * 5}, 0.08), transparent)`,
              left: `${5 + i * 8}%`,
              top: `${10 + (i % 5) * 18}%`,
              transform: `translate(${(mousePos.x - window.innerWidth / 2) * (0.01 + i * 0.005)}px, ${(mousePos.y - window.innerHeight / 2) * (0.01 + i * 0.005)}px) translateY(${scrollY * (0.05 + i * 0.01)}px)`,
            }}
          />
        ))}
      </div>

      {/* Dynamic gradient orb following cursor with smooth lag */}
      <div 
        className="fixed w-[600px] h-[600px] rounded-full pointer-events-none blur-3xl transition-all duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(100, 150, 220, 0.15), rgba(140, 180, 240, 0.05), transparent)',
          left: mousePos.x - 300,
          top: mousePos.y - 300,
          opacity: 0.6
        }}
      />

      {/* Subtle corner accents */}
      <div 
        className="fixed top-6 left-6 w-16 h-16 rounded-tl-2xl border-l-2 border-t-2 border-slate-500/20 transition-all duration-500"
        style={{
          transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)`
        }}
      />
      <div 
        className="fixed top-6 right-6 w-16 h-16 rounded-tr-2xl border-r-2 border-t-2 border-slate-500/20 transition-all duration-500"
        style={{
          transform: `translate(${mousePos.x * -0.02}px, ${mousePos.y * 0.02}px)`
        }}
      />

      <div className="max-w-3xl mx-auto px-8 relative z-10">
        
        {/* Header with inline tabs */}
        <div className="flex items-center gap-8 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center shadow-lg">
              <Terminal className="w-5 h-5 text-slate-200" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Karma Namgyal</h1>
          </div>
          <div className="flex gap-6 text-sm">
            <button 
              onClick={() => setActiveTab('home')}
              className={`transition-all relative ${activeTab === 'home' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              Home
              {activeTab === 'home' && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-500 to-slate-400" />
              )}
            </button>
            <button 
              onClick={() => setActiveTab('about')}
              className={`transition-all relative ${activeTab === 'about' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              About
              {activeTab === 'about' && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-500 to-slate-400" />
              )}
            </button>
            <button 
              onClick={() => setActiveTab('projects')}
              className={`transition-all relative ${activeTab === 'projects' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              Projects
              {activeTab === 'projects' && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-500 to-slate-400" />
              )}
            </button>
          </div>
        </div>

        {/* Containerized Content */}
        <div 
          className="border border-neutral-800 bg-neutral-900 p-8 md:p-12 relative group hover:border-neutral-700 transition-all duration-300"
        >
          {/* Subtle corner highlights */}
          <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-slate-500/50 -translate-x-px -translate-y-px opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-slate-500/50 translate-x-px -translate-y-px opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-slate-500/50 -translate-x-px translate-y-px opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-slate-500/50 translate-x-px translate-y-px opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {/* Home Tab */}
          {activeTab === 'home' && (
            <div className="space-y-8">
              <div>
                <p className="text-lg text-neutral-400 mb-2">Computer Engineering Student</p>
              </div>

              <div className="space-y-3 text-neutral-300 leading-relaxed">
                <p>Second-year Computer Engineering student at University of Toronto, passionate about applying machine learning and software engineering to solve industry problems.</p>
              </div>

              <div className="pt-4">
                <h2 className="text-sm font-semibold text-neutral-500 mb-3 uppercase tracking-wider flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-slate-400" />
                  What I'm Working On
                </h2>
                <div className="space-y-2 text-neutral-300">
                  <div className="flex items-start gap-2 group/item hover:text-white transition-colors">
                    <span className="text-slate-400 mt-1">→</span>
                    <span>developing motor intention recognition models with UTMIST for post-stroke rehabilitation</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <h2 className="text-sm font-semibold text-neutral-500 mb-3 uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-slate-400" />
                  What I've Completed
                </h2>
                <div className="space-y-2 text-neutral-300">
                  <div className="flex items-start gap-2 group/item hover:text-white transition-colors">
                    <span className="text-slate-400 mt-1">→</span>
                    <span>built sleep stage classifier with CNN-LSTM (73.6% accuracy, 12% improvement)</span>
                  </div>
                  <div className="flex items-start gap-2 group/item hover:text-white transition-colors">
                    <span className="text-slate-400 mt-1">→</span>
                    <span>developed personality trait prediction from fMRI data using CNNs</span>
                  </div>
                  <div className="flex items-start gap-2 group/item hover:text-white transition-colors">
                    <span className="text-slate-400 mt-1">→</span>
                    <span>won 2nd place at Hack Without Borders UofT with live text-to-speech tool</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 flex gap-6 text-sm">
                <a href="#" className="text-neutral-400 hover:text-slate-300 transition-colors flex items-center gap-1 group">
                  GitHub <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a href="#" className="text-neutral-400 hover:text-slate-300 transition-colors flex items-center gap-1 group">
                  LinkedIn <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a href="mailto:karma.namgyal@mail.utoronto.ca" className="text-neutral-400 hover:text-slate-300 transition-colors flex items-center gap-1 group">
                  Email <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          )}

          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-sm font-semibold text-neutral-500 mb-4 uppercase tracking-wider">About</h2>
                <div className="space-y-4 text-neutral-300 leading-relaxed">
                  <p>
                    I'm a second-year Computer Engineering student at the University of Toronto (Class of 2029), passionate about applying machine learning and software engineering to solve industry problems.
                  </p>
                  <p>
                    I enjoy working on projects at the intersection of AI and real-world applications, from healthcare to computer vision. I'm always looking for opportunities to learn new technologies and collaborate on challenging problems.
                  </p>
                  <p>
                    Outside of academics, I'm a competitive athlete for UofT's varsity ultimate team and play summer club ultimate.
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <h2 className="text-sm font-semibold text-neutral-500 mb-4 uppercase tracking-wider">Experience</h2>
                <div className="space-y-4">
                  <div className="border-l-2 border-slate-500/50 pl-4 hover:border-slate-400 transition-colors">
                    <div className="flex justify-between items-baseline mb-1">
                      <div className="text-white font-medium">Machine Learning Engineer</div>
                      <div className="text-neutral-500 text-sm">Sept 2024 – Present</div>
                    </div>
                    <div className="text-neutral-400 text-sm mb-2">University of Toronto Machine Intelligence Student Team (UTMIST)</div>
                    <div className="text-neutral-300 text-sm leading-relaxed">
                      Neurorehabilitation device for post-stroke recovery. See projects.
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <h2 className="text-sm font-semibold text-neutral-500 mb-4 uppercase tracking-wider">Technical Skills</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="group/skill">
                    <div className="text-neutral-400 mb-2 text-sm group-hover/skill:text-slate-300 transition-colors">Languages</div>
                    <div className="text-neutral-300 text-sm">Python, C, C++, MATLAB</div>
                  </div>
                  <div className="group/skill">
                    <div className="text-neutral-400 mb-2 text-sm group-hover/skill:text-slate-300 transition-colors">ML & Data Science</div>
                    <div className="text-neutral-300 text-sm">PyTorch, NumPy, scikit-learn, pandas</div>
                  </div>
                  <div className="group/skill">
                    <div className="text-neutral-400 mb-2 text-sm group-hover/skill:text-slate-300 transition-colors">Developer Tools</div>
                    <div className="text-neutral-300 text-sm">Git, Jupyter, VS Code, Streamlit</div>
                  </div>
                  <div className="group/skill">
                    <div className="text-neutral-400 mb-2 text-sm group-hover/skill:text-slate-300 transition-colors">Specializations</div>
                    <div className="text-neutral-300 text-sm">Deep Learning, Signal Processing</div>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <h2 className="text-sm font-semibold text-neutral-500 mb-4 uppercase tracking-wider">Education</h2>
                <div className="space-y-1 border-l-2 border-slate-500/50 pl-4 hover:border-slate-400 transition-colors">
                  <div className="text-white">University of Toronto</div>
                  <div className="text-neutral-400">BASc in Computer Engineering + PEY Co-op, 2024-2029</div>
                  <div className="text-neutral-500 text-sm">Deep Learning, Programming Fundamentals, Software Design, Digital Systems, Linear Algebra</div>
                </div>
              </div>

              <div className="pt-6">
                <a href="#" className="text-neutral-400 hover:text-slate-300 transition-colors flex items-center gap-1 text-sm group">
                  Download Resume <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="space-y-10">
              {projects.map((project, idx) => (
                <div key={idx} className="space-y-3 pb-10 border-b border-neutral-800 last:border-0 last:pb-0 group/project">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xl font-semibold group-hover/project:text-slate-300 transition-colors">{project.title}</h3>
                    <span className="text-sm text-neutral-500">{project.year}</span>
                  </div>
                  
                  <p className="text-neutral-400 leading-relaxed group-hover/project:text-neutral-300 transition-colors">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-xs text-neutral-500 border border-neutral-800 px-2 py-1 hover:border-slate-600 hover:text-neutral-300 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 text-sm pt-3">
                    <a href={project.github} className="text-neutral-400 hover:text-slate-300 transition-colors flex items-center gap-1 group">
                      GitHub <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    {project.paper && (
                      <a href={project.paper} className="text-neutral-400 hover:text-slate-300 transition-colors flex items-center gap-1 group">
                        Paper <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                    {project.writeup && (
                      <a href={project.writeup} className="text-neutral-400 hover:text-slate-300 transition-colors flex items-center gap-1 group">
                        Writeup <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="mt-8 text-sm text-neutral-600">
          © 2024 Karma Namgyal
        </div>
      </div>
    </div>
  );
}