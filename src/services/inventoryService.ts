export const inventoryService = {
  async getInventory(filters?: any) {
    // Mock implementation
    return [
      { id: 1, productName: 'Chocolate Truffle Cake', sku: 'CAKE-TRF-001', stock: 15, lowStockThreshold: 5, status: 'In Stock' },
      { id: 2, productName: 'Vanilla Cupcake', sku: 'CUP-VAN-002', stock: 3, lowStockThreshold: 10, status: 'Low Stock' },
      { id: 3, productName: 'Red Velvet Pastry', sku: 'PAS-RV-003', stock: 0, lowStockThreshold: 5, status: 'Out of Stock' }
    ];
  },

  async adjustStock(inventoryId: string, quantity: number, type: 'add' | 'remove' | 'set', reason: string, userId?: string) {
    // Mock API Call
    console.log(`Adjusting stock for ${inventoryId} by ${quantity} (${type}) due to ${reason}`);
    return { success: true };
  },

  async getTransactionHistory(inventoryId: string) {
    return [
      { id: 101, date: new Date().toISOString(), type: 'add', quantity: 20, reason: 'Restock' },
      { id: 102, date: new Date().toISOString(), type: 'remove', quantity: 2, reason: 'Sale' }
    ];
  },

  async getLowStockItems() {
    return [
      { id: 2, productName: 'Vanilla Cupcake', stock: 3, lowStockThreshold: 10 },
      { id: 3, productName: 'Red Velvet Pastry', stock: 0, lowStockThreshold: 5 }
    ];
  }
};
