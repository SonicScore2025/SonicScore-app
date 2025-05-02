import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const HomePage = () => {
  const [events, setEvents] = useState(null);

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

  return (
    <div>
      <h1>HomePage</h1>
      <div>
        {events.map((event) => (
          <div className="card" key={event.id}>
            <p>{event.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
