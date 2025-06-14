import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Animal } from "./models/Animal";
import { isWithinHours } from "./lib/utils";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  function handleFeedAnimal(id: number) {
    setAnimals((prevAnimals) => {
      const updatedAnimals = prevAnimals.map((animal) =>
        animal.id === id
          ? { ...animal, lastFed: new Date().toISOString() }
          : animal
      );

      localStorage.setItem("zooAnimals", JSON.stringify(updatedAnimals));

      return updatedAnimals;
    });
  }

  function updateFeedingStatus() {
    setAnimals((prevAnimals) => {
      const updatedAnimals = prevAnimals.map((animal) => ({
        ...animal,
        isFed: isWithinHours(animal.lastFed, 3),
      }));

      localStorage.setItem("zooAnimals", JSON.stringify(updatedAnimals));

      return updatedAnimals;
    });
  }

  useEffect(() => {
    async function getAnimals() {
      try {
        setIsLoading(true);

        const storedAnimals = localStorage.getItem("zooAnimals");

        if (storedAnimals) {
          setAnimals(JSON.parse(storedAnimals));
        } else {
          const res = await fetch(
            "https://animals.azurewebsites.net/api/animals"
          );
          const data = await res.json();

          const animalsWithStatus = data.map((animal: Animal) => ({
            ...animal,
            isFed: isWithinHours(animal.lastFed, 3),
          }));

          setAnimals(animalsWithStatus);
          localStorage.setItem("zooAnimals", JSON.stringify(animalsWithStatus));
        }
      } catch (error) {
        console.error("Failed to fetch animals:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getAnimals();
  }, []);

  useEffect(() => {
    updateFeedingStatus();

    const intervalId = setInterval(() => {
      updateFeedingStatus();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const resetFeedingStatus = () => {
    if (window.confirm("Reset all feeding statuses?")) {
      localStorage.removeItem("zooAnimals");
      window.location.reload();
    }
  };

  return (
    <Router>
      <AppRoutes
        animals={animals}
        isLoading={isLoading}
        handleFeedAnimal={handleFeedAnimal}
        resetFeedingStatus={resetFeedingStatus}
      />
    </Router>
  );
}

export default App;
