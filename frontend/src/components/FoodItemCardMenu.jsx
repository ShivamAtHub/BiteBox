import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Star, Plus } from "lucide-react";
import { motion } from "framer-motion";

const FoodItemCard = ({ item }) => {
  const { name, description, price, category, image, rating, deliveryTime } = item;

  // Helper function to get category color (more subtle and professional)
  const getCategoryColor = (category) => {
    const colors = {
      pizza: "bg-orange-50 text-orange-700 border border-orange-100",
      burger: "bg-amber-50 text-amber-700 border border-amber-100",
      sushi: "bg-blue-50 text-blue-700 border border-blue-100",
      salad: "bg-green-50 text-green-700 border border-green-100",
      dessert: "bg-purple-50 text-purple-700 border border-purple-100"
    };
    return colors[category] || "bg-gray-50 text-gray-700 border border-gray-100";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card className="overflow-hidden border border-gray-200 h-full flex flex-col shadow-sm">
        <div className="relative">
          <img 
            src={image} 
            alt={name} 
            className="h-48 w-full object-cover"
          />
        </div>
        
        <CardContent className="p-4 flex-grow">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-base font-medium text-gray-900">{name}</h3>
              <Badge 
                className={`mt-1 text-xs font-normal ${getCategoryColor(category)}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Badge>
            </div>
            <span className="font-semibold text-gray-900">${price.toFixed(2)}</span>
          </div>
          
          <p className="text-gray-500 text-sm mt-2 line-clamp-2">{description}</p>
          
          <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 text-amber-400" />
              <span>{rating}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{deliveryTime} min</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <motion.div 
            className="w-full" 
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              variant="outline" 
              className="w-full bg-white border-gray-200 text-gray-800 hover:bg-gray-50 hover:text-gray-900" 
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" /> Add to Cart
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default FoodItemCard;