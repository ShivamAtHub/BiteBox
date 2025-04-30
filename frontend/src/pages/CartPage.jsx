import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2, Clock, CreditCard } from "lucide-react";
import { useCart } from "../context/CartContext";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import { useNavigate } from "react-router-dom";

// Bottom gradient component for button
const BottomGradient = () => {
  return (
    <div className="absolute inset-x-0 -bottom-px h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 transition duration-300 group-hover/btn:opacity-100" />
  );
};

const CartPage = () => {
  const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "Credit Card"
  });
  const navigate = useNavigate();

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.0825;
  const deliveryFee = subtotal > 30 ? 0 : 3.99;
  const total = subtotal + tax + deliveryFee - discount;

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "welcome15") {
      setDiscount(subtotal * 0.15);
    } else if (promoCode.toLowerCase() === "freeship") {
      setDiscount(deliveryFee);
    } else {
      setDiscount(0);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      
      const orderData = {
        orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        customer: customerInfo,
        items: cartItems,
        subtotal,
        tax,
        deliveryFee,
        discount,
        total,
        status: "pending",
        orderTime: new Date().toISOString(),
        restaurantLocation: { lat: 37.7749, lng: -122.4194 },
        deliveryLocation: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      };

      // Store as current order
      localStorage.setItem('currentOrder', JSON.stringify(orderData));
      
      // Add to list of orders
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      localStorage.setItem('orders', JSON.stringify([orderData, ...existingOrders]));
      
      clearCart();
      navigate('/order-tracking');
    } catch (error) {
      console.error("Error getting location:", error);
      // Fallback with random location near restaurant
      const orderData = {
        orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        customer: customerInfo,
        items: cartItems,
        subtotal,
        tax,
        deliveryFee,
        discount,
        total,
        status: "confirmed",
        orderTime: new Date().toISOString(),
        restaurantLocation: { lat: 37.7749, lng: -122.4194 },
        deliveryLocation: {
          lat: 37.7749 + (Math.random() * 0.02 - 0.01),
          lng: -122.4194 + (Math.random() * 0.02 - 0.01)
        }
      };

      localStorage.setItem('currentOrder', JSON.stringify(orderData));
      clearCart();
      navigate('/track-order');
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  return (
    <div className="flex flex-row min-h-screen w-full bg-white dark:bg-black">
      <div className="sticky top-0 h-screen bg-white dark:bg-black border-r border-gray-100 dark:border-zinc-800 shadow-sm">
        <Navbar variant="sidebar" />
      </div>

      <div className="flex-1 px-6 py-8 bg-white dark:bg-black">
        <div className="max-w-screen-xl mx-auto">
          <motion.h1 
            className="text-3xl font-bold mb-8 text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your Cart
          </motion.h1>

          {cartItems.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-8">
              <motion.div className="lg:w-2/3" variants={containerVariants} initial="hidden" animate="visible">
                <Card className="border border-gray-100 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900">
                  <CardHeader className="border-b border-gray-50 dark:border-zinc-800">
                    <CardTitle className="text-gray-800 dark:text-white">Cart Items ({cartItems.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px] pr-4">
                      <AnimatePresence>
                        {cartItems.map((item) => (
                          <motion.div key={item.id} variants={itemVariants} layout>
                            <div className="flex items-center gap-4 py-4">
                              <img src={item.image} alt={item.name} className="h-16 w-16 rounded-md object-cover border border-gray-100 dark:border-zinc-700" />
                              <div className="flex-1">
                                <h3 className="font-medium text-gray-800 dark:text-white">{item.name}</h3>
                                <Badge variant="outline" className="mt-1 bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-zinc-700">
                                  {item.category}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" className="h-8 w-8 border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800"
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-6 text-center text-gray-800 dark:text-white">{item.quantity}</span>
                                <Button variant="outline" size="icon" className="h-8 w-8 border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800"
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-gray-800 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                                <Button variant="ghost" size="sm" className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                  onClick={() => handleRemoveItem(item.id)}>
                                  <Trash2 className="h-4 w-4 mr-1" /> Remove
                                </Button>
                              </div>
                            </div>
                            <Separator className="bg-gray-100 dark:bg-zinc-800" />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="lg:w-1/3">
                <Card className="border border-gray-100 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900">
                  <CardHeader className="border-b border-gray-50 dark:border-zinc-800">
                    <CardTitle className="text-gray-800 dark:text-white">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                        <span className="text-gray-800 dark:text-white">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Tax</span>
                        <span className="text-gray-800 dark:text-white">${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Delivery Fee</span>
                        <span className="text-gray-800 dark:text-white">{deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-green-600 dark:text-green-500">
                          <span>Discount</span>
                          <span>-${discount.toFixed(2)}</span>
                        </div>
                      )}
                      <Separator className="bg-gray-100 dark:bg-zinc-800" />
                      <div className="flex justify-between font-bold text-lg text-gray-800 dark:text-white">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>

                      <div className="pt-2">
                        <div className="flex gap-2">
                          <Input 
                            placeholder="Promo code" 
                            value={promoCode} 
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-800 dark:text-white"
                          />
                          <Button 
                            onClick={applyPromoCode} 
                            className="bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700 text-gray-800 dark:text-white"
                          >
                            Apply
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Try "WELCOME15" for 15% off or "FREESHIP" for free delivery</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Sheet open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                      <SheetTrigger asChild>
                        <button
                          className="group/btn relative block h-12 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:from-zinc-800 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                          type="button"
                        >
                          Proceed to Checkout
                          <BottomGradient />
                        </button>
                      </SheetTrigger>
                      <SheetContent side="right" className="sm:max-w-lg bg-white dark:bg-black border-gray-100 dark:border-zinc-800">
                        <SheetHeader className="mb-4 px-6">
                          <SheetTitle className="text-2xl font-bold text-gray-800 dark:text-white">Checkout</SheetTitle>
                          <SheetDescription className="text-gray-500 dark:text-gray-400 mt-1">
                            Complete your order with a few more details
                          </SheetDescription>
                        </SheetHeader>
                        <div className="py-2 space-y-6 px-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="firstName" className="text-gray-700 dark:text-gray-300 text-sm font-medium">First Name</Label>
                              <Input 
                                id="firstName" 
                                placeholder="First Name" 
                                name="firstName" 
                                value={customerInfo.firstName} 
                                onChange={handleInputChange} 
                                required 
                                className="border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-800 dark:text-white h-11"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName" className="text-gray-700 dark:text-gray-300 text-sm font-medium">Last Name</Label>
                              <Input 
                                id="lastName" 
                                placeholder="Last Name" 
                                name="lastName" 
                                value={customerInfo.lastName} 
                                onChange={handleInputChange} 
                                required 
                                className="border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-800 dark:text-white h-11"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 text-sm font-medium">Email Address</Label>
                            <Input 
                              id="email" 
                              placeholder="Email Address" 
                              type="email" 
                              name="email" 
                              value={customerInfo.email} 
                              onChange={handleInputChange} 
                              required 
                              className="border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-800 dark:text-white h-11"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300 text-sm font-medium">Phone Number</Label>
                            <Input 
                              id="phone" 
                              placeholder="Phone Number" 
                              name="phone" 
                              value={customerInfo.phone} 
                              onChange={handleInputChange} 
                              required 
                              className="border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-800 dark:text-white h-11"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="address" className="text-gray-700 dark:text-gray-300 text-sm font-medium">Delivery Address</Label>
                            <Input 
                              id="address" 
                              placeholder="Delivery Address" 
                              name="address" 
                              value={customerInfo.address} 
                              onChange={handleInputChange} 
                              required 
                              className="border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-800 dark:text-white h-11"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label className="text-gray-700 dark:text-gray-300 text-sm font-medium">Payment Method</Label>
                            <div className="grid grid-cols-2 gap-4">
                              <div 
                                className={`flex items-center gap-3 rounded-lg border p-4 cursor-pointer transition-all ${customerInfo.paymentMethod === "Credit Card" ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-200 dark:border-zinc-700 hover:border-blue-200 dark:hover:border-blue-800"}`}
                                onClick={() => setCustomerInfo(prev => ({ ...prev, paymentMethod: "Credit Card" }))}
                              >
                                <CreditCard className={`h-5 w-5 ${customerInfo.paymentMethod === "Credit Card" ? "text-blue-500" : "text-gray-400"}`} />
                                <span className={customerInfo.paymentMethod === "Credit Card" ? "font-medium text-blue-700 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"}>Credit Card</span>
                              </div>
                              <div 
                                className={`flex items-center gap-3 rounded-lg border p-4 cursor-pointer transition-all ${customerInfo.paymentMethod === "Cash" ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-200 dark:border-zinc-700 hover:border-blue-200 dark:hover:border-blue-800"}`}
                                onClick={() => setCustomerInfo(prev => ({ ...prev, paymentMethod: "Cash" }))}
                              >
                                <Clock className={`h-5 w-5 ${customerInfo.paymentMethod === "Cash" ? "text-blue-500" : "text-gray-400"}`} />
                                <span className={customerInfo.paymentMethod === "Cash" ? "font-medium text-blue-700 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"}>Pay on Delivery</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4 pt-2">
                            <Separator className="bg-gray-100 dark:bg-zinc-800" />
                            <div className="flex justify-between items-center">
                              <span className="text-lg font-semibold text-gray-800 dark:text-white">Total</span>
                              <span className="text-xl font-bold text-gray-800 dark:text-white">${total.toFixed(2)}</span>
                            </div>
                            <button
                              className="group/btn relative block h-12 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:from-zinc-800 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] disabled:opacity-70"
                              type="button"
                              onClick={handleCheckout}
                              disabled={isLoading || !customerInfo.firstName || !customerInfo.lastName || !customerInfo.email || !customerInfo.phone || !customerInfo.address}
                            >
                              {isLoading ? "Processing..." : `Place Order • $${total.toFixed(2)}`}
                              <BottomGradient />
                            </button>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </CardFooter>
                </Card>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-black rounded-lg border border-gray-100 dark:border-zinc-800">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Your cart is empty</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">Add some delicious items to your cart and come back!</p>
              <button
                className="group/btn relative block h-12 px-8 mx-auto rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:from-zinc-800 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                onClick={() => navigate('/menu')}
              >
                Browse Menu
                <BottomGradient />
              </button>
            </div>
          )}
          <div className="pt-20 pb-10">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;