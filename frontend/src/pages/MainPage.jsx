import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import '../styles/MainPage.css';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

function MainPage() {
  const mainBannerRef = useRef(null);
  const expertiseRef = useRef(null);
  const gridContentRefs = useRef([]);
  const textRef = useRef(null);

  useEffect(() => {
    // mainbanner 애니메이션
    gsap.to(mainBannerRef.current, {
      duration: 1,
      opacity: 1,
      ease: 'power2.inOut',
      backgroundSize: 'cover',
    });

    // 텍스트 타이핑 효과 (HTML 태그 허용)
    gsap.to(textRef.current, {
      duration: 3,
      text: "지속 가능한 미래와 고객의 비즈니스 성공을 위한 <br /> 혁신적인 환경 솔루션을 제공합니다",
      ease: "power1.out",
      delay: 1,
    });

    // Expertise 애니메이션
    gsap.to(expertiseRef.current, {
      scrollTrigger: {
        trigger: expertiseRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      },
      duration: 1,
      ease: 'power2.inOut',
      width: '100%',
      padding: '0 48px',
    });

    // Grid content animation
    gridContentRefs.current.forEach((ref) => {
      gsap.to(ref.querySelector('.content-text'), {
        scrollTrigger: {
          trigger: ref,
          start: 'top bottom',
          end: 'top center',
          scrub: true,
          onEnter: () => ref.classList.add('scrolled'),
          onLeaveBack: () => ref.classList.remove('scrolled'),
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.inOut',
      });
    });
  }, []);

  return (
   // https://test.chalix.co.kr/ 와 동일한 프론트엔드 페이지 구현
   // GASP 라이브러리를 사용하여 애니메이션 효과 추가
   <main>
{/* #1 - 메인페이지 출력시 백그라운드 영상재생 & 타이핑 되듯 출력되어야함 + 커서없음 */}
<section className='mainbanner' ref={mainBannerRef}>
        <div className='mainbanner-mp4'>
          <video autoPlay loop muted style={{ width: '100vw', height: '100vh' }}>
            <source src='https://test.chalix.co.kr/images/main-video-section/mainvid.mp4' type='video/mp4' />
          </video>
          <div className='mainbanner-content' ref={textRef}></div>
        </div>
      </section>
{/* #2 - 스크롤내리면 카드가 좁혀지며 이미지가 2개에서 4개됨
(좌우패딩 48) */}
    <section className='Expertise' ref={expertiseRef}>
      {/* #2-1 컨텐츠 타이틀 */}
      <div className='exp-title'>
        <div className='exp-maintitle'>
        Our Expertise
        </div>
        <div className='exp-subtitle'>
        깊이 있는 전문 지식으로 
        지속 가능한 미래를 설계합니다
        </div>
      </div>

      {/* #2-2 컨텐츠 영역 + 애니메이션션 */}
      <div className='exp-container'>
        <div className='exp-content1'>
        <img src='src/assets/mom-cards-news/scale1.jpg' alt='exp1' />
          <div className='exp-content1-text'>
          <h2>컨설팅부</h2>
          <p>다양한 경험과 노하우를 바탕으로 기후변화 대응 최적전략 수립 및 탄소배출권 관리 및  국가와 기업의 경쟁령을 고취합니다</p>
          </div>
        </div>

        <div className='exp-content2'>
        <img src='src/assets/mom-cards-news/scale2.jpg' alt='exp2' />
          <div className='exp-content2-text'>
          <h2>글로벌연구센터</h2>
          <p>기후변화 대응 및 ESG 경영 선도를 위해 국제개발협력, 정책연구, 신재생에너지 및 탄소감축 사업 등 다양한 현지 맞춤형 솔루션을 제공합니다</p>
          </div>
        </div>

        <div className='exp-content3'>
        <img src='src/assets/mom-cards-news/scale3.jpg' alt='exp3' />
          <div className='exp-content3-text'>
          <h2>정책연구부</h2>
          <p>국가, 지방자치단체, 사업장 등이 환경분야 및 기후변화에 선도적으로 대응할 수 있도록 정책 개발 및 대안 마련합니다</p>
          </div>
        </div>

        <div className='exp-content4'>
        <img src='src/assets/mom-cards-news/scale4.jpg' alt='exp4' />
          <div className='exp-content4-text'>
          <h2>기술개발부</h2>
          <p>세균 및 바이러스 제거, 지속적인 효과, 환경 친화적인 항균ᆞ항바이러스 나노물질의 개발로  새로운 제품과 서비스를 제공합니다</p>
          </div>
        </div>
      
      </div>
    </section>
    
{/* #3 - GRID 5x5 컨텐츠 배치 + 마우스 스크롤시 글 나타남 &
마우스 호버 시 아이콘나타남 (좌우패딩 48) */}
    <section className='grid'>
      <div className='grid-content1'>
        <div>Latest News</div>
        <div>순환경제사회법 시행령 일부개정령안 입법예고</div>
      </div>
      <div className='grid-content2' ref={el => gridContentRefs.current[0] = el}>
        <img src='src/assets/plaid-pattern-section/2-1.png' alt='section2' />
        <div className='content-text'>신뢰와 정확성을 바탕으로하는 카이트 엔지니어링</div>
      </div>
      <div className='grid-content3' ref={el => gridContentRefs.current[1] = el}>
        <img src='src/assets/plaid-pattern-section/2-2.png' alt='section3' />
        <div className='content-text'>신뢰와 정확성을 바탕으로하는 카이트 엔지니어링</div>
      </div>
      <div className='grid-content4' ref={el => gridContentRefs.current[2] = el}>
        <img src='src/assets/plaid-pattern-section/2-3.png' alt='section4' />
        <div className='content-text'>고객 맞춤형 환경 솔루션 제공</div>
      </div>
      <div className='grid-content5' ref={el => gridContentRefs.current[3] = el}>
        <img src='src/assets/plaid-pattern-section/2-4.png' alt='section5' />
        <div className='content-text'>신뢰와 정확성을 바탕으로하는 카이트 엔지니어링</div>
      </div>
      <div className='grid-content6' ref={el => gridContentRefs.current[4] = el}>
        <img src='src/assets/plaid-pattern-section/2-5.png' alt='section6' />
        <div className='content-text'>고객 맞춤형 환경 솔루션 제공</div>
      </div>
      <div className='grid-content7'>
        바로가기
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
        </svg>
      </div>
    </section>

{/* #4 - 까만화면에 글자에서 스크롤 진행하면 이미지 5개 올라가다가 
가운데 이미지는 중앙에서 멈춰서 스크롤 내릴수록 확대되어 꽉차게됨 + 다른이미지는 위로 올라감 >  */}
    <section className='extension-img'>

      {/* #4-1 올라오는 이미지들과 배경 컨테이너 / 3번이미지가 확대되어 배경으로 사용됨됨 */}
      <div className='ext-container'>
        <div className='ext-img1'><img src='src/assets/slide-image-section/5.png' alt='ext1' /></div>
        <div className='ext-img2'><img src='src/assets/slide-image-section/4.png' alt='ext2' /></div>
        <div className='ext-img3'><img src='src/assets/slide-image-section/1.png' alt='ext3' /></div>
        <div className='ext img4'><img src='src/assets/slide-image-section/3.png' alt='ext4' /></div>
        <div className='ext img5'><img src='src/assets/slide-image-section/2.png' alt='ext5' /></div>
      </div>
      
      {/* #4-2 이미지 배경 내부 텍스트, 내부 위치고정정 */}
      <div className='ext-contents'>
        Environmental consultancy firm
        offering high-value advisory services
        <div className='ext-button'>
          사업실적
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path></svg>
        </div>
      </div> 
    </section>

  
  </main>
  );
}

export default MainPage;
