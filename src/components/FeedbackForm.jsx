import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from './shared/Card';
import Button from './shared/Button';
import RatingSelect from './shared/RatingSelect';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackForm({ id }) {
  const {
    addFeedbackItem,
    feedbackEditableItem,
    feedbackEditFlag,
    updateFeedbackItem,
  } = useContext(FeedbackContext);

  const [text, setText] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(10);

  useEffect(() => {
    // only show on the instance of the form requested
    if (feedbackEditFlag === true && id === feedbackEditableItem.id) {
      setBtnDisabled(false);
      setText(feedbackEditableItem.text);
      setRating(feedbackEditableItem.rating);
    }
  }, [feedbackEditableItem, feedbackEditFlag, id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
      };

      if (feedbackEditFlag === true && id === feedbackEditableItem.id) {
        updateFeedbackItem(feedbackEditableItem.id, newFeedback);
      } else {
        addFeedbackItem(newFeedback);
      }

      setText('');
    }
  };

  const handleTextChange = ({ target: { value } }) => {
    if (value === '') {
      setBtnDisabled(true);
      setMessage(null);
    } else if (value.trim().length <= 10) {
      setBtnDisabled(true);
      setMessage('Text must be at least 10 characters.');
    } else {
      setBtnDisabled(false);
      setMessage(null);
    }
    setText(value);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your experience?</h2>
        <RatingSelect
          id={id}
          select={(selectedRating) => setRating(selectedRating)}
          selected={rating}
        />
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="Write a review"
            value={text}
          />
          <Button isDisabled={btnDisabled} type="submit">
            Submit
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

FeedbackForm.defaultProps = {
  id: null,
};

FeedbackForm.propTypes = {
  id: PropTypes.number,
};

export default FeedbackForm;
