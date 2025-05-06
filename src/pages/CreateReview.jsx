import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../config/api';

function CreateReview() {
  const { id } = useParams();
  const [atmosphere, setAtmosphere] = useState(0);
  const [facilities, setFacilities] = useState(0);
  const [musicQuality, setmMsicQuality] = useState(0);
  const [organization, setOrganization] = useState(0);
  const [overallExperience, setOverallExperience] = useState(0);
  const [safety, setSafety] = useState(0);
  const [valueForMoney, setValueForMoney] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const navigate = useNavigate();

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
        navigate(`/event/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Add review for project with id {id}</h1>
      <form onSubmit={handleSubmit}>
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
          className="w-25"
        />
        <label htmlFor="facilities">Facilities:</label>
        <input
          type="number"
          min={0}
          max={5}
          name="facilities"
          placeholder="Facilities"
          value={facilities}
          onChange={(e) => {
            setFacilities(e.target.value);
          }}
          className="w-25"
        />
        <label htmlFor="musicQuality">Music Quality:</label>
        <input
          type="number"
          min={0}
          max={5}
          name="musicQuality"
          placeholder="Music Quality"
          value={musicQuality}
          onChange={(e) => {
            setmMsicQuality(e.target.value);
          }}
          className="w-25"
        />
        <label htmlFor="organization">Organization:</label>
        <input
          type="number"
          min={0}
          max={5}
          name="organization"
          placeholder="organization"
          value={organization}
          onChange={(e) => {
            setOrganization(e.target.value);
          }}
          className="w-25"
        />
        <label htmlFor="overallExperience">Overall Experience:</label>
        <input
          type="number"
          min={0}
          max={5}
          name="overallExperience"
          placeholder="overallExperience"
          value={overallExperience}
          onChange={(e) => {
            setOverallExperience(e.target.value);
          }}
          className="w-25"
        />
        <label htmlFor="safety">Safety:</label>
        <input
          type="number"
          min={0}
          max={5}
          name="safety"
          placeholder="safety"
          value={safety}
          onChange={(e) => {
            setSafety(e.target.value);
          }}
          className="w-25"
        />
        <label htmlFor="valueForMoney">Value for Money:</label>
        <input
          type="number"
          min={0}
          max={5}
          name="valueForMoney"
          placeholder="valueForMoney"
          value={valueForMoney}
          onChange={(e) => {
            setValueForMoney(e.target.value);
          }}
          className="w-25"
        />
        <label htmlFor="reviewText">Review Text:</label>
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
          className="w-25"
        />

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">save review</button>
      </form>
    </div>
  );
}

export default CreateReview;
