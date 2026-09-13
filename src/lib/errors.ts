export class AppError extends Error {
  code: string
  status: number
  
  constructor(message: string, code: string, status: number = 400) {
    super(message)
    this.name = 'AppError'
    this.code = code
    this.status = status
  }
}

export class NotFoundError extends AppError {
  constructor(entity: string) {
    super(`${entity} not found`, 'NOT_FOUND', 404)
  }
}

export class ValidationError extends AppError {
  errors: Record<string, string[]>
  
  constructor(message: string, errors: Record<string, string[]> = {}) {
    super(message, 'VALIDATION_ERROR', 400)
    this.errors = errors
  }
}

export class InsufficientStockError extends AppError {
  constructor(productName: string) {
    super(`Insufficient stock for ${productName}`, 'INSUFFICIENT_STOCK', 400)
  }
}

export class DeliveryUnavailableError extends AppError {
  constructor(distance: number) {
    super(`Delivery unavailable for distance ${distance.toFixed(1)} km`, 'DELIVERY_UNAVAILABLE', 400)
  }
}

export function formatErrorResponse(error: unknown) {
  if (error instanceof AppError) {
    return {
      error: error.message,
      code: error.code,
      ...(error instanceof ValidationError && { errors: error.errors }),
    }
  }
  console.error('Unexpected error:', error)
  return { error: 'An unexpected error occurred', code: 'INTERNAL_ERROR' }
}

export function getErrorStatus(error: unknown): number {
  if (error instanceof AppError) return error.status
  return 500
}
