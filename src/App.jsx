import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import EventDetailsPage from './pages/EventDetailsPage';
import CreateReview from './pages/CreateReview';
import EditReview from './pages/EditReview';

import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminEventsListPage from './pages/AdminEventListPage';
import AdminCreateEventPage from './pages/AdminCreateEventPage';
import AdminUpdateEventPage from './pages/AdminUpdateEventPage';
import AdminReviewsListPage from './pages/AdminReviewsListPage';
function App() {
  return (
    <div className="container max-w-6xl mx-auto">
      <Header />

      <main className="py-5">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/event/:id" element={<EventDetailsPage />} />
          <Route path="/event/create-review/:id" element={<CreateReview />} />
          <Route path="/event/edit-review/:id/:reviewId" element={<EditReview />} />
          <Route path="/about" element={<AboutPage />} />

          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/events" element={<AdminEventsListPage />} />
          <Route path="/admin/events/create" element={<AdminCreateEventPage />} />
          <Route path="/admin/event/:id/update" element={<AdminUpdateEventPage />} />
          <Route path="/admin/reviews" element={<AdminReviewsListPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
