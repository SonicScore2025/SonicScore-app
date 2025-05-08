import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import EventDetailsPage from './pages/EventDetailsPage';

import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminCreateEventPage from './pages/AdminCreateEventPage';
import AdminUpdateEventPage from './pages/AdminUpdateEventPage';
import AdminReviewsListPage from './pages/AdminReviewsListPage';
import AdminEventsListPage from './pages/AdminEventListPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { ToastContainer } from 'react-toastify';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <>
      <Header />

      <main className="py-5 px-4 md:px-0 container max-w-5xl mx-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/event/:id" element={<EventDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* <Route element={<AdminRoute />}> */}
          <Route path="/admin/events" element={<AdminDashboardPage />}>
            <Route index element={<AdminEventsListPage />} />
          </Route>
          <Route path="/admin/reviews" element={<AdminDashboardPage />}>
            <Route index element={<AdminReviewsListPage />} />
          </Route>
          <Route path="/admin/events/create" element={<AdminDashboardPage />}>
            <Route index element={<AdminCreateEventPage />} />
          </Route>
          <Route path="/admin/event/:id/update" element={<AdminDashboardPage />}>
            <Route index element={<AdminUpdateEventPage />} />
          </Route>
          {/* </Route> */}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <ToastContainer position="bottom-left" autoClose={1000} />

      <Footer />
    </>
  );
}

export default App;
