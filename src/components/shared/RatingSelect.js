import FeedbackContext from '../../context/FeedbackContext'
import { useContext } from 'react'

function RatingSelect({id, select, selected}) {

    const {feedbackEditableItem, feedbackEditFlag} = useContext(FeedbackContext)

    const handleChange = ({ target: { value } }) => {
        select(+value)
    }

    const identifier = feedbackEditFlag === true && id === feedbackEditableItem.id && feedbackEditableItem.id + '_'
    
    return(
        <ul className='rating'>
            {Array.from({ length: 10 }, (_, i) => (
                <li key={`rating-${i + 1}`}>
                    <input
                        type='radio'
                        id={identifier + 'num_' + (i + 1)}
                        name='rating'
                        value={i + 1}
                        onChange={handleChange}
                        checked={selected === i + 1}
                    />
                    <label 
                        htmlFor={identifier + 'num_' + (i + 1)}>
                        {i + 1}
                    </label>
                </li>
            ))}
        </ul>
    )
}

export default RatingSelect