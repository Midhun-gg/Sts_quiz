import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { allTopics, getAllQuestions } from '../data/index';
import { shuffleArray, shuffleOptions } from '../utils/shuffle';

function QuizPage() {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [topicName, setTopicName] = useState('');
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);

  // Initialize quiz
  useEffect(() => {
    let sourceQuestions = [];
    let name = '';

    if (topicId === 'all') {
      // 1. Pick exactly 1 random question from every topic to guarantee inclusion (21 questions)
      const guaranteedQuestions = allTopics.map(topic => {
        const randomQ = topic.questions[Math.floor(Math.random() * topic.questions.length)];
        return { ...randomQ, topicName: topic.name };
      });
      
      // 2. Gather all remaining questions
      const remainingQuestions = getAllQuestions().filter(
        q => !guaranteedQuestions.some(gq => gq.id === q.id && gq.topicName === q.topicName)
      );
      
      // 3. Pick random additional questions to reach exactly 50
      const additionalCount = 50 - guaranteedQuestions.length;
      const additionalQuestions = shuffleArray(remainingQuestions).slice(0, additionalCount);
      
      sourceQuestions = [...guaranteedQuestions, ...additionalQuestions];
      name = 'All Topics Mixed';
    } else {
      const topic = allTopics.find(t => t.id === topicId);
      if (topic) {
        sourceQuestions = topic.questions.map(q => ({ ...q, topicName: topic.name }));
        name = topic.name;
      } else {
        navigate('/'); // Invalid topic
        return;
      }
    }

    setTopicName(name);

    // 1. Shuffle the order of questions
    const shuffledQuestions = shuffleArray(sourceQuestions);

    // 2. Shuffle the options within each question and track the new correct index
    const fullyShuffled = shuffledQuestions.map(q => shuffleOptions(q));

    setQuestions(fullyShuffled);
    setCurrentIndex(0);
    setAnswers([]);
    setSelectedOption(null);
  }, [topicId, navigate]);

  if (questions.length === 0) {
    return <div>Loading quiz...</div>;
  }

  const currentQ = questions[currentIndex];
  const progressPercent = ((currentIndex) / questions.length) * 100;

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    // Record the answer
    const isCorrect = selectedOption === currentQ.a;
    const newAnswers = [...answers, {
      questionId: currentQ.id,
      topicName: currentQ.topicName,
      questionText: currentQ.q,
      options: currentQ.o,
      selectedText: currentQ.o[selectedOption],
      correctText: currentQ.o[currentQ.a],
      isCorrect
    }];

    setAnswers(newAnswers);
    setSelectedOption(null);

    // Check if finished
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Quiz finished, go to results
      navigate('/results', { state: { results: newAnswers, topicName, totalQuestions: questions.length } });
    }
  };

  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <span>{topicName}</span>
        <span>Question {currentIndex + 1} of {questions.length}</span>
      </div>

      <div className="progress-container">
        <div 
          className="progress-bar" 
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 className="question-text">{currentQ.q}</h2>

        <div className="options-grid">
          {currentQ.o.map((opt, index) => {
            const letters = ['A', 'B', 'C', 'D'];
            const isSelected = selectedOption === index;
            
            return (
              <button 
                key={index}
                className={`option-btn ${isSelected ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(index)}
              >
                <span className="letter-badge">{letters[index]}</span>
                <span style={{flex: 1}}>{opt}</span>
              </button>
            );
          })}
        </div>

        <div className="quiz-footer">
          <button 
            onClick={handleNext} 
            disabled={selectedOption === null}
            style={{ backgroundColor: selectedOption !== null ? '#000' : '#fff', color: selectedOption !== null ? '#fff' : '#000' }}
          >
            {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'} →
          </button>
        </div>
      </div>
      
      <div style={{ textAlign: 'center' }}>
        {!showQuitConfirm ? (
          <button 
            onClick={() => setShowQuitConfirm(true)} 
            style={{ backgroundColor: '#fee2e2', borderColor: '#dc2626', color: '#991b1b', fontSize: '0.9rem' }}
          >
            Quit Quiz
          </button>
        ) : (
          <div style={{ display: 'inline-flex', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontWeight: 'bold', color: '#dc2626' }}>Are you sure?</span>
            <button 
              onClick={() => navigate('/')} 
              style={{ backgroundColor: '#fee2e2', borderColor: '#dc2626', color: '#991b1b', fontSize: '0.9rem', padding: '0.5rem 1rem' }}
            >
              Yes, Quit
            </button>
            <button 
              onClick={() => setShowQuitConfirm(false)} 
              style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizPage;
