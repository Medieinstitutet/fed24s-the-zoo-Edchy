import { Outlet } from "react-router-dom";

const AnimalLayout = () => {
  return (
    <div className="animal-container">
      <h1 className="text-2xl font-bold mb-4">Animal Details</h1>
      <Outlet />
    </div>
  );
};

export default AnimalLayout;
