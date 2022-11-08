import { createContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext() 

export const FeedbackProvider = ({children}) => {

    const [isLoading, setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState([])
    const [feedbackEditFlag, setFeedbackEditFlag] = useState(false)
    const [feedbackEditableItem, setFeedbackEditableItem] = useState({})
   
    useEffect(() => {
        fetchFeedback()
    }, [])

    const fetchFeedback = async () => {
        const response = await fetch("http://localhost:5000/feedback?_sort=id&_order=desc")
        const data = await response.json()

        setFeedback(data)
        setIsLoading(false)
    }

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
                isLoading: isLoading,
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