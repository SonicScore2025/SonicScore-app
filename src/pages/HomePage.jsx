import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarHeart, ChatCircleDots, Star, User } from '@phosphor-icons/react';
import Loading from '../components/Loading';

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
    return <Loading />;
  }

  return (
    <div id="HomePage">
      <h1 className="text-3xl font-medium text-gray-500 flex items-center justify-center mt-5 mb-8 gap-3">
        <CalendarHeart weight="duotone" className="text-purple-700" size={38} />
        Events List
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5 md:mb-10">
        {events.map((event) => (
          <div
            className="card hover:shadow-lg shadow-purple-100/80 inset-shadow-sm inset-shadow-purple-100 bg-purple-50/50 hover:bg-purple-50 flex flex-col border-2 border-purple-100 rounded-xl inset group"
            key={event.id}
          >
            <div className="overflow-hidden rounded-t-xl">
              <img
                src={event.imageSource}
                alt={event.imageSource}
                className="object-cover w-full h-48 transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </div>
            <div className="p-5 flex flex-col gap-2.5">
              <h2 className="text-xl font-extrabold text-purple-800">{event.name}</h2>
              <div className="text-blue-900 space-y-2 text-lg">
                <p className="font-bold flex items-center justify-between gap-2 ">
                  <span className="flex items-center gap-2">
                    <Star size={22} weight="duotone" className="text-yellow-600" />
                    {props.totalRating(event.ratings)} / 5
                  </span>
                  <span className="flex items-center whitespace-pre">
                    <span className="flex items-center ">
                      2 <User size={18} weight="bold" />
                    </span>
                  </span>
                </p>
                <p className="font-semibold">
                  {event.location.city}, {event.location.country}
                </p>
              </div>
              <Link to={`/event/${event.id}`}>
                <button className="btn btn-primary w-full mt-2">Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
