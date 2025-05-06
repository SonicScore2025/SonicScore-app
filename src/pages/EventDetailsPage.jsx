import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API_URL } from '../config/api';

const EventDetailsPage = () => {
  const [event, setEvent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${API_URL}/events/${id}.json`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const translateKeys = (key) => {
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

  const calcRating = (reviewsObj) => {
    if (reviewsObj) {
      const reviewValues = Object.values(reviewsObj);
      if (reviewValues.length === 0) return [0, 0, 0, 0, 0, 0, 0];

      const numRatings = Object.keys(reviewValues[0].ratings).length;
      const ratingsArr = Array(numRatings).fill(0);
      let counter = 0;

      reviewValues.forEach((review) => {
        counter++;
        Object.values(review.ratings).forEach((valueRatings, i) => {
          ratingsArr[i] += +valueRatings;
        });
      });

      return ratingsArr.map((sum) => (sum / counter).toFixed(1));
    } else {
      return [0, 0, 0, 0, 0, 0, 0];
    }
  };

  const deleteHandler = (reviewId) => {
    axios
      .delete(`${API_URL}/events/${id}/reviews/${reviewId}.json`)
      .then((response) => {
        return axios.get(`${API_URL}/events/${id}.json`);
      })
      .then((response) => {
        setEvent(response.data);
      })
      .catch((err) => console.log(err));
  };

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{event.name}</h1>
      <div className="w-40">
        <img src={event.imageSource} alt={event.name} />
      </div>
      <div className="event-info">
        <p>
          {event.location.city}, {event.location.country}
        </p>
        <p>capacity: {event.capacity}</p>
        <Link to={event.website} target="_blank">
          {event.website}
        </Link>
      </div>

      <div className="ratings">
        <p>Festival Rating</p>
        <ul>
          {Object.keys(event.ratings).map((rating, i) => {
            return (
              <li key={i}>
                {translateKeys(rating)}: {calcRating(event.reviews)[i]}
                {/* {translateKeys(rating)}: {event.ratings[rating]} */}
              </li>
            );
          })}
        </ul>
      </div>

      {event.resources && (
        <div className="resources">
          {event.resources.map((resource, i) => {
            return (
              <div key={i}>
                <p>{resource.sourceTitle}</p>
                <Link to={resource.sourceURL} target="_blank">
                  <p>{resource.sourceURL}</p>
                </Link>
              </div>
            );
          })}
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
                          {translateKeys(key)}: {value}
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
                  <Link to={`/event/edit-review/${id}/${key}`}>
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
