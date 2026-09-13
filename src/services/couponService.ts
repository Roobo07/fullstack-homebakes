export const couponService = {
  async validateCoupon(code: string, subtotal: number, customerId: string) {
    const response = await fetch('/api/coupons/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, subtotal, customerId })
    });
    return response.json();
  },

  async getCoupons(filters?: any) {
    // Implement fetch
    return [];
  },

  async createCoupon(input: any) {
    // Implement fetch
    return {};
  },

  async updateCoupon(id: string, input: any) {
    // Implement fetch
    return {};
  }
};
