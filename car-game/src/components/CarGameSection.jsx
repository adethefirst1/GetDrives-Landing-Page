import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import carsData from '../data/cars.json';
import { generateRounds } from '../utils/gameLogic';
import { GameModal } from './GameModal';

const TOTAL_ROUNDS = 7;

export function CarGameSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [gameState, setGameState] = useState('idle');
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedbackType, setFeedbackType] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  const startGame = useCallback(() => {
    // Use only cars that have images (car-1 to car-12) so every round shows a real photo
    // and the correct answer always matches the image
    const carsWithImages = carsData.filter((c) => {
      const n = c.id.replace('car-', '');
      const num = parseInt(n, 10);
      return num >= 1 && num <= 12;
    });
    const rounds = generateRounds(carsWithImages.length >= 7 ? carsWithImages : carsData);
    setQuestions(rounds);
    setRound(1);
    setScore(0);
    setSelectedAnswer(null);
    setFeedbackType(null);
    setDisabled(false);
    setGameState('playing');
    setModalOpen(true);
  }, []);

  const handleSelectAnswer = useCallback(
    (index) => {
      if (disabled || selectedAnswer !== null) return;
      const current = questions[round - 1];
      if (!current) return;
      const isCorrect = index === current.correctIndex;
      setSelectedAnswer(index);
      setFeedbackType(isCorrect ? 'correct' : 'wrong');
      if (isCorrect) setScore((s) => s + 1);
      setDisabled(true);

      setTimeout(() => {
        if (round < TOTAL_ROUNDS) {
          setRound((r) => r + 1);
          setSelectedAnswer(null);
          setFeedbackType(null);
          setDisabled(false);
        } else {
          setGameState('score');
        }
      }, 800);
    },
    [disabled, round, questions, selectedAnswer]
  );

  const handleEmailSubmit = useCallback((email) => {
    // Placeholder: no backend
    setGameState('postgame');
  }, []);

  const handleSkip = useCallback(() => {
    setGameState('postgame');
  }, []);

  const openWaitlistModal = useCallback(() => {
    setModalOpen(false);
    if (typeof window !== 'undefined' && window.jQuery) {
      try {
        window.jQuery('#waitlistModal').modal('show');
      } catch (_) {}
    }
  }, []);

  return (
    <section className="car-game-section" id="identify-the-car">
      <span className="car-game-section__badge">GAME</span>
      <h2 className="car-game-section__title">Identify the Car</h2>
      <p className="car-game-section__subtitle">
        Pick the correct car name. 7 rounds.
      </p>
      <button
        type="button"
        className="car-game-section__btn"
        onClick={startGame}
      >
        Start Game
      </button>

      <AnimatePresence>
        <GameModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          gameState={gameState}
          round={round}
          score={score}
          questions={questions}
          selectedAnswer={selectedAnswer}
          feedbackType={feedbackType}
          onSelectAnswer={handleSelectAnswer}
          disabled={disabled}
          onEmailSubmit={handleEmailSubmit}
          onSkip={handleSkip}
          onJoinWaitlist={openWaitlistModal}
        />
      </AnimatePresence>
    </section>
  );
}
