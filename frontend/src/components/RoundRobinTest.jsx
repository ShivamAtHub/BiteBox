import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RoundRobin } from '@/utils/roundRobin.jsx';

const RoundRobinTest = () => {
  const [roundRobin, setRoundRobin] = useState(new RoundRobin());
  const [assignments, setAssignments] = useState([]);
  const [driverState, setDriverState] = useState({});

  // Test data
  const testDrivers = [
    { id: 1, name: 'Driver 1', availability: true },
    { id: 2, name: 'Driver 2', availability: true },
    { id: 3, name: 'Driver 3', availability: true }
  ];

  const testOrders = [
    { id: 1, customerName: 'Customer 1' },
    { id: 2, customerName: 'Customer 2' },
    { id: 3, customerName: 'Customer 3' },
    { id: 4, customerName: 'Customer 4' },
    { id: 5, customerName: 'Customer 5' },
    { id: 6, customerName: 'Customer 6' }
  ];

  useEffect(() => {
    // Initialize Round Robin with test drivers
    const rr = new RoundRobin();
    testDrivers.forEach(driver => rr.addDriver(driver));
    setRoundRobin(rr);
    updateDriverState(rr);
  }, []);

  const updateDriverState = (rr) => {
    const state = rr.getState();
    setDriverState({
      currentIndex: state.currentIndex,
      nextDriver: state.nextDriver,
      totalDrivers: state.drivers.length
    });
  };

  const handleAssignOrder = () => {
    if (assignments.length >= testOrders.length) {
      alert('All orders have been assigned!');
      return;
    }

    const order = testOrders[assignments.length];
    const driver = roundRobin.getNextDriver();
    
    const newAssignment = {
      orderId: order.id,
      customerName: order.customerName,
      driverId: driver.id,
      driverName: driver.name
    };

    setAssignments([...assignments, newAssignment]);
    updateDriverState(roundRobin);
  };

  const handleRemoveDriver = (driverId) => {
    const driver = testDrivers.find(d => d.id === driverId);
    if (driver) {
      const rr = new RoundRobin();
      // Recreate the Round Robin instance with remaining drivers
      testDrivers
        .filter(d => d.id !== driverId)
        .forEach(d => rr.addDriver(d));
      setRoundRobin(rr);
      updateDriverState(rr);
    }
  };

  const handleReset = () => {
    const rr = new RoundRobin();
    testDrivers.forEach(driver => rr.addDriver(driver));
    setRoundRobin(rr);
    setAssignments([]);
    updateDriverState(rr);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Round Robin Algorithm Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Current State</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>Current Index: {driverState.currentIndex}</p>
              <p>Next Driver: {driverState.nextDriver?.name || 'None'}</p>
              <p>Total Drivers: {driverState.totalDrivers}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Drivers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {testDrivers.map(driver => (
                <div key={driver.id} className="flex items-center justify-between">
                  <span>{driver.name}</span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveDriver(driver.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 mb-6">
        <Button onClick={handleAssignOrder} disabled={assignments.length >= testOrders.length}>
          Assign Next Order
        </Button>
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {assignments.map((assignment, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded">
                <div>
                  <span className="font-medium">Order {assignment.orderId}</span>
                  <span className="text-gray-500 ml-2">({assignment.customerName})</span>
                </div>
                <Badge variant="secondary">
                  Assigned to: {assignment.driverName}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoundRobinTest; 