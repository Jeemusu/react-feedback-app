import Card from './shared/Card';
import PropTypes from 'prop-types';
import { FaTimes, FaEdit } from 'react-icons/fa';
import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';
import FeedbackForm from '../components/FeedbackForm';

function FeedbackItem({ item }) {
  const {
    deleteFeedbackItem,
    editFeedbackItem,
    feedbackEditFlag,
    feedbackEditableItem,
  } = useContext(FeedbackContext);

  return (
    <Card>
      <div className="num-display">{item.rating}</div>
      <button onClick={() => deleteFeedbackItem(item.id)} className="close">
        <FaTimes color="purple" />
      </button>
      <button onClick={() => editFeedbackItem(item)} className="edit">
        <FaEdit color="purple" />
      </button>

      {(() => {
        if (feedbackEditFlag === true && feedbackEditableItem.id === item.id) {
          return <FeedbackForm id={item.id} />;
        } else {
          return <div className="text-display">{item.text}</div>;
        }
      })()}
    </Card>
  );
}

FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default FeedbackItem;
