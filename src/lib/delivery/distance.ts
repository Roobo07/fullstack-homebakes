/**
 * Haversine formula to calculate the distance between two GPS coordinates.
 * Returns distance in kilometers.
 *
 * No external API key required.
 */

const EARTH_RADIUS_KM = 6371

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

/**
 * Calculate the great-circle distance between two points on Earth
 * using the Haversine formula.
 *
 * @param lat1 - Latitude of point 1 (degrees)
 * @param lng1 - Longitude of point 1 (degrees)
 * @param lat2 - Latitude of point 2 (degrees)
 * @param lng2 - Longitude of point 2 (degrees)
 * @returns Distance in kilometers, rounded to 2 decimal places
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const dLat = toRadians(lat2 - lat1)
  const dLng = toRadians(lng2 - lng1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  const distance = EARTH_RADIUS_KM * c

  return Math.round(distance * 100) / 100
}

export interface DeliveryZoneConfig {
  id: string
  name: string
  minDistanceKm: number
  maxDistanceKm: number
  deliveryFee: number
  estimatedTime?: string
  active: boolean
}

export interface DeliveryCalculationResult {
  available: boolean
  distance: number
  fee: number
  zoneName: string | null
  estimatedTime: string | null
  message: string
}

/**
 * Calculate delivery fee based on distance and delivery zones.
 *
 * @param customerLat - Customer latitude
 * @param customerLng - Customer longitude
 * @param bakeryLat - Bakery latitude
 * @param bakeryLng - Bakery longitude
 * @param zones - Available delivery zones from database
 * @param orderSubtotal - Order subtotal for free delivery check
 * @param freeDeliveryThreshold - Minimum order for free delivery
 * @param maxDeliveryRadius - Maximum delivery radius in km
 * @param minDeliveryOrder - Minimum order amount for delivery
 * @returns Delivery calculation result
 */
export function calculateDeliveryFee(
  customerLat: number,
  customerLng: number,
  bakeryLat: number,
  bakeryLng: number,
  zones: DeliveryZoneConfig[],
  orderSubtotal: number,
  freeDeliveryThreshold: number = 0,
  maxDeliveryRadius: number = 10,
  minDeliveryOrder: number = 0
): DeliveryCalculationResult {
  const distance = calculateDistance(customerLat, customerLng, bakeryLat, bakeryLng)

  // Check minimum order amount
  if (minDeliveryOrder > 0 && orderSubtotal < minDeliveryOrder) {
    return {
      available: false,
      distance,
      fee: 0,
      zoneName: null,
      estimatedTime: null,
      message: `Minimum order of ₹${minDeliveryOrder} required for delivery`,
    }
  }

  // Check max delivery radius
  if (distance > maxDeliveryRadius) {
    return {
      available: false,
      distance,
      fee: 0,
      zoneName: null,
      estimatedTime: null,
      message: `Delivery not available beyond ${maxDeliveryRadius} km. Your distance: ${distance} km`,
    }
  }

  // Check free delivery
  if (freeDeliveryThreshold > 0 && orderSubtotal >= freeDeliveryThreshold) {
    // Find the zone for display purposes
    const activeZones = zones
      .filter((z) => z.active)
      .sort((a, b) => a.minDistanceKm - b.minDistanceKm)

    const matchedZone = activeZones.find(
      (z) => distance >= z.minDistanceKm && distance <= z.maxDistanceKm
    )

    return {
      available: true,
      distance,
      fee: 0,
      zoneName: matchedZone?.name || 'Free Delivery',
      estimatedTime: matchedZone?.estimatedTime || null,
      message: 'Free delivery! 🎉',
    }
  }

  // Find matching delivery zone
  const activeZones = zones
    .filter((z) => z.active)
    .sort((a, b) => a.minDistanceKm - b.minDistanceKm)

  const matchedZone = activeZones.find(
    (z) => distance >= z.minDistanceKm && distance < z.maxDistanceKm
  )

  if (!matchedZone) {
    // Check if distance is exactly the max of the last zone
    const lastZone = activeZones[activeZones.length - 1]
    if (lastZone && distance === lastZone.maxDistanceKm) {
      return {
        available: true,
        distance,
        fee: lastZone.deliveryFee,
        zoneName: lastZone.name,
        estimatedTime: lastZone.estimatedTime || null,
        message: `Delivery fee: ₹${lastZone.deliveryFee}`,
      }
    }

    return {
      available: false,
      distance,
      fee: 0,
      zoneName: null,
      estimatedTime: null,
      message: `No delivery zone configured for ${distance} km distance`,
    }
  }

  return {
    available: true,
    distance,
    fee: matchedZone.deliveryFee,
    zoneName: matchedZone.name,
    estimatedTime: matchedZone.estimatedTime || null,
    message: `Delivery fee: ₹${matchedZone.deliveryFee}`,
  }
}
