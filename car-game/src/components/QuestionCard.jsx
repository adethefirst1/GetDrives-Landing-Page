import { motion } from 'framer-motion';
import {
  questionVariants,
  buttonMotion,
  correctMotion,
  wrongMotion,
} from '../motion/variants';

export function QuestionCard({
  round,
  totalRounds,
  score,
  carImage,
  options,
  correctIndex,
  selectedAnswer,
  feedbackType,
  onSelect,
  disabled,
}) {
  const getOptionClass = (index) => {
    if (selectedAnswer === null) return '';
    if (index === correctIndex) return 'car-game-option--correct';
    if (index === selectedAnswer && feedbackType === 'wrong') return 'car-game-option--wrong';
    if (index === correctIndex && selectedAnswer !== null) return 'car-game-option--correct';
    return '';
  };

  return (
    <motion.div
      key={`q-${round}`}
      variants={questionVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="car-game-modal__inner"
    >
      <div className="car-game-round">
        Round {round} of {totalRounds}
      </div>
      <div className="car-game-score">Score: {score}</div>

      <div className="car-game-image-wrap">
        <img src={carImage} alt="Car" />
      </div>
      <p className="car-game-question-title">Pick the correct car name.</p>

      <div className="car-game-options">
        {options.map((label, index) => {
          const isCorrect = index === correctIndex;
          const isWrong = selectedAnswer === index && feedbackType === 'wrong';
          const showCorrectReveal = selectedAnswer !== null && isCorrect;
          const showWrongReveal = selectedAnswer !== null && isWrong;

          return (
            <motion.button
              key={index}
              type="button"
              className={`car-game-option ${getOptionClass(index)}`}
              onClick={() => !disabled && onSelect(index)}
              disabled={disabled}
              {...buttonMotion}
              animate={
                showCorrectReveal
                  ? correctMotion
                  : showWrongReveal
                    ? wrongMotion
                    : undefined
              }
            >
              {label}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
