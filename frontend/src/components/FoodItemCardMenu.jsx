import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const FoodItemCard = ({ item, onAddToCart }) => {
  return (
    <div className="flex flex-col h-full">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
          <span className="font-bold text-gray-800">${item.price}</span>
        </div>
        <p className="text-sm text-gray-500 mb-4">{item.description}</p>
        <div className="mt-auto">
          <Button
            className="w-full bg-black hover:bg-gray-800 text-white"
            onClick={onAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FoodItemCard;