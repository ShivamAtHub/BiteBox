import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Star, Plus } from "lucide-react";

const FoodItemCard = ({ item }) => {
  const { name, description, price, category, image, rating, deliveryTime } = item;

  // Helper function to get category color
  const getCategoryColor = (category) => {
    const colors = {
      pizza: "bg-orange-100 text-orange-800",
      burger: "bg-red-100 text-red-800",
      sushi: "bg-blue-100 text-blue-800",
      salad: "bg-green-100 text-green-800",
      dessert: "bg-purple-100 text-purple-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="h-48 w-full object-cover"
        />
        <Badge 
          className={`absolute top-2 right-2 ${getCategoryColor(category)}`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium line-clamp-1">{name}</h3>
          <span className="font-bold text-lg">${price.toFixed(2)}</span>
        </div>
        
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 text-yellow-400 fill-yellow-400" />
              <span className="text-sm">{rating}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-gray-400" />
              <span className="text-sm">{deliveryTime} min</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" size="sm">
          <Plus className="h-4 w-4 mr-2" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FoodItemCard;