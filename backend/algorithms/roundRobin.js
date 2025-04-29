class RoundRobin {
  constructor() {
    this.drivers = [];
    this.currentIndex = 0;
  }

  // Add a driver to the pool
  addDriver(driver) {
    if (!this.drivers.includes(driver)) {
      this.drivers.push(driver);
    }
  }

  // Remove a driver from the pool
  removeDriver(driver) {
    const index = this.drivers.indexOf(driver);
    if (index !== -1) {
      this.drivers.splice(index, 1);
      // Adjust currentIndex if needed
      if (this.currentIndex >= this.drivers.length) {
        this.currentIndex = 0;
      }
    }
  }

  // Get next driver in round robin fashion
  getNextDriver() {
    if (this.drivers.length === 0) {
      throw new Error('No drivers available');
    }

    const driver = this.drivers[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.drivers.length;
    return driver;
  }

  // Get current state of the algorithm
  getState() {
    return {
      drivers: this.drivers,
      currentIndex: this.currentIndex,
      nextDriver: this.drivers[this.currentIndex]
    };
  }
}

module.exports = RoundRobin; 