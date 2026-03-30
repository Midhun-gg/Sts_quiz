import { useNavigate } from 'react-router-dom';
import { allTopics, getAllQuestions } from '../data/index';

function HomePage() {
  const navigate = useNavigate();
  const allQuestionsCount = getAllQuestions().length;

  return (
    <div className="home-page">
      <h2>Select a Topic</h2>
      
      <div className="topics-grid">
        {/* All Topics Card */}
        <div 
          className="card card-hover topic-card" 
          onClick={() => navigate('/quiz/all')}
          style={{ backgroundColor: '#f0fdf4', borderColor: '#166534' }}
        >
          <h3>All Topics Mixed</h3>
          <span className="count">50 Questions</span>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
            A comprehensive 50-question quiz mixing random questions from all 21 topics.
          </p>
        </div>

        {/* Individual Topic Cards */}
        {allTopics.map(topic => (
          <div 
            key={topic.id} 
            className="card card-hover topic-card"
            onClick={() => navigate(`/quiz/${topic.id}`)}
          >
            <h3>{topic.name}</h3>
            <span className="count">{topic.questions.length} Questions</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
