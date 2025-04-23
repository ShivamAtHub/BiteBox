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

import Navbar from "../components/ui/Navbar";
import Footer from '../components/ui/Footer';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortOption, setSortOption] = useState('popular');
  const [items, setItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState(12);
  const [loading, setLoading] = useState(true);
  const [filteredItems, setFilteredItems] = useState([]);
  const observer = useRef();
  const loadMoreRef = useRef(null);

  // Simulated food data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockData = Array(50).fill().map((_, index) => ({
        id: index + 1,
        name: `Food Item ${index + 1}`,
        description: 'Delicious food with fresh ingredients',
        price: Math.floor(Math.random() * 20) + 5,
        category: ['pizza', 'burger', 'sushi', 'salad', 'dessert'][Math.floor(Math.random() * 5)],
        image: `/api/placeholder/300/200`,
        rating: (Math.random() * 2 + 3).toFixed(1),
        deliveryTime: Math.floor(Math.random() * 30) + 15,
      }));
      setItems(mockData);
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
      default: // 'popular'
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    setFilteredItems(result);
  }, [items, activeCategory, sortOption]);

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
    <div className="flex flex-row min-h-screen w-full">
      {/* Side bar - Fixed position */}
      <div className="sticky top-0 h-screen">
        <Navbar variant='sidebar' />
      </div>

      {/* Main content area */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Our Menu</h1>

          {/* Filters and Sort Options */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Badge
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  className="cursor-pointer px-4 py-2 text-sm"
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </Badge>
              ))}
            </div>

            {/* Sort Options */}
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
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
                <div key={index} className="rounded-lg overflow-hidden border">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.slice(0, visibleItems).map((item, index) => {
                  if (index === visibleItems - 1) {
                    return (
                      <div ref={lastItemRef} key={item.id}>
                        <FoodItemCard item={item} />
                      </div>
                    );
                  }
                  return <FoodItemCard key={item.id} item={item} />;
                })}
              </div>

              {/* Show load more button if needed */}
              {visibleItems < filteredItems.length && (
                <div className="mt-8 flex justify-center" ref={loadMoreRef}>
                  <Button
                    variant="outline"
                    onClick={() => setVisibleItems(prev => Math.min(prev + 8, filteredItems.length))}
                  >
                    Load More
                  </Button>
                </div>
              )}

              {/* No results message */}
              {filteredItems.length === 0 && !loading && (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-500">No items found. Try a different category.</p>
                </div>
              )}
            </>
          )}

          {/* Footer */}
          <div className="pt-20 pb-10">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;