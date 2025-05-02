import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import CreateEventPage from "./pages/CreateEventPage";
import UpdateEventPage from "./pages/UpdateEventPage";
import EventDetailsPage from "./pages/EventDetailsPage";

function App() {
  return (
    <>
      <Header />

      <main>
        <h1>Sonic Score is here.</h1>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/event/:id" element={<EventDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/create-event" element={<CreateEventPage />} />
          <Route path="/admin/update-event" element={<UpdateEventPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
