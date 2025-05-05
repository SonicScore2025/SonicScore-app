import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../config/api";
import "../assets/css/table.css";
import { Link } from "react-router-dom";

const AdminEventsListPage = () => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/events.json`)
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

  // Calculate Average Rating
  const averageRating = (ratingsObj) => {
    if (!ratingsObj || typeof ratingsObj !== "object") return 0;

    const values = Object.values(ratingsObj).filter(
      (val) => typeof val === "number"
    );
    if (values.length === 0) return 0;

    const sum = values.reduce((acc, val) => acc + val, 0);
    return (sum / values.length).toFixed(1);
  };

  //Delete Event
  const deleteEvent = (id) => {
    return axios
      .delete(`${API_URL}/events/${id}.json`)
      .then(() => {
        console.log("Event Deleted");
        setEvents(events.filter((event) => event.id !== id));
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  if (!events) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-center">
          All Events List ({events.length})
        </h1>
        <Link to={"/admin/events/create"}>Add New Event</Link>
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
            {events.map((event) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminEventsListPage;
