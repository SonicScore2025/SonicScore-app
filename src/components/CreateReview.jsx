import { PencilSimpleLine } from '@phosphor-icons/react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

function CreateReview(props) {
  const { id } = useParams();
  const [atmosphere, setAtmosphere] = useState(1);
  const [facilities, setFacilities] = useState(1);
  const [musicQuality, setmMsicQuality] = useState(1);
  const [organization, setOrganization] = useState(1);
  const [overallExperience, setOverallExperience] = useState(1);
  const [safety, setSafety] = useState(1);
  const [valueForMoney, setValueForMoney] = useState(1);
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const dateToday = () => {
      const date = new Date();
      return date.toJSON().slice(0, 10);
    };

    const newReview = {
      date: dateToday(),
      ratings: {
        atmosphere: atmosphere,
        facilities: facilities,
        musicQuality: musicQuality,
        organization: organization,
        overallExperience: overallExperience,
        safety: safety,
        valueForMoney: valueForMoney,
      },
      reviewId: uuidv4(),
      reviewText: reviewText,
      userID: uuidv4(),
    };

    axios
      .post(`${API_URL}/events/${id}/reviews.json`, newReview)
      .then((response) => {
        document.getElementById('createReview').classList.add('hidden');
        return axios.get(`${API_URL}/events/${id}.json`);
      })
      .then((response) => props.setEvent(response.data))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mt-3 p-3 flex flex-col border-2 border-purple-200 rounded-2xl md:w-1/2 mx-auto">
      <h1 className="text-lg font-b text-purple-800 mb-3 flex gap-4 items-center">
        <PencilSimpleLine size={32} weight="duotone" /> Create Review
      </h1>
      <form onSubmit={handleSubmit} className="small-form space-y-1 text-gray-700">
        <div className="form-control">
          <label htmlFor="atmosphere">Atmosphere:</label>
          <input
            type="number"
            min={0}
            max={5}
            name="atmosphere"
            placeholder="Atmosphere"
            value={atmosphere}
            onChange={(e) => {
              setAtmosphere(e.target.value);
            }}
            className="w-35"
          />
        </div>
        <div className="form-control">
          <label htmlFor="facilities">Facilities:</label>
          <input
            type="number"
            min={1}
            max={5}
            name="facilities"
            placeholder="Facilities"
            value={facilities}
            onChange={(e) => {
              setFacilities(e.target.value);
            }}
            className="w-35"
          />
        </div>
        <div className="form-control">
          <label htmlFor="musicQuality">Music Quality:</label>
          <input
            type="number"
            min={1}
            max={5}
            name="musicQuality"
            placeholder="Music Quality"
            value={musicQuality}
            onChange={(e) => {
              setmMsicQuality(e.target.value);
            }}
            className="w-35"
          />
        </div>
        <div className="form-control">
          <label htmlFor="organization">Organization:</label>
          <input
            type="number"
            min={1}
            max={5}
            name="organization"
            placeholder="organization"
            value={organization}
            onChange={(e) => {
              setOrganization(e.target.value);
            }}
            className="w-35"
          />
        </div>
        <div className="form-control">
          <label htmlFor="overallExperience">Overall Experience:</label>
          <input
            type="number"
            min={1}
            max={5}
            name="overallExperience"
            placeholder="overallExperience"
            value={overallExperience}
            onChange={(e) => {
              setOverallExperience(e.target.value);
            }}
            className="w-35"
          />
        </div>
        <div className="form-control">
          <label htmlFor="safety">Safety:</label>
          <input
            type="number"
            min={1}
            max={5}
            name="safety"
            placeholder="safety"
            value={safety}
            onChange={(e) => {
              setSafety(e.target.value);
            }}
            className="w-35"
          />
        </div>
        <div className="form-control">
          <label htmlFor="valueForMoney">Value for Money:</label>
          <input
            type="number"
            min={1}
            max={5}
            name="valueForMoney"
            placeholder="valueForMoney"
            value={valueForMoney}
            onChange={(e) => {
              setValueForMoney(e.target.value);
            }}
            className="w-35"
          />
        </div>
        <textarea
          id="reviewText"
          type="text"
          name="reviewText"
          rows="4"
          cols="50"
          placeholder="reviewText"
          value={reviewText}
          onChange={(e) => {
            setReviewText(e.target.value);
          }}
          className="w-full mt-4"
        />

        <button className="btn btn-primary mt-4 w-full">save review</button>
      </form>
    </div>
  );
}

export default CreateReview;
