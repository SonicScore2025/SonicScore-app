import { Link } from "react-router-dom";
import notFound from "../assets/images/404.svg";
const NotFoundPage = () => {
  return (
    <div className="my-10 min-h-96 flex items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <img src={notFound} alt="404 Error" className="w-[460px]" />
        <Link
          to="/"
          className="text-lg text-blue-800 font-semibold hover:text-purple-800 hover:underline duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
