import Card from '../components/shared/Card'
import { Link } from 'react-router-dom'

function AboutPage() {
   
    return (
        <Card>
            <div className="about">
                <h1>This is the about page.</h1>

                <p><Link to="/">Home Page</Link></p>
            </div>
        </Card>
    )
}

export default AboutPage