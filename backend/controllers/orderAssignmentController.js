// controllers/orderAssignmentController.js
// import Order from '../models/Order.js';
import User from '../models/User.js';
// Change this line in orderAssignmentController.js
import { Order } from '../models/Order.js';

// Priority weights
const PRIORITY_WEIGHTS = {
  High: 3,
  Medium: 2,
  Low: 1
};

// Calculate distance between two points (Haversine formula)
function calculateDistance(location1, location2) {
  const [lon1, lat1] = location1;
  const [lon2, lat2] = location2;
  
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in km
}

// Calculate score for each driver
async function calculateDriverScores(order) {
  const { pickupLocation, priority } = order;
  const pickupCoords = pickupLocation.coordinates;
  
  // Find available drivers
  const drivers = await User.find({
    role: 'driver',
    availability: true,
    $expr: { $lt: [{ $size: "$activeOrders" }, "$maxWorkload"] }
  });
  
  if (drivers.length === 0) {
    throw new Error('No available drivers at the moment');
  }
  
  // Calculate score for each driver
  const scoredDrivers = await Promise.all(drivers.map(async (driver) => {
    const driverCoords = driver.currentLocation.coordinates;
    const distance = calculateDistance(driverCoords, pickupCoords);
    const distanceScore = distance * 0.6;
    const workload = driver.activeOrders.length;
    const workloadScore = workload * 0.4;
    const priorityMultiplier = PRIORITY_WEIGHTS[priority] || 1;
    const combinedScore = (distanceScore + workloadScore) / priorityMultiplier;
    
    return {
      driverId: driver._id,
      driver,
      distance,
      workload,
      combinedScore
    };
  }));
  
  return scoredDrivers.sort((a, b) => a.combinedScore - b.combinedScore);
}

// Controller methods
export const assignOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    if (order.status !== 'Pending') {
      return res.status(400).json({ message: 'Order is already assigned or processed' });
    }
    
    const scoredDrivers = await calculateDriverScores(order);
    const bestDriver = scoredDrivers[0];
    
    // Update order with assignment
    order.assignedTo = bestDriver.driverId;
    order.status = 'Assigned';
    
    // Update driver's active orders
    await User.findByIdAndUpdate(bestDriver.driverId, {
      $push: { activeOrders: order._id }
    });
    
    await order.save();
    
    res.status(200).json({
      success: true,
      order,
      assignedDriver: bestDriver.driver,
      assignmentDetails: {
        distance: bestDriver.distance,
        workload: bestDriver.workload,
        score: bestDriver.combinedScore
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Order assignment failed',
      error: error.message 
    });
  }
};

export const autoAssignPendingOrders = async (req, res) => {
  try {
    const pendingOrders = await Order.find({ status: 'Pending' });
    const results = [];
    
    for (const order of pendingOrders) {
      try {
        const scoredDrivers = await calculateDriverScores(order);
        const bestDriver = scoredDrivers[0];
        
        order.assignedTo = bestDriver.driverId;
        order.status = 'Assigned';
        await User.findByIdAndUpdate(bestDriver.driverId, {
          $push: { activeOrders: order._id }
        });
        await order.save();
        
        results.push({ success: true, orderId: order._id });
      } catch (error) {
        results.push({ 
          success: false, 
          orderId: order._id, 
          error: error.message 
        });
      }
    }
    
    res.status(200).json({
      totalOrders: pendingOrders.length,
      successCount: results.filter(r => r.success).length,
      failedCount: results.filter(r => !r.success).length,
      details: results
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Auto assignment failed',
      error: error.message 
    });
  }
};

// Add other controller methods (getAssignmentAnalytics, manualAssignOrder) here...