import type { Coordinates } from '@/api/location.types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const debounce = <T>(fn: (...args: T[]) => void, delay: number) => {
  let timer: ReturnType<typeof setTimeout> | null = null

  return (...args: T[]) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => fn(...args), delay)
  }
}

// Haversine formula: https://www.geeksforgeeks.org/haversine-formula-to-find-distance-between-two-points-on-a-sphere/
export const haversine = (coord1: Coordinates, coord2: Coordinates) => {
  const { lat: lat1, lon: lon1 } = coord1,
    { lat: lat2, lon: lon2 } = coord2
  const R = 6371 // Radius of the Earth in km
  const toRad = (angle: number) => (angle * Math.PI) / 180

  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c // Distance in km
}

export const toMiles = (distance: number) => {
  return distance * 0.621371
}
