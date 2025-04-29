import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import FoodItemCard from '@/components/FoodItemCardMenu';
import { useCart } from '../context/CartContext';
import { Toast } from '@/components/ui/Toast';
import Navbar from "../components/ui/Navbar";
import Footer from '../components/ui/Footer';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortOption, setSortOption] = useState('recommended');
  const [items, setItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState(12);
  const [loading, setLoading] = useState(true);
  const [filteredItems, setFilteredItems] = useState([]);
  const [orderCounts, setOrderCounts] = useState({});
  const [recentOrders, setRecentOrders] = useState({});
  const observer = useRef();
  const loadMoreRef = useRef(null);
  const { addToCart, toastMessage, showToast, setShowToast } = useCart();

  // Priority calculation weights
  const PRIORITY_WEIGHTS = {
    rating: 0.4,
    orderCount: 0.3,
    recentOrders: 0.2,
    specialTag: 0.1
  };

  // Calculate priority score for an item
  const calculatePriorityScore = (item) => {
    const ratingScore = (item.rating / 5) * PRIORITY_WEIGHTS.rating;
    const orderCountScore = (orderCounts[item.id] || 0) / 100 * PRIORITY_WEIGHTS.orderCount;
    const recentOrdersScore = (recentOrders[item.id] || 0) / 10 * PRIORITY_WEIGHTS.recentOrders;
    const specialTagScore = item.special ? PRIORITY_WEIGHTS.specialTag : 0;
    
    return ratingScore + orderCountScore + recentOrdersScore + specialTagScore;
  };

  // Determine badge type based on rating and priority score
  const getBadgeType = (item) => {
    if (item.special) return { type: 'special', color: 'bg-red-500', text: 'Special' };
    
    const score = calculatePriorityScore(item);
    const rating = item.rating;
    
    if (rating >= 4.8) {
      return { type: 'trending', color: 'bg-green-500', text: 'Trending' };
    } else if (rating >= 4.5) {
      return { type: 'popular', color: 'bg-blue-500', text: 'Popular' };
    } else if (score > 0.7) {
      return { type: 'trending', color: 'bg-green-500', text: 'Trending' };
    } else if (score > 0.5) {
      return { type: 'popular', color: 'bg-blue-500', text: 'Popular' };
    }
    
    return null;
  };

  // Handle add to cart
  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category
    });
  };

  // Static food data
  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      const foodData = [
        // Pizza Category
        {
          id: 1,
          name: "Margherita Pizza",
          description: "Classic pizza with tomato sauce, fresh mozzarella, and basil leaves",
          price: 12,
          category: "pizza",
          image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=60",
          rating: 4.8,
          deliveryTime: 25,
        },
        // ... (rest of your food data remains the same)
        {
          id: 2,
          name: "Pepperoni Pizza",
          description: "Traditional pizza topped with spicy pepperoni slices and mozzarella",
          price: 14,
          category: "pizza",
          image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=60",
          rating: 4.7,
          deliveryTime: 28,
        },
        {
          id: 3,
          name: "Vegetarian Pizza",
          description: "Loaded with bell peppers, mushrooms, olives, onions, and tomatoes",
          price: 13,
          category: "pizza",
          image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=400&q=60",
          rating: 4.5,
          deliveryTime: 30,
        },
        {
          id: 4,
          name: "Hawaiian Pizza",
          description: "Sweet and savory combination of ham, pineapple, and cheese",
          price: 15,
          category: "pizza",
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=60",
          rating: 4.3,
          deliveryTime: 25,
        },
        {
          id: 5,
          name: "BBQ Chicken Pizza",
          description: "Grilled chicken, red onions, and cilantro with tangy BBQ sauce",
          price: 16,
          category: "pizza",
          image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=60",
          rating: 4.6,
          deliveryTime: 32,
        },
        
        // Burger Category
        {
          id: 6,
          name: "Classic Cheeseburger",
          description: "Juicy beef patty with melted cheddar, lettuce, tomato, and special sauce",
          price: 11,
          category: "burger",
          image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=60",
          rating: 4.7,
          deliveryTime: 20,
        },
        {
          id: 7,
          name: "Bacon Avocado Burger",
          description: "Topped with crispy bacon, fresh avocado, and chipotle mayo",
          price: 15,
          category: "burger",
          image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&q=60",
          rating: 4.9,
          deliveryTime: 25,
        },
        {
          id: 8,
          name: "Mushroom Swiss Burger",
          description: "Sautéed mushrooms and melted Swiss cheese on a beef patty",
          price: 13,
          category: "burger",
          image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=60",
          rating: 4.5,
          deliveryTime: 22,
        },
        {
          id: 9,
          name: "Veggie Burger",
          description: "Plant-based patty with fresh vegetables and vegan mayo",
          price: 12,
          category: "burger",
          image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=60",
          rating: 4.4,
          deliveryTime: 20,
        },
        {
          id: 10,
          name: "Double Bacon Burger",
          description: "Two beef patties with extra bacon, cheese, and special sauce",
          price: 17,
          category: "burger",
          image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=60",
          rating: 4.8,
          deliveryTime: 28,
        },
        
        // Sushi Category
        {
          id: 11,
          name: "California Roll",
          description: "Crab, avocado, and cucumber rolled in seaweed and rice",
          price: 10,
          category: "sushi",
          image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&q=60",
          rating: 4.5,
          deliveryTime: 35,
        },
        {
          id: 12,
          name: "Salmon Nigiri",
          description: "Fresh salmon slices on pressed rice with a touch of wasabi",
          price: 14,
          category: "sushi",
          image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400&q=60",
          rating: 4.8,
          deliveryTime: 32,
        },
        {
          id: 13,
          name: "Spicy Tuna Roll",
          description: "Spicy tuna mix with cucumber and green onions",
          price: 13,
          category: "sushi",
          image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400&q=60",
          rating: 4.7,
          deliveryTime: 35,
        },
        {
          id: 14,
          name: "Dragon Roll",
          description: "Eel and cucumber inside, topped with avocado and eel sauce",
          price: 16,
          category: "sushi",
          image: "https://images.unsplash.com/photo-1617196034183-421b4917c92d?w=400&q=60",
          rating: 4.9,
          deliveryTime: 40,
        },
        {
          id: 15,
          name: "Vegetable Roll",
          description: "Assorted fresh vegetables wrapped in seaweed and rice",
          price: 9,
          category: "sushi",
          image: "https://images.unsplash.com/photo-1617196035154-1e7e6e28b0db?w=400&q=60",
          rating: 4.3,
          deliveryTime: 30,
        },
        
        // Salad Category
        {
          id: 16,
          name: "Caesar Salad",
          description: "Crisp romaine lettuce, parmesan cheese, croutons, and Caesar dressing",
          price: 10,
          category: "salad",
          image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&q=60",
          rating: 4.5,
          deliveryTime: 18,
        },
        {
          id: 17,
          name: "Greek Salad",
          description: "Cucumbers, tomatoes, olives, feta cheese with olive oil dressing",
          price: 11,
          category: "salad",
          image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=60",
          rating: 4.6,
          deliveryTime: 15,
        },
        {
          id: 18,
          name: "Cobb Salad",
          description: "Grilled chicken, bacon, avocado, blue cheese, and hard-boiled egg",
          price: 14,
          category: "salad",
          image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=60",
          rating: 4.7,
          deliveryTime: 20,
        },
        {
          id: 19,
          name: "Quinoa Bowl",
          description: "Protein-rich quinoa with roasted vegetables and tahini dressing",
          price: 13,
          category: "salad",
          image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=400&q=60",
          rating: 4.4,
          deliveryTime: 22,
        },
        {
          id: 20,
          name: "Asian Chicken Salad",
          description: "Grilled chicken, mandarin oranges, almonds with sesame ginger dressing",
          price: 12,
          category: "salad",
          image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=60",
          rating: 4.5,
          deliveryTime: 18,
        },
        
        // Dessert Category
        {
          id: 21,
          name: "Chocolate Lava Cake",
          description: "Warm chocolate cake with a molten center, served with vanilla ice cream",
          price: 8,
          category: "dessert",
          image: "https://images.unsplash.com/photo-1602351447937-745cb720612f?w=400&q=60",
          rating: 4.9,
          deliveryTime: 25,
        },
        {
          id: 22,
          name: "New York Cheesecake",
          description: "Classic creamy cheesecake with a graham cracker crust",
          price: 7,
          category: "dessert",
          image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=60",
          rating: 4.7,
          deliveryTime: 20,
        },
        {
          id: 23,
          name: "Tiramisu",
          description: "Italian dessert with layers of coffee-soaked ladyfingers and mascarpone",
          price: 9,
          category: "dessert",
          image: "https://images.unsplash.com/photo-1542124948-dc391252a940?w=400&q=60",
          rating: 4.8,
          deliveryTime: 22,
        },
        {
          id: 24,
          name: "Apple Pie",
          description: "Traditional apple pie with a flaky crust, served warm",
          price: 6,
          category: "dessert",
          image: "https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=400&q=60",
          rating: 4.6,
          deliveryTime: 25,
        },
        {
          id: 25,
          name: "Ice Cream Sundae",
          description: "Three scoops of ice cream with hot fudge, whipped cream, and a cherry",
          price: 7,
          category: "dessert",
          image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=60",
          rating: 4.5,
          deliveryTime: 15,
        }
      ];
      
      // Add special tags to some items
      const enhancedData = foodData.map(item => ({
        ...item,
        special: Math.random() < 0.2, // 20% chance of being special
      }));
      
      setItems(enhancedData);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and sort items
  useEffect(() => {
    let result = [...items];

    // Apply category filter
    if (activeCategory !== 'all') {
      result = result.filter(item => item.category === activeCategory);
    }

    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'delivery':
        result.sort((a, b) => a.deliveryTime - b.deliveryTime);
        break;
      case 'recommended':
        result.sort((a, b) => calculatePriorityScore(b) - calculatePriorityScore(a));
        break;
      default:
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    setFilteredItems(result);
  }, [items, activeCategory, sortOption, orderCounts, recentOrders]);

  // Intersection Observer for infinite scrolling / lazy loading
  const lastItemRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && visibleItems < filteredItems.length) {
        setVisibleItems(prev => Math.min(prev + 8, filteredItems.length));
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, visibleItems, filteredItems.length]);

  // Food categories
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'pizza', name: 'Pizza' },
    { id: 'burger', name: 'Burgers' },
    { id: 'sushi', name: 'Sushi' },
    { id: 'salad', name: 'Salads' },
    { id: 'dessert', name: 'Desserts' }
  ];

  return (
    <div className="flex flex-col min-h-screen">
     
      <main className="flex-grow">
        <div className="flex flex-row min-h-screen w-full bg-white">
          {/* Side bar - Fixed position */}
          <div className="sticky top-0 h-screen bg-white border-r border-gray-100 shadow-sm">
            <Navbar variant='sidebar' />
          </div>

          {/* Main content area */}
          <div className="flex-1 px-6 py-8 bg-white">
            <div className="max-w-screen-xl mx-auto">
              <h1 className="text-3xl font-bold mb-8 text-gray-800">Our Menu</h1>

              {/* Filters and Sort Options */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                {/* Category Filters */}
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <Badge
                      key={category.id}
                      variant={activeCategory === category.id ? "default" : "outline"}
                      className={`cursor-pointer px-4 py-2 text-sm ${
                        activeCategory === category.id 
                          ? "bg-black hover:bg-gray-800 text-white" 
                          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                      }`}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.name}
                    </Badge>
                  ))}
                </div>

                {/* Sort Options */}
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-48 bg-white border border-gray-200 text-gray-700">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200">
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="delivery">Fastest Delivery</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Food Items Grid */}
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Array(8).fill().map((_, index) => (
                    <div key={index} className="rounded-lg overflow-hidden border border-gray-100 bg-white shadow-sm">
                      <Skeleton className="h-48 w-full bg-gray-100" />
                      <div className="p-4">
                        <Skeleton className="h-6 w-3/4 mb-2 bg-gray-100" />
                        <Skeleton className="h-4 w-full mb-2 bg-gray-100" />
                        <Skeleton className="h-4 w-1/2 bg-gray-100" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredItems.slice(0, visibleItems).map((item, index) => {
                      const badgeInfo = getBadgeType(item);
                      const orderCount = orderCounts[item.id] || 0;
                      const recentOrderCount = recentOrders[item.id] || 0;

                      const itemCard = (
                        <div key={item.id} className="bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 relative">
                          {badgeInfo && (
                            <div className="absolute top-2 right-2 flex flex-col gap-1 z-10">
                              <Badge
                                variant="default"
                                className={`${badgeInfo.color} text-white font-semibold px-3 py-1 shadow-md transition-none`}
                              >
                                {badgeInfo.text}
                              </Badge>
                              <Badge
                                variant="outline"
                                className="bg-white/95 backdrop-blur-sm text-gray-700 font-semibold px-2 py-1 shadow-md transition-none"
                              >
                                ⭐ {item.rating.toFixed(1)}
                              </Badge>
                            </div>
                          )}
                          <FoodItemCard 
                            item={item} 
                            onAddToCart={() => handleAddToCart(item)}
                          />
                        </div>
                      );

                      if (index === visibleItems - 1) {
                        return <div ref={lastItemRef} key={item.id}>{itemCard}</div>;
                      }
                      return itemCard;
                    })}
                  </div>

                  {/* Show load more button if needed */}
                  {visibleItems < filteredItems.length && (
                    <div className="mt-8 flex justify-center" ref={loadMoreRef}>
                      <Button
                        variant="outline"
                        className="bg-white text-blue-500 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
                        onClick={() => setVisibleItems(prev => Math.min(prev + 8, filteredItems.length))}
                      >
                        Load More
                      </Button>
                    </div>
                  )}

                  {/* No results message */}
                  {filteredItems.length === 0 && !loading && (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <p className="text-lg text-gray-500">No items found. Try a different category.</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Toast 
        message={toastMessage} 
        show={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </div>
  );
};

export default Menu;