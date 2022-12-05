import { Link } from 'react-router-dom';
import Card from '../components/shared/Card';

function AboutPage() {
  return (
    <Card>
      <div className="about">
        <h1>This is the about page.</h1>

        <p><Link to="/">Home Page</Link></p>
      </div>
    </Card>
  );
}

export default AboutPage;
