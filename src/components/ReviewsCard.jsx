import { useState } from 'react';
import EditReview from '../components/EditReview';
import { Trash, UserCircle } from '@phosphor-icons/react';

function ReviewsCard(props) {
  const [editStatus, setEditStatus] = useState(false);

  return (
    <div className="mt-3 flex flex-col border-2 border-purple-200 rounded-2xl md:w-1/2 mx-auto">
      {editStatus ? (
        <EditReview setEditStatus={setEditStatus} setEvent={props.setEvent} reviewId={props.reviewId} />
      ) : (
        <>
          <div className="flex flex-col gap-6 justify-between p-6">
            <div className="flex items-center w-full gap-3">
              <UserCircle size={54} className="text-gray-400" weight="duotone" />
              <div className="font-medium text-gray-500">
                <p>User Name</p>
                <p>{props.reviewObj.date}</p>
              </div>
            </div>

            <ul className=" text-blue-900">
              {Object.entries(props.reviewObj.ratings).map(([ratingKeys, ratingValue], i) => {
                return (
                  <li className="flex justify-between" key={i}>
                    <span className="font-semibold">{props.translateKeys(ratingKeys)}:</span>
                    <span>
                      <strong>{ratingValue}</strong>
                    </span>
                  </li>
                );
              })}
            </ul>

            <p>{props.reviewObj.reviewText}</p>

            <div className="flex gap-10">
              <button onClick={() => setEditStatus(true)} className="btn flex-1 btn-blue">
                Edit Review
              </button>

              <button
                onClick={() => {
                  props.deleteHandler(props.reviewId);
                }}
                className=" text-gray-500 hover:text-red-500 cursor-pointer"
              >
                <Trash size={32} weight="duotone" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default ReviewsCard;
