import { Routes, Route, Navigate } from "react-router-dom";
import type { Animal } from "../models/Animal";
import RootLayout from "../layouts/RootLayout";
import AnimalLayout from "../layouts/AnimalLayout";
import Home from "../pages/Home";
import AnimalDetail from "../pages/AnimalDetail";
import NotFound from "../pages/NotFound";
import ErrorBoundary from "../components/ErrorBoundary";

interface AppRoutesProps {
  animals: Animal[];
  isLoading: boolean;
  handleFeedAnimal: (id: number) => void;
  resetFeedingStatus: () => void;
}

const AppRoutes = ({
  animals,
  isLoading,
  handleFeedAnimal,
  resetFeedingStatus,
}: AppRoutesProps) => {
  if (isLoading) {
    return <div>laddar animaleees...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<RootLayout resetFeedingStatus={resetFeedingStatus} />}
      >
        <Route index element={<Home animals={animals} />} />

        <Route path="animals" element={<AnimalLayout />}>
          <Route index element={<Navigate to="/" replace />} />

          <Route
            path=":id"
            element={
              <AnimalDetail
                handleFeedAnimal={handleFeedAnimal}
                animals={animals}
              />
            }
            errorElement={<ErrorBoundary />}
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
