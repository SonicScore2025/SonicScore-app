import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const HomePage = () => {
  const [events, setEvents] = useState(null);
  const { id } = useParams;

  useEffect(() => {
    axios
      .get('https://sonicscore-api-default-rtdb.europe-west1.firebasedatabase.app/events.json')
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
    const sum = Object.keys(ratingsObj).reduce((acc, val) => {
      return acc + ratingsObj[val];
    }, 0);
    return parseFloat((sum / Object.keys(ratingsObj).length).toFixed(1));
  };

  return (
    <div>
      <h1>HomePage</h1>
      <div>
        {events.map((event) => (
          <div className="card border border-solid border-gray-900 my-1.5" key={event.id}>
            <p>{event.name}</p>
            <div className="flex justify-between items-center">
              <div className="img-placeholder w-50 h-30 border border-solid border-gray-900">Img placeholder </div>
              <p>
                {event.location.city}, {event.location.country}
              </p>
              <p>capacity: {event.capacity}</p>
              <p>rating: {totalRating(event.ratings)}</p>
              <Link to={'/event/:id'}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
