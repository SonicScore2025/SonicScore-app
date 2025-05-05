import { Link } from "react-router-dom";

const AdminDashboardPage = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Welcome Admin</h2>
      <p className="text-lg">You can choose your option:</p>
      <div className="flex my-10 gap-10">
        <Link
          className="border-2 p-5 flex-1 text-center text-lg font-bold hover:bg-gray-200"
          to={"/admin/events"}
        >
          List of Events
        </Link>
        <Link
          className="border-2 p-5 flex-1 text-center text-lg font-bold hover:bg-gray-200"
          to={"/admin/ratings"}
        >
          List of Ratings
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
