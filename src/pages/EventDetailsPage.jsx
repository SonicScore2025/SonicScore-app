import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GlobeSimple, Star } from '@phosphor-icons/react';
import ReviewsCard from '../components/ReviewsCard';

const API_URL = import.meta.env.VITE_API_URL;

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

  const reviewsObj = event.reviews;

  return (
    <div className="eventDetailsPage">
      <div className="eventDetails mb-10">
        <div className="mb-6">
          <img
            src={event.imageSource}
            alt={event.name}
            className="rounded-xl aspect-square md:aspect-6/2 object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4">
          <div className="col-span-2 md:row-span-2">
            <h1 className="text-3xl font-bold mb-4 text-purple-800">{event.name}</h1>
            <p className="text-2xl font-semibold mb-2">
              {event.location.city}, {event.location.country}
            </p>
            <p className="text-xl font-semibold mb-3">Capacity: {event.capacity}</p>
            <Link
              to={event.website}
              target="_blank"
              className="text-xl font-semibold flex gap-2 items-center text-blue-900"
            >
              <GlobeSimple size={24} weight="duotone" /> Official Website
            </Link>
          </div>
        </div>
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
          <Link to={`/event/create-review/${id}`}>
            <button className="w-full  bg-transparent hover:bg-blue-800 text-blue-900 font-semibold hover:text-white py-2 px-4 border border-blue-800 hover:border-transparent rounded">
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

      <div className="reviewsSection border-t-2 border-gray-100 pt-5">
        {reviewsObj && (
          <div className="reviews flex flex-col gap-4" key={reviewsObj.reviewId}>
            {Object.entries(reviewsObj).map(([key, value], i) => {
              console.log(key);
              console.log(value);
              return (
                <ReviewsCard
                  eventId={id}
                  reviewId={key}
                  reviewObj={value}
                  deleteHandler={deleteHandler}
                  translateKeys={translateKeys}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetailsPage;
