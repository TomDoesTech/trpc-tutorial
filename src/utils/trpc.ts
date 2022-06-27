import { createReactQueryHooks } from '@trpc/react'
import { AppRouter } from '../server/route/app.router'

export const trpc = createReactQueryHooks<AppRouter>()
