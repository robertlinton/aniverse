'use client'

import { createContext, useContext, ReactNode } from 'react'
import { User } from 'firebase/auth'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true })

export const useAuth = () => useContext(AuthContext)

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { user, loading } = useFirebaseAuth();

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

