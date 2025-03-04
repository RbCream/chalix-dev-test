import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import BoardPage from './pages/BoardPage';
import './styles/App.css';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="app">
        <Header/>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/board/presentation" element={<BoardPage />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
