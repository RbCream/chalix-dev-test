import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/MainPage.css';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

function MainPage() {
  const heroRef = useRef(null);
  const introRef = useRef(null);
  const featuresRef = useRef(null);
  const techRef = useRef(null);
  const partnersRef = useRef(null);
  const [imageErrors, setImageErrors] = useState({});
  
  // 이미지 로드 에러 핸들링
  const handleImageError = (imageName) => {
    setImageErrors(prev => ({
      ...prev,
      [imageName]: true
    }));
    console.warn(`이미지 로드 실패: ${imageName}`);
  };
  
  useEffect(() => {
    // 히어로 섹션 애니메이션
    gsap.from(heroRef.current.querySelector('.hero-content'), {
      y: 50,
      duration: 1.5,
      ease: "power3.out"
    });
    
    // 인트로 섹션 애니메이션
    gsap.from(introRef.current.querySelector('.section-title'), {
      y: 30,
      duration: 1,
      scrollTrigger: {
        trigger: introRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
    
    gsap.from(introRef.current.querySelectorAll('.intro-item'), {
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: introRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse"
      }
    });
    
    // 특징 섹션 애니메이션
    gsap.from(featuresRef.current.querySelector('.section-title'), {
      y: 30,
      duration: 1,
      scrollTrigger: {
        trigger: featuresRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
    
    gsap.from(featuresRef.current.querySelectorAll('.feature-item'), {
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: featuresRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse"
      }
    });
    
    // 기술 섹션 애니메이션
    gsap.from(techRef.current.querySelector('.section-title'), {
      y: 30,
      duration: 1,
      scrollTrigger: {
        trigger: techRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
    
    gsap.from(techRef.current.querySelectorAll('.tech-item'), {
      scale: 0.9,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: techRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse"
      }
    });
    
    // 파트너 섹션 애니메이션
    gsap.from(partnersRef.current.querySelector('.section-title'), {
      y: 30,
      duration: 1,
      scrollTrigger: {
        trigger: partnersRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
    
    gsap.from(partnersRef.current.querySelectorAll('.partner-logo'), {
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      scrollTrigger: {
        trigger: partnersRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <main className="main-page">
      <section 
        ref={heroRef} 
        className="hero" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/assets/images/hero-bg.jpg)` 
        }}
      >
        <div className="hero-content">
          <h1>AI 혁신으로<br />더 나은 미래를 만듭니다</h1>
          <p>더 빠르고 더 정확한 AI 솔루션</p>
          <button className="hero-btn">자세히 보기</button>
        </div>
      </section>
      
      <section ref={introRef} className="intro-section">
        <div className="container">
          <h2 className="section-title">챌릭스 소개</h2>
          <p className="section-desc">
            챌릭스는 최첨단 인공지능 기술로 산업 혁신을 선도하는 기업입니다. 
            우리는 복잡한 문제를 해결하고 비즈니스 가치를 창출하는 AI 솔루션을 개발합니다.
          </p>
          
          <div className="intro-grid">
            <div className="intro-item">
              <div className="item-number">01</div>
              <h3>미션</h3>
              <p>AI 기술로 산업의 디지털 전환을 가속화하고 사회적 가치를 창출합니다.</p>
            </div>
            <div className="intro-item">
              <div className="item-number">02</div>
              <h3>비전</h3>
              <p>혁신적인 AI 기술의 선두주자로 글로벌 시장을 선도합니다.</p>
            </div>
            <div className="intro-item">
              <div className="item-number">03</div>
              <h3>가치</h3>
              <p>혁신, 협업, 신뢰를 핵심 가치로 우수한 AI 솔루션을 제공합니다.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section ref={featuresRef} className="features-section">
        <div className="container">
          <h2 className="section-title">우리의 강점</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <img 
                  src="/assets/icons/icon-research.png" 
                  alt="연구 중심"
                  onError={() => handleImageError('iconResearch')}
                  className={imageErrors.iconResearch ? 'hidden' : ''}
                />
                {imageErrors.iconResearch && <i className="icon-research"></i>}
              </div>
              <h3>연구 중심</h3>
              <p>최신 AI 기술 연구와 개발에 집중하여 혁신적인 솔루션을 제공합니다.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <img 
                  src="/assets/icons/icon-solution.png" 
                  alt="맞춤형 솔루션"
                  onError={() => handleImageError('iconSolution')}
                  className={imageErrors.iconSolution ? 'hidden' : ''}
                />
                {imageErrors.iconSolution && <i className="icon-solution"></i>}
              </div>
              <h3>맞춤형 솔루션</h3>
              <p>각 산업과 기업의 요구사항에 맞는 최적화된 AI 솔루션을 설계합니다.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <img 
                  src="/assets/icons/icon-expert.png" 
                  alt="전문가 팀"
                  onError={() => handleImageError('iconExpert')}
                  className={imageErrors.iconExpert ? 'hidden' : ''}
                />
                {imageErrors.iconExpert && <i className="icon-expert"></i>}
              </div>
              <h3>전문가 팀</h3>
              <p>AI, 데이터 사이언스, 소프트웨어 엔지니어링 전문가로 구성된 팀입니다.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <img 
                  src="/assets/icons/icon-scale.png" 
                  alt="확장성"
                  onError={() => handleImageError('iconScale')}
                  className={imageErrors.iconScale ? 'hidden' : ''}
                />
                {imageErrors.iconScale && <i className="icon-scale"></i>}
              </div>
              <h3>확장성</h3>
              <p>대규모 데이터와 복잡한 환경에서도 안정적으로 작동하는 시스템을 구축합니다.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section ref={techRef} className="tech-section">
        <div className="container">
          <h2 className="section-title">핵심 기술</h2>
          <div className="tech-grid">
            <div className="tech-item">
              <img 
                src="/assets/images/tech-image-1.jpg" 
                alt="자연어 처리"
                onError={() => handleImageError('tech1')}
                className={imageErrors.tech1 ? 'hidden' : ''}
              />
              {imageErrors.tech1 && <img src="/assets/images/fallback.jpg" alt="자연어 처리" />}
              <div className="tech-content">
                <h3>자연어 처리</h3>
                <p>텍스트 분석, 감성 분석, 자동 번역 등 언어를 이해하고 처리하는 기술</p>
              </div>
            </div>
            <div className="tech-item">
              <img 
                src="/assets/images/tech-image-2.jpg" 
                alt="컴퓨터 비전"
                onError={() => handleImageError('tech2')}
                className={imageErrors.tech2 ? 'hidden' : ''}
              />
              {imageErrors.tech2 && <img src="/assets/images/fallback.jpg" alt="컴퓨터 비전" />}
              <div className="tech-content">
                <h3>컴퓨터 비전</h3>
                <p>이미지 인식, 객체 탐지, 얼굴 인식 등 시각 데이터를 분석하는 기술</p>
              </div>
            </div>
            <div className="tech-item">
              <img 
                src="/assets/images/tech-image-3.jpg" 
                alt="예측 분석"
                onError={() => handleImageError('tech3')}
                className={imageErrors.tech3 ? 'hidden' : ''}
              />
              {imageErrors.tech3 && <img src="/assets/images/fallback.jpg" alt="예측 분석" />}
              <div className="tech-content">
                <h3>예측 분석</h3>
                <p>머신러닝 알고리즘을 활용한 데이터 기반 예측 모델링 및 분석 기술</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section ref={partnersRef} className="partners-section">
        <div className="container">
          <h2 className="section-title">주요 파트너</h2>
          <p className="section-desc">다양한 산업 분야의 파트너들과 함께 혁신적인 솔루션을 만들어갑니다.</p>
          <div className="partners-grid">
            <div className="partner-logo">Partner 1</div>
            <div className="partner-logo">Partner 2</div>
            <div className="partner-logo">Partner 3</div>
            <div className="partner-logo">Partner 4</div>
            <div className="partner-logo">Partner 5</div>
            <div className="partner-logo">Partner 6</div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default MainPage;
