import { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import '../styles/Header.css';
import { LOGO } from '../assets/imageUrls';

function Header() {
  const headerRef = useRef(null);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  
  useEffect(() => {
    // 헤더 애니메이션
    gsap.from(headerRef.current, {
      y: -50,
      // 
      duration: 1,
      ease: "power3.out"
    });
    
    // 스크롤 이벤트 리스너
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // 이미지 로드 에러 핸들링
  const handleImageError = () => {
    setLogoError(true);
    console.warn('로고 이미지를 로드하는데 실패했습니다.');
  };
  
  return (
    <header ref={headerRef} className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            {logoError ? (
              <div className="logo-text">CHALIX</div>
            ) : (
              <img 
                src={LOGO} 
                alt="Chalix Logo" 
                onError={handleImageError}
              />
            )}
          </Link>
        </div>
        
        <nav className="nav">
          <ul>
            <li className="nav-item">ABOUT US</li>
            <li className={`nav-item dropdown ${location.pathname.includes('/board') ? 'active' : ''}`}>
              <span>WHAT WE DO</span>
              <div className="dropdown-content">
                <Link to="/board/presentation">발표논문</Link>
                <span>연구과제</span>
                <span>소프트웨어</span>
              </div>
            </li>
            <li className="nav-item">CONTACT</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
