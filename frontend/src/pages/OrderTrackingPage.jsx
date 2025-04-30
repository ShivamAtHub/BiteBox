// OrderTrackingPage.jsx
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, ChefHat, Bike, CheckCircle2, Phone, MessageCircle, AlertCircle, Star, ShoppingBag } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import Map from '../components/Map';

// Enhanced driver data with starting locations
const DRIVERS = [
  { 
    id: 1, 
    name: "Alex Johnson", 
    photo: "https://randomuser.me/api/portraits/men/32.jpg", 
    rating: 4.8, 
    phone: "+1 555-123-4567", 
    vehicle: "Bike",
    currentLocation: { lat: 37.7749, lng: -122.4194 } // Near restaurant
  },
  { 
    id: 2, 
    name: "Maria Garcia", 
    photo: "https://randomuser.me/api/portraits/women/44.jpg", 
    rating: 4.9, 
    phone: "+1 555-234-5678", 
    vehicle: "Scooter",
    currentLocation: { lat: 37.7849, lng: -122.4294 } // 1 mile from restaurant
  },
  { 
    id: 3, 
    name: "James Wilson", 
    photo: "https://randomuser.me/api/portraits/men/67.jpg", 
    rating: 4.7, 
    phone: "+1 555-345-6789", 
    vehicle: "Car",
    currentLocation: { lat: 37.7949, lng: -122.4394 } // 2 miles from restaurant
  },
];

// Calculate distance between two points in miles (simplified for demo)
const calculateDistance = (point1, point2) => {
  const latDiff = point1.lat - point2.lat;
  const lngDiff = point1.lng - point2.lng;
  return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 69; // Approx miles
};

// Greedy algorithm to find the best driver for 10-minute delivery
const findBestDriver = (restaurantLoc, deliveryLoc) => {
  console.log("Finding best driver for 10-minute delivery...");
  
  // Calculate distances for all drivers
  const driversWithMetrics = DRIVERS.map(driver => {
    // Distance from driver to restaurant in miles
    const toRestaurantDist = calculateDistance(driver.currentLocation, restaurantLoc);
    
    // Distance from restaurant to delivery location in miles
    const toDeliveryDist = calculateDistance(restaurantLoc, deliveryLoc);
    
    // Total distance (driver -> restaurant -> customer)
    const totalDistance = toRestaurantDist + toDeliveryDist;
    
    // Estimated time in minutes (assuming average speed of 12 mph for all vehicles)
    // This ensures total time is around 10 minutes
    const estimatedTime = Math.round((totalDistance / 12) * 60);
    
    // Calculate a score that prioritizes both distance and rating
    const score = (driver.rating / 5) * 0.4 + (1 - (totalDistance / 5)) * 0.6;
    
    return {
      ...driver,
      toRestaurantDist,
      toDeliveryDist,
      totalDistance,
      estimatedTime,
      score
    };
  });
  
  // Log all driver metrics for verification
  console.log("Driver metrics:", driversWithMetrics);
  
  // Sort by highest score (combination of distance and rating)
  driversWithMetrics.sort((a, b) => b.score - a.score);
  
  // Select the top driver
  const bestDriver = driversWithMetrics[0];
  
  // Adjust time to ensure it's exactly 10 minutes for demo purposes
  bestDriver.estimatedTime = 10;
  
  console.log("Selected driver:", bestDriver);
  console.log(`Selection reason: Highest score (${bestDriver.score.toFixed(2)}) - ${bestDriver.name} is ${bestDriver.toRestaurantDist.toFixed(2)} miles from restaurant and has ${bestDriver.rating} rating`);
  
  return bestDriver;
};

