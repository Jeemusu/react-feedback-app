import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackStats() {
  const { feedback } = useContext(FeedbackContext);

  const averageRating = Math.round(
    feedback.reduce((total, next) => total + next.rating, 0) / feedback.length
  );

  return (
    <div className="feedback-stats">
      <h4>
        {feedback.length}
        Reviews
      </h4>
      <h4>
        Average Rating
        {Number.isNaN(averageRating) ? ' 0' : ` ${averageRating}`}
      </h4>
    </div>
  );
}

export default FeedbackStats;
