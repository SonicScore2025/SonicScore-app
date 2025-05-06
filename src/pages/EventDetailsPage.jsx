import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API_URL } from '../config/api';
import { GlobeSimple, Star } from '@phosphor-icons/react';

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
      <div className="mb-5">
        <div className="mb-4">
          <img src={event.imageSource} alt={event.name} />
        </div>
        <h1 className="text-3xl font-bold mb-4 text-purple-800">{event.name}</h1>
        <p className="text-2xl font-semibold mb-2">
          {event.location.city}, {event.location.country}
        </p>
        <p className="text-xl font-semibold mb-3">Capacity: {event.capacity}</p>
        <Link
          to={event.website}
          target="_blank"
          className="text-xl font-semibold mb-6 flex gap-2 items-center text-blue-900"
        >
          <GlobeSimple size={24} weight="duotone" /> Official Website
        </Link>

        <div className="ratings border-2 p-5 my-4 rounded-xl bg-purple-50 border-purple-200">
          <p className="flex items-center justify-between gap-2 text-xl font-bold mb-2 text-purple-800">
            Festival Rating <Star size={24} weight="duotone" />
          </p>
          <ul className="text-lg space-y-1 font-medium text-blue-900">
            {Object.keys(event.ratings).map((rating, i) => {
              return (
                <li key={i} className="flex items-center justify-between">
                  <strong>{translateKeys(rating)}: </strong>
                  <span className="text-xl font-bold">{calcRating(event.reviews)[i]}</span>
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
                  <p className="text-lg mt-5 text-gray-400">
                    {resource.sourceTitle}:{' '}
                    <Link to={resource.sourceURL} target="_blank">
                      Click to visit
                    </Link>
                  </p>
                </div>
              );
            })}
          </div>
        )}
        <div className="mt-5">
          {/* flex items-center justify-between */}
          <Link to={`/event/create-review/${id}`}>
            <button className="w-full bg-transparent hover:bg-blue-800 text-blue-900 font-semibold hover:text-white py-2 px-4 border border-blue-800 hover:border-transparent rounded">
              Add Review
            </button>
          </Link>
          <Link to={'/'}>
            <button className="w-full mt-3 bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
              Back
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-xl font-bold">User Reviews</h2>
        {event.reviews && (
          <div className="text-lg" key={event.reviews.reviewId}>
            {Object.entries(event.reviews).map(([key, value], i) => {
              return (
                <div className="mt-3 flex flex-col border-2 border-purple-200 rounded-2xl" key={i}>
                  <div className="flex justify-between">
                    {/* <div className="flex justify-between border-b-2 border-purple-200 my-3 mx-4 pb-2"> */}
                    <p className="my-3 mx-4">UserName placeholder</p>
                    <p className="my-3 mx-4">{value.date}</p>
                  </div>
                  {/* <div className="px-8 flex"> */}
                  <ul className="px-14 py-3 text-blue-900">
                    {Object.entries(value.ratings).map(([key, value], i) => {
                      return (
                        <li className="flex justify-between" key={i}>
                          <span className="font-semibold">{translateKeys(key)}:</span>
                          <span>
                            <strong>{value} </strong>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  {/* </div> */}
                  <p className="p-5">{value.reviewText}</p>
                  <div className="flex flex-col mx-3">
                    <Link to={`/event/edit-review/${id}/${key}`}>
                      <button className="bg-transparent hover:bg-blue-800 text-blue-900 font-semibold hover:text-white py-2 px-4 w-full mb-3 border border-blue-800 hover:border-transparent rounded">
                        Edit Review
                      </button>
                    </Link>

                    <button
                      onClick={() => {
                        deleteHandler(key);
                      }}
                      className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 w-full mb-3 border border-red-500 hover:border-transparent rounded"
                    >
                      Delete Review
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetailsPage;
