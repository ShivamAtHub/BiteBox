import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2, Clock, CreditCard } from "lucide-react";
import { useCart } from "../context/CartContext";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import { useNavigate } from "react-router-dom";

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
    <div className="flex flex-row min-h-screen w-full bg-white">
      <div className="sticky top-0 h-screen bg-white border-r border-gray-100 shadow-sm">
        <Navbar variant="sidebar" />
      </div>

      <div className="flex-1 px-6 py-8 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <motion.h1 
            className="text-3xl font-bold mb-8 text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your Cart
          </motion.h1>

          {cartItems.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-8">
              <motion.div className="lg:w-2/3" variants={containerVariants} initial="hidden" animate="visible">
                <Card className="border border-gray-100 shadow-sm bg-white">
                  <CardHeader className="border-b border-gray-50">
                    <CardTitle className="text-gray-800">Cart Items ({cartItems.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px] pr-4">
                      <AnimatePresence>
                        {cartItems.map((item) => (
                          <motion.div key={item.id} variants={itemVariants} layout>
                            <div className="flex items-center gap-4 py-4">
                              <img src={item.image} alt={item.name} className="h-16 w-16 rounded-md object-cover border border-gray-100" />
                              <div className="flex-1">
                                <h3 className="font-medium text-gray-800">{item.name}</h3>
                                <Badge variant="outline" className="mt-1 bg-white text-gray-600 border-gray-200">
                                  {item.category}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" className="h-8 w-8 border-gray-200 text-gray-600 hover:bg-gray-50"
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-6 text-center text-gray-800">{item.quantity}</span>
                                <Button variant="outline" size="icon" className="h-8 w-8 border-gray-200 text-gray-600 hover:bg-gray-50"
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                                <Button variant="ghost" size="sm" className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => handleRemoveItem(item.id)}>
                                  <Trash2 className="h-4 w-4 mr-1" /> Remove
                                </Button>
                              </div>
                            </div>
                            <Separator className="bg-gray-100" />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="lg:w-1/3">
                <Card className="border border-gray-100 shadow-sm bg-white">
                  <CardHeader className="border-b border-gray-50">
                    <CardTitle className="text-gray-800">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Subtotal</span>
                        <span className="text-gray-800">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Tax</span>
                        <span className="text-gray-800">${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Delivery Fee</span>
                        <span className="text-gray-800">{deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount</span>
                          <span>-${discount.toFixed(2)}</span>
                        </div>
                      )}
                      <Separator className="bg-gray-100" />
                      <div className="flex justify-between font-bold text-lg text-gray-800">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Sheet open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                      <SheetTrigger asChild>
                        <Button className="w-full bg-black hover:bg-gray-800 text-white" size="lg">
                          Proceed to Checkout
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="right" className="sm:max-w-lg bg-white">
                        <SheetHeader>
                          <SheetTitle className="text-gray-800">Checkout</SheetTitle>
                          <SheetDescription className="text-gray-500">
                            Complete your order with a few more details
                          </SheetDescription>
                        </SheetHeader>
                        <div className="py-6 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="First Name" name="firstName" value={customerInfo.firstName} onChange={handleInputChange} required />
                            <Input placeholder="Last Name" name="lastName" value={customerInfo.lastName} onChange={handleInputChange} required />
                          </div>
                          <Input placeholder="Email Address" type="email" name="email" value={customerInfo.email} onChange={handleInputChange} required />
                          <Input placeholder="Phone Number" name="phone" value={customerInfo.phone} onChange={handleInputChange} required />
                          <Input placeholder="Delivery Address" name="address" value={customerInfo.address} onChange={handleInputChange} required />
                          <Button 
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white" 
                            size="lg" 
                            onClick={handleCheckout}
                            disabled={isLoading || !customerInfo.firstName || !customerInfo.lastName || !customerInfo.email || !customerInfo.phone || !customerInfo.address}
                          >
                            {isLoading ? "Processing..." : `Place Order • $${total.toFixed(2)}`}
                          </Button>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </CardFooter>
                </Card>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-white">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">Add some delicious items to your cart and come back!</p>
              <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white">
                <a href="/menu">Browse Menu</a>
              </Button>
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