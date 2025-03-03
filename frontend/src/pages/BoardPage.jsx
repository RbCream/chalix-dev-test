import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import axios from 'axios';
import '../styles/BoardPage.css';

function BoardPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const pageRef = useRef(null);
  const tableRef = useRef(null);
  
  useEffect(() => {
    // 페이지 로드 애니메이션
    gsap.from(pageRef.current, {
      opacity: 0,
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
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [loading, posts]);
  
  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts');
      setPosts(response.data);
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
        <h1>발표논문</h1>
        <p>챌릭스의 연구 성과를 확인하세요.</p>
      </div>
      
      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <div className="board-controls">
            <div className="search-box">
              <input type="text" placeholder="검색어를 입력하세요" />
              <button>검색</button>
            </div>
            <button className="new-post-btn">글 작성</button>
          </div>
          
          <table ref={tableRef} className="board-table">
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>조회수</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id} className="post-row">
                  <td>{post.id}</td>
                  <td className="post-title">{post.title}</td>
                  <td>{post.author}</td>
                  <td>{new Date(post.created_at).toLocaleDateString()}</td>
                  <td>{post.view_count}</td>
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
          
          <div className="pagination">
            <button className="page-btn">&lt;</button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn">&gt;</button>
          </div>
        </>
      )}
    </div>
  );
}

export default BoardPage;
