import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import Header from './components/Header'
import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
import { FaQuestion } from 'react-icons/fa'
import {FeedbackProvider} from './context/FeedbackContext'

function App() {
    return(
        <FeedbackProvider>
            <Router>
                <Header />
                <div className="container">
                    <Routes>
                        <Route exact path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                    </Routes>
                    <div className="about-link">
                        <Link to="/about">
                            <FaQuestion size={30} />
                        </Link>
                    </div>
                </div>
            </Router>
        </FeedbackProvider>
    )
}
export default App