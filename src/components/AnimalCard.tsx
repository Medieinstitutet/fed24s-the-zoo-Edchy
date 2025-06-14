import type { Animal } from "../models/Animal";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isWithinHours } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

const AnimalCard = ({ animal }: { animal: Animal }) => {
  const fedWithinThreeHours = isWithinHours(animal.lastFed, 3);
  const fedWithinFiveHours = isWithinHours(animal.lastFed, 5);
  return (
    <Card className="hover:shadow-md transition-shadow">
      <Link to={`/animals/${animal.id}`} className="block">
        <CardHeader>
          <Avatar>
            <AvatarImage src={animal.imageUrl} />
            <AvatarFallback>{animal.name[0]}</AvatarFallback>
          </Avatar>
          <CardTitle>{animal.name}</CardTitle>
          <CardDescription>{animal.latinName}</CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm truncate">{animal.shortDescription}</p>
        </CardContent>
      </Link>

      <CardFooter className="flex justify-between items-center">
        <div>
          {fedWithinThreeHours ? (
            <span className="text-green-600">mätt o gla</span>
          ) : fedWithinFiveHours ? (
            <div className="flex items-center gap-1 text-amber-600">
              <AlertTriangle size={16} />
              <span>behöver få i sig nåt</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-red-600 font-medium">
              <AlertTriangle size={16} />
              <span>Svin hungrig</span>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AnimalCard;
