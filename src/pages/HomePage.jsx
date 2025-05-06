import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API_URL } from '../config/api';

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

  const totalRating = (ratingsObj) => {
    if (ratingsObj) {
      const sum = Object.keys(ratingsObj).reduce((acc, val) => {
        console.log(ratingsObj[val]);
        return acc + ratingsObj[val];
      }, 0);
      return parseFloat((sum / Object.keys(ratingsObj).length).toFixed(1));
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-5">
        {events.map((event) => (
          <div
            className="card hover:shadow-lg hover:bg-purple-50 flex flex-col border-2 border-purple-200 my-1.5 rounded-xl"
            key={event.id}
          >
            <img src={event.imageSource} alt={event.imageSource} className="object-cover rounded-tl-xl rounded-tr-xl" />
            <div className="p-5">
              <p className="text-2xl font-extrabold mb-2">{event.name}</p>
              <p className="text-xl mb-2">
                {event.location.city}, {event.location.country}
              </p>
              <p className="text-lg mb-2">
                <strong>Capacity:</strong> {event.capacity}
              </p>
              <p className="text-lg">
                <strong>Rating:</strong> {totalRating(event.ratings)}
              </p>
              <Link to={`/event/${event.id}`}>
                <button className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
