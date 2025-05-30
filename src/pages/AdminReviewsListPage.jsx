import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TrashSimple } from "@phosphor-icons/react";
import Loading from "../components/Loading";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const AdminRatingsListPage = () => {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/events.json`)
      .then((response) => {
        const eventsData = response.data;
        const allReviews = [];

        // Get reviews of an Event
        for (const eventId in eventsData) {
          const event = eventsData[eventId];
          const eventReviews = event.reviews;

          if (eventReviews) {
            const reviewsWithEventName = Object.entries(eventReviews).map(
              ([firebaseReviewId, review]) => ({
                ...review,
                eventId: eventId,
                eventName: event.name,
                firebaseReviewId: firebaseReviewId,
              })
            );
            allReviews.push(...reviewsWithEventName);
          }
        }
        setReviews(allReviews);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Calculate Average Ratings of an Event
  const calcAverageRatings = (ratingsObj) => {
    if (!ratingsObj) return 0;

    const average = (
      Object.values(ratingsObj)
        .map((value) => Number(value))
        .reduce((acc, value) => acc + value, 0) /
      Object.values(ratingsObj).length
    ).toFixed(1);

    return average;
  };

  //Delete A Reveiew
  const deleteReview = (eventId, firebaseReviewId) => {
    axios
      .delete(`${API_URL}/events/${eventId}/reviews/${firebaseReviewId}.json`)
      .then(() => {
        setReviews((prev) =>
          prev.filter((review) => review.firebaseReviewId !== firebaseReviewId)
        );
        toast.success("Review Deleted!");
      })
      .catch((err) => console.log(err));
  };

  if (!reviews) {
    return <Loading />;
  }

  return (
    <div id="reviewsListPage">
      <div className="admin-header">
        <h1>All Reviews List ({reviews.length})</h1>
      </div>

      <div className="py-5">
        <div className="w-full overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Event</th>
                <th>Text</th>
                <th>Ratings</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr className="card" key={review.firebaseReviewId}>
                  <td>{review.date}</td>
                  <td>
                    <a
                      href={`/event/${review.eventId}`}
                      target="_blank"
                      className="hover:underline hover:font-medium"
                    >
                      {review.eventName}
                    </a>
                  </td>
                  <td className="!whitespace-pre-wrap">
                    {review.reviewText.length > 100
                      ? review.reviewText.slice(0, 100) + "..."
                      : review.reviewText}
                  </td>
                  <td>{calcAverageRatings(review.ratings)}</td>
                  <td>
                    <button
                      className="flex w-full items-center justify-center text-gray-400 hover:text-red-600 cursor-pointer"
                      onClick={() =>
                        deleteReview(review.eventId, review.firebaseReviewId)
                      }
                    >
                      <TrashSimple size={18} weight="duotone" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminRatingsListPage;
