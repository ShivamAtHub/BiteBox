import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  MessageCircle, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  MapPin,
  ChefHat,
  Bike,
  Star
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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";

const OrderTrackingPage = () => {
  // Order status states
  const [orderStatus, setOrderStatus] = useState("confirmed");
  const [estimatedTime, setEstimatedTime] = useState(35); // minutes
  const [deliveryLocation, setDeliveryLocation] = useState({ lat: 37.7749, lng: -122.4194 });
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  
  // WebSocket connection for real-time updates
  const wsRef = useRef(null);
  
  // Order details
  const [orderDetails] = useState({
    orderId: "ORD-3829501",
    orderTime: "Today at 7:15 PM",
    items: [
      { id: 1, name: "Margherita Pizza", quantity: 1, price: 12.99 },
      { id: 2, name: "Cheeseburger Deluxe", quantity: 2, price: 17.98 },
      { id: 3, name: "Caesar Salad", quantity: 1, price: 7.50 }
    ],
    subtotal: 38.47,
    deliveryFee: 3.99,
    tax: 3.17,
    total: 45.63,
    paymentMethod: "Credit Card",
    deliveryAddress: "123 Main Street, San Francisco, CA 94105"
  });
  
  // Driver information
  const [driver] = useState({
    name: "Alex Johnson",
    photo: "/api/placeholder/100/100",
    rating: 4.8,
    phone: "+1 555-123-4567"
  });

  // Status timeline steps
  const timelineSteps = [
    { id: "confirmed", label: "Order Confirmed", icon: CheckCircle2, time: "7:15 PM" },
    { id: "preparing", label: "Preparing Order", icon: ChefHat, time: "7:20 PM" },
    { id: "on-the-way", label: "On The Way", icon: Bike, time: "7:35 PM" },
    { id: "delivered", label: "Delivered", icon: MapPin, time: "7:50 PM" }
  ];
  
  // Simulate WebSocket connection for real-time updates
  useEffect(() => {
    // In a real app, this would be a real WebSocket connection
    const mockWebSocket = {
      onmessage: null,
      send: () => {},
      close: () => {}
    };
    
    wsRef.current = mockWebSocket;
    
    // Simulate status updates
    const statusUpdates = [
      { status: "preparing", eta: 30, location: { lat: 37.7749, lng: -122.4194 } },
      { status: "on-the-way", eta: 15, location: { lat: 37.7845, lng: -122.4100 } },
      { status: "delivered", eta: 0, location: { lat: 37.7845, lng: -122.4000 } }
    ];
    
    let updateIndex = 0;
    
    const statusInterval = setInterval(() => {
      if (updateIndex < statusUpdates.length) {
        const update = statusUpdates[updateIndex];
        setOrderStatus(update.status);
        setEstimatedTime(update.eta);
        setDeliveryLocation(update.location);
        updateIndex++;
      } else {
        clearInterval(statusInterval);
      }
    }, 10000); // Status updates every 10 seconds for demo
    
    // Simulate countdown timer
    const countdownInterval = setInterval(() => {
      setEstimatedTime(prev => {
        if (prev <= 0) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 60000); // Update every minute
    
    return () => {
      clearInterval(statusInterval);
      clearInterval(countdownInterval);
      wsRef.current.close();
    };
  }, []);

  return (
    <div className="flex flex-row min-h-screen w-full bg-white">
      {/* Side bar - Fixed position */}
      <div className="sticky top-0 h-screen bg-white border-r border-gray-100 shadow-sm">
        <Navbar variant="sidebar" />
      </div>

      {/* Main content area */}
      <div className="flex-1 px-6 py-8 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Track Your Order</h1>
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-blue-500" />
                <span className="text-lg font-semibold text-gray-700">Order #{orderDetails.orderId}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left column - Status & Driver */}
              <div className="lg:col-span-2 space-y-6">
                {/* Status Timeline */}
                <Card className="border border-gray-100 shadow-sm bg-white">
                  <CardHeader className="border-b border-gray-50">
                    <CardTitle className="text-gray-800">Delivery Status</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="relative">
                      {/* Timeline line */}
                      <div className="absolute left-7 top-0 h-full w-0.5 bg-gray-100"></div>
                      
                      {/* Timeline steps */}
                      {timelineSteps.map((step, index) => {
                        const isCompleted = 
                          timelineSteps.findIndex(s => s.id === orderStatus) >= index;
                        const isActive = step.id === orderStatus;
                        
                        return (
                          <div 
                            key={step.id} 
                            className={`relative flex items-start mb-8 ${index === timelineSteps.length - 1 ? 'mb-0' : ''}`}
                          >
                            <motion.div 
                              className={`z-10 flex items-center justify-center w-14 h-14 rounded-full ${
                                isCompleted 
                                  ? 'bg-blue-50 text-blue-500 border-2 border-blue-200' 
                                  : 'bg-gray-50 text-gray-400 border-2 border-gray-200'
                              }`}
                              initial={false}
                              animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                              transition={{ duration: 1, repeat: isActive ? Infinity : 0, repeatDelay: 2 }}
                            >
                              <step.icon className="h-6 w-6" />
                            </motion.div>
                            <div className="ml-6">
                              <h3 className={`font-medium ${isCompleted ? 'text-gray-800' : 'text-gray-500'}`}>
                                {step.label}
                              </h3>
                              <p className={`text-sm ${isCompleted ? 'text-gray-600' : 'text-gray-400'}`}>
                                {isCompleted ? step.time : 'Pending'}
                              </p>
                              {isActive && step.id === 'on-the-way' && (
                                <Badge className="mt-2 bg-blue-50 text-blue-600 border-blue-100">
                                  {estimatedTime} min away
                                </Badge>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Driver Information */}
                {orderStatus === 'on-the-way' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="border border-gray-100 shadow-sm bg-white">
                      <CardHeader className="border-b border-gray-50">
                        <CardTitle className="text-gray-800">Your Delivery Driver</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="flex items-center">
                          <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-gray-100">
                            <img 
                              src={driver.photo} 
                              alt={driver.name} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-4 flex-1">
                            <h3 className="font-medium text-gray-800">{driver.name}</h3>
                            <div className="flex items-center mt-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                              <span className="ml-1 text-sm text-gray-600">{driver.rating}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="icon" className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50">
                              <Phone className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50">
                              <MessageCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Delivery Map */}
                <Card className="border border-gray-100 shadow-sm bg-white">
                  <CardHeader className="border-b border-gray-50">
                    <CardTitle className="text-gray-800">Delivery Location</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="h-64 bg-gray-100 relative">
                      {/* In a real app, this would be a real map component */}
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                        <div className="text-center">
                          <MapPin className="h-8 w-8 mx-auto mb-2" />
                          <p>Map showing delivery route</p>
                          <p className="text-sm">
                            From restaurant to {orderDetails.deliveryAddress}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right column - Order Summary */}
              <div className="space-y-6">
                {/* Estimated Delivery */}
                <Card className="border border-gray-100 shadow-sm bg-white">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="text-lg font-medium text-gray-700 mb-2">Estimated Delivery</h3>
                      <div className="text-3xl font-bold text-gray-800 mb-2">
                        {orderStatus === 'delivered' ? 'Delivered!' : `${estimatedTime} minutes`}
                      </div>
                      <p className="text-gray-500 text-sm">
                        {orderStatus === 'delivered' 
                          ? 'Your order has been delivered' 
                          : `${
                              orderStatus === 'confirmed' 
                                ? 'Processing your order' 
                                : orderStatus === 'preparing' 
                                  ? 'Preparing your food' 
                                  : 'Driver is on the way'
                            }`
                        }
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Order Details */}
                <Card className="border border-gray-100 shadow-sm bg-white">
                  <CardHeader className="border-b border-gray-50">
                    <CardTitle className="text-gray-800">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="py-4">
                    <p className="text-sm text-gray-500 mb-4">Ordered {orderDetails.orderTime}</p>
                    <div className="space-y-3">
                      {orderDetails.items.map(item => (
                        <div key={item.id} className="flex justify-between">
                          <div>
                            <span className="text-gray-700">{item.quantity}x </span>
                            <span className="text-gray-800">{item.name}</span>
                          </div>
                          <span className="text-gray-700">${item.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-4 bg-gray-100" />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>${orderDetails.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Delivery Fee</span>
                        <span>${orderDetails.deliveryFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Tax</span>
                        <span>${orderDetails.tax.toFixed(2)}</span>
                      </div>
                    </div>

                    <Separator className="my-4 bg-gray-100" />
                    
                    <div className="flex justify-between font-medium text-gray-800">
                      <span>Total</span>
                      <span>${orderDetails.total.toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Address */}
                <Card className="border border-gray-100 shadow-sm bg-white">
                  <CardHeader className="border-b border-gray-50">
                    <CardTitle className="text-gray-800">Delivery Details</CardTitle>
                  </CardHeader>
                  <CardContent className="py-4">
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="text-gray-700">{orderDetails.deliveryAddress}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Payment Method</p>
                        <p className="text-gray-700">{orderDetails.paymentMethod}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Help & Report Issues */}
                <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    >
                      <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                      Report an Issue
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white">
                    <DialogHeader>
                      <DialogTitle className="text-gray-800">Report an Issue</DialogTitle>
                      <DialogDescription className="text-gray-500">
                        Let us know what's wrong with your order and we'll help resolve it.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <Select>
                        <SelectTrigger className="w-full bg-white border-gray-200">
                          <SelectValue placeholder="Select issue type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="missing">Missing items</SelectItem>
                          <SelectItem value="wrong">Wrong items</SelectItem>
                          <SelectItem value="quality">Food quality</SelectItem>
                          <SelectItem value="delivery">Delivery problem</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <Textarea 
                        placeholder="Please describe the issue in detail..." 
                        className="min-h-32 bg-white border-gray-200"
                      />
                    </div>
                    <DialogFooter>
                      <Button 
                        variant="outline"
                        className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                        onClick={() => setReportDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button className="bg-black hover:bg-gray-800 text-white">
                        Submit Report
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
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

export default OrderTrackingPage;