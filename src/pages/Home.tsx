import AnimalCard from "../components/AnimalCard";
import type { Animal } from "../models/Animal";

type Props = {
  animals: Animal[];
};

const Home = ({ animals }: Props) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {animals.map((animal) => (
        <AnimalCard key={animal.id} animal={animal} />
      ))}
    </section>
  );
};

export default Home;
