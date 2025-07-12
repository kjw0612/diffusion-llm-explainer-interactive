import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Play, Pause, RotateCcw } from 'lucide-react';

const App = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [animationStep, setAnimationStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Animation for token generation
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setAnimationStep((prev) => {
        if (activeSection === 0 && prev >= 5) {
          setIsPlaying(false);
          return 5;
        }
        if (activeSection === 1 && prev >= 10) {
          setIsPlaying(false);
          return 10;
        }
        if (activeSection === 2 && prev >= 8) {
          setIsPlaying(false);
          return 8;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [isPlaying, activeSection]);

  const resetAnimation = () => {
    setAnimationStep(0);
    setIsPlaying(false);
  };

  const sections = [
    { title: "Traditional LLMs", subtitle: "Sequential Token Prediction" },
    { title: "Diffusion Models", subtitle: "Iterative Refinement from Noise" },
    { title: "Diffusion LLMs", subtitle: "Best of Both Worlds" }
  ];

  const renderLLMAnimation = () => {
    const tokens = ["The", "cat", "sits", "on", "the", "mat"];
    const prompt = "Complete: The cat";
    
    return (
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-blue-800">Prompt:</p>
          <p className="text-lg">{prompt}</p>
        </div>
        
        <div className="relative">
          <div className="flex flex-wrap items-center gap-2">
            {tokens.map((token, idx) => (
              <div
                key={idx}
                className={`
                  px-4 py-2 rounded-lg font-mono text-lg transition-all duration-500
                  ${idx <= animationStep ? 
                    'bg-blue-500 text-white scale-105 shadow-lg' : 
                    'bg-gray-200 text-gray-400 scale-95 opacity-50'}
                `}
              >
                {idx <= animationStep ? token : "?"}
              </div>
            ))}
          </div>
          
          {animationStep > 0 && animationStep < tokens.length && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Generating token {animationStep + 1} based on previous tokens...
              </p>
            </div>
          )}
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="font-medium text-yellow-800 mb-2">Key Characteristics:</p>
          <ul className="space-y-1 text-sm text-yellow-700">
            <li>• Generates one token at a time, left to right</li>
            <li>• Each token depends on all previous tokens</li>
            <li>• Cannot go back and fix earlier mistakes</li>
            <li>• Fast for short sequences, slower for long ones</li>
          </ul>
        </div>
      </div>
    );
  };

  const renderDiffusionAnimation = () => {
    const maxSteps = 10;
    const progress = animationStep / maxSteps;
    
    // Simulate noise reduction
    const generateNoise = (seed, intensity) => {
      const points = [];
      for (let i = 0; i < 50; i++) {
        points.push({
          x: Math.sin(seed + i) * 150 * intensity + 200,
          y: Math.cos(seed + i * 1.5) * 100 * intensity + 150
        });
      }
      return points;
    };

    const noiseIntensity = Math.max(0, 1 - progress);
    const imageClarity = progress;

    return (
      <div className="space-y-6">
        <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8" style={{height: '320px'}}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
            {/* Noise particles */}
            {generateNoise(42, noiseIntensity).map((point, idx) => (
              <circle
                key={idx}
                cx={point.x}
                cy={point.y}
                r={2}
                fill="#8B5CF6"
                opacity={noiseIntensity * 0.3}
                className="animate-pulse"
              />
            ))}
            
            {/* Emerging image (cat) */}
            <g opacity={imageClarity}>
              {/* Cat body */}
              <ellipse cx="200" cy="180" rx="60" ry="40" fill="#4B5563" />
              {/* Cat head */}
              <circle cx="200" cy="140" r="35" fill="#4B5563" />
              {/* Ears */}
              <path d="M 170 130 L 165 110 L 180 120 Z" fill="#4B5563" />
              <path d="M 230 130 L 235 110 L 220 120 Z" fill="#4B5563" />
              {/* Eyes */}
              <circle cx="185" cy="135" r="5" fill="#10B981" />
              <circle cx="215" cy="135" r="5" fill="#10B981" />
              {/* Tail */}
              <path d="M 260 180 Q 280 160 270 140" stroke="#4B5563" strokeWidth="15" fill="none" strokeLinecap="round" />
            </g>
          </svg>
          
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white bg-opacity-90 rounded-lg p-3">
              <p className="text-sm font-medium mb-1">Denoising Step: {animationStep}/{maxSteps}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="font-medium text-purple-800 mb-2">How it works:</p>
          <ul className="space-y-1 text-sm text-purple-700">
            <li>• Starts with pure random noise</li>
            <li>• Gradually removes noise through multiple steps</li>
            <li>• Each step refines the entire output simultaneously</li>
            <li>• Can generate images, audio, and now text!</li>
          </ul>
        </div>
      </div>
    );
  };

  const renderDiffusionLLMAnimation = () => {
    const text = "The quick brown fox jumps over the lazy dog";
    const words = text.split(' ');
    const progress = animationStep / 8;
    
    // Simulate text getting clearer
    const getNoisyText = (word, clarity) => {
      if (clarity > 0.8) return word;
      if (clarity > 0.5) {
        return word.split('').map((char, idx) => 
          Math.random() > clarity ? '█' : char
        ).join('');
      }
      return '████';
    };

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-4">
            Refining entire sequence in parallel:
          </p>
          
          <div className="grid grid-cols-3 gap-3">
            {words.map((word, idx) => (
              <div
                key={idx}
                className={`
                  px-3 py-2 rounded font-mono text-center transition-all duration-700
                  ${progress > 0.7 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-800'}
                `}
              >
                {getNoisyText(word, progress)}
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Step {animationStep}/8 - Clarity: {Math.round(progress * 100)}%
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-medium text-blue-800 mb-2">From LLMs:</p>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>• Language understanding</li>
              <li>• Pretrained knowledge</li>
              <li>• Text generation ability</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="font-medium text-purple-800 mb-2">From Diffusion:</p>
            <ul className="space-y-1 text-sm text-purple-700">
              <li>• Parallel generation</li>
              <li>• Better controllability</li>
              <li>• Can fix mistakes anywhere</li>
            </ul>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <p className="font-medium text-green-800 mb-2">Result:</p>
          <p className="text-sm text-green-700">
            4-5x faster generation for long texts while maintaining quality!
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Understanding LLMs and Diffusion Models
        </h1>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {sections.map((section, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveSection(idx);
                resetAnimation();
              }}
              className={`
                px-6 py-3 rounded-lg font-medium transition-all
                ${activeSection === idx 
                  ? 'bg-blue-500 text-white shadow-lg scale-105' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
              `}
            >
              <div>{section.title}</div>
              <div className="text-xs opacity-75">{section.subtitle}</div>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-xl p-8" style={{minHeight: '500px'}}>
          <h2 className="text-2xl font-bold mb-2">{sections[activeSection].title}</h2>
          <p className="text-gray-600 mb-6">{sections[activeSection].subtitle}</p>

          <div className="mb-6">
            {activeSection === 0 && renderLLMAnimation()}
            {activeSection === 1 && renderDiffusionAnimation()}
            {activeSection === 2 && renderDiffusionLLMAnimation()}
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
            
            <button
              onClick={resetAnimation}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <RotateCcw size={20} />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-3">Quick Summary:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-medium text-blue-600">Traditional LLMs:</p>
              <p className="text-gray-600">Generate text one token at a time, like typing on a keyboard.</p>
            </div>
            <div>
              <p className="font-medium text-purple-600">Diffusion Models:</p>
              <p className="text-gray-600">Start with noise and gradually refine into clear output.</p>
            </div>
            <div>
              <p className="font-medium text-green-600">Diffusion LLMs:</p>
              <p className="text-gray-600">Combine both approaches for faster, more flexible text generation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;