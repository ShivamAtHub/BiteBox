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
      pizza: "bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-400 border border-orange-100 dark:border-orange-900",
      burger: "bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-900",
      sushi: "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-900",
      salad: "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-900",
      dessert: "bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-400 border border-purple-100 dark:border-purple-900"
    };
    return colors[category] || "bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-400 border border-gray-100 dark:border-gray-800";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 h-full flex flex-col shadow-sm dark:bg-black">
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
              <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">{name}</h3>
              <Badge 
                className={`mt-1 text-xs font-normal ${getCategoryColor(category)}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Badge>
            </div>
            <span className="font-semibold text-gray-900 dark:text-gray-100">${price.toFixed(2)}</span>
          </div>
          
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 line-clamp-2">{description}</p>
          
          <div className="flex items-center justify-between mt-3 text-sm text-gray-500 dark:text-gray-400">
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
              className="w-full bg-white dark:bg-black border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-gray-100" 
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