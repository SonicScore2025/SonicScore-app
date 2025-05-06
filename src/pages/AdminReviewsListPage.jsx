import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config/api";

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
        console.log("Review Deleted!");
      })
      .catch((err) => console.log(err));
  };

  if (!reviews) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-center">
          All Reviews List ()
        </h1>
        <Link to={"/admin"}>Back to Admin</Link>
      </div>

      <div>
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
                <td>{review.eventName}</td>
                <td>{review.reviewText}</td>
                <td>{calcAverageRatings(review.ratings)}</td>
                <td>
                  <button
                    className="hover:text-red-500 cursor-pointer"
                    onClick={() =>
                      deleteReview(review.eventId, review.firebaseReviewId)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRatingsListPage;
