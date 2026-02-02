import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { overlayVariants, modalVariants, questionVariants } from '../motion/variants';
import { QuestionCard } from './QuestionCard';
import { ScoreScreen } from './ScoreScreen';
import { PostGameCTA } from './PostGameCTA';

const TOTAL_ROUNDS = 7;

export function GameModal({
  isOpen,
  onClose,
  gameState,
  round,
  score,
  questions,
  selectedAnswer,
  feedbackType,
  onSelectAnswer,
  disabled,
  onEmailSubmit,
  onSkip,
  onJoinWaitlist,
}) {
  const [exiting, setExiting] = useState(false);

  const handleClose = () => {
    if (exiting) return;
    setExiting(true);
  };

  const handleExitComplete = () => {
    setExiting(false);
    onClose?.();
  };

  if (!isOpen) return null;

  const currentQuestion =
    gameState === 'playing' && questions[round - 1]
      ? questions[round - 1]
      : null;

  const content = (
    <motion.div
      className="car-game-overlay"
      variants={overlayVariants}
      initial="hidden"
      animate={exiting ? 'exit' : 'visible'}
      exit="exit"
      onAnimationComplete={() => { if (exiting) handleExitComplete(); }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="car-game-modal-title"
    >
      <motion.div
        className="car-game-modal"
        variants={modalVariants}
        initial="hidden"
        animate={exiting ? 'exit' : 'visible'}
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          {gameState === 'playing' && currentQuestion && (
            <motion.div
              key={`question-${round}`}
              variants={questionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <QuestionCard
                round={round}
                totalRounds={TOTAL_ROUNDS}
                score={score}
                carImage={currentQuestion.car.image}
                options={currentQuestion.options}
                correctIndex={currentQuestion.correctIndex}
                selectedAnswer={selectedAnswer}
                feedbackType={feedbackType}
                onSelect={onSelectAnswer}
                disabled={disabled}
              />
            </motion.div>
          )}
          {gameState === 'score' && (
            <ScoreScreen
              key="score-screen"
              score={score}
              totalRounds={TOTAL_ROUNDS}
              onEmailSubmit={onEmailSubmit}
              onSkip={onSkip}
            />
          )}
          {gameState === 'postgame' && (
            <PostGameCTA key="postgame-cta" onJoinWaitlist={onJoinWaitlist} />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );

  return createPortal(content, document.body);
}
