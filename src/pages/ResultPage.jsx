import { useLocation, useNavigate, Navigate } from 'react-router-dom';

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to home if accessed directly without state
  if (!location.state || !location.state.results) {
    return <Navigate to="/" replace />;
  }

  const { results, topicName, totalQuestions } = location.state;
  const correctCount = results.filter(r => r.isCorrect).length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  return (
    <div className="result-page">
      <div className="score-card">
        <h3>{topicName} — Results</h3>
        <h2>{percentage}%</h2>
        <p>You scored {correctCount} out of {totalQuestions}</p>
      </div>

      <div className="action-buttons" style={{ marginBottom: '3rem', justifyContent: 'center' }}>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>

      <div className="review-section">
        <h3 style={{ fontSize: '2rem', marginBottom: '2rem', borderBottom: '3px solid black', paddingBottom: '0.5rem' }}>Review Answers</h3>
        
        {results.map((res, index) => (
          <div key={index} className="review-item">
            <div className="review-question">
              <span style={{ marginRight: '1rem', backgroundColor: '#000', color: '#fff', padding: '0.2rem 0.6rem' }}>Q{index + 1}</span>
              {res.questionText}
            </div>
            {/* Show topic context if it was an "All Topics" quiz */}
            {topicName === 'All Topics Mixed' && (
              <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem', color: '#666' }}>
                Topic: {res.topicName}
              </div>
            )}
            
            <div style={{ marginTop: '1rem' }}>
              <div className={`review-option ${res.isCorrect ? 'correct' : 'wrong'}`}>
                <strong>Your Answer:</strong> {res.selectedText}
                {res.isCorrect ? ' ✓' : ' ✗'}
              </div>

              {!res.isCorrect && (
                <div className="review-option correct">
                  <strong>Correct Answer:</strong> {res.correctText} ✓
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="action-buttons" style={{ marginTop: '3rem', justifyContent: 'center' }}>
        <button onClick={() => window.scrollTo(0, 0)} style={{ backgroundColor: '#000', color: '#fff' }}>Back to Top</button>
        <button onClick={() => navigate('/')}>Home</button>
      </div>
    </div>
  );
}

export default ResultPage;
