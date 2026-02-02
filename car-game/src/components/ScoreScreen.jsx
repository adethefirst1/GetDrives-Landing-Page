import { useState } from 'react';

export function ScoreScreen({
  score,
  totalRounds,
  onEmailSubmit,
  onSkip,
}) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      onEmailSubmit(email.trim());
    } else {
      onSkip();
    }
  };

  return (
    <div className="car-game-modal__inner">
      <div className="car-game-score-screen__result">
        You scored {score} / {totalRounds}
      </div>
      <p className="car-game-score-screen__sub">
        Enter your email to receive your score and GetDrives updates. No spam.
      </p>
      <form onSubmit={handleSubmit}>
        <label className="car-game-email-label" htmlFor="car-game-email">
          Email
        </label>
        <input
          id="car-game-email"
          type="email"
          className="car-game-email-input"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="car-game-send-btn">
          Send my score
        </button>
      </form>
      <button type="button" className="car-game-skip" onClick={() => onSkip()}>
        Skip for now
      </button>
    </div>
  );
}
