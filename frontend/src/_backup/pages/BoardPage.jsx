import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import api from '../config/api';
import '../styles/BoardPage.css';
import Footer from '../components/Footer';

function BoardPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const pageRef = useRef(null);
  const tableRef = useRef(null);
  
  useEffect(() => {
    // 페이지 로드 애니메이션
    gsap.from(pageRef.current, {
      y: 30,
      duration: 0.8,
      ease: "power2.out"
    });
    
    // 게시글 데이터 가져오기
    fetchPosts();
  }, []);
  
  useEffect(() => {
    if (!loading && posts.length > 0 && tableRef.current) {
      // 테이블 행 애니메이션
      const rows = tableRef.current.querySelectorAll('tbody tr');
      gsap.from(rows, {
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [loading, posts]);
  
  const fetchPosts = async () => {
    try {
      const response = await api.get('/board/presentation');
      setPosts(response.data.slice(0, 8)); // 글 목록 8개만 표시
      setLoading(false);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('게시글을 불러오는데 실패했습니다.');
      setLoading(false);
    }
  };
  
  return (
    <div ref={pageRef} className="board-page">
      <div className="board-header">
        <div className="header-container">
          <div className="header-left-logowrap">
            <img src="/assets/logo.png" alt="Logo" className="header-logo-img" />
          </div>
          <div className="header-right-navwrap">
            <div className="header-nav-item"><a href="/">Home</a></div>
            <div className="header-nav-item"><a href="/about">About</a></div>
            <div className="header-nav-item contact"><a href="/contact">Contact</a></div>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <table ref={tableRef} className="board-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>학술대회명</th>
              <th>논문명</th>
              <th>날짜</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id} className="post-row">
                <td>{post.id}</td>
                <td className="post-title">{post.conference_name}</td>
                <td>{post.paper_title}</td>
                <td>{new Date(post.date).toLocaleDateString()}</td>
                <td>{post.note}</td>
              </tr>
            ))}
            
            {posts.length === 0 && (
              <tr>
                <td colSpan="5" className="no-posts">
                  게시글이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      <Footer />
    </div>
  );
}

export default BoardPage;
