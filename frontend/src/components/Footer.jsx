import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="euno-footer-section">
      <div className="euno-footer-title">
        <div className="footer-logo-div">
          <img src="..//images/header-section/logo2.png" alt="logo_b" />
        </div>
        <div className="euno-footer-modal">
          <div className="--anchor">개인정보처리방침</div>
        </div>
        <p></p>
      </div>
      <div className="euno-footer-info">
        <span>사업자명: 홍길동</span>&nbsp; <span>|</span> &nbsp;
        <br className="mobile-only" />
        <span>대표자명: 홍길동</span>&nbsp; <span>|</span> &nbsp;
        <span>팩스: 02-1234-5678</span>&nbsp; <span>|</span> &nbsp;
        <br className="mobile-only" />
        <span>주소: 서울 서초구 서초대로77길 39, 10층</span>&nbsp; <span>|</span> &nbsp;
        <br className="mobile-only" />
        <span>대표전화: 010-1234-5678</span>&nbsp; <span>|</span> &nbsp;
        <br className="mobile-only" />
        <span>사업자등록번호: 123-45-67890</span>&nbsp; <span>|</span> &nbsp;
        <br className="mobile-only" />
      </div>
    </footer>
  );
}

export default Footer;
