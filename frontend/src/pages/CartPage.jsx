import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2, Clock, CreditCard } from "lucide-react";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate fetching cart data
  useEffect(() => {
    // Mock data - in a real app, you'd fetch from your state management or API
    const mockCartItems = [
      {
        id: 1,
        name: "Margherita Pizza",
        price: 12.99,
        quantity: 1,
        image: "/api/placeholder/120/120",
        category: "pizza",
      },
      {
        id: 2,
        name: "Cheeseburger Deluxe",
        price: 8.99,
        quantity: 2,
        image: "/api/placeholder/120/120",
        category: "burger",
      },
      {
        id: 3,
        name: "Caesar Salad",
        price: 7.50,
        quantity: 1,
        image: "/api/placeholder/120/120",
        category: "salad",
      },
    ];
    setCartItems(mockCartItems);
  }, []);

  // Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Calculate tax (assuming 8.25%)
  const tax = subtotal * 0.0825;
  
  // Calculate delivery fee
  const deliveryFee = subtotal > 30 ? 0 : 3.99;
  
  // Calculate total
  const total = subtotal + tax + deliveryFee - discount;

  // Handle quantity changes
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Handle item removal with animation
  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Handle promo code application
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "welcome15") {
      setDiscount(subtotal * 0.15);
    } else if (promoCode.toLowerCase() === "freeship") {
      setDiscount(deliveryFee);
    } else {
      setDiscount(0);
    }
  };

  // Handle checkout process
  const handleCheckout = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsCheckoutOpen(false);
      // In a real app, you'd redirect to a success page or show a success message
      alert("Order placed successfully!");
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: { duration: 0.2 }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } }
  };

  return (
    <div className="flex flex-row min-h-screen w-full">
      {/* Side bar - Fixed position */}
      <div className="sticky top-0 h-screen">
        <Navbar variant="sidebar" />
      </div>

      {/* Main content area */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-screen-xl mx-auto">
          <motion.h1 
            className="text-3xl font-bold mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your Cart
          </motion.h1>

          {cartItems.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items List */}
              <motion.div 
                className="lg:w-2/3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Cart Items ({cartItems.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px] pr-4">
                      <AnimatePresence>
                        {cartItems.map((item) => (
                          <motion.div
                            key={item.id}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            layout
                          >
                            <div className="flex items-center gap-4 py-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-16 w-16 rounded-md object-cover"
                              />
                              <div className="flex-1">
                                <h3 className="font-medium">{item.name}</h3>
                                <Badge variant="outline" className="mt-1">
                                  {item.category}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-6 text-center">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => removeItem(item.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Remove
                                </Button>
                              </div>
                            </div>
                            <Separator />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Order Summary */}
              <motion.div 
                className="lg:w-1/3"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Tax</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Delivery Fee</span>
                        <span>{deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}</span>
                      </div>
                      {discount > 0 && (
                        <motion.div 
                          className="flex justify-between text-green-600"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                        >
                          <span>Discount</span>
                          <span>-${discount.toFixed(2)}</span>
                        </motion.div>
                      )}
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>

                      {/* Promo Code Input */}
                      <div className="pt-4">
                        <p className="text-sm mb-2">Promo Code</p>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter promo code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                          />
                          <Button onClick={applyPromoCode} variant="outline">
                            Apply
                          </Button>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          Try "WELCOME15" for 15% off or "FREESHIP" for free delivery
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Sheet open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                      <SheetTrigger asChild>
                        <Button className="w-full" size="lg">
                          Proceed to Checkout
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="right" className="sm:max-w-lg">
                        <SheetHeader>
                          <SheetTitle>Checkout</SheetTitle>
                          <SheetDescription>
                            Complete your order with a few more details
                          </SheetDescription>
                        </SheetHeader>
                        <div className="py-6">
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <Input placeholder="First Name" />
                              <Input placeholder="Last Name" />
                            </div>
                            <Input placeholder="Email Address" />
                            <Input placeholder="Phone Number" />
                            <Input placeholder="Delivery Address" />
                            
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                              <div className="flex items-center mb-4">
                                <Clock className="mr-2 h-5 w-5 text-gray-500" />
                                <div>
                                  <p className="font-medium">Estimated Delivery Time</p>
                                  <p className="text-sm text-gray-500">30-45 minutes</p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <CreditCard className="mr-2 h-5 w-5 text-gray-500" />
                                <div>
                                  <p className="font-medium">Payment Method</p>
                                  <p className="text-sm text-gray-500">Pay on delivery</p>
                                </div>
                              </div>
                            </div>

                            <div className="pt-4">
                              <Button 
                                className="w-full" 
                                size="lg" 
                                onClick={handleCheckout}
                                disabled={isLoading}
                              >
                                {isLoading ? "Processing..." : "Place Order • $" + total.toFixed(2)}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
          ) : (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">Add some delicious items to your cart and come back!</p>
              <Button asChild>
                <a href="/menu">Browse Menu</a>
              </Button>
            </motion.div>
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

export default CartPage;