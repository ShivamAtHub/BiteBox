const mongoose = require('mongoose');
const RoundRobin = require('../algorithms/roundRobin');
const { assignOrderRoundRobin, updateAvailableDrivers } = require('../controllers/orderAssignmentController');
const seedTestData = require('../seeders/testDataSeeder');

describe('Round Robin Integration Tests', () => {
  let testData;

  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bitebox-test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Seed test data
    testData = await seedTestData();
  });

  afterAll(async () => {
    // Clean up test data
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  test('should assign orders to drivers in round robin fashion', async () => {
    // Update available drivers
    await updateAvailableDrivers();

    // Assign orders to drivers
    const assignments = await Promise.all(
      testData.orders.map(order => assignOrderRoundRobin(order))
    );

    // Verify all assignments were successful
    assignments.forEach(assignment => {
      expect(assignment.success).toBe(true);
    });

    // Get updated driver data
    const updatedDrivers = await mongoose.model('User').find({
      _id: { $in: testData.drivers.map(d => d._id) }
    });

    // Verify each driver has exactly one order
    updatedDrivers.forEach(driver => {
      expect(driver.activeOrders).toHaveLength(1);
    });

    // Verify orders are assigned in round robin fashion
    const assignedOrders = assignments.map(a => a.order._id);
    const driverOrders = updatedDrivers.map(d => d.activeOrders[0]);
    
    // Check if orders are assigned in the same order as drivers
    expect(assignedOrders).toEqual(driverOrders);
  });

  test('should handle driver unavailability', async () => {
    // Make one driver unavailable
    const unavailableDriver = testData.drivers[0];
    await mongoose.model('User').findByIdAndUpdate(unavailableDriver._id, {
      availability: false
    });

    // Create a new order
    const newOrder = await mongoose.model('Order').create({
      customerName: 'Test Customer 4',
      items: [{ name: 'Item 4', price: 200, quantity: 1 }],
      totalAmount: 200,
      status: 'pending',
      assignedDriver: null,
      pickupLocation: {
        type: 'Point',
        coordinates: [77.5946, 12.9716]
      },
      deliveryAddress: 'Test Address 4',
      isTestData: true
    });

    // Assign the new order
    const assignment = await assignOrderRoundRobin(newOrder);
    expect(assignment.success).toBe(true);

    // Verify the order was assigned to an available driver
    const updatedDriver = await mongoose.model('User').findById(assignment.driver._id);
    expect(updatedDriver.availability).toBe(true);
    expect(updatedDriver._id.toString()).not.toBe(unavailableDriver._id.toString());
  });
}); 