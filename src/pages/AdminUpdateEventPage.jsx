import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config/api";

const UpdateEventPage = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/${id}.json`)
      .then((response) => {
        setEventData(response.data);
        console.log(response.data);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    capacity: "",
    country: "",
    city: "",
    website: "",
    resourcesInputs: [
      { sourceTitle: "", sourceURL: "" },
      { sourceTitle: "", sourceURL: "" },
      { sourceTitle: "", sourceURL: "" },
    ],
  });

  const checkDuplicateEvent = (eventName) => {
    return axios
      .get(API_URL)
      .then((response) => {
        const eventsArr = Object.keys(response.data).map((id) => ({
          id,
          ...response.data[id],
        }));
        return eventsArr.some((item) => item.name === eventName);
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  const createEvent = (newEvent) => {
    return axios
      .post(API_URL, newEvent)
      .then((response) => {
        console.log("Event Created:", response.data);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { country, city, resourcesInputs, ...rest } = formData;

    const filledResources = resourcesInputs.filter(
      (resource) =>
        resource.sourceTitle.trim() !== "" && resource.sourceURL.trim() !== ""
    );

    const newEvent = {
      ...rest,
      location: {
        city,
        country,
      },
      resources: filledResources,
      ratings: {
        atmosphere: 0,
        facilities: 0,
        musicQuality: 0,
        organization: 0,
        overallExperience: 0,
        safety: 0,
        valueForMoney: 0,
      },
    };

    checkDuplicateEvent(newEvent.name)
      .then((isDuplicate) => {
        if (isDuplicate) {
          alert("An event with this name already exists!");
        } else {
          createEvent(newEvent).then((success) => {
            if (success) {
              navigate("/admin/events");
            } else {
              alert("Failed to create event. Please try again.");
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong. Please try again.");
      });
  };

  const handleResourceChange = (index, field, value) => {
    const updatedResources = [...formData.resourcesInputs];
    updatedResources[index][field] = value;
    setFormData({ ...formData, resourcesInputs: updatedResources });
  };

  if (!eventData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-center">Update Event</h1>
        <Link to={"/admin/events"}>Back to Events List</Link>
      </div>

      <div>
        <form className="w-1/2 mx-auto my-10" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">Event Name</label>
            <input
              type="text"
              value={eventData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label">Event Description</label>
            <textarea
              value={eventData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              className="textarea textarea-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label">Capacity</label>
            <input
              type="number"
              value={eventData.capacity}
              onChange={(e) =>
                setFormData({ ...formData, capacity: e.target.value })
              }
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label">Country</label>
            <input
              type="text"
              value={eventData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
              required
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label">City</label>
            <input
              type="text"
              value={eventData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              required
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label">Official Website</label>
            <input
              type="text"
              value={eventData.website}
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
              className="input input-bordered"
            />
          </div>

          {/* Resource Inputs */}
          <div className="form-control">
            <label className="label">Resource 1</label>
            <div className="flex gap-2">
              <input
                className="w-1/3 input input-bordered"
                type="text"
                placeholder="Title"
                value={eventData.resources[0].sourceTitle}
                onChange={(e) =>
                  handleResourceChange(0, "sourceTitle", e.target.value)
                }
              />
              <input
                className="w-2/3 input input-bordered"
                type="text"
                placeholder="Link"
                value={eventData.resources[0].sourceURL}
                onChange={(e) =>
                  handleResourceChange(0, "sourceURL", e.target.value)
                }
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">Resource 2</label>
            <div className="flex gap-2">
              <input
                className="w-1/3 input input-bordered"
                type="text"
                placeholder="Title"
                value={eventData.resources[1].sourceTitle}
                onChange={(e) =>
                  handleResourceChange(1, "sourceTitle", e.target.value)
                }
              />
              <input
                className="w-2/3 input input-bordered"
                type="text"
                placeholder="Link"
                value={eventData.resources[1].sourceURL}
                onChange={(e) =>
                  handleResourceChange(1, "sourceURL", e.target.value)
                }
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">Resource 3</label>
            <div className="flex gap-2">
              <input
                className="w-1/3 input input-bordered"
                type="text"
                placeholder="Title"
                value={eventData.resources[2].sourceTitle}
                onChange={(e) =>
                  handleResourceChange(2, "sourceTitle", e.target.value)
                }
              />
              <input
                className="w-2/3 input input-bordered"
                type="text"
                placeholder="Link"
                value={eventData.resources[2].sourceURL}
                onChange={(e) =>
                  handleResourceChange(2, "sourceURL", e.target.value)
                }
              />
            </div>
          </div>

          <div className="text-center mt-6">
            <button type="submit" className="btn btn-primary w-auto">
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEventPage;
