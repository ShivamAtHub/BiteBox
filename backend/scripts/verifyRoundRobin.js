const mongoose = require('mongoose');
const RoundRobin = require('../algorithms/roundRobin');

// Test data
const drivers = [
  { id: 1, name: 'Driver 1', availability: true },
  { id: 2, name: 'Driver 2', availability: true },
  { id: 3, name: 'Driver 3', availability: true }
];

const orders = [
  { id: 1, customerName: 'Customer 1' },
  { id: 2, customerName: 'Customer 2' },
  { id: 3, customerName: 'Customer 3' },
  { id: 4, customerName: 'Customer 4' },
  { id: 5, customerName: 'Customer 5' },
  { id: 6, customerName: 'Customer 6' }
];

async function verifyRoundRobin() {
  try {
    // Initialize Round Robin scheduler
    const roundRobin = new RoundRobin();

    // Add drivers to the scheduler
    drivers.forEach(driver => roundRobin.addDriver(driver));

    console.log('Initial state:');
    console.log(roundRobin.getState());

    // Assign orders to drivers
    console.log('\nAssigning orders:');
    const assignments = [];
    for (const order of orders) {
      const driver = roundRobin.getNextDriver();
      assignments.push({
        order: order.id,
        driver: driver.id
      });
      console.log(`Order ${order.id} assigned to Driver ${driver.id}`);
    }

    // Verify assignments
    console.log('\nVerifying assignments:');
    const driverAssignments = {};
    assignments.forEach(assignment => {
      if (!driverAssignments[assignment.driver]) {
        driverAssignments[assignment.driver] = 0;
      }
      driverAssignments[assignment.driver]++;
    });

    console.log('\nNumber of orders per driver:');
    Object.entries(driverAssignments).forEach(([driverId, count]) => {
      console.log(`Driver ${driverId}: ${count} orders`);
    });

    // Verify round robin pattern
    console.log('\nVerifying round robin pattern:');
    const expectedPattern = [1, 2, 3, 1, 2, 3];
    const actualPattern = assignments.map(a => a.driver);
    const isPatternCorrect = expectedPattern.every((driverId, index) => driverId === actualPattern[index]);
    
    console.log('Expected pattern:', expectedPattern);
    console.log('Actual pattern:', actualPattern);
    console.log('Pattern is correct:', isPatternCorrect);

    // Test driver removal
    console.log('\nTesting driver removal:');
    roundRobin.removeDriver(drivers[1]); // Remove Driver 2
    const newAssignments = [];
    for (let i = 0; i < 3; i++) {
      const driver = roundRobin.getNextDriver();
      newAssignments.push(driver.id);
    }
    console.log('Assignments after removing Driver 2:', newAssignments);
    console.log('Expected pattern: [1, 3, 1]');
    console.log('Pattern is correct:', JSON.stringify(newAssignments) === JSON.stringify([1, 3, 1]));

  } catch (error) {
    console.error('Error during verification:', error);
  }
}

// Run the verification
verifyRoundRobin(); 