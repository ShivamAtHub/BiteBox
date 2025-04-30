import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Clock, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FoodItemCard = ({ item, onAddToCart }) => {
  const { name, description, price, category, image, rating, deliveryTime } = item;

  // Helper function to get category color (more subtle and professional)
  const getCategoryColor = (category) => {
    const colors = {
      pizza: "bg-orange-900/20 text-orange-400 border border-orange-800",
      burger: "bg-amber-900/20 text-amber-400 border border-amber-800",
      sushi: "bg-blue-900/20 text-blue-400 border border-blue-800",
      salad: "bg-green-900/20 text-green-400 border border-green-800",
      dessert: "bg-purple-900/20 text-purple-400 border border-purple-800"
    };
    return colors[category] || "bg-gray-900/20 text-gray-400 border border-gray-800";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card className="overflow-hidden border border-gray-800 h-full flex flex-col shadow-lg shadow-black/20 dark:bg-black/50 backdrop-blur-sm">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
          <img 
            src={image} 
            alt={name} 
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        <CardContent className="p-4 flex-grow">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-100">{name}</h3>
              <Badge 
                className={`mt-2 text-xs font-medium ${getCategoryColor(category)}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Badge>
            </div>
            <span className="font-bold text-gray-100">${price.toFixed(2)}</span>
          </div>
          
          <p className="text-gray-400 text-sm mt-2 line-clamp-2">{description}</p>
          
          <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
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
              className="w-full bg-black/50 border-gray-800 text-gray-200 hover:bg-gray-900/80 hover:text-white transition-colors duration-200" 
              size="sm"
              onClick={onAddToCart}
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