import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isAdmin, isAdminOrStaff, hasPermission, type Permission } from './roles'
import type { UserRoleType } from '@/types/enums'

export interface AuthContext {
  userId: string
  email: string
  role: UserRoleType
}

export async function getAuthContext(): Promise<AuthContext | null> {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return null
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  
  return {
    userId: user.id,
    email: user.email || '',
    role: (profile?.role as UserRoleType) || 'customer',
  }
}

export async function requireAuth(): Promise<AuthContext> {
  const ctx = await getAuthContext()
  if (!ctx) throw new AuthError('Unauthorized', 401)
  return ctx
}

export async function requireAdmin(): Promise<AuthContext> {
  const ctx = await requireAuth()
  if (!isAdmin(ctx.role)) throw new AuthError('Forbidden', 403)
  return ctx
}

export async function requireStaff(): Promise<AuthContext> {
  const ctx = await requireAuth()
  if (!isAdminOrStaff(ctx.role)) throw new AuthError('Forbidden', 403)
  return ctx
}

export async function requirePermission(permission: Permission): Promise<AuthContext> {
  const ctx = await requireAuth()
  if (!hasPermission(ctx.role, permission)) throw new AuthError('Forbidden', 403)
  return ctx
}

export class AuthError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.name = 'AuthError'
    this.status = status
  }
}

export function handleAuthError(error: unknown): NextResponse {
  if (error instanceof AuthError) {
    return NextResponse.json({ error: error.message }, { status: error.status })
  }
  console.error('Unexpected error:', error)
  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
}
