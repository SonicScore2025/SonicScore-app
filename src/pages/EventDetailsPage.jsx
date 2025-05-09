import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GlobeSimple, Star } from '@phosphor-icons/react';
import ReviewsCard from '../components/ReviewsCard';
import CreateReview from '../components/CreateReview';
import Loading from '../components/Loading';

const API_URL = import.meta.env.VITE_API_URL;

const EventDetailsPage = (props) => {
  const [event, setEvent] = useState(null);
  const [reload, setReload] = useState(false);
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
  }, [reload]);

  useEffect(() => {
    axios
      .patch(`${API_URL}/events/${id}/ratings.json`, averageReviewsRatings)
      .then((response) => {
        if (props.reload) {
          setReload(false);
        } else setReload(true);
      })
      .catch((err) => console.log(err));
  }, [event]);

  useEffect(() => {
    axios.patch(`${API_URL}/events/${id}.json`, { averageRating: averageRating }).catch((err) => console.log(err));
  }, [event]);

  let averageRating = '0.0';
  if (event !== null) {
    const eventRatingsValues = Object.values(event.ratings);
    const eventRatingsValuesSum = eventRatingsValues.reduce((acc, val) => {
      return acc + parseFloat(val);
    }, 0);
    averageRating = (eventRatingsValuesSum / eventRatingsValues.length).toFixed(1);
  }

  const initialRatings = {
    atmosphere: 0,
    facilities: 0,
    musicQuality: 0,
    organization: 0,
    overallExperience: 0,
    safety: 0,
    valueForMoney: 0,
  };
  let averageReviewsRatings = {};
  if (event !== null && event.reviews) {
    const reviewsObj = event.reviews;
    const reviewRatings = Object.entries(reviewsObj).map(([reviwId, review]) => {
      return review.ratings;
    });

    const allReviewsTotalScore = reviewRatings.reduce(
      (acc, currentReview) => {
        for (const key in currentReview) {
          if (acc.hasOwnProperty(key)) {
            acc[key] += parseInt(currentReview[key]);
          }
        }
        return acc;
      },
      { ...initialRatings }
    );
    Object.keys(initialRatings).map((key) => {
      return (averageReviewsRatings[key] = (allReviewsTotalScore[key] / reviewRatings.length).toFixed(1));
    });
  } else {
    averageReviewsRatings = initialRatings;
  }

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

  const showCreateComponent = () => {
    document.getElementById('createReview').classList.remove('hidden');
  };

  if (!event) {
    return <Loading />;
  }

  const reviewsObj = event.reviews;

  return (
    <div className="eventDetailsPage">
      <div className="eventDetails mb-10 flex flex-col">
        <div className="mb-6">
          <img
            src={event.imageSource}
            alt={event.name}
            className="rounded-xl aspect-square md:aspect-6/2 object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4">
          <div className="col-span-1 md:col-span-2 row-span-2 flex flex-col md:items-start gap-4">
            <h1 className="text-3xl font-bold mb-1 text-purple-800 flex gap-2">
              {event.name}
              <span className="flex items-center gap-1">
                (<Star size={24} weight="duotone" /> {averageRating})
              </span>
            </h1>
            <p className="text-2xl font-semibold">
              {event.location.city}, {event.location.country}
            </p>
            <p className="text-xl font-semibold">Capacity: {event.capacity}</p>
            <Link
              to={event.website}
              target="_blank"
              className="text-xl font-semibold w-auto flex gap-2 items-center text-blue-900"
            >
              <GlobeSimple size={24} weight="duotone" /> Official Website
            </Link>
          </div>

          <div className="ratings border-2 p-5 rounded-xl bg-purple-50 border-purple-200 col-span-1 row-span-3">
            <p className="flex items-center justify-between gap-2 text-xl font-bold mb-2 text-purple-800">
              Festival Rating <Star size={24} weight="duotone" />
            </p>
            <ul className="text-lg space-y-1 font-medium text-blue-900">
              {Object.keys(event.ratings).map((key) => {
                return (
                  <li key={key} className="flex items-center justify-between">
                    <strong>{translateKeys(key)}: </strong>
                    <span className="text-xl font-bold">{averageReviewsRatings[key]}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            {event.resources && (
              <div className="resources">
                {event.resources.map((resource, i) => {
                  return (
                    <div key={i}>
                      <p className="text-lg text-gray-400">
                        {resource.sourceTitle}:{' '}
                        <Link to={resource.sourceURL} target="_blank" className="hover:text-gray-700 hover:underline">
                          Click to visit
                        </Link>
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex items-center mt-4 gap-3 md:w-1/2">
              <Link to={'/'}>
                <button className="btn btn-cancel">Back</button>
              </Link>
              <button onClick={showCreateComponent} className="btn flex-1 btn-blue-fill">
                Add Review
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="reviewsSection border-t-2 border-gray-100 pt-5">
        <div id="createReview" className="hidden">
          <CreateReview setEvent={setEvent} setReload={setReload} reload={reload} />
        </div>
        {reviewsObj ? (
          <div className="reviews flex flex-col gap-4">
            {Object.entries(reviewsObj).map(([key, value], i) => {
              return (
                <ReviewsCard
                  eventId={id}
                  reviewId={key}
                  reviewObj={value}
                  translateKeys={translateKeys}
                  setEvent={setEvent}
                  reload={reload}
                  setReload={setReload}
                  id={id}
                  key={i}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center font-medium text-lg">
            <p>Event not scored yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetailsPage;
