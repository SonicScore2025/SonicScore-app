import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const CreateEventPage = () => {
  const navigate = useNavigate();

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

  const checkDuplicateEvent = (eventName) => {
    return axios
      .get(`${API_URL}/events.json`)
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
      .post(`${API_URL}/events.json`, newEvent)
      .then(() => {
        toast.success("Event Created!");
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
          toast.error("An event with this name already exists!");
        } else {
          createEvent(newEvent).then((success) => {
            if (success) {
              navigate("/admin/events");
            } else {
              toast.error("Failed to create event. Please try again.");
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong. Please try again.");
      });
  };

  const handleResourceChange = (index, field, value) => {
    const updatedResources = [...formData.resources];
    updatedResources[index][field] = value;
    setFormData({ ...formData, resources: updatedResources });
  };

  return (
    <div id="createEventPage">
      <div className="admin-header">
        <h1>Create New Event</h1>
      </div>

      <form
        className="admin purple md:w-2/3 mx-auto my-5 purple"
        onSubmit={handleSubmit}
      >
        <div className="form-control">
          <label className="label">Event Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="input input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label">Event Description</label>
          <textarea
            value={formData.description}
            rows={5}
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
            min={0}
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
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
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
        <div className="form-control">
          <label className="label">Resource 1</label>
          <div className="flex flex-col md:flex-row gap-2">
            <input
              className="md:w-1/3 input input-bordered"
              type="text"
              placeholder="Title"
              value={formData.resources[0].sourceTitle}
              onChange={(e) =>
                handleResourceChange(0, "sourceTitle", e.target.value)
              }
            />
            <input
              className="md:w-2/3 input input-bordered"
              type="text"
              placeholder="Link"
              value={formData.resources[0].sourceURL}
              onChange={(e) =>
                handleResourceChange(0, "sourceURL", e.target.value)
              }
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label">Resource 2</label>
          <div className="flex flex-col md:flex-row gap-2">
            <input
              className="md:w-1/3 input input-bordered"
              type="text"
              placeholder="Title"
              value={formData.resources[1].sourceTitle}
              onChange={(e) =>
                handleResourceChange(1, "sourceTitle", e.target.value)
              }
            />
            <input
              className="md:w-2/3 input input-bordered"
              type="text"
              placeholder="Link"
              value={formData.resources[1].sourceURL}
              onChange={(e) =>
                handleResourceChange(1, "sourceURL", e.target.value)
              }
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label">Resource 3</label>
          <div className="flex flex-col md:flex-row gap-2">
            <input
              className="md:w-1/3 input input-bordered"
              type="text"
              placeholder="Title"
              value={formData.resources[2].sourceTitle}
              onChange={(e) =>
                handleResourceChange(2, "sourceTitle", e.target.value)
              }
            />
            <input
              className="md:w-2/3 input input-bordered"
              type="text"
              placeholder="Link"
              value={formData.resources[2].sourceURL}
              onChange={(e) =>
                handleResourceChange(2, "sourceURL", e.target.value)
              }
            />
          </div>
        </div>

        <div className="flex gap-3 justify-center mt-6">
          <button className="btn btn-cancel" onClick={() => navigate(-1)}>
            Back to List
          </button>
          <button
            type="submit"
            className="btn btn-primary-fill flex-1 md:flex-none"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventPage;
