import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarHeart } from '@phosphor-icons/react';

const API_URL = import.meta.env.VITE_API_URL;

const HomePage = () => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/events.json`)
      .then((response) => {
        const eventsArr = Object.keys(response.data).map((id) => ({
          id,
          ...response.data[id],
        }));
        setEvents(eventsArr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!events) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-medium text-gray-500 flex items-center justify-center mt-5 mb-8 gap-2">
        <CalendarHeart weight="duotone" className="text-purple-700" size={38} /> Events List
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
        {events.map((event) => (
          <div
            className="card hover:shadow-lg shadow-purple-50 inset-shadow-sm inset-shadow-purple-100 bg-purple-50/50 hover:bg-purple-50 flex flex-col border-2 border-purple-100 rounded-xl inset"
            key={event.id}
          >
            <img src={event.imageSource} alt={event.imageSource} className="object-cover rounded-tl-xl rounded-tr-xl" />
            <div className="p-5 flex flex-col gap-2">
              <h2 className="text-xl font-extrabold text-purple-800">{event.name}</h2>
              <div className="text-blue-900">
                <p className="text-lg font-bold">
                  {event.location.city}, {event.location.country}
                </p>
                <p>
                  <strong>Capacity:</strong> {event.capacity}
                </p>
                <p className="">
                  <strong>Rating:</strong> {event.averageRating}
                </p>
              </div>
              <Link to={`/event/${event.id}`}>
                <button className="btn btn-primary w-full mt-4">Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
