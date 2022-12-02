import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [feedbackEditFlag, setFeedbackEditFlag] = useState(false);
  const [feedbackEditableItem, setFeedbackEditableItem] = useState({});

  // Called before loading components
  useEffect(() => {
    fetchFeedback();
  }, []);

  // Fetch data from backend
  const fetchFeedback = async () => {
    const response = await fetch('/feedback?_sort=id&_order=desc');
    const data = await response.json();

    setFeedback(data);
    setIsLoading(false);
  };

  // Add data to backend
  const addFeedbackItem = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();
    setFeedback([data, ...feedback]);
  };

  // Delete data from backend
  const deleteFeedbackItem = async (id) => {
    if (window.confirm('Sure?')) {
      await fetch(`/feedback/${id}`, {
        method: 'DELETE',
      });

      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  const updateFeedbackItem = async (id, updatedItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    });

    const data = await response.json();

    const newFeedback = feedback.map((item) => (item.id === id ? data : item));

    setFeedback(newFeedback);
    setFeedbackEditFlag(false);
    setFeedbackEditableItem({});
  };

  const editFeedbackItem = (item) => {
    setFeedbackEditFlag(true);
    setFeedbackEditableItem(item);
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback: feedback,
        feedbackEditFlag: feedbackEditFlag,
        feedbackEditableItem: feedbackEditableItem,
        isLoading: isLoading,
        deleteFeedbackItem: deleteFeedbackItem,
        addFeedbackItem: addFeedbackItem,
        editFeedbackItem: editFeedbackItem,
        updateFeedbackItem: updateFeedbackItem,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

FeedbackProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FeedbackContext;
