import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import CreateEventPage from './pages/CreateEventPage';
import UpdateEventPage from './pages/UpdateEventPage';
import EventDetailsPage from './pages/EventDetailsPage';
import CreateReview from './pages/CreateReview';
import EditReview from './pages/EditReview';

function App() {
  return (
    <div className="container max-w-6xl mx-auto">
      <Header />

      <main className="py-5">
        <h1>Sonic Score is here.</h1>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/event/:id" element={<EventDetailsPage />} />
          <Route path="/event/create-review/:id" element={<CreateReview />} />
          <Route path="/event/edit-review/:id" element={<EditReview />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/create-event" element={<CreateEventPage />} />
          <Route path="/admin/update-event" element={<UpdateEventPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
