import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>STS 4006</h1>
        <p>Data Structures & Algorithms MCQs</p>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz/:topicId" element={<QuizPage />} />
          <Route path="/results" element={<ResultPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
