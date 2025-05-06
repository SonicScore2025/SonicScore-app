import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../config/api";
import { Link } from "react-router-dom";
import "../assets/css/table.css";
import { PencilSimple, Trash, TrashSimple } from "@phosphor-icons/react";

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

    const values = Object.values(ratingsObj)
      .map((val) => Number(val))
      .filter((val) => !isNaN(val));

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
    <div id="eventListPage">
      <div className="admin-header">
        <h1>All Events List ({events.length})</h1>
        <Link className="btn btn-primary" to={"/admin/events/create"}>
          Add New Event
        </Link>
      </div>

      <div className="my-5">
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
                <td className="text-center">
                  <Link
                    className="flex items-center justify-center text-gray-400 hover:text-green-600"
                    to={`/admin/event/${event.id}/update`}
                  >
                    <PencilSimple size={22} weight="duotone" />
                  </Link>
                </td>
                <td>
                  <button
                    className="flex w-full items-center justify-center text-gray-400 hover:text-red-600 cursor-pointer"
                    onClick={() => deleteEvent(event.id)}
                  >
                    <TrashSimple size={22} weight="duotone" />
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
