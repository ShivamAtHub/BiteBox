// Load test environment variables
process.env.NODE_ENV = 'test';
require('dotenv').config({ path: '.env.test' });

const mongoose = require('mongoose');
const seedTestData = require('../seeders/testDataSeeder');
const { assignOrderRoundRobin, updateAvailableDrivers } = require('../controllers/orderAssignmentController');

async function testRoundRobin() {
  try {
    console.log('Connecting to database...');
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to database');

    // Seed test data
    const testData = await seedTestData();
    console.log('Seeded test data');

    // Update available drivers
    await updateAvailableDrivers();
    console.log('Updated available drivers');

    // Assign orders to drivers
    console.log('\nAssigning orders to drivers...');
    for (const order of testData.orders) {
      const result = await assignOrderRoundRobin(order);
      console.log(`Order ${order._id} assigned to driver ${result.driver._id}`);
    }

    // Get updated driver data
    const updatedDrivers = await mongoose.model('User').find({
      _id: { $in: testData.drivers.map(d => d._id) }
    });

    // Display results
    console.log('\nAssignment Results:');
    updatedDrivers.forEach(driver => {
      console.log(`\nDriver: ${driver.name}`);
      console.log(`Active Orders: ${driver.activeOrders.length}`);
      console.log(`Orders: ${driver.activeOrders.join(', ')}`);
    });

    // Clean up
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
    console.log('\nTest completed successfully');

  } catch (error) {
    console.error('Error during test:', error);
    process.exit(1);
  }
}

// Run the test
testRoundRobin(); 