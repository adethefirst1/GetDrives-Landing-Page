export function PostGameCTA({ onJoinWaitlist }) {
  const handleJoin = () => {
    if (typeof onJoinWaitlist === 'function') {
      onJoinWaitlist();
    }
  };

  return (
    <div className="car-game-modal__inner">
      <h3 className="car-game-cta-title">Ready to ride smarter?</h3>
      <button type="button" className="car-game-cta-btn" onClick={handleJoin}>
        Join GetDrives Waitlist
      </button>
    </div>
  );
}
