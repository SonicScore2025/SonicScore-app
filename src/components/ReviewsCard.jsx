import { Link } from 'react-router-dom';

function ReviewsCard(props) {
  return (
    <div className="border-2 border-gray-200 p-8 rounded-xl">
      <p>{props.reviewObj.date}</p>
      <p>UserName placeholder</p>
      <div>
        <ul>
          {Object.entries(props.reviewObj.ratings).map(([ratingKeys, ratingValue], i) => {
            return (
              <li key={i}>
                {props.translateKeys(ratingKeys)}: {ratingValue}
              </li>
            );
          })}
        </ul>
      </div>
      <p>{props.reviewObj.reviewText}</p>
      <div className="review-buttons">
        <button
          onClick={() => {
            props.deleteHandler(props.reviewId);
          }}
          className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
        >
          Delete Review
        </button>
        <Link to={`/event/edit-review/${props.eventId}/${props.reviewId}`}>
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Edit Review
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ReviewsCard;
