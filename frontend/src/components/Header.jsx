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
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const isBoardPage = location.pathname.includes('/board/presentation');
  
  useEffect(() => {
    // 헤더 애니메이션
    gsap.from(headerRef.current, {
      y: 0,
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

  // 드롭다운 메뉴 표시 핸들링
  const handleMouseEnter = () => {
    setDropdownVisible(true);
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
    setExpanded(false);
  };
  
  return (
    <header ref={headerRef} className={`header ${scrolled ? 'scrolled' : ''} ${expanded ? 'expanded' : ''}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            {logoError ? (
              <div className="logo-text">
                  <img src="src/assets/header-section/logo2.png" alt="Logo" className="header-logo" />
                </div>
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
            <li className="nav-item">
              <span style={{ color: isBoardPage ? '#333' : '' }}>WHO WE ARE</span>
            </li>
            <li className="nav-item">
              <span style={{ color: isBoardPage ? '#333' : '' }}>WHAT WE CAN</span>
            </li>
            <li className={`nav-item ${location.pathname.includes('/board') ? 'active' : ''}`}>
              <span style={{ color: isBoardPage ? '#333' : '' }}>WHAT WE DO</span>
            </li>
            <li className="nav-item">
              <div className='contact' style={{ color: isBoardPage ? '#333' : '' }}>
              CONTACT
              </div>
            </li>
          </ul>
        </nav>
        <div className={`dropdown-content ${dropdownVisible ? 'visible' : ''}`}>
          
          <div className="dropdown-section">
            <Link to="/" style={{ color: isBoardPage ? '#333' : '' }}>CAIT VALUE</Link>
            <Link to="/" style={{ color: isBoardPage ? '#333' : '' }}>CEO 메시지</Link>
            <Link to="/" style={{ color: isBoardPage ? '#333' : '' }}>연혁</Link>
          </div>
          <div className="dropdown-section">
            <Link to="/" style={{ color: isBoardPage ? '#333' : '' }}>컨설팅부</Link>
            <Link to="/" style={{ color: isBoardPage ? '#333' : '' }}>글로벌연구센터</Link>
            <Link to="/" style={{ color: isBoardPage ? '#333' : '' }}>정책연구부</Link>
            <Link to="/" style={{ color: isBoardPage ? '#333' : '' }}>기술개발부</Link>
          </div>
          <div className="dropdown-section">
            <Link to="/board/presentation" style={{ color: isBoardPage ? '#333' : '' }}>발표논문</Link>
            <Link to="" style={{ color: isBoardPage ? '#333' : '' }}>연구과제</Link>
            <Link to="" style={{ color: isBoardPage ? '#333' : '' }}>소프트웨어</Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
