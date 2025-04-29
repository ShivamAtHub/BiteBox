import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Clock, 
  ArrowRight, 
  ShoppingBag,
  ChevronDown,
  ChevronUp,
  Repeat,
  Star,
  CalendarIcon,
  MapPin,
  AlertCircle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";

// Order Card Component
const OrderCard = ({ order, onReorder, onViewDetails }) => {
  const [expanded, setExpanded] = useState(false);
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [rating, setRating] = useState(0);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleReorder = (e) => {
    e.stopPropagation();
    onReorder(order);
  };

  const statusColors = {
    active: {
      light: "bg-yellow-50 text-yellow-600 border-yellow-100",
      dark: "bg-yellow-900/20 text-yellow-400 border-yellow-900/30"
    },
    delivered: {
      light: "bg-green-50 text-green-600 border-green-100",
      dark: "bg-green-900/20 text-green-400 border-green-900/30"
    },
    cancelled: {
      light: "bg-red-50 text-red-600 border-red-100",
      dark: "bg-red-900/20 text-red-400 border-red-900/30"
    }
  };

  return (
    <Card 
      className="border border-gray-100 dark:border-black/20 shadow-sm bg-white dark:bg-black/10 mb-4 hover:shadow-md transition-shadow"
      onClick={toggleExpand}
    >
      <CardHeader className="p-4 flex flex-row items-center justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <div className="font-medium text-gray-800 dark:text-white">#{order.orderId}</div>
          <div className="text-sm text-gray-500 dark:text-white/60 flex items-center">
            <CalendarIcon className="h-4 w-4 mr-1" />
            {order.orderDate}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <Badge className={`${statusColors[order.status].light} dark:${statusColors[order.status].dark}`}>
            {order.status === "active" ? "In Progress" : 
             order.status === "delivered" ? "Delivered" : "Cancelled"}
          </Badge>
          {order.status === "active" && (
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white dark:bg-black/20 border-gray-200 dark:border-black/10 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-black/30"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(order);
              }}
            >
              Track
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="px-4 pb-0">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-800 dark:text-white font-medium">{order.restaurant}</div>
            <div className="text-sm text-gray-500 dark:text-white/60 flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {order.deliveryAddress.split(',')[0]}
            </div>
          </div>
          <div className="text-lg font-bold text-gray-800 dark:text-white">${order.total.toFixed(2)}</div>
        </div>
      </CardContent>
      
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CardContent className="pt-2">
            <Separator className="my-3 bg-gray-100 dark:bg-black/20" />
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <span className="text-gray-700 dark:text-white/80">{item.quantity}x {item.name}</span>
                  <span className="text-gray-600 dark:text-white/70">${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between p-4">
            {order.status === "delivered" && !order.rated && (
              <Dialog open={ratingDialogOpen} onOpenChange={setRatingDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="bg-white dark:bg-black/20 border-gray-200 dark:border-black/10 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-black/30"
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Rate Order
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white dark:bg-black">
                  <DialogHeader>
                    <DialogTitle className="text-gray-800 dark:text-white">Rate Your Experience</DialogTitle>
                    <DialogDescription className="text-gray-500 dark:text-white/60">
                      Let us know how your order from {order.restaurant} was.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-center py-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star}
                        className={`h-8 w-8 cursor-pointer mx-1 ${
                          star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-white/30'
                        }`}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                  <DialogFooter>
                    <Button 
                      variant="outline"
                      className="bg-white dark:bg-black/20 border-gray-200 dark:border-black/10 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-black/30"
                      onClick={() => setRatingDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button className="bg-black hover:bg-black/80 text-white dark:bg-white dark:text-black dark:hover:bg-white/80">
                      Submit Rating
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
            
            {order.status === "delivered" && (
              <Button 
                onClick={handleReorder}
                className="bg-black hover:bg-black/80 text-white dark:bg-white dark:text-black dark:hover:bg-white/80"
              >
                <Repeat className="h-4 w-4 mr-2" />
                Reorder
              </Button>
            )}
          </CardFooter>
        </motion.div>
      )}
      
      <CardFooter className="p-4 pt-2 flex justify-center">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-500 dark:text-white/60 hover:text-gray-700 dark:hover:text-white hover:bg-transparent p-0"
          onClick={toggleExpand}
        >
          {expanded ? (
            <>
              <ChevronUp className="h-5 w-5 mr-1" />
              <span className="text-sm">Show Less</span>
            </>
          ) : (
            <>
              <ChevronDown className="h-5 w-5 mr-1" />
              <span className="text-sm">Show Details</span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

// Empty State Component
const EmptyOrdersState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="rounded-full bg-gray-50 dark:bg-black/20 p-6 mb-4">
        <ShoppingBag className="h-12 w-12 text-gray-400 dark:text-white/40" />
      </div>
      <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">No orders yet</h3>
      <p className="text-gray-500 dark:text-white/60 text-center max-w-md mb-6">
        You haven't placed any orders yet. Explore our restaurants and order some delicious food!
      </p>
      <Button className="bg-black hover:bg-black/80 text-white dark:bg-white dark:text-black dark:hover:bg-white/80">
        Browse Restaurants
      </Button>
    </div>
  );
};

// Main Page Component
const CustomerOrdersPage = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [orders, setOrders] = useState({
    active: [],
    past: []
  });
  
  // Check for dark mode
  useEffect(() => {
    // Check if user prefers dark mode
    if (typeof window !== 'undefined') {
      // Check for system preference
      const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDarkMode(darkModeMediaQuery.matches);
      
      // Listen for changes in system preference
      const handleChange = (e) => {
        setIsDarkMode(e.matches);
      };
      
      darkModeMediaQuery.addEventListener('change', handleChange);
      return () => darkModeMediaQuery.removeEventListener('change', handleChange);
    }
  }, []);
  
  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  // Load orders data
  useEffect(() => {
    // This would be an API call in a real application
    const mockActiveOrders = [
      {
        orderId: "ORD-3829501",
        restaurant: "Pizza Palace",
        orderDate: "Today at 7:15 PM",
        deliveryAddress: "123 Main Street, San Francisco, CA 94105",
        status: "active",
        total: 45.63,
        items: [
          { name: "Margherita Pizza", quantity: 1, price: 12.99 },
          { name: "Cheeseburger Deluxe", quantity: 2, price: 17.98 },
          { name: "Caesar Salad", quantity: 1, price: 7.50 }
        ]
      },
      {
        orderId: "ORD-3829495",
        restaurant: "Sushi Express",
        orderDate: "Today at 6:30 PM",
        deliveryAddress: "456 Market St, San Francisco, CA 94105",
        status: "active",
        total: 32.50,
        items: [
          { name: "California Roll", quantity: 2, price: 15.00 },
          { name: "Miso Soup", quantity: 1, price: 4.50 },
          { name: "Edamame", quantity: 1, price: 5.00 }
        ]
      }
    ];
    
    const mockPastOrders = [
      {
        orderId: "ORD-3829402",
        restaurant: "Burger King",
        orderDate: "Yesterday at 1:20 PM",
        deliveryAddress: "123 Main Street, San Francisco, CA 94105",
        status: "delivered",
        rated: true,
        total: 28.75,
        items: [
          { name: "Whopper", quantity: 2, price: 14.98 },
          { name: "Fries", quantity: 2, price: 7.98 },
          { name: "Soda", quantity: 2, price: 5.79 }
        ]
      },
      {
        orderId: "ORD-3829350",
        restaurant: "Taco Bell",
        orderDate: "Apr 20, 2025",
        deliveryAddress: "123 Main Street, San Francisco, CA 94105",
        status: "delivered",
        rated: false,
        total: 22.15,
        items: [
          { name: "Crunchy Taco", quantity: 3, price: 10.47 },
          { name: "Burrito Supreme", quantity: 1, price: 6.99 },
          { name: "Nachos", quantity: 1, price: 4.69 }
        ]
      },
      {
        orderId: "ORD-3829220",
        restaurant: "Chipotle",
        orderDate: "Apr 18, 2025",
        deliveryAddress: "123 Main Street, San Francisco, CA 94105",
        status: "cancelled",
        total: 18.50,
        items: [
          { name: "Burrito Bowl", quantity: 1, price: 12.50 },
          { name: "Chips & Guac", quantity: 1, price: 6.00 }
        ]
      }
    ];
    
    setOrders({
      active: mockActiveOrders,
      past: mockPastOrders
    });
  }, []);
  
  // Toggle dark mode manually
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  // Filter orders based on search query and filter value
  const filteredOrders = orders[activeTab].filter(order => {
    const matchesSearch = order.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order.orderId.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterValue === "all") return matchesSearch;
    if (filterValue === "delivered") return matchesSearch && order.status === "delivered";
    if (filterValue === "cancelled") return matchesSearch && order.status === "cancelled";
    
    return matchesSearch;
  });
  
  // Handle reorder
  const handleReorder = (order) => {
    console.log("Reordering:", order.orderId);
    // In a real app, this would add items to cart and redirect to checkout
  };
  
  // Handle view details - would navigate to order tracking page
  const handleViewDetails = (order) => {
    console.log("Viewing details for:", order.orderId);
    // In a real app, this would navigate to order tracking page
  };
  
  // Items per page
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-row min-h-screen w-full bg-white dark:bg-black">
      {/* Side bar - Fixed position */}
      <div className="sticky top-0 h-screen bg-white dark:bg-black border-r border-gray-100 dark:border-black/20 shadow-sm">
        <Navbar variant="sidebar" />
      </div>

      {/* Main content area */}
      <div className="flex-1 px-6 py-8 bg-white dark:bg-black">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">My Orders</h1>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="mr-4 bg-white dark:bg-black/20 border-gray-200 dark:border-black/10 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-black/30"
                  onClick={toggleDarkMode}
                >
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </Button>
                <Clock className="mr-2 h-5 w-5 text-black dark:text-white" />
                <span className="text-lg text-gray-700 dark:text-white">Order History</span>
              </div>
            </div>
            
            {/* Order Tabs */}
            <Tabs 
              defaultValue="active" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="mb-6"
            >
              <TabsList className="bg-gray-50 dark:bg-black/30 p-1">
                <TabsTrigger 
                  value="active"
                  className="data-[state=active]:bg-white data-[state=active]:dark:bg-black data-[state=active]:text-gray-800 data-[state=active]:dark:text-white data-[state=active]:shadow-sm"
                >
                  Active Orders
                </TabsTrigger>
                <TabsTrigger 
                  value="past"
                  className="data-[state=active]:bg-white data-[state=active]:dark:bg-black data-[state=active]:text-gray-800 data-[state=active]:dark:text-white data-[state=active]:shadow-sm"
                >
                  Past Orders
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="active" className="mt-6">
                {orders.active.length === 0 ? (
                  <EmptyOrdersState />
                ) : (
                  <>
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-white/40" />
                        <Input
                          placeholder="Search by restaurant or order ID"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 bg-white dark:bg-black/10 border-gray-200 dark:border-black/20 dark:text-white"
                        />
                      </div>
                      <Select value={filterValue} onValueChange={setFilterValue}>
                        <SelectTrigger className="w-full md:w-52 bg-white dark:bg-black/10 border-gray-200 dark:border-black/20 dark:text-white">
                          <div className="flex items-center">
                            <Filter className="mr-2 h-4 w-4 text-gray-500 dark:text-white/60" />
                            <SelectValue placeholder="Filter orders" />
                          </div>
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-black">
                          <SelectItem value="all" className="dark:text-white">All Orders</SelectItem>
                          <SelectItem value="delivered" className="dark:text-white">Delivered</SelectItem>
                          <SelectItem value="cancelled" className="dark:text-white">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Order Cards */}
                    <div className="space-y-4">
                      {currentOrders.map((order) => (
                        <OrderCard 
                          key={order.orderId} 
                          order={order} 
                          onReorder={handleReorder}
                          onViewDetails={handleViewDetails}
                        />
                      ))}
                    </div>
                    
                    {/* Show empty state if filtered results are empty */}
                    {currentOrders.length === 0 && (
                      <div className="text-center py-12">
                        <AlertCircle className="h-12 w-12 text-gray-300 dark:text-white/20 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-700 dark:text-white">No orders found</h3>
                        <p className="text-gray-500 dark:text-white/60">Try adjusting your search or filter criteria</p>
                      </div>
                    )}
                    
                    {/* Pagination */}
                    {filteredOrders.length > itemsPerPage && (
                      <Pagination className="mt-8">
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious 
                              href="#" 
                              onClick={(e) => {
                                e.preventDefault();
                                if (currentPage > 1) setCurrentPage(currentPage - 1);
                              }}
                              className={`${currentPage === 1 ? "pointer-events-none opacity-50" : ""} dark:text-white`}
                            />
                          </PaginationItem>
                          
                          {Array.from({ length: totalPages }).map((_, i) => (
                            <PaginationItem key={i}>
                              <PaginationLink 
                                href="#" 
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCurrentPage(i + 1);
                                }}
                                isActive={currentPage === i + 1}
                                className="dark:text-white dark:data-[active=true]:bg-white/10"
                              >
                                {i + 1}
                              </PaginationLink>
                            </PaginationItem>
                          ))}
                          
                          <PaginationItem>
                            <PaginationNext 
                              href="#" 
                              onClick={(e) => {
                                e.preventDefault();
                                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                              }}
                              className={`${currentPage === totalPages ? "pointer-events-none opacity-50" : ""} dark:text-white`}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    )}
                  </>
                )}
              </TabsContent>
              
              <TabsContent value="past" className="mt-6">
                {orders.past.length === 0 ? (
                  <EmptyOrdersState />
                ) : (
                  <>
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-white/40" />
                        <Input
                          placeholder="Search by restaurant or order ID"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 bg-white dark:bg-black/10 border-gray-200 dark:border-black/20 dark:text-white"
                        />
                      </div>
                      <Select value={filterValue} onValueChange={setFilterValue}>
                        <SelectTrigger className="w-full md:w-52 bg-white dark:bg-black/10 border-gray-200 dark:border-black/20 dark:text-white">
                          <div className="flex items-center">
                            <Filter className="mr-2 h-4 w-4 text-gray-500 dark:text-white/60" />
                            <SelectValue placeholder="Filter orders" />
                          </div>
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-black">
                          <SelectItem value="all" className="dark:text-white">All Orders</SelectItem>
                          <SelectItem value="delivered" className="dark:text-white">Delivered</SelectItem>
                          <SelectItem value="cancelled" className="dark:text-white">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Order Cards */}
                    <div className="space-y-4">
                      {currentOrders.map((order) => (
                        <OrderCard 
                          key={order.orderId} 
                          order={order} 
                          onReorder={handleReorder}
                          onViewDetails={handleViewDetails}
                        />
                      ))}
                    </div>
                    
                    {/* Show empty state if filtered results are empty */}
                    {currentOrders.length === 0 && (
                      <div className="text-center py-12">
                        <AlertCircle className="h-12 w-12 text-gray-300 dark:text-white/20 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-700 dark:text-white">No orders found</h3>
                        <p className="text-gray-500 dark:text-white/60">Try adjusting your search or filter criteria</p>
                      </div>
                    )}
                    
                    {/* Pagination */}
                    {filteredOrders.length > itemsPerPage && (
                      <Pagination className="mt-8">
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious 
                              href="#" 
                              onClick={(e) => {
                                e.preventDefault();
                                if (currentPage > 1) setCurrentPage(currentPage - 1);
                              }}
                              className={`${currentPage === 1 ? "pointer-events-none opacity-50" : ""} dark:text-white`}
                            />
                          </PaginationItem>
                          
                          {Array.from({ length: totalPages }).map((_, i) => (
                            <PaginationItem key={i}>
                              <PaginationLink 
                                href="#" 
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCurrentPage(i + 1);
                                }}
                                isActive={currentPage === i + 1}
                                className="dark:text-white dark:data-[active=true]:bg-white/10"
                              >
                                {i + 1}
                              </PaginationLink>
                            </PaginationItem>
                          ))}
                          
                          <PaginationItem>
                            <PaginationNext 
                              href="#" 
                              onClick={(e) => {
                                e.preventDefault();
                                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                              }}
                              className={`${currentPage === totalPages ? "pointer-events-none opacity-50" : ""} dark:text-white`}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    )}
                  </>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Footer */}
          <div className="pt-20 pb-10">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerOrdersPage;