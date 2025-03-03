import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <img src="/assets/logo_b.png" alt="Logo" className="footer-logo" />
        <p className="footer-text">
          개인정보처리방침  |  사업자명: 홍길동  |  대표자명: 홍길동  |  팩스: 02-1234-5678  |  주소: 서울 서초구 서초대로77길 39, 10층  |  대표전화: 010-1234-5678  |  사업자등록번호: 123-45-67890
        </p>
      </div>
    </footer>
  );
}

export default Footer;
