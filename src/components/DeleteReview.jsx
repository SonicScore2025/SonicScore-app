import axios from 'axios';
import { Trash } from '@phosphor-icons/react';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;

function DeleteReview(props) {
  const deleteHandler = (reviewId) => {
    axios
      .delete(`${API_URL}/events/${props.id}/reviews/${props.reviewId}.json`)
      .then((response) => {
        toast.success('Score deleted');
        if (props.reload) {
          props.setReload(false);
        } else props.setReload(true);
        return axios.get(`${API_URL}/events/${props.id}.json`);
      })
      .then((response) => {
        props.setEvent(response.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <button
      onClick={() => {
        deleteHandler(props.reviewId);
      }}
      className=" text-gray-500 hover:text-red-500 cursor-pointer"
    >
      <Trash size={32} weight="duotone" />
    </button>
  );
}

export default DeleteReview;