// Simulate driver movement with realistic path
const simulateDriverMovement = (start, end, steps, callback) => {
  const path = [];
  const controlPoint = {
    lat: (start.lat + end.lat) / 2 + (Math.random() * 0.01 - 0.005),
    lng: (start.lng + end.lng) / 2 + (Math.random() * 0.01 - 0.005)
  };

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const lat = (1-t)*(1-t)*start.lat + 2*(1-t)*t*controlPoint.lat + t*t*end.lat;
    const lng = (1-t)*(1-t)*start.lng + 2*(1-t)*t*controlPoint.lng + t*t*end.lng;
    path.push({ lat, lng });
  }

  let currentStep = 0;
  const interval = setInterval(() => {
    if (currentStep >= steps) {
      clearInterval(interval);
      callback(end, true);
      return;
    }
    
    callback(path[currentStep], false);
    currentStep++;
  }, 1000); // Update every second
  
  return interval;
};

const OrderTrackingPage = () => {
  const [orderStatus, setOrderStatus] = useState("confirmed");
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedStartTime = localStorage.getItem('orderStartTime');
    if (savedStartTime) {
      const elapsed = Math.floor((Date.now() - parseInt(savedStartTime)) / 1000);
      return Math.max(0, 180 - elapsed); // 3 minutes in seconds
    }
    return 180;
  });
  const [driver, setDriver] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [driverLocation, setDriverLocation] = useState(null);
  const statusInterval = useRef(null);
  const movementInterval = useRef(null);
  
  const statusSteps = [
    { id: "confirmed", label: "Order Confirmed", icon: CheckCircle2 },
    { id: "preparing", label: "Preparing Order", icon: ChefHat },
    { id: "on-the-way", label: "On The Way", icon: Bike },
    { id: "delivered", label: "Delivered", icon: MapPin }
  ];

  useEffect(() => {
    // Check if there's an active order
    const currentOrder = JSON.parse(localStorage.getItem('currentOrder') || 'null');
    
    if (!currentOrder) {
      // No active order, don't start any timers or tracking
      return;
    }

    setOrderDetails(currentOrder);
      
    // Find best driver using greedy algorithm (3-minute delivery)
    const bestDriver = findBestDriver(currentOrder.restaurantLocation, currentOrder.deliveryLocation);
    setDriver(bestDriver);
    setDriverLocation(bestDriver.currentLocation);
    
    // Start status updates
    startStatusUpdates();

    return () => {
      if (statusInterval.current) clearInterval(statusInterval.current);
      if (movementInterval.current) clearInterval(movementInterval.current);
    };
  }, []);

  const startStatusUpdates = () => {
    // Fixed timing for 3-minute delivery:
    // - 1.2 minutes for preparation (40%)
    // - 1.8 minutes for delivery (60%)
    const prepTime = 72; // 1.2 minutes in seconds
    const travelTime = 108; // 1.8 minutes in seconds
    
    // Set start time if not already set
    if (!localStorage.getItem('orderStartTime')) {
      localStorage.setItem('orderStartTime', Date.now().toString());
    }
    
    const startTime = parseInt(localStorage.getItem('orderStartTime'));
    let elapsed = Math.floor((Date.now() - startTime) / 1000);
    
    statusInterval.current = setInterval(() => {
      elapsed = Math.floor((Date.now() - startTime) / 1000);
      const newTimeLeft = Math.max(0, 180 - elapsed); // 3 minutes total
      setTimeLeft(newTimeLeft);
      
      if (elapsed >= 180) {
        setOrderStatus("delivered");
        clearInterval(statusInterval.current);
        localStorage.removeItem('orderStartTime');
      } else if (elapsed >= prepTime) {
        if (orderStatus !== 'on-the-way') {
          setOrderStatus("on-the-way");
          startDriverMovement();
        }
      } else if (elapsed >= 0) {
        setOrderStatus("preparing");
      }
    }, 1000);
  };

  const startDriverMovement = () => {
    if (!orderDetails || !driver) return;
    
    // First move driver to restaurant (4 minutes)
    movementInterval.current = simulateDriverMovement(
      driver.currentLocation,
      orderDetails.restaurantLocation,
      24, // 24 steps over 4 minutes (1 step every 10 seconds)
      (position, isComplete) => {
        setDriverLocation(position);
        if (isComplete) {
          // Now move from restaurant to delivery location (6 minutes)
          movementInterval.current = simulateDriverMovement(
            orderDetails.restaurantLocation,
            orderDetails.deliveryLocation,
            36, // 36 steps over 6 minutes
            (pos) => setDriverLocation(pos)
          );
        }
      }
    );
  };

  const getStatusTime = (statusId) => {
    const now = new Date();
    const statusIndex = statusSteps.findIndex(step => step.id === statusId);
    if (statusIndex === -1) return "Pending";
    
    // Adjust times based on 10-minute delivery
    const minutesAgo = 
      statusId === 'confirmed' ? 10 :
      statusId === 'preparing' ? 6 :
      statusId === 'on-the-way' ? 2 : 0;
    
    now.setMinutes(now.getMinutes() - minutesAgo);
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!orderDetails) {
    return (
      <div className="flex flex-row min-h-screen w-full bg-white">
        <div className="sticky top-0 h-screen bg-white border-r border-gray-100 shadow-sm">
          <Navbar variant="sidebar" />
        </div>
        <div className="flex-1 px-6 py-8 bg-white">
          <div className="max-w-screen-xl mx-auto text-center py-16">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">No Active Orders</h2>
            <p className="text-gray-500 mb-8">Place an order to track its status here</p>
            <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white">
              <a href="/menu">Browse Menu</a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row min-h-screen w-full bg-white dark:bg-black">
      <div className="sticky top-0 h-screen bg-white dark:bg-black border-r border-gray-100 dark:border-zinc-800 shadow-sm">
        <Navbar variant="sidebar" />
      </div>

      <div className="flex-1 px-6 py-8 bg-white dark:bg-black">
        <div className="max-w-screen-xl mx-auto">
          {!orderDetails ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="rounded-full bg-gray-50 dark:bg-black/20 p-6 mb-4">
                <ShoppingBag className="h-12 w-12 text-gray-400 dark:text-white/40" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">No active order</h3>
              <p className="text-gray-500 dark:text-white/60 text-center max-w-md mb-6">
                You haven't placed any orders yet. Add items to your cart and checkout to track your order here.
              </p>
              <Button href="/menu" className="bg-black hover:bg-black/80 text-white dark:bg-white dark:text-black dark:hover:bg-white/80">
                Browse Restaurants
              </Button>
            </div>
          ) : (
            <>
              <motion.h1 
                className="text-3xl font-bold mb-8 text-gray-800 dark:text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Order Tracking
              </motion.h1>
              
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Track Your Order</h1>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-blue-500" />
                    <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">Order {orderDetails.orderId}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <Card className="border border-gray-100 dark:border-zinc-800 shadow-sm bg-white dark:bg-black">
                      <CardHeader className="border-b border-gray-50 dark:border-zinc-800">
                        <CardTitle className="text-gray-800 dark:text-white">Delivery Status</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="relative">
                          <div className="absolute left-7 top-0 h-full w-0.5 bg-gray-100 dark:bg-zinc-800"></div>
                          {statusSteps.map((step, index) => {
                            const isCompleted = statusSteps.findIndex(s => s.id === orderStatus) >= index;
                            const isActive = step.id === orderStatus;
                            return (
                              <div key={step.id} className="relative flex items-start mb-8">
                                <motion.div 
                                  className={`z-10 flex items-center justify-center w-14 h-14 rounded-full ${
                                    isCompleted ? 'bg-blue-50 dark:bg-blue-950 text-blue-500 border-2 border-blue-200 dark:border-blue-800' : 'bg-gray-50 dark:bg-zinc-900 text-gray-400 dark:text-gray-500 border-2 border-gray-200 dark:border-zinc-700'
                                  }`}
                                  animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                                  transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
                                >
                                  <step.icon className="h-6 w-6" />
                                </motion.div>
                                <div className="ml-6">
                                  <h3 className={`font-medium ${isCompleted ? 'text-gray-800 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                                    {step.label}
                                  </h3>
                                  <p className={`text-sm ${isCompleted ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}`}>
                                    {isCompleted ? getStatusTime(step.id) : 'Pending'}
                                  </p>
                                  {isActive && step.id === 'on-the-way' && driver && (
                                    <div className="mt-2">
                                      <Badge className="bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900">
                                        {Math.floor(timeLeft/60)} min {timeLeft%60} sec remaining
                                      </Badge>
                                      <p className="text-xs text-gray-500 mt-1">
                                        {driver.name} is {driver.vehicle.toLowerCase()} to you
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>

                    {driver && (
                      <Card className="border border-gray-100 dark:border-zinc-800 shadow-sm bg-white dark:bg-black">
                        <CardHeader className="border-b border-gray-50 dark:border-zinc-800">
                          <CardTitle className="text-gray-800 dark:text-white">Your Delivery Driver</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="flex items-center">
                            <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-gray-100 dark:border-zinc-700">
                              <img src={driver.photo} alt={driver.name} className="h-full w-full object-cover" />
                            </div>
                            <div className="ml-4 flex-1">
                              <h3 className="font-medium text-gray-800 dark:text-white">{driver.name}</h3>
                              <div className="flex items-center mt-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">{driver.rating}</span>
                                <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                                  {driver.vehicle}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                {orderStatus === 'on-the-way' ? 'On the way to you' : 
                                 orderStatus === 'preparing' ? 'Waiting at restaurant' :
                                 orderStatus === 'confirmed' ? 'Assigned to your order' : 'Delivery completed'}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="icon" className="bg-white dark:bg-black border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-900">
                                <Phone className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="icon" className="bg-white dark:bg-black border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-900">
                                <MessageCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <Card className="border border-gray-100 dark:border-zinc-800 shadow-sm bg-white dark:bg-black">
                      <CardHeader className="border-b border-gray-50 dark:border-zinc-800">
                        <CardTitle className="text-gray-800 dark:text-white">Live Delivery Tracking</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0 h-96">
                        {orderDetails && (
                          <Map 
                            restaurantLocation={orderDetails.restaurantLocation}
                            deliveryLocation={orderDetails.deliveryLocation}
                            driverLocation={driverLocation}
                            status={orderStatus}
                          />
                        )}
                      </CardContent>
                      <CardFooter className="bg-gray-50 dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800 py-3">
                        <p className="text-xs text-gray-500 dark:text-gray-300">
                          {orderStatus === 'on-the-way' ? 
                            `Driver is ${driver?.vehicle.toLowerCase()} to you` :
                            orderStatus === 'preparing' ? 'Driver is at the restaurant' :
                            orderStatus === 'delivered' ? 'Delivery completed' : 'Waiting for driver assignment'}
                        </p>
                      </CardFooter>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <Card className="border border-gray-100 dark:border-zinc-800 shadow-sm bg-white dark:bg-black">
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">Estimated Delivery</h3>
                          <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                            {orderStatus === 'delivered' ? 'Delivered!' : 
                             `${Math.floor(timeLeft/60)} min ${timeLeft%60} sec`}
                          </div>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">
                            {orderStatus === 'delivered' ? 'Your order has arrived!' :
                             orderStatus === 'on-the-way' ? `${driver?.name} is on the way` :
                             orderStatus === 'preparing' ? 'The restaurant is preparing your order' :
                             'Your order has been confirmed'}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border border-gray-100 dark:border-zinc-800 shadow-sm bg-white dark:bg-black">
                      <CardHeader className="border-b border-gray-50 dark:border-zinc-800">
                        <CardTitle className="text-gray-800 dark:text-white">Order Summary</CardTitle>
                      </CardHeader>
                      <CardContent className="py-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          Ordered {new Date(orderDetails.orderTime).toLocaleString()}
                        </p>
                        <div className="space-y-3">
                          {orderDetails.items.map(item => (
                            <div key={item.id} className="flex justify-between">
                              <div>
                                <span className="text-gray-700 dark:text-gray-300">{item.quantity}x </span>
                                <span className="text-gray-800 dark:text-white">{item.name}</span>
                              </div>
                              <span className="text-gray-700 dark:text-gray-300">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                        <Separator className="my-4 bg-gray-100 dark:bg-zinc-800" />
                        <div className="space-y-2">
                          <div className="flex justify-between text-gray-600 dark:text-gray-400">
                            <span>Subtotal</span>
                            <span>${orderDetails.subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-gray-600 dark:text-gray-400">
                            <span>Delivery Fee</span>
                            <span>${orderDetails.deliveryFee.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-gray-600 dark:text-gray-400">
                            <span>Tax</span>
                            <span>${orderDetails.tax.toFixed(2)}</span>
                          </div>
                          {orderDetails.discount > 0 && (
                            <div className="flex justify-between text-green-600">
                              <span>Discount</span>
                              <span>-${orderDetails.discount.toFixed(2)}</span>
                            </div>
                          )}
                        </div>
                        <Separator className="my-4 bg-gray-100 dark:bg-zinc-800" />
                        <div className="flex justify-between font-medium text-gray-800 dark:text-white">
                          <span>Total</span>
                          <span>${orderDetails.total.toFixed(2)}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border border-gray-100 dark:border-zinc-800 shadow-sm bg-white dark:bg-black">
                      <CardHeader className="border-b border-gray-50 dark:border-zinc-800">
                        <CardTitle className="text-gray-800 dark:text-white">Delivery Details</CardTitle>
                      </CardHeader>
                      <CardContent className="py-4">
                        <div className="space-y-2">
                          <div>
                            <p className="text-sm text-gray-500">Customer</p>
                            <p className="text-gray-700">
                              {orderDetails.customer.firstName} {orderDetails.customer.lastName}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                            <p className="text-gray-700 dark:text-gray-300">{orderDetails.customer.address}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Contact</p>
                            <p className="text-gray-700">{orderDetails.customer.phone}</p>
                            <p className="text-gray-700 dark:text-gray-300">{orderDetails.customer.email}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full bg-white dark:bg-black border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-900">
                          <AlertCircle className="h-4 w-4 mr-2 text-red-500 dark:text-red-400" />
                          Report an Issue
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white dark:bg-black border-gray-100 dark:border-zinc-800">
                        <DialogHeader>
                          <DialogTitle className="text-gray-800 dark:text-white">Report an Issue</DialogTitle>
                          <DialogDescription className="text-gray-500 dark:text-gray-400">
                            Let us know what's wrong with your order
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <Select>
                            <SelectTrigger className="w-full bg-white dark:bg-black border-gray-200 dark:border-zinc-700 text-gray-800 dark:text-white">
                              <SelectValue placeholder="Select issue type" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-black border-gray-100 dark:border-zinc-800">
                              <SelectItem value="missing" className="text-gray-800 dark:text-white">Missing items</SelectItem>
                              <SelectItem value="wrong" className="text-gray-800 dark:text-white">Wrong items</SelectItem>
                              <SelectItem value="quality" className="text-gray-800 dark:text-white">Food quality</SelectItem>
                              <SelectItem value="delivery" className="text-gray-800 dark:text-white">Delivery problem</SelectItem>
                              <SelectItem value="other" className="text-gray-800 dark:text-white">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <Textarea placeholder="Describe the issue..." className="min-h-32 bg-white dark:bg-black border-gray-200 dark:border-zinc-700 text-gray-800 dark:text-white" />
                        </div>
                        <DialogFooter>
                          <Button 
                            variant="outline"
                            className="bg-white dark:bg-black border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-900"
                            onClick={() => setReportDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button className="bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black">
                            Submit Report
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </motion.div>
              <div className="pt-20 pb-10">
                <Footer />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;