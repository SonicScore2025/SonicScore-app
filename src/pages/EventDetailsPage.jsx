import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const EventDetailsPage = () => {
  const [event, setEvent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://sonicscore-api-default-rtdb.europe-west1.firebasedatabase.app/events/${id}.json`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const keysToString = (key) => {
    if (key === 'atmosphere') {
      return 'Atmosphere';
    } else if (key === 'facilities') {
      return 'Facilities';
    } else if (key === 'musicQuality') {
      return 'Music Quality';
    } else if (key === 'organization') {
      return 'Organization';
    } else if (key === 'safety') {
      return 'Safety';
    } else if (key === 'valueForMoney') {
      return 'Value for Money';
    } else if (key === 'overallExperience') {
      return 'Overall Experience';
    }
  };

  const deleteHandler = (reviewId) => {
    console.log(id);
    axios
      .delete(
        `https://sonicscore-api-default-rtdb.europe-west1.firebasedatabase.app/events/${id}//reviews/${reviewId}.json`
      )
      .then((response) => {
        return axios.get(`https://sonicscore-api-default-rtdb.europe-west1.firebasedatabase.app/events/${id}.json`);
      })
      .then((response) => setEvent(response.data))
      .catch((err) => console.log(err));
  };

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{event.name}</h1>

      <div className="img-placeholder w-50 h-30 border border-gray-900">Img placeholder </div>

      <div className="location">
        <p>{event.location.city}</p>
        <p>{event.location.country}</p>
        <p>at {event.location.venue}</p>
      </div>

      <p>capacity: {event.capacity}</p>

      <div className="ratings">
        <p>Festival Rating</p>
        <ul>
          {Object.keys(event.ratings).map((rating, i) => {
            return (
              <li key={i}>
                {keysToString(rating)}: {event.ratings[rating]}
              </li>
            );
          })}
        </ul>
      </div>

      {event.resouces && (
        <div className="resources">
          <p>{event.resources[0].sourceName}</p>
          <Link to={event.resources[0].sourceURL} target="_blank">
            <p>{event.resources[0].sourceURL}</p>
          </Link>
        </div>
      )}

      <Link to={'/'}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back</button>
      </Link>
      {event.reviews && (
        <div className="reviews" key={event.reviews.reviewId}>
          {Object.entries(event.reviews).map(([key, value], i) => {
            return (
              <div key={i}>
                <p>{value.date}</p>
                <p>UserName placeholder</p>
                <div>
                  <ul>
                    {Object.entries(value.ratings).map(([key, value], i) => {
                      return (
                        <li key={i}>
                          {keysToString(key)}: {value}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <p>{value.reviewText}</p>
                <div className="review-buttons">
                  <button
                    onClick={() => {
                      deleteHandler(key);
                    }}
                    className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                  >
                    Delete Review
                  </button>
                  <Link to={`/event/edit-review/${id}`}>
                    <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                      Edit Review
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div>
        <Link to={`/event/create-review/${id}`}>
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Add Review
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EventDetailsPage;
