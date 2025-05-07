import { PencilSimpleLine } from '@phosphor-icons/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

function EditReview(props) {
  const { id } = useParams();
  //const { reviewId } = useParams();
  const [atmosphere, setAtmosphere] = useState(0);
  const [facilities, setFacilities] = useState(0);
  const [musicQuality, setmMsicQuality] = useState(0);
  const [organization, setOrganization] = useState(0);
  const [overallExperience, setOverallExperience] = useState(0);
  const [safety, setSafety] = useState(0);
  const [valueForMoney, setValueForMoney] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/events/${id}/reviews/${props.reviewId}.json`)
      .then((response) => {
        setAtmosphere(response.data.ratings.atmosphere);
        setFacilities(response.data.ratings.facilities);
        setmMsicQuality(response.data.ratings.musicQuality);
        setOrganization(response.data.ratings.organization);
        setOverallExperience(response.data.ratings.overallExperience);
        setSafety(response.data.ratings.safety);
        setValueForMoney(response.data.ratings.valueForMoney);
        setReviewText(response.data.reviewText);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const dateToday = () => {
      const date = new Date();
      return date.toJSON().slice(0, 10);
    };

    const editReview = {
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
      reviewText: reviewText,
    };

    axios
      .patch(`${API_URL}/events/${id}/reviews/${props.reviewId}.json`, editReview)
      .then((response) => {
        props.setEditStatus(false);
        return axios.get(`${API_URL}/events/${id}.json`);
      })
      .then((response) => props.setEvent(response.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-5">
      <h1 className="text-lg font-b text-purple-800 mb-3 flex gap-4 items-center">
        <PencilSimpleLine size={32} weight="duotone" /> Edit Review
      </h1>
      <form onSubmit={handleSubmit} className="small-form space-y-1 text-gray-700">
        <div className="form-control">
          <label htmlFor="atmosphere">Atmosphere:</label>
          <input
            type="number"
            min={1}
            max={5}
            name="atmosphere"
            placeholder="Atmosphere"
            value={atmosphere}
            onChange={(e) => {
              setAtmosphere(e.target.value);
            }}
            className="w-25"
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
            className="w-25"
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
            className="w-25"
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
            className="w-25"
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
            className="w-25"
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
            className="w-25"
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
            className="w-25"
          />
        </div>
        {/* <label htmlFor="reviewText">Review Text:</label> */}
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

        <button className="btn btn-primary mt-4 w-full">Submit</button>
      </form>
    </div>
  );
}

export default EditReview;
