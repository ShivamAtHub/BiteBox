const RoundRobin = require('../algorithms/roundRobin');

describe('RoundRobin Algorithm', () => {
  let roundRobin;
  const driver1 = { id: 1, name: 'Driver 1' };
  const driver2 = { id: 2, name: 'Driver 2' };
  const driver3 = { id: 3, name: 'Driver 3' };

  beforeEach(() => {
    roundRobin = new RoundRobin();
  });

  test('should add drivers correctly', () => {
    roundRobin.addDriver(driver1);
    roundRobin.addDriver(driver2);
    
    const state = roundRobin.getState();
    expect(state.drivers).toHaveLength(2);
    expect(state.drivers).toContainEqual(driver1);
    expect(state.drivers).toContainEqual(driver2);
  });

  test('should not add duplicate drivers', () => {
    roundRobin.addDriver(driver1);
    roundRobin.addDriver(driver1);
    
    const state = roundRobin.getState();
    expect(state.drivers).toHaveLength(1);
  });

  test('should remove drivers correctly', () => {
    roundRobin.addDriver(driver1);
    roundRobin.addDriver(driver2);
    roundRobin.removeDriver(driver1);
    
    const state = roundRobin.getState();
    expect(state.drivers).toHaveLength(1);
    expect(state.drivers).not.toContainEqual(driver1);
  });

  test('should assign drivers in round robin fashion', () => {
    roundRobin.addDriver(driver1);
    roundRobin.addDriver(driver2);
    roundRobin.addDriver(driver3);

    // First round
    expect(roundRobin.getNextDriver()).toEqual(driver1);
    expect(roundRobin.getNextDriver()).toEqual(driver2);
    expect(roundRobin.getNextDriver()).toEqual(driver3);

    // Second round
    expect(roundRobin.getNextDriver()).toEqual(driver1);
    expect(roundRobin.getNextDriver()).toEqual(driver2);
    expect(roundRobin.getNextDriver()).toEqual(driver3);
  });

  test('should handle driver removal during assignment', () => {
    roundRobin.addDriver(driver1);
    roundRobin.addDriver(driver2);
    roundRobin.addDriver(driver3);

    // First assignment
    expect(roundRobin.getNextDriver()).toEqual(driver1);
    
    // Remove driver2
    roundRobin.removeDriver(driver2);
    
    // Next assignments should skip driver2
    expect(roundRobin.getNextDriver()).toEqual(driver3);
    expect(roundRobin.getNextDriver()).toEqual(driver1);
  });

  test('should throw error when no drivers available', () => {
    expect(() => roundRobin.getNextDriver()).toThrow('No drivers available');
  });
}); 