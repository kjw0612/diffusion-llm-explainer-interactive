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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ backgroundColor: '#EBF8FF', padding: '16px', borderRadius: '8px' }}>
          <p style={{ fontSize: '14px', fontWeight: '500', color: '#2B6CB0' }}>Prompt:</p>
          <p style={{ fontSize: '18px' }}>{prompt}</p>
        </div>
        
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
            {tokens.map((token, idx) => (
              <div
                key={idx}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  fontSize: '18px',
                  transition: 'all 0.5s',
                  backgroundColor: idx <= animationStep ? '#3B82F6' : '#E5E7EB',
                  color: idx <= animationStep ? 'white' : '#9CA3AF',
                  transform: idx <= animationStep ? 'scale(1.05)' : 'scale(0.95)',
                  boxShadow: idx <= animationStep ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none',
                  opacity: idx <= animationStep ? 1 : 0.5
                }}
              >
                {idx <= animationStep ? token : "?"}
              </div>
            ))}
          </div>
          
          {animationStep > 0 && animationStep < tokens.length && (
            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#6B7280' }}>
                Generating token {animationStep + 1} based on previous tokens...
              </p>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#FEF3C7', padding: '16px', borderRadius: '8px' }}>
          <p style={{ fontWeight: '500', color: '#92400E', marginBottom: '8px' }}>Key Characteristics:</p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '14px', color: '#92400E' }}>
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ 
          position: 'relative', 
          background: 'linear-gradient(to bottom right, #F3E8FF, #FECACA)', 
          borderRadius: '8px', 
          padding: '32px',
          height: '320px'
        }}>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 400 300">
            {/* Noise particles */}
            {generateNoise(42, noiseIntensity).map((point, idx) => (
              <circle
                key={idx}
                cx={point.x}
                cy={point.y}
                r={2}
                fill="#8B5CF6"
                opacity={noiseIntensity * 0.3}
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
          
          <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', padding: '12px' }}>
              <p style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
                Denoising Step: {animationStep}/{maxSteps}
              </p>
              <div style={{ width: '100%', backgroundColor: '#E5E7EB', borderRadius: '9999px', height: '8px' }}>
                <div 
                  style={{ 
                    backgroundColor: '#8B5CF6', 
                    height: '8px', 
                    borderRadius: '9999px',
                    transition: 'all 0.5s',
                    width: `${progress * 100}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#F3E8FF', padding: '16px', borderRadius: '8px' }}>
          <p style={{ fontWeight: '500', color: '#6B21A8', marginBottom: '8px' }}>How it works:</p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '14px', color: '#6B21A8' }}>
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ 
          background: 'linear-gradient(to right, #EBF8FF, #F3E8FF)', 
          padding: '24px', 
          borderRadius: '8px' 
        }}>
          <p style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '16px' }}>
            Refining entire sequence in parallel:
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {words.map((word, idx) => (
              <div
                key={idx}
                style={{
                  padding: '8px 12px',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  textAlign: 'center',
                  transition: 'all 0.7s',
                  backgroundColor: progress > 0.7 ? '#10B981' : '#D1D5DB',
                  color: progress > 0.7 ? 'white' : '#1F2937'
                }}
              >
                {getNoisyText(word, progress)}
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: '#6B7280' }}>
              Step {animationStep}/8 - Clarity: {Math.round(progress * 100)}%
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <div style={{ backgroundColor: '#EBF8FF', padding: '16px', borderRadius: '8px' }}>
            <p style={{ fontWeight: '500', color: '#1E40AF', marginBottom: '8px' }}>From LLMs:</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '14px', color: '#1E40AF' }}>
              <li>• Language understanding</li>
              <li>• Pretrained knowledge</li>
              <li>• Text generation ability</li>
            </ul>
          </div>
          
          <div style={{ backgroundColor: '#F3E8FF', padding: '16px', borderRadius: '8px' }}>
            <p style={{ fontWeight: '500', color: '#6B21A8', marginBottom: '8px' }}>From Diffusion:</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '14px', color: '#6B21A8' }}>
              <li>• Parallel generation</li>
              <li>• Better controllability</li>
              <li>• Can fix mistakes anywhere</li>
            </ul>
          </div>
        </div>

        <div style={{ backgroundColor: '#D1FAE5', padding: '16px', borderRadius: '8px' }}>
          <p style={{ fontWeight: '500', color: '#065F46', marginBottom: '8px' }}>Result:</p>
          <p style={{ fontSize: '14px', color: '#065F46' }}>
            4-5x faster generation for long texts while maintaining quality!
          </p>
        </div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB' }}>
      <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '24px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center', marginBottom: '32px', color: '#1F2937' }}>
          Understanding LLMs and Diffusion Models
        </h1>

        {/* Navigation */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
          {sections.map((section, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveSection(idx);
                resetAnimation();
              }}
              style={{
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: '500',
                transition: 'all 0.3s',
                backgroundColor: activeSection === idx ? '#3B82F6' : '#E5E7EB',
                color: activeSection === idx ? 'white' : '#374151',
                transform: activeSection === idx ? 'scale(1.05)' : 'scale(1)',
                boxShadow: activeSection === idx ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <div>{section.title}</div>
              <div style={{ fontSize: '12px', opacity: 0.75 }}>{section.subtitle}</div>
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', 
          padding: '32px',
          minHeight: '500px'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
            {sections[activeSection].title}
          </h2>
          <p style={{ color: '#6B7280', marginBottom: '24px' }}>
            {sections[activeSection].subtitle}
          </p>

          <div style={{ marginBottom: '24px' }}>
            {activeSection === 0 && renderLLMAnimation()}
            {activeSection === 1 && renderDiffusionAnimation()}
            {activeSection === 2 && renderDiffusionLLMAnimation()}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '32px' }}>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: '#3B82F6',
                color: 'white',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#2563EB'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#3B82F6'}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
            
            <button
              onClick={resetAnimation}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: '#6B7280',
                color: 'white',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#4B5563'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#6B7280'}
            >
              <RotateCcw size={20} />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Summary */}
        <div style={{ marginTop: '32px', backgroundColor: '#F9FAFB', borderRadius: '8px', padding: '24px' }}>
          <h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '12px' }}>Quick Summary:</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', fontSize: '14px' }}>
            <div>
              <p style={{ fontWeight: '500', color: '#2563EB' }}>Traditional LLMs:</p>
              <p style={{ color: '#6B7280' }}>Generate text one token at a time, like typing on a keyboard.</p>
            </div>
            <div>
              <p style={{ fontWeight: '500', color: '#7C3AED' }}>Diffusion Models:</p>
              <p style={{ color: '#6B7280' }}>Start with noise and gradually refine into clear output.</p>
            </div>
            <div>
              <p style={{ fontWeight: '500', color: '#10B981' }}>Diffusion LLMs:</p>
              <p style={{ color: '#6B7280' }}>Combine both approaches for faster, more flexible text generation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;