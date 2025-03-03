import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import BoardPage from './pages/BoardPage';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/board/presentation" element={<BoardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
