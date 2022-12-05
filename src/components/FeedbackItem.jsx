import PropTypes from 'prop-types';
import { FaTimes, FaEdit } from 'react-icons/fa';
import { useContext } from 'react';
import Card from './shared/Card';
import FeedbackContext from '../context/FeedbackContext';
import FeedbackForm from './FeedbackForm';

function FeedbackItem({ item }) {
  const {
    deleteFeedbackItem,
    editFeedbackItem,
    feedbackEditFlag,
    feedbackEditableItem
  } = useContext(FeedbackContext);

  return (
    <Card>
      <div className="num-display">{item.rating}</div>
      <button type="submit" onClick={() => deleteFeedbackItem(item.id)} className="close">
        <FaTimes color="purple" />
      </button>
      <button type="submit" onClick={() => editFeedbackItem(item)} className="edit">
        <FaEdit color="purple" />
      </button>

      {(() => {
        if (feedbackEditFlag === true && feedbackEditableItem.id === item.id) {
          return <FeedbackForm id={item.id} />;
        }
        return <div className="text-display">{item.text}</div>;
      })()}
    </Card>
  );
}

FeedbackItem.defaultProps = {
  item: {
    id: '1',
    rating: 1,
    text: '',
  },
};

FeedbackItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    rating: PropTypes.number,
    text: PropTypes.string,
  })
};

export default FeedbackItem;
