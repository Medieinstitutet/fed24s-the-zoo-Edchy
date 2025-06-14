import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Animal } from "../models/Animal";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isWithinHours } from "@/lib/utils";

type AnimalDetailProps = {
  handleFeedAnimal: (id: number) => void;
  animals: Animal[];
};

const AnimalDetail = ({ handleFeedAnimal, animals }: AnimalDetailProps) => {
  const { id } = useParams();
  const [animal, setAnimal] = useState<Animal | null>(null);

  useEffect(() => {
    if (animals.length > 0 && id) {
      const foundAnimal = animals.find((a) => a.id === Number(id));
      if (foundAnimal) {
        setAnimal(foundAnimal);
        return;
      }
    }

    fetch(`https://animals.azurewebsites.net/api/animals/${id}`)
      .then((res) => res.json())
      .then(setAnimal);
  }, [id, animals]);

  if (!animal) return <p>Loading...</p>;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <Avatar>
          <AvatarImage src={animal.imageUrl} />
          <AvatarFallback>{animal.name[0]}</AvatarFallback>
        </Avatar>
        <CardTitle>
          {animal.name} -{" "}
          <div>
            {isWithinHours(animal.lastFed, 3) ? (
              <span className="text-green-600">MMmmättt</span>
            ) : (
              <span className="text-amber-600">Hunnnngrig</span>
            )}
          </div>
        </CardTitle>
        <CardDescription>{animal.latinName}</CardDescription>
        <p className="text-xs">Född: {animal.yearOfBirth}</p>
        <p className="text-xs">Mediciner: {animal.medicine}</p>
      </CardHeader>

      <CardContent>
        <p className="text-sm">{animal.longDescription}</p>
      </CardContent>

      <CardFooter className="flex justify-between">
        <CardAction>
          <Button
            disabled={isWithinHours(animal.lastFed, 3)}
            onClick={() => handleFeedAnimal(animal.id)}
            variant={isWithinHours(animal.lastFed, 3) ? "outline" : "default"}
          >
            {isWithinHours(animal.lastFed, 3) ? "Mätt" : "Mata mig"}
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
};

export default AnimalDetail;
