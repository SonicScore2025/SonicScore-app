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
import AdminCreateEventPage from './pages/AdminCreateEventPage';
import AdminUpdateEventPage from './pages/AdminUpdateEventPage';
import AdminReviewsListPage from './pages/AdminReviewsListPage';
import AdminEventsListPage from './pages/AdminEventListPage';

function App() {
  return (
    <>
      <Header />

      <main className="py-5 px-4 md:px-0 container max-w-6xl mx-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/event/:id" element={<EventDetailsPage />} />
          <Route path="/event/create-review/:id" element={<CreateReview />} />
          <Route path="/event/edit-review/:id/:reviewId" element={<EditReview />} />
          <Route path="/about" element={<AboutPage />} />

          <Route path="/admin/events" element={<AdminDashboardPage />}>
            <Route index element={<AdminEventsListPage />} />
          </Route>
          <Route path="/admin/reviews" element={<AdminDashboardPage />}>
            <Route index element={<AdminReviewsListPage />} />
          </Route>
          <Route path="/admin/events/create" element={<AdminDashboardPage />}>
            <Route index element={<AdminCreateEventPage />} />
          </Route>

          <Route path="/admin/event/:id/update" element={<AdminUpdateEventPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
