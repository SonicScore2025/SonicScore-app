import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config/api";

const AdminRatingsListPage = () => {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/events/reviews.json`)
      .then((response) => {
        const reviewsArr = Object.keys(response.data).map((id) => ({
          id,
          ...response.data[id],
        }));
        setReviews(reviewsArr);
        console.log(reviewsArr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
              <th>Events Name</th>
              <th>Country</th>
              <th>City</th>
              <th>Reviews</th>
              <th>Ratings</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* {events.map((event) => (
              <tr className="card" key={event.id}>
                <td>{event.name}</td>
                <td>{event.location.country}</td>
                <td>{event.location.city}</td>
                <td>
                  {!event.reviews ? 0 : Object.keys(event.reviews).length}
                </td>
                <td>{averageRating(event.ratings)}</td>
                <td>
                  <Link
                    className="hover:text-yellow-500"
                    to={`/admin/event/${event.id}/update`}
                  >
                    Update
                  </Link>
                </td>
                <td>
                  <button
                    className="hover:text-red-500 cursor-pointer"
                    onClick={() => deleteEvent(event.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRatingsListPage;
