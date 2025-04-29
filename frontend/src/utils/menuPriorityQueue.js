class MenuItem {
  constructor(item) {
    this.item = item;
    this.priority = this.calculatePriority();
  }

  calculatePriority() {
    let priority = 0;
    
    // Base priority from rating (0-5 scale)
    priority += this.item.rating * 20; // 20 points per rating point
    
    // Popularity boost (based on order count)
    if (this.item.orderCount > 50) {
      priority += 30; // Popular items get a boost
    } else if (this.item.orderCount > 20) {
      priority += 15; // Moderately popular items get a smaller boost
    }
    
    // Recent orders boost
    if (this.item.recentOrders > 5) {
      priority += 25; // Trending items get a boost
    } else if (this.item.recentOrders > 2) {
      priority += 10;
    }
    
    // Special tag boost
    if (this.item.specialTag) {
      priority += 40; // Special items get highest boost
    }
    
    // Category-specific boosts
    switch (this.item.category) {
      case 'pizza':
        priority += 10;
        break;
      case 'burger':
        priority += 8;
        break;
      case 'sushi':
        priority += 12;
        break;
      case 'dessert':
        priority += 5;
        break;
    }
    
    return priority;
  }
}

class MenuPriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(item) {
    const menuItem = new MenuItem(item);
    let added = false;
    
    for (let i = 0; i < this.items.length; i++) {
      if (menuItem.priority > this.items[i].priority) {
        this.items.splice(i, 0, menuItem);
        added = true;
        break;
      }
    }
    
    if (!added) {
      this.items.push(menuItem);
    }
    
    return menuItem;
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift().item;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[0].item;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  getAllItems() {
    return this.items.map(item => ({
      ...item.item,
      priority: item.priority
    }));
  }

  updatePriority(itemId, updatedItem) {
    // Remove the item
    this.items = this.items.filter(item => item.item.id !== itemId);
    
    // Add it back with new priority
    this.enqueue(updatedItem);
  }

  getItemById(itemId) {
    const foundItem = this.items.find(item => item.item.id === itemId);
    return foundItem ? foundItem.item : null;
  }
}

export default MenuPriorityQueue; 