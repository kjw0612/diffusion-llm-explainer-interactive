import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Play, Pause, RotateCcw, Globe, BookOpen, Info, Brain } from 'lucide-react';

const App = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [animationStep, setAnimationStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [language, setLanguage] = useState('en'); // en, ko, zh
  const [showReferences, setShowReferences] = useState(false);
  const [advancedMode, setAdvancedMode] = useState(false);

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

  // Multilingual content
  const content = {
    en: {
      title: "Understanding LLMs and Diffusion Models",
      sections: [
        { title: "Traditional LLMs", subtitle: "Sequential Token Prediction" },
        { title: "Diffusion Models", subtitle: "Iterative Refinement from Noise" },
        { title: "Diffusion LLMs", subtitle: "Best of Both Worlds" }
      ],
      play: "Play",
      pause: "Pause",
      reset: "Reset",
      references: "References",
      keyPapers: "Key Papers",
      summary: "Quick Summary",
      advanced: "Advanced",
      summaryItems: {
        llm: "Generate text one token at a time, like typing on a keyboard.",
        diffusion: "Start with noise and gradually refine into clear output.",
        diffusionLLM: "Combine both approaches for 4-5x faster generation with better control."
      }
    },
    ko: {
      title: "LLM과 확산 모델 이해하기",
      sections: [
        { title: "전통적인 LLM", subtitle: "순차적 토큰 예측" },
        { title: "확산 모델", subtitle: "노이즈에서 반복적 정제" },
        { title: "확산 LLM", subtitle: "두 가지 장점의 결합" }
      ],
      play: "재생",
      pause: "일시정지",
      reset: "초기화",
      references: "참고문헌",
      keyPapers: "주요 논문",
      summary: "간단 요약",
      advanced: "고급",
      summaryItems: {
        llm: "키보드로 타이핑하듯 한 번에 하나의 토큰을 생성합니다.",
        diffusion: "노이즈에서 시작하여 점진적으로 명확한 출력으로 정제합니다.",
        diffusionLLM: "두 접근법을 결합하여 4-5배 빠른 생성과 더 나은 제어를 제공합니다."
      }
    },
    zh: {
      title: "理解LLM和扩散模型",
      sections: [
        { title: "传统LLM", subtitle: "顺序令牌预测" },
        { title: "扩散模型", subtitle: "从噪声迭代细化" },
        { title: "扩散LLM", subtitle: "两全其美" }
      ],
      play: "播放",
      pause: "暂停",
      reset: "重置",
      references: "参考文献",
      keyPapers: "关键论文",
      summary: "快速总结",
      advanced: "高级",
      summaryItems: {
        llm: "像打字一样一次生成一个令牌。",
        diffusion: "从噪声开始，逐步细化为清晰的输出。",
        diffusionLLM: "结合两种方法，实现4-5倍更快的生成和更好的控制。"
      }
    }
  };

  const papers = [
    {
      title: "DiffuSeq: Sequence to Sequence Text Generation with Diffusion Models",
      authors: "Gong et al.",
      venue: "ICLR 2023",
      link: "https://arxiv.org/abs/2210.08933"
    },
    {
      title: "Diffusion-LM Improves Controllable Text Generation",
      authors: "Li et al.",
      venue: "NeurIPS 2022",
      link: "https://arxiv.org/abs/2205.14217"
    },
    {
      title: "SEDD: Score Entropy Discrete Diffusion",
      authors: "Lou et al.",
      venue: "ICML 2024 (Best Paper)",
      link: "https://arxiv.org/abs/2310.16834"
    },
    {
      title: "Gemini Diffusion: A Paradigm Shift in Language Generation",
      authors: "Google DeepMind",
      venue: "May 2025",
      performance: "1,479 tokens/second"
    }
  ];

  const t = content[language];

  const renderLLMAnimation = () => {
    const tokens = ["The", "cat", "sits", "on", "the", "mat"];
    const tokensKo = ["고양이가", "매트", "위에", "앉아", "있습니다"];
    const tokensZh = ["猫", "坐", "在", "垫子", "上"];
    const displayTokens = language === 'ko' ? tokensKo : language === 'zh' ? tokensZh : tokens;
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ backgroundColor: '#EBF8FF', padding: '16px', borderRadius: '8px', border: '1px solid #BEE3F8' }}>
          <p style={{ fontSize: '14px', fontWeight: '500', color: '#2B6CB0', marginBottom: '4px' }}>
            {language === 'ko' ? '프롬프트:' : language === 'zh' ? '提示词:' : 'Prompt:'}
          </p>
          <p style={{ fontSize: '18px' }}>
            {language === 'ko' ? '완성하세요: 고양이가' : language === 'zh' ? '完成句子: 猫' : 'Complete: The cat'}
          </p>
        </div>
        
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
            {displayTokens.map((token, idx) => (
              <div
                key={idx}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  fontSize: '18px',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  backgroundColor: idx <= animationStep ? '#3B82F6' : '#E5E7EB',
                  color: idx <= animationStep ? 'white' : '#9CA3AF',
                  transform: idx <= animationStep ? 'scale(1.05)' : 'scale(0.95)',
                  boxShadow: idx <= animationStep ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none',
                  opacity: idx <= animationStep ? 1 : 0.5
                }}
              >
                {idx <= animationStep ? token : "?"}
              </div>
            ))}
          </div>
          
          {animationStep > 0 && animationStep < displayTokens.length && (
            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#6B7280' }}>
                {language === 'ko' ? 
                  `이전 토큰을 기반으로 토큰 ${animationStep + 1} 생성 중...` : 
                  language === 'zh' ? 
                  `基于先前的令牌生成第 ${animationStep + 1} 个令牌...` :
                  `Generating token ${animationStep + 1} based on previous tokens...`}
              </p>
            </div>
          )}
        </div>

        {advancedMode && (
          <div style={{ backgroundColor: '#F0F9FF', padding: '16px', borderRadius: '8px', border: '1px solid #BAE6FD' }}>
            <p style={{ fontWeight: '600', marginBottom: '12px', color: '#075985' }}>Transformer Architecture - Causal Attention:</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '12px' }}>
              {displayTokens.slice(0, 4).map((token, idx) => (
                <div key={idx} style={{ textAlign: 'center' }}>
                  <div style={{ 
                    padding: '8px', 
                    backgroundColor: '#DBEAFE', 
                    borderRadius: '4px', 
                    marginBottom: '8px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {token}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {Array.from({length: idx + 1}).map((_, prevIdx) => (
                      <div key={prevIdx} style={{
                        height: '4px',
                        backgroundColor: prevIdx === idx ? '#3B82F6' : '#93C5FD',
                        borderRadius: '2px',
                        opacity: prevIdx === idx ? 1 : 0.6
                      }} />
                    ))}
                  </div>
                  <div style={{ fontSize: '10px', color: '#075985', marginTop: '4px', lineHeight: '1.2' }}>
                    <p style={{ fontWeight: '600', marginBottom: '2px' }}>Attends to:</p>
                    <p style={{ color: '#1E40AF' }}>
                      {displayTokens.slice(0, idx + 1).map((prevToken, prevIdx) => (
                        <span key={prevIdx}>
                          "{prevToken}"{prevIdx < idx ? ', ' : ''}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#EBF8FF', padding: '8px', borderRadius: '4px', fontSize: '12px', color: '#075985' }}>
              <p><strong>Key Insight:</strong> Each token can only "see" previous tokens due to causal masking</p>
              <p>• <strong>"The"</strong> attends to: just itself</p>
              <p>• <strong>"cat"</strong> attends to: "The", "cat"</p>
              <p>• <strong>"sits"</strong> attends to: "The", "cat", "sits"</p>
              <p>• Sequential dependency prevents parallel generation</p>
            </div>
            
            <div style={{ backgroundColor: '#FEF3C7', padding: '8px', borderRadius: '4px', fontSize: '12px', color: '#92400E', marginTop: '8px' }}>
              <p><strong>What does "attend to self" mean?</strong></p>
              <p>• The token considers its own meaning and position</p>
              <p>• Example: "The" token strengthens its role as a determiner</p>
              <p>• Self-attention helps the model understand each token's function</p>
              <p>• Even alone, "The" needs to know it's starting a noun phrase</p>
            </div>
          </div>
        )}

        <div style={{ backgroundColor: '#FEF3C7', padding: '16px', borderRadius: '8px', border: '1px solid #FDE68A' }}>
          <p style={{ fontWeight: '500', color: '#92400E', marginBottom: '8px' }}>
            {language === 'ko' ? '주요 특징:' : language === 'zh' ? '关键特征:' : 'Key Characteristics:'}
          </p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '14px', color: '#92400E', listStyle: 'none', paddingLeft: 0 }}>
            {language === 'ko' ? (
              <>
                <li>• 왼쪽에서 오른쪽으로 한 번에 하나의 토큰 생성</li>
                <li>• 각 토큰은 이전의 모든 토큰에 의존</li>
                <li>• 이전 실수를 되돌아가서 수정할 수 없음</li>
                <li>• 짧은 시퀀스에는 빠르지만 긴 시퀀스에는 느림</li>
              </>
            ) : language === 'zh' ? (
              <>
                <li>• 从左到右一次生成一个令牌</li>
                <li>• 每个令牌都依赖于之前的所有令牌</li>
                <li>• 无法回去修正早期的错误</li>
                <li>• 短序列快，长序列慢</li>
              </>
            ) : (
              <>
                <li>• Generates one token at a time, left to right</li>
                <li>• Each token depends on all previous tokens</li>
                <li>• Cannot go back and fix earlier mistakes</li>
                <li>• Fast for short sequences, slower for long ones</li>
              </>
            )}
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
          background: 'linear-gradient(135deg, #F3E8FF 0%, #FECACA 100%)', 
          borderRadius: '8px', 
          padding: '20px',
          height: '280px',
          overflow: 'hidden'
        }}>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 400 220">
            {/* Noise particles - positioned in upper area only */}
            {generateNoise(42, noiseIntensity).map((point, idx) => (
              <circle
                key={idx}
                cx={point.x}
                cy={Math.min(point.y, 180)} // Keep particles in upper area
                r={2}
                fill="#8B5CF6"
                opacity={noiseIntensity * 0.3}
                style={{
                  animation: noiseIntensity > 0 ? 'pulse 2s infinite' : 'none'
                }}
              />
            ))}
            
            {/* Emerging image (cat) */}
            <g opacity={imageClarity}>
              {/* Cat body */}
              <ellipse cx="200" cy="130" rx="50" ry="30" fill="#4B5563" />
              {/* Cat head */}
              <circle cx="200" cy="100" r="25" fill="#4B5563" />
              {/* Ears */}
              <path d="M 180 90 L 175 75 L 190 82 Z" fill="#4B5563" />
              <path d="M 220 90 L 225 75 L 210 82 Z" fill="#4B5563" />
              {/* Eyes */}
              <circle cx="190" cy="98" r="3" fill="#10B981" />
              <circle cx="210" cy="98" r="3" fill="#10B981" />
              {/* Tail */}
              <path d="M 250 130 Q 265 115 260 100" stroke="#4B5563" strokeWidth="10" fill="none" strokeLinecap="round" />
            </g>
          </svg>
          
          <div style={{ position: 'absolute', bottom: '12px', left: '16px', right: '16px' }}>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px', padding: '10px', backdropFilter: 'blur(10px)' }}>
              <p style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
                {language === 'ko' ? 
                  `노이즈 제거 단계: ${animationStep}/${maxSteps}` :
                  language === 'zh' ?
                  `去噪步骤: ${animationStep}/${maxSteps}` :
                  `Denoising Step: ${animationStep}/${maxSteps}`}
              </p>
              <div style={{ width: '100%', backgroundColor: '#E5E7EB', borderRadius: '9999px', height: '8px' }}>
                <div 
                  style={{ 
                    backgroundColor: '#8B5CF6', 
                    height: '8px', 
                    borderRadius: '9999px',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    width: `${progress * 100}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {advancedMode && (
          <div style={{ backgroundColor: '#FAF5FF', padding: '16px', borderRadius: '8px', border: '1px solid #E9D5FF' }}>
            <p style={{ fontWeight: '600', marginBottom: '12px', color: '#6B21A8' }}>Image Diffusion Process - Visual Breakdown:</p>
            
            {/* Forward Process */}
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#8B5CF6', marginBottom: '8px' }}>Forward Process (Training):</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                {[
                  { emoji: '🐱', level: 0, label: 'Clear Cat' },
                  { emoji: '🐱', level: 1, label: '25% noisy', blur: 1 },
                  { emoji: '🐱', level: 2, label: '50% noisy', blur: 2 },
                  { emoji: '🌫️', level: 3, label: '75% noisy', blur: 3 },
                  { emoji: '⚪', level: 4, label: 'Pure noise' }
                ].map((item, idx) => (
                  <div key={idx} style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ 
                      padding: '12px', 
                      backgroundColor: `rgba(139, 92, 246, ${0.1 + item.level * 0.15})`,
                      borderRadius: '8px',
                      border: `2px solid rgba(139, 92, 246, ${0.3 + item.level * 0.15})`,
                      marginBottom: '4px',
                      minHeight: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      filter: item.blur ? `blur(${item.blur}px)` : 'none'
                    }}>
                      <span style={{ fontSize: '24px' }}>{item.emoji}</span>
                    </div>
                    <p style={{ fontSize: '9px', color: '#8B5CF6' }}>{item.label}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '11px', color: '#8B5CF6', textAlign: 'center' }}>
                → Gradually add Gaussian noise until image becomes pure noise
              </p>
            </div>

            {/* Reverse Process */}
            <div style={{ marginBottom: '12px' }}>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#10B981', marginBottom: '8px' }}>Reverse Process (Generation):</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                {[
                  { emoji: '⚪', level: 0, label: 'Start noise' },
                  { emoji: '🌫️', level: 1, label: '25% clear', blur: 3 },
                  { emoji: '🐕', level: 2, label: '50% clear', blur: 2 },
                  { emoji: '🐕', level: 3, label: '75% clear', blur: 1 },
                  { emoji: '🐕', level: 4, label: 'New dog!' }
                ].map((item, idx) => (
                  <div key={idx} style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ 
                      padding: '12px', 
                      backgroundColor: `rgba(16, 185, 129, ${0.1 + (4-item.level) * 0.15})`,
                      borderRadius: '8px',
                      border: `2px solid rgba(16, 185, 129, ${0.3 + (4-item.level) * 0.15})`,
                      marginBottom: '4px',
                      minHeight: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      filter: item.blur ? `blur(${item.blur}px)` : 'none'
                    }}>
                      <span style={{ fontSize: '24px' }}>{item.emoji}</span>
                    </div>
                    <p style={{ fontSize: '9px', color: '#10B981' }}>{item.label}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '11px', color: '#10B981', textAlign: 'center' }}>
                ← Neural network removes noise step by step, generating new images
              </p>
            </div>

            <div style={{ backgroundColor: '#F3E8FF', padding: '8px', borderRadius: '4px', fontSize: '12px', color: '#6B21A8' }}>
              <p><strong>Key Insight:</strong> Started with a cat image, but generated a new dog!</p>
              <p>• <strong>Training:</strong> Learn to predict and remove noise at each step</p>
              <p>• <strong>Generation:</strong> Start with random noise, iteratively denoise</p>
              <p>• <strong>Result:</strong> Can generate photorealistic images of any trained concept</p>
            </div>
          </div>
        )}

        <div style={{ backgroundColor: '#F3E8FF', padding: '16px', borderRadius: '8px', border: '1px solid #E9D5FF' }}>
          <p style={{ fontWeight: '500', color: '#6B21A8', marginBottom: '8px' }}>
            {language === 'ko' ? '작동 원리:' : language === 'zh' ? '工作原理:' : 'How it works:'}
          </p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '14px', color: '#6B21A8', listStyle: 'none', paddingLeft: 0 }}>
            {language === 'ko' ? (
              <>
                <li>• 순수한 무작위 노이즈에서 시작</li>
                <li>• 여러 단계를 통해 점진적으로 노이즈 제거</li>
                <li>• 각 단계에서 전체 출력을 동시에 개선</li>
                <li>• 이미지, 오디오, 그리고 이제 텍스트도 생성 가능!</li>
              </>
            ) : language === 'zh' ? (
              <>
                <li>• 从纯随机噪声开始</li>
                <li>• 通过多个步骤逐渐去除噪声</li>
                <li>• 每一步同时改进整个输出</li>
                <li>• 可以生成图像、音频，现在还有文本！</li>
              </>
            ) : (
              <>
                <li>• Starts with pure random noise</li>
                <li>• Gradually removes noise through multiple steps</li>
                <li>• Each step refines the entire output simultaneously</li>
                <li>• Can generate images, audio, and now text!</li>
              </>
            )}
          </ul>
        </div>
      </div>
    );
  };

  const renderDiffusionLLMAnimation = () => {
    const text = "The quick brown fox jumps over the lazy dog";
    const textKo = "빠른 갈색 여우가 게으른 개를 뛰어넘습니다";
    const textZh = "敏捷的棕色狐狸跳过懒狗";
    const displayText = language === 'ko' ? textKo : language === 'zh' ? textZh : text;
    const words = displayText.split(' ');
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
          background: 'linear-gradient(90deg, #EBF8FF 0%, #F3E8FF 100%)', 
          padding: '24px', 
          borderRadius: '8px',
          border: '1px solid #D8B4FE'
        }}>
          <p style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '16px' }}>
            {language === 'ko' ? 
              '전체 시퀀스를 병렬로 정제:' :
              language === 'zh' ?
              '并行精炼整个序列:' :
              'Refining entire sequence in parallel:'}
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
                  transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                  backgroundColor: progress > 0.7 ? '#10B981' : '#D1D5DB',
                  color: progress > 0.7 ? 'white' : '#1F2937',
                  fontSize: language === 'ko' ? '14px' : '16px'
                }}
              >
                {getNoisyText(word, progress)}
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: '#6B7280' }}>
              {language === 'ko' ?
                `단계 ${animationStep}/8 - 명확도: ${Math.round(progress * 100)}%` :
                language === 'zh' ?
                `步骤 ${animationStep}/8 - 清晰度: ${Math.round(progress * 100)}%` :
                `Step ${animationStep}/8 - Clarity: ${Math.round(progress * 100)}%`}
            </p>
          </div>
        </div>

        {advancedMode && (
          <div style={{ backgroundColor: '#F0FDF4', padding: '16px', borderRadius: '8px', border: '1px solid #BBF7D0' }}>
            <p style={{ fontWeight: '600', marginBottom: '12px', color: '#14532D' }}>Bidirectional Attention in Diffusion LMs:</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '12px' }}>
              {words.slice(0, 3).map((word, idx) => (
                <div key={idx} style={{ textAlign: 'center' }}>
                  <div style={{ 
                    padding: '8px', 
                    backgroundColor: '#D1FAE5', 
                    borderRadius: '4px', 
                    marginBottom: '8px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {word}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px' }}>
                    {Array.from({length: 3}).map((_, connIdx) => (
                      <div key={connIdx} style={{
                        height: '4px',
                        backgroundColor: connIdx === idx ? '#10B981' : '#6EE7B7',
                        borderRadius: '2px',
                        opacity: connIdx === idx ? 1 : 0.8
                      }} />
                    ))}
                  </div>
                  <p style={{ fontSize: '10px', color: '#14532D', marginTop: '4px' }}>
                    Sees all tokens
                  </p>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#ECFDF5', padding: '8px', borderRadius: '4px', fontSize: '12px', color: '#14532D' }}>
              <p><strong>Key Advantage:</strong> Full bidirectional context during refinement</p>
              <p>• Unlike autoregressive: each token can attend to ALL other tokens</p>
              <p>• Parallel processing: all positions refined simultaneously</p>
              <p>• Better global coherence and consistency</p>
              <p>• Can fix errors anywhere in the sequence</p>
            </div>
          </div>
        )}

        {advancedMode && (
          <div style={{ backgroundColor: '#F0FDF4', padding: '16px', borderRadius: '8px', border: '1px solid #BBF7D0', marginBottom: '16px' }}>
            <p style={{ fontWeight: '600', marginBottom: '12px', color: '#14532D' }}>Text Diffusion Process - How it Works:</p>
            
            {/* Forward Process */}
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#8B5CF6', marginBottom: '8px' }}>Forward Process (Training):</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                {[
                  { text: '"The cat sleeps"', level: 0, label: 'Original Text' },
                  { text: '"The c&t sl##ps"', level: 1, label: '25% corrupted' },
                  { text: '"T## #&t ##e#ps"', level: 2, label: '50% corrupted' },
                  { text: '"### ### #####"', level: 3, label: '75% corrupted' },
                  { text: '"############"', level: 4, label: 'Pure noise' }
                ].map((item, idx) => (
                  <div key={idx} style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ 
                      padding: '8px', 
                      backgroundColor: `rgba(139, 92, 246, ${0.1 + item.level * 0.2})`,
                      borderRadius: '6px',
                      border: `2px solid rgba(139, 92, 246, ${0.3 + item.level * 0.2})`,
                      marginBottom: '4px',
                      minHeight: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <p style={{ fontSize: '11px', fontWeight: '600', color: '#5B21B6', fontFamily: 'monospace' }}>
                        {item.text}
                      </p>
                    </div>
                    <p style={{ fontSize: '9px', color: '#8B5CF6' }}>{item.label}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '11px', color: '#8B5CF6', textAlign: 'center' }}>
                → Gradually corrupt text by masking/replacing tokens with noise
              </p>
            </div>

            {/* Reverse Process */}
            <div style={{ marginBottom: '12px' }}>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#10B981', marginBottom: '8px' }}>Reverse Process (Generation):</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                {[
                  { text: '"############"', level: 0, label: 'Start with noise' },
                  { text: '"T## d&g #####"', level: 1, label: '25% clear' },
                  { text: '"The d&g runs"', level: 2, label: '50% clear' },
                  { text: '"The dog runs"', level: 3, label: '75% clear' },
                  { text: '"The dog runs"', level: 4, label: 'New text!' }
                ].map((item, idx) => (
                  <div key={idx} style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ 
                      padding: '8px', 
                      backgroundColor: `rgba(16, 185, 129, ${0.1 + (4-item.level) * 0.2})`,
                      borderRadius: '6px',
                      border: `2px solid rgba(16, 185, 129, ${0.3 + (4-item.level) * 0.2})`,
                      marginBottom: '4px',
                      minHeight: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <p style={{ fontSize: '11px', fontWeight: '600', color: '#047857', fontFamily: 'monospace' }}>
                        {item.text}
                      </p>
                    </div>
                    <p style={{ fontSize: '9px', color: '#10B981' }}>{item.label}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '11px', color: '#10B981', textAlign: 'center' }}>
                ← Model predicts original tokens step by step, creating NEW coherent text
              </p>
            </div>

            <div style={{ backgroundColor: '#ECFDF5', padding: '8px', borderRadius: '4px', fontSize: '12px', color: '#14532D' }}>
              <p><strong>Key Insight:</strong> Notice how we started with "cat sleeps" but generated "dog runs"!</p>
              <p>• <strong>Training:</strong> Learn to predict which tokens were corrupted at each noise level</p>
              <p>• <strong>Generation:</strong> Start with random noise, iteratively predict clean tokens</p>
              <p>• <strong>Result:</strong> Generates completely new, grammatically correct sentences</p>
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <div style={{ backgroundColor: '#EBF8FF', padding: '16px', borderRadius: '8px', border: '1px solid #BEE3F8' }}>
            <p style={{ fontWeight: '500', color: '#1E40AF', marginBottom: '8px' }}>
              {language === 'ko' ? 'LLM에서:' : language === 'zh' ? '从LLM:' : 'From LLMs:'}
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '14px', color: '#1E40AF', listStyle: 'none', paddingLeft: 0 }}>
              {language === 'ko' ? (
                <>
                  <li>• 언어 이해 능력</li>
                  <li>• 사전 학습된 지식</li>
                  <li>• 텍스트 생성 능력</li>
                </>
              ) : language === 'zh' ? (
                <>
                  <li>• 语言理解能力</li>
                  <li>• 预训练知识</li>
                  <li>• 文本生成能力</li>
                </>
              ) : (
                <>
                  <li>• Language understanding</li>
                  <li>• Pretrained knowledge</li>
                  <li>• Text generation ability</li>
                </>
              )}
            </ul>
          </div>
          
          <div style={{ backgroundColor: '#F3E8FF', padding: '16px', borderRadius: '8px', border: '1px solid #E9D5FF' }}>
            <p style={{ fontWeight: '500', color: '#6B21A8', marginBottom: '8px' }}>
              {language === 'ko' ? '확산 모델에서:' : language === 'zh' ? '从扩散模型:' : 'From Diffusion:'}
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '14px', color: '#6B21A8', listStyle: 'none', paddingLeft: 0 }}>
              {language === 'ko' ? (
                <>
                  <li>• 병렬 생성</li>
                  <li>• 더 나은 제어 가능성</li>
                  <li>• 어디서든 실수 수정 가능</li>
                </>
              ) : language === 'zh' ? (
                <>
                  <li>• 并行生成</li>
                  <li>• 更好的可控性</li>
                  <li>• 可以在任何地方修正错误</li>
                </>
              ) : (
                <>
                  <li>• Parallel generation</li>
                  <li>• Better controllability</li>
                  <li>• Can fix mistakes anywhere</li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div style={{ backgroundColor: '#D1FAE5', padding: '16px', borderRadius: '8px', border: '1px solid #A7F3D0' }}>
          <p style={{ fontWeight: '500', color: '#065F46', marginBottom: '8px' }}>
            {language === 'ko' ? '결과:' : language === 'zh' ? '结果:' : 'Result:'}
          </p>
          <p style={{ fontSize: '14px', color: '#065F46' }}>
            {language === 'ko' ? 
              '품질을 유지하면서 긴 텍스트에 대해 4-5배 빠른 생성!' :
              language === 'zh' ?
              '在保持质量的同时，长文本生成速度提高4-5倍！' :
              '4-5x faster generation for long texts while maintaining quality!'}
          </p>
          <p style={{ fontSize: '12px', color: '#047857', marginTop: '4px' }}>
            {language === 'ko' ?
              'Google Gemini Diffusion: 1,479 토큰/초' :
              language === 'zh' ?
              'Google Gemini Diffusion: 1,479 令牌/秒' :
              'Google Gemini Diffusion: 1,479 tokens/second'}
          </p>
          {advancedMode && (
            <p style={{ fontSize: '12px', color: '#047857', marginTop: '4px' }}>
              LLaDA-8B matches LLaMA3-8B on tasks, solves reversal curse
            </p>
          )}
        </div>
      </div>
    );
  };


  const renderReferences = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '32px',
        maxWidth: '600px',
        maxHeight: '80vh',
        overflow: 'auto',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{t.keyPapers}</h2>
          <button
            onClick={() => setShowReferences(false)}
            style={{
              padding: '8px',
              backgroundColor: '#F3F4F6',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {papers.map((paper, idx) => (
            <div key={idx} style={{
              padding: '16px',
              backgroundColor: '#F9FAFB',
              borderRadius: '8px',
              border: '1px solid #E5E7EB'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>{paper.title}</h3>
              <p style={{ fontSize: '14px', color: '#6B7280' }}>{paper.authors} • {paper.venue}</p>
              {paper.performance && (
                <p style={{ fontSize: '14px', color: '#10B981', marginTop: '4px' }}>
                  Performance: {paper.performance}
                </p>
              )}
              {paper.link && (
                <a href={paper.link} target="_blank" rel="noopener noreferrer" 
                   style={{ fontSize: '14px', color: '#3B82F6', marginTop: '4px', display: 'block' }}>
                  Read paper →
                </a>
              )}
            </div>
          ))}
          {advancedMode && (
            <>
              <div style={{
                padding: '16px',
                backgroundColor: '#F9FAFB',
                borderRadius: '8px',
                border: '1px solid #E5E7EB'
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                  LLaDA: Large Language and Diffusion Assistant
                </h3>
                <p style={{ fontSize: '14px', color: '#6B7280' }}>Chen et al. • 2025</p>
                <p style={{ fontSize: '14px', color: '#10B981', marginTop: '4px' }}>
                  Solves reversal curse, matches LLaMA3-8B performance
                </p>
              </div>
              <div style={{
                padding: '16px',
                backgroundColor: '#F9FAFB',
                borderRadius: '8px',
                border: '1px solid #E5E7EB'
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                  AR-Diffusion: Autoregressive Diffusion Model for Text Generation
                </h3>
                <p style={{ fontSize: '14px', color: '#6B7280' }}>Wu et al. • NeurIPS 2023</p>
                <p style={{ fontSize: '14px', color: '#10B981', marginTop: '4px' }}>
                  100-600x speedup over standard diffusion
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAFAFA' }}>
      {/* Language Toggle */}
      <div style={{ 
        position: 'fixed', 
        top: '16px', 
        right: '16px', 
        display: 'flex', 
        gap: '8px',
        zIndex: 9999,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        padding: '8px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <button
          onClick={() => setAdvancedMode(!advancedMode)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '8px 12px',
            backgroundColor: advancedMode ? '#3B82F6' : 'white',
            color: advancedMode ? 'white' : '#374151',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Brain size={16} />
          {t.advanced}
        </button>
        <button
          onClick={() => setShowReferences(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '8px 12px',
            backgroundColor: 'white',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}
        >
          <BookOpen size={16} />
          {t.references}
        </button>
        <div style={{
          display: 'flex',
          backgroundColor: 'white',
          borderRadius: '8px',
          border: '1px solid #E5E7EB',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <button
            onClick={() => setLanguage('en')}
            style={{
              padding: '8px 12px',
              backgroundColor: language === 'en' ? '#3B82F6' : 'white',
              color: language === 'en' ? 'white' : '#374151',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('ko')}
            style={{
              padding: '8px 12px',
              backgroundColor: language === 'ko' ? '#3B82F6' : 'white',
              color: language === 'ko' ? 'white' : '#374151',
              border: 'none',
              borderLeft: '1px solid #E5E7EB',
              borderRight: '1px solid #E5E7EB',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            한국어
          </button>
          <button
            onClick={() => setLanguage('zh')}
            style={{
              padding: '8px 12px',
              backgroundColor: language === 'zh' ? '#3B82F6' : 'white',
              color: language === 'zh' ? 'white' : '#374151',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            中文
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '24px', paddingTop: '120px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', textAlign: 'center', marginBottom: '8px', color: '#111827' }}>
          {t.title}
        </h1>
        <p style={{ textAlign: 'center', color: '#6B7280', marginBottom: '32px' }}>
          {language === 'ko' ? 
            '확산 모델은 반복적 정제를 통해 언어 생성을 혁신합니다' :
            language === 'zh' ?
            '扩散模型通过迭代细化革新语言生成' :
            'Diffusion models transform language generation through iterative refinement'}
        </p>

        {/* Navigation */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
          {t.sections.map((section, idx) => (
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
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                backgroundColor: activeSection === idx ? '#3B82F6' : 'white',
                color: activeSection === idx ? 'white' : '#374151',
                transform: activeSection === idx ? 'scale(1.05)' : 'scale(1)',
                boxShadow: activeSection === idx ? 
                  '0 10px 15px -3px rgba(59, 130, 246, 0.3)' : 
                  '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: activeSection === idx ? 'none' : '1px solid #E5E7EB',
                cursor: 'pointer'
              }}
            >
              <div>{section.title}</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>{section.subtitle}</div>
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
          padding: '32px',
          minHeight: '500px',
          border: '1px solid #E5E7EB'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
            {t.sections[activeSection].title}
          </h2>
          <p style={{ color: '#6B7280', marginBottom: '16px' }}>
            {t.sections[activeSection].subtitle}
          </p>

          {/* Controls */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                backgroundColor: '#3B82F6',
                color: 'white',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500',
                boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              <span>{isPlaying ? t.pause : t.play}</span>
            </button>
            
            <button
              onClick={resetAnimation}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                backgroundColor: '#6B7280',
                color: 'white',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500',
                boxShadow: '0 4px 6px -1px rgba(107, 114, 128, 0.3)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <RotateCcw size={20} />
              <span>{t.reset}</span>
            </button>
          </div>

          <div style={{ marginBottom: '24px' }}>
            {activeSection === 0 && renderLLMAnimation()}
            {activeSection === 1 && renderDiffusionAnimation()}
            {activeSection === 2 && renderDiffusionLLMAnimation()}
          </div>
        </div>

        {/* Summary */}
        <div style={{ marginTop: '32px', backgroundColor: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #E5E7EB' }}>
          <h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '16px' }}>{t.summary}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', fontSize: '14px' }}>
            <div style={{ padding: '16px', backgroundColor: '#EBF8FF', borderRadius: '8px', border: '1px solid #BEE3F8' }}>
              <p style={{ fontWeight: '600', color: '#1E40AF', marginBottom: '4px' }}>
                {t.sections[0].title}
              </p>
              <p style={{ color: '#3730A3' }}>{t.summaryItems.llm}</p>
            </div>
            <div style={{ padding: '16px', backgroundColor: '#F3E8FF', borderRadius: '8px', border: '1px solid #E9D5FF' }}>
              <p style={{ fontWeight: '600', color: '#6B21A8', marginBottom: '4px' }}>
                {t.sections[1].title}
              </p>
              <p style={{ color: '#6B21A8' }}>{t.summaryItems.diffusion}</p>
            </div>
            <div style={{ padding: '16px', backgroundColor: '#D1FAE5', borderRadius: '8px', border: '1px solid #A7F3D0' }}>
              <p style={{ fontWeight: '600', color: '#065F46', marginBottom: '4px' }}>
                {t.sections[2].title}
              </p>
              <p style={{ color: '#047857' }}>{t.summaryItems.diffusionLLM}</p>
            </div>
          </div>
        </div>

        {advancedMode && (
          <div style={{ marginTop: '16px', backgroundColor: '#F3F4F6', borderRadius: '12px', padding: '16px', border: '1px solid #E5E7EB' }}>
            <p style={{ fontSize: '12px', color: '#4B5563', textAlign: 'center' }}>
              Advanced mode showing mathematical formulations and technical details. 
              Key innovations: SEDD (25-75% better perplexity), LLaDA (solves reversal curse), 
              Gemini Diffusion (1,479 tokens/sec), discrete diffusion with transition matrices.
            </p>
          </div>
        )}
      </div>

      {/* References Modal */}
      {showReferences && renderReferences()}
    </div>
  );
};

export default App;