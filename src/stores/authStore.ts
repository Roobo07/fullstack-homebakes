'use client'

import { create } from 'zustand'
import type { Profile } from '@/types/database'
import type { UserRoleType } from '@/types/enums'

interface AuthState {
  user: {
    id: string
    email: string
  } | null
  profile: Profile | null
  role: UserRoleType | null
  isLoading: boolean
  isAuthenticated: boolean

  // Actions
  setUser: (user: AuthState['user']) => void
  setProfile: (profile: Profile | null) => void
  setRole: (role: UserRoleType | null) => void
  setLoading: (loading: boolean) => void
  clear: () => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  profile: null,
  role: null,
  isLoading: true,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  setProfile: (profile) =>
    set({ profile }),

  setRole: (role) =>
    set({ role }),

  setLoading: (isLoading) =>
    set({ isLoading }),

  clear: () =>
    set({
      user: null,
      profile: null,
      role: null,
      isLoading: false,
      isAuthenticated: false,
    }),
}))
