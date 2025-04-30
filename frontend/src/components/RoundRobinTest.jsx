import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RoundRobin } from '@/utils/roundRobin.jsx';
import Navbar from "../components/ui/Navbar";

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
    <div className="flex flex-row min-h-screen w-full bg-white dark:bg-black">
      <div className="sticky top-0 h-screen bg-white dark:bg-black border-r border-gray-100 dark:border-zinc-800 shadow-sm">
        <Navbar variant="sidebar" />
      </div>

      <div className="flex-1 px-6 py-8 bg-white dark:bg-black">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Round Robin Algorithm Test</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <Card className="border border-gray-100 dark:border-zinc-800 shadow-sm bg-white dark:bg-black mb-8">
                <CardHeader className="border-b border-gray-50 dark:border-zinc-800">
                  <CardTitle className="text-gray-800 dark:text-white">Current State</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <p className="text-gray-600 dark:text-gray-300">Current Index:</p>
                      <p className="font-medium text-gray-800 dark:text-white">{driverState.currentIndex}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-600 dark:text-gray-300">Next Driver:</p>
                      <p className="font-medium text-gray-800 dark:text-white">{driverState.nextDriver?.name || 'None'}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-600 dark:text-gray-300">Total Drivers:</p>
                      <p className="font-medium text-gray-800 dark:text-white">{driverState.totalDrivers}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-100 dark:border-zinc-800 shadow-sm bg-white dark:bg-black">
                <CardHeader className="border-b border-gray-50 dark:border-zinc-800">
                  <CardTitle className="text-gray-800 dark:text-white">Assignments</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {assignments.length > 0 ? (
                      assignments.map((assignment, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-gray-100 dark:border-zinc-800 rounded-lg bg-gray-50 dark:bg-zinc-900">
                          <div>
                            <span className="font-medium text-gray-800 dark:text-white">Order {assignment.orderId}</span>
                            <span className="text-gray-500 ml-2">({assignment.customerName})</span>
                          </div>
                          <Badge className="bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 border-blue-100 dark:border-blue-800">
                            Assigned to: {assignment.driverName}
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 text-center py-6">No assignments yet. Click "Assign Next Order" to start.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border border-gray-100 dark:border-zinc-800 shadow-sm bg-white dark:bg-black">
                <CardHeader className="border-b border-gray-50 dark:border-zinc-800">
                  <CardTitle className="text-gray-800 dark:text-white">Available Drivers</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {testDrivers.map(driver => (
                      <div key={driver.id} className="flex items-center justify-between p-3 border border-gray-100 dark:border-zinc-800 rounded-lg bg-gray-50 dark:bg-zinc-900">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 mr-3">
                            {driver.name.charAt(0)}
                          </div>
                          <span className="text-gray-800 dark:text-white">{driver.name}</span>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveDriver(driver.id)}
                          className="bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-300 border border-red-100 dark:border-red-900 hover:bg-red-100 dark:hover:bg-red-900"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-100 dark:border-zinc-800 shadow-sm bg-white dark:bg-black">
                <CardHeader className="border-b border-gray-50 dark:border-zinc-800">
                  <CardTitle className="text-gray-800 dark:text-white">Actions</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <Button 
                      onClick={handleAssignOrder} 
                      disabled={assignments.length >= testOrders.length}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Assign Next Order
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleReset}
                      className="w-full border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-900"
                    >
                      Reset Algorithm
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoundRobinTest;