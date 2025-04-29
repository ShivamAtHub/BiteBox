const User = require('../models/User');
const Order = require('../models/Order');

async function seedTestData() {
  try {
    // Clear existing test data
    await User.deleteMany({ role: 'driver', isTestData: true });
    await Order.deleteMany({ isTestData: true });

    // Create test drivers
    const drivers = [
      {
        name: 'Test Driver 1',
        email: 'driver1@test.com',
        password: 'password123',
        role: 'driver',
        availability: true,
        maxWorkload: 5,
        activeOrders: [],
        currentLocation: {
          type: 'Point',
          coordinates: [77.5946, 12.9716] // Bangalore coordinates
        },
        isTestData: true
      },
      {
        name: 'Test Driver 2',
        email: 'driver2@test.com',
        password: 'password123',
        role: 'driver',
        availability: true,
        maxWorkload: 5,
        activeOrders: [],
        currentLocation: {
          type: 'Point',
          coordinates: [77.5946, 12.9716]
        },
        isTestData: true
      },
      {
        name: 'Test Driver 3',
        email: 'driver3@test.com',
        password: 'password123',
        role: 'driver',
        availability: true,
        maxWorkload: 5,
        activeOrders: [],
        currentLocation: {
          type: 'Point',
          coordinates: [77.5946, 12.9716]
        },
        isTestData: true
      }
    ];

    const createdDrivers = await User.insertMany(drivers);
    console.log('Created test drivers:', createdDrivers.length);

    // Create test orders
    const orders = [
      {
        customerName: 'Test Customer 1',
        items: [{ name: 'Item 1', price: 100, quantity: 1 }],
        totalAmount: 100,
        status: 'pending',
        assignedDriver: null,
        pickupLocation: {
          type: 'Point',
          coordinates: [77.5946, 12.9716]
        },
        deliveryAddress: 'Test Address 1',
        isTestData: true
      },
      {
        customerName: 'Test Customer 2',
        items: [{ name: 'Item 2', price: 200, quantity: 2 }],
        totalAmount: 400,
        status: 'pending',
        assignedDriver: null,
        pickupLocation: {
          type: 'Point',
          coordinates: [77.5946, 12.9716]
        },
        deliveryAddress: 'Test Address 2',
        isTestData: true
      },
      {
        customerName: 'Test Customer 3',
        items: [{ name: 'Item 3', price: 150, quantity: 1 }],
        totalAmount: 150,
        status: 'pending',
        assignedDriver: null,
        pickupLocation: {
          type: 'Point',
          coordinates: [77.5946, 12.9716]
        },
        deliveryAddress: 'Test Address 3',
        isTestData: true
      }
    ];

    const createdOrders = await Order.insertMany(orders);
    console.log('Created test orders:', createdOrders.length);

    return {
      drivers: createdDrivers,
      orders: createdOrders
    };
  } catch (error) {
    console.error('Error seeding test data:', error);
    throw error;
  }
}

module.exports = seedTestData; 