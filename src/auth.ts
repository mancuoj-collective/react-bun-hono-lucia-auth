import { Lucia } from 'lucia'
import { D1Adapter } from '@lucia-auth/adapter-sqlite'

declare module 'lucia' {
  interface Register {
    Auth: ReturnType<typeof initializeLucia>
  }
}

export function initializeLucia(D1: D1Database) {
  const adapter = new D1Adapter(D1, {
    user: 'user',
    session: 'session',
  })
  return new Lucia(adapter)
}
