export class FinanceService {
  static async createExpense(input: any, userId: string) { return true; }
  static async getExpenses(filters?: any) { return []; }
  static async createRefund(input: any, userId: string) { return true; }
  static async getDailyCashClosing(date: string) { return null; }
  static async closeDailyRegister(input: any, userId: string) { return true; }
}
