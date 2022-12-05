import FeedbackList from '../components/FeedbackList';
import FeedbackStats from '../components/FeedbackStats';
import FeedbackForm from '../components/FeedbackForm';

function HomePage() {
  return (
    <>
      <FeedbackForm />
      <FeedbackStats />
      <FeedbackList />
    </>
  );
}

export default HomePage;
