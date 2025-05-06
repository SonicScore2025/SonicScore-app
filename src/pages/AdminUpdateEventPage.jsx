import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config/api";

const UpdateEventPage = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageSource: "",
    capacity: "",
    country: "",
    city: "",
    website: "",
    resources: [
      { sourceTitle: "", sourceURL: "" },
      { sourceTitle: "", sourceURL: "" },
      { sourceTitle: "", sourceURL: "" },
    ],
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/events/${id}.json`)
      .then((response) => {
        setEventData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    if (eventData) {
      setFormData({
        name: eventData.name || "",
        description: eventData.description || "",
        imageSource: eventData.imageSource || "",
        capacity: eventData.capacity || "",
        country: eventData.location?.country || "",
        city: eventData.location?.city || "",
        website: eventData.website || "",
        resources: eventData.resources || [
          { sourceTitle: "", sourceURL: "" },
          { sourceTitle: "", sourceURL: "" },
          { sourceTitle: "", sourceURL: "" },
        ],
      });
    }
  }, [eventData]);

  const checkDuplicateEvent = (eventName) => {
    return axios
      .get(`${API_URL}/events.json`)
      .then((response) => {
        const eventsArr = Object.keys(response.data).map((id) => ({
          id,
          ...response.data[id],
        }));
        return eventsArr.some(
          (item) => item.name === eventName && item.id !== id
        );
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  const handleResourceChange = (index, field, value) => {
    const updatedResources = [...formData.resources];
    updatedResources[index][field] = value;
    setFormData({ ...formData, resources: updatedResources });
  };

  const updateEvent = (updatedEvent) => {
    return axios
      .patch(`${API_URL}/events/${id}.json`, updatedEvent)
      .then(() => {
        console.log("Event Updated");
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { country, city, resources, ...rest } = formData;

    const filledResources = resources.filter(
      (resource) =>
        resource.sourceTitle.trim() !== "" && resource.sourceURL.trim() !== ""
    );

    const updatedEvent = {
      ...rest,
      location: {
        city,
        country,
      },
      resources: filledResources,
    };

    checkDuplicateEvent(updatedEvent.name)
      .then((isDuplicate) => {
        if (isDuplicate) {
          alert("An event with this name already exists!");
        } else {
          updateEvent(updatedEvent);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong. Please try again.");
      });
  };

  if (loading) return <p>Loading...</p>;

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
              value={formData.name}
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
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              className="textarea textarea-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label">Image URL</label>
            <input
              type="text"
              value={formData.imageSource}
              onChange={(e) =>
                setFormData({ ...formData, imageSource: e.target.value })
              }
              required
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label">Capacity</label>
            <input
              type="number"
              value={formData.capacity}
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
              value={formData.country}
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
              value={formData.city}
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
              value={formData.website}
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
              className="input input-bordered"
            />
          </div>

          {/* Resource Inputs */}
          {[0, 1, 2].map((index) => (
            <div key={index} className="form-control">
              <label className="label">{`Resource ${index + 1}`}</label>
              <div className="flex gap-2">
                <input
                  className="w-1/3 input input-bordered"
                  type="text"
                  placeholder="Title"
                  value={formData.resources[index]?.sourceTitle || ""}
                  onChange={(e) =>
                    handleResourceChange(index, "sourceTitle", e.target.value)
                  }
                />
                <input
                  className="w-2/3 input input-bordered"
                  type="text"
                  placeholder="Link"
                  value={formData.resources[index]?.sourceURL || ""}
                  onChange={(e) =>
                    handleResourceChange(index, "sourceURL", e.target.value)
                  }
                />
              </div>
            </div>
          ))}

          <div className="mt-6 gap-2 flex justify-center">
            <button type="submit" className="btn btn-primary w-auto">
              Update Event
            </button>
            <button className="btn btn-alert" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEventPage;
