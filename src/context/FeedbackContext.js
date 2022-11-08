import { createContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import feedbackData from '../data/feedbackData'

const FeedbackContext = createContext() 

export const FeedbackProvider = ({children}) => {

    const [feedback, setFeedback] = useState(feedbackData)
    const [feedbackEditFlag, setFeedbackEditFlag] = useState(false)
    const [feedbackEditableItem, setFeedbackEditableItem] = useState({})
   
    const addFeedbackItem = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
    }

    const deleteFeedbackItem = (id) => {
        if(window.confirm('Sure?')) {
            setFeedback(feedback.filter((item) => 
                item.id !== id
            ))
        }
    }

    const editFeedbackItem = (item) => {
        setFeedbackEditFlag(true)
        setFeedbackEditableItem(item)
    }

    const updateFeedbackItem = (id, updatedItem) => {

        const newFeedback = feedback.map((item) => item.id === id ? {...item, ...updatedItem} : item)
        setFeedback(newFeedback)
        setFeedbackEditFlag(false)
        setFeedbackEditableItem({})
    }

    return (
        <FeedbackContext.Provider
            value={{ 
                feedback: feedback,
                feedbackEditFlag: feedbackEditFlag,
                feedbackEditableItem: feedbackEditableItem,
                deleteFeedbackItem: deleteFeedbackItem,
                addFeedbackItem: addFeedbackItem,
                editFeedbackItem: editFeedbackItem,
                updateFeedbackItem: updateFeedbackItem,
            }}
        >
            {children}
        </FeedbackContext.Provider>
    )
}

export default FeedbackContext